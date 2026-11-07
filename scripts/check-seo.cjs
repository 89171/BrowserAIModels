/**
 * Post-build SEO guard. A page that silently drops out of the sitemap, or a
 * prerendered route that loses its description or structured data, is invisible
 * until Search Console reports it — so check the exported HTML instead.
 */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');

const errors = [];
const OUT = 'out';
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://browseraimodels.xyz').replace(/\/$/, '');

// The catalogue modules import each other through the `@/` alias, which plain
// CommonJS cannot resolve, so transpile and run them with a tiny resolver.
const loaded = new Map();

function load(file) {
  if (loaded.has(file)) return loaded.get(file);

  const exports = {};
  loaded.set(file, exports);
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText,
    {
      exports,
      module: { exports },
      require: (id) => {
        if (id.startsWith('@/')) {
          const target = id.slice(2);
          if (target === 'types/taxonomy' || target === 'lib/types' || target === 'types/rnnoise-wasm') {
            return {};
          }
          return load(`${target}.ts`);
        }
        if (id.startsWith('.')) {
          const resolved = path.resolve(path.dirname(file), id);
          if (resolved.endsWith('.json')) return JSON.parse(fs.readFileSync(resolved, 'utf8'));
          return load(resolved);
        }
        throw new Error(`check-seo: cannot resolve ${id} from ${file}`);
      },
    },
    { filename: file },
  );
  return exports;
}

const { TAXONOMY } = load('data/taxonomy.ts');
const { getModels } = load('data/models.ts');
const { allDemoPaths } = load('lib/data/registry.ts');

function localized(locale, route) {
  if (locale === 'en' && (!route || route === '/')) return '/';
  return `/${locale}${route === '/' ? '' : route}`;
}

if (!fs.existsSync(path.join(OUT, 'sitemap.xml'))) {
  console.error('check-seo: out/sitemap.xml is missing — run the build first.');
  process.exit(1);
}

const sitemap = fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const unique = new Set(locs);

if (locs.length !== unique.size) {
  const seen = new Set();
  const dupes = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) dupes.add(loc);
    seen.add(loc);
  }
  errors.push(`sitemap has duplicate URLs: ${[...dupes].slice(0, 5).join(', ')}`);
}

const expected = [];
for (const locale of ['en', 'zh']) {
  expected.push(localized(locale, ''));
  expected.push(localized(locale, '/applications'), localized(locale, '/methodology'), localized(locale, '/demos'));
  for (const { category, subcategory } of allDemoPaths()) {
    expected.push(localized(locale, `/demos/${category}/${subcategory}`));
  }
  for (const category of TAXONOMY) {
    expected.push(localized(locale, `/${category.slug}`));
    for (const subcategory of category.subcategories) {
      expected.push(localized(locale, `/${category.slug}/${subcategory.slug}`));
      for (const model of getModels(category.slug, subcategory.slug)) {
        expected.push(localized(locale, `/${category.slug}/${subcategory.slug}/${model.id}`));
      }
    }
  }
}

const missing = expected.filter((route) => !unique.has(`${SITE}${route}`));
if (missing.length) errors.push(`sitemap is missing ${missing.length} routes, e.g. ${missing.slice(0, 5).join(', ')}`);

// Every advertised URL must resolve to a real file in the static export.
const unresolved = expected.filter((route) => !fs.existsSync(exportedFile(route)));
if (unresolved.length) {
  errors.push(`sitemap lists ${unresolved.length} URLs with no exported page, e.g. ${unresolved.slice(0, 5).join(', ')}`);
}

// `output: 'export'` writes /zh/demos.html for /zh/demos and index.html for /.
function exportedFile(route) {
  return path.join(OUT, route === '/' ? 'index.html' : `${route}.html`);
}

function html(route) {
  const file = exportedFile(route);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : undefined;
}

const pages = [
  { route: '/', needs: ['"@type":"WebSite"', '"@type":"FAQPage"'] },
  { route: '/zh', needs: ['"@type":"WebSite"', '"@type":"FAQPage"'] },
  { route: '/zh/text/ner', needs: ['"@type":"FAQPage"', '"@type":"ItemList"'] },
  { route: '/en/text/ner', needs: ['"@type":"FAQPage"'] },
  { route: '/zh/demos', needs: ['"@type":"CollectionPage"', '"@type":"FAQPage"'] },
  { route: '/zh/demos/text/ner', needs: ['"@type":"WebApplication"'] },
];

