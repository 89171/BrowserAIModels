const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, dependencies = {}) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(source, { exports, require: name => {
    assert(name in dependencies, `Unexpected import: ${name}`);
    return dependencies[name];
  } });
  return exports;
}

const paths = load('lib/paths.ts');
const { localizedUrl, languageAlternates } = load('lib/urls.ts', {
  '@/lib/paths': paths,
  '@/lib/site': { SITE_URL: 'https://example.com/' },
  '@/i18n/routing': { routing: { locales: ['en', 'zh'], defaultLocale: 'en' } },
});

test('canonical home URLs use root for English and a locale prefix for Chinese', () => {
  assert.equal(localizedUrl('en'), 'https://example.com/');
  assert.equal(localizedUrl('en', '/'), 'https://example.com/');
  assert.equal(localizedUrl('zh'), 'https://example.com/zh');
  const alternates = languageAlternates();
  assert.equal(alternates.en, 'https://example.com/');
  assert.equal(alternates.zh, 'https://example.com/zh');
  assert.equal(alternates['x-default'], 'https://example.com/');
});

test('canonical and alternate URLs preserve English prefixes for nested pages', () => {
  for (const path of ['/applications', '/audio/asr', '/audio/asr/whistle']) {
    assert.equal(localizedUrl('en', path), `https://example.com/en${path}`);
    assert.equal(localizedUrl('zh', path), `https://example.com/zh${path}`);
    assert.equal(languageAlternates(path)['x-default'], `https://example.com/en${path}`);
  }
});

const { blogPosts } = load('lib/data/blog.ts');

test('blog internal links store no locale, so the renderer can prefix the active one', () => {
  const hrefs = blogPosts.flatMap((post) =>
    Object.values(post.i18n)
      .flatMap((content) => content.blocks)
      .filter((block) => block.type === 'links')
      .flatMap((block) => block.items.map((item) => item.href)),
  );
  assert(hrefs.length > 0, 'expected blog posts to carry link blocks');
  for (const href of hrefs) {
    if (/^[a-z]+:\/\//i.test(href)) continue;
    assert(href.startsWith('/'), `${href} must be site-absolute`);
    assert(!/^\/(en|zh)(\/|$)/.test(href), `${href} must not hard-code a locale`);
    assert.equal(paths.localizedPath('zh', href), `/zh${href}`);
    assert.equal(paths.localizedPath('en', href), `/en${href}`);
  }
});