for (const { route, needs } of pages) {
  const source = html(route);
  if (!source) {
    errors.push(`missing exported page: ${route}`);
    continue;
  }
  if (!/<meta name="description" content="[^"]{40,}"/.test(source)) {
    errors.push(`${route}: description is missing or too short`);
  }
  if (!/<link rel="canonical" href="https?:\/\/[^"]+"/.test(source)) {
    errors.push(`${route}: canonical link is missing`);
  }
  // React emits the attribute as `hrefLang`; HTML attribute names are
  // case-insensitive, so match either spelling.
  if (!/hreflang="zh"/i.test(source) || !/hreflang="en"/i.test(source)) {
    errors.push(`${route}: hreflang alternates are missing`);
  }
  for (const needle of needs) {
    if (!source.includes(needle)) errors.push(`${route}: structured data lacks ${needle}`);
  }
}

// Every entry page must carry its own SoftwareApplication node, not just the
// task list it sits in.
for (const model of getModels('text', 'ner')) {
  const route = `/zh/text/ner/${model.id}`;
  const source = html(route);
  if (source && !source.includes('"@type":"SoftwareApplication"')) {
    errors.push(`${route}: structured data lacks SoftwareApplication`);
  }
}

// Demo deep links are the same playground with one entry preselected: they must
// stay out of the index and out of the sitemap, and canonicalise to the task page.
{
  const { demoModels } = load('lib/demo-catalog.ts');
  const sample = allDemoPaths()
    .map(({ category, subcategory }) => {
      const first = demoModels(category, subcategory)[0];
      return first ? { category, subcategory, model: first.id } : undefined;
    })
    .filter(Boolean)
    .slice(0, 3);

  for (const { category, subcategory, model } of sample) {
    const route = `/zh/demos/${category}/${subcategory}/${model}`;
    const source = html(route);
    if (!source) {
      errors.push(`${route}: deep link page is missing`);
      continue;
    }
    if (!/name="robots" content="noindex/.test(source)) {
      errors.push(`${route}: deep link should be noindex`);
    }
    const canonical = (source.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
    const taskUrl = `${SITE}/zh/demos/${category}/${subcategory}`;
    if (canonical !== taskUrl) {
      errors.push(`${route}: canonical points at ${canonical ?? 'nothing'}, expected ${taskUrl}`);
    }
    if (unique.has(`${SITE}${route}`)) {
      errors.push(`${route}: deep links should not be listed in the sitemap`);
    }
  }
}

// Social cards: every key page must be shareable (og + twitter), and the icon
// set must survive the export — a missing apple-touch-icon only shows up on a
// real phone, so assert the files exist instead.
{
  const socialNeedles = [
    /<meta property="og:title" content="[^"]+"/,
    /<meta property="og:image" content="https?:\/\/[^"]+"/,
    /<meta name="twitter:card" content="summary_large_image"/,
  ];
  for (const { route } of pages) {
    const source = html(route);
    if (!source) continue;
    for (const needle of socialNeedles) {
      if (!needle.test(source)) errors.push(`${route}: social card meta is missing (${needle})`);
    }
  }

  const home = html('/');
  if (home) {
    if (!/<link rel="apple-touch-icon"/.test(home)) errors.push('/: apple-touch-icon link is missing');
    if (!/<link rel="manifest"/.test(home)) errors.push('/: manifest link is missing');
  }
  for (const asset of ['og.png', 'favicon.svg', 'favicon.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'manifest.webmanifest']) {
    if (!fs.existsSync(path.join(OUT, asset))) errors.push(`out/${asset} was not exported`);
  }
}

// Third-party product names are not part of this site's copy: a demo link may
// point at one, but the page must never name it in visible text.
{
  const offenders = [];
  for (const file of fs.readdirSync(OUT, { recursive: true })) {
    if (!String(file).endsWith('.html')) continue;
    const source = fs.readFileSync(path.join(OUT, String(file)), 'utf8');
    const visible = source
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/g, ' ');
    if (/toolgarden/i.test(visible)) offenders.push(String(file));
  }
  if (offenders.length) {
    errors.push(`visible copy names toolgarden on ${offenders.length} page(s), e.g. ${offenders.slice(0, 3).join(', ')}`);
  }
}

// Site-wide snippet guard. A thin meta description is the usual reason a
// catalogue page gets a rewritten or blank result; noindex deep links are
// deliberately excluded because they never appear in results.
let indexableCount = 0;
{
  const thin = [];
  for (const file of fs.readdirSync(OUT, { recursive: true })) {
    const rel = String(file);
    if (!rel.endsWith('.html')) continue;
    const source = fs.readFileSync(path.join(OUT, rel), 'utf8');
    if (/name="robots" content="noindex/.test(source)) continue;
    indexableCount++;
    const desc = (source.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    // A Chinese sentence of 35 characters already carries a full snippet;
    // an English one under 80 is usually a bare fragment.
    const minimum = /^zh(?:[./]|$)/.test(rel) ? 35 : 80;
    if (!desc || desc.length < minimum) thin.push(`${rel} (${desc ? desc.length : 0} chars)`);
  }
  if (thin.length) {
    errors.push(`${thin.length} indexable pages have a thin or missing description, e.g. ${thin.slice(0, 5).join(', ')}`);
  }
}

// Blog index: the article schema points at this page, so the reverse node and
// the full post list have to be machine-readable too.
{
  const needs = [
    '"@type":"Blog"',
    '"@type":"ItemList"',
    '"@type":"BreadcrumbList"',
    '"@type":"BlogPosting"',
  ];
  for (const route of ['/zh/blog', '/en/blog']) {
    const source = html(route);
    if (!source) {
      errors.push(`missing exported blog index: ${route}`);
      continue;
    }
    for (const needle of needs) {
      if (!source.includes(needle)) errors.push(`${route}: structured data lacks ${needle}`);
    }
    if (!/<meta name="keywords" content="[^"]{20,}"/.test(source)) {
      errors.push(`${route}: keywords meta is missing`);
    }
    const desc = (source.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    if (desc.length < 50) errors.push(`${route}: description is too short`);
    if (!source.includes(`<meta property="og:description" content="${desc}"`)) {
      errors.push(`${route}: og:description does not match the page description`);
    }
  }
}

// Article schema: authorship, publisher and breadcrumbs are the fields that
// turn a plain BlogPosting into something a search engine can attribute.
{
  for (const locale of ['zh', 'en']) {
    const route = `/${locale}/blog/vlm-in-browser-what-runs`;
    const source = html(route);
    if (!source) {
      errors.push(`missing exported post: ${route}`);
      continue;
    }
    for (const needle of [
      '"@type":"BlogPosting"',
      '"author"',
      '"publisher"',
      '"mainEntityOfPage"',
      '"isPartOf"',
      '"@type":"BreadcrumbList"',
    ]) {
      if (!source.includes(needle)) errors.push(`${route}: article schema lacks ${needle}`);
    }
    if (!/<meta property="og:type" content="article"/.test(source)) {
      errors.push(`${route}: og:type is not article`);
    }
    if (!/<meta property="article:published_time"/.test(source)) {
      errors.push(`${route}: article:published_time is missing`);
    }
  }
}

// Task pages are the site's main internal link surface. Posts should be
// discoverable from the tasks they discuss, not just from the blog index.
{
  let linked = 0;
  for (const file of fs.readdirSync(OUT, { recursive: true })) {
    const rel = String(file);
    if (!rel.endsWith('.html')) continue;
    const source = fs.readFileSync(path.join(OUT, rel), 'utf8');
    if (/name="robots" content="noindex/.test(source)) continue;
    if (/href="\/(?:zh|en)\/blog\/[a-z0-9.-]+"/.test(source)) linked++;
  }
  if (linked < 60) {
    errors.push(`only ${linked} indexable pages link to a blog post (expected at least 60)`);
  }
}

// /en is a meta-refresh shell for static hosts; it must not compete with /.
{
  const source = html('/en');
  if (source && !/name="robots" content="noindex/.test(source)) {
    errors.push('/en: redirect shell should be noindex');
  }
}

for (const route of ['404', '_not-found']) {
  const file = path.join(OUT, `${route}.html`);
  if (!fs.existsSync(file)) continue;
  if (!/<title>[^<]{5,}<\/title>/.test(fs.readFileSync(file, 'utf8'))) {
    errors.push(`${route}: title is missing`);
  }
}

if (errors.length) {
  console.error(`check-seo: ${errors.length} problem(s)`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`check-seo: ${expected.length} sitemap routes resolve, ${pages.length} key pages carry metadata and structured data, ${indexableCount} indexable pages have full snippets.`);
