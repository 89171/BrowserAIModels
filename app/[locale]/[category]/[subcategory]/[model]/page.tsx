import { socialMetadata } from '@/lib/social';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { TAXONOMY, getCategory, getSubcategory } from '@/data/taxonomy';
import { getModels } from '@/data/models';
import { APPLICATIONS } from '@/data/applications';
import { JsonLd } from '@/components/JsonLd';
import { ModelTable } from '@/components/ModelTable';
import { SITE_URL } from '@/lib/site';

type Params = { locale: string; category: string; subcategory: string; model: string };

export function generateStaticParams() {
  const params: Params[] = [];
  for (const locale of routing.locales) {
    for (const cat of TAXONOMY) {
      for (const sub of cat.subcategories) {
        for (const model of getModels(cat.slug, sub.slug)) {
          params.push({ locale, category: cat.slug, subcategory: sub.slug, model: model.id });
        }
      }
    }
  }
  return params;
}

function resolve({ category, subcategory, model }: Omit<Params, 'locale'>) {
  const cat = getCategory(category);
  const sub = getSubcategory(category, subcategory);
  const entry = getModels(category, subcategory).find((m) => m.id === model);
  return cat && sub && entry ? { cat, sub, entry } : undefined;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, ...rest } = await params;
  const found = resolve(rest);
  if (!found) return {};
  const { entry } = found;
  const any = await getTranslations({ locale });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const name = entry.nameKey && any.has(entry.nameKey) ? any(entry.nameKey) : entry.name;
  const description =
    entry.descriptionKey && any.has(entry.descriptionKey) ? any(entry.descriptionKey) : entry.description;
  const path = `/${rest.category}/${rest.subcategory}/${entry.id}`;
  const url = localizedUrl(locale, path);
  return {
    title: `${name} · ${tSubs(rest.subcategory as 'classification')}`,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    ...socialMetadata(locale, name, description, url),
  };
}

export default async function ModelPage({ params }: { params: Promise<Params> }) {
  const { locale, ...rest } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const found = resolve(rest);
  if (!found) notFound();
  const { cat, sub, entry } = found;

  const any = await getTranslations({ locale });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const tApps = await getTranslations({ locale, namespace: 'applications' });
  const c = await getTranslations({ locale, namespace: 'catalog' });
  const fw = await getTranslations({ locale, namespace: 'frameworks' });

  const name = entry.nameKey && any.has(entry.nameKey) ? any(entry.nameKey) : entry.name;
  const description =
    entry.descriptionKey && any.has(entry.descriptionKey) ? any(entry.descriptionKey) : entry.description;
  const catName = tCats(cat.slug as 'text');
  const subName = tSubs(sub.slug as 'classification');
  const basePath = `/${cat.slug}/${sub.slug}`;
  const pageUrl = `${SITE_URL}/${locale}${basePath}/${entry.id}`;
  const related = getModels(cat.slug, sub.slug).filter((m) => m.id !== entry.id);
  const apps = APPLICATIONS.filter((app) => (app.entries as readonly string[]).includes(entry.id));

  return (
    <div className="space-y-10">
      <nav aria-label={tNav('breadcrumb')} className="text-xs font-mono">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="underline underline-offset-2 hover:opacity-60">
              {tNav('home')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/${cat.slug}`} className="underline underline-offset-2 hover:opacity-60">
              {catName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={basePath} className="underline underline-offset-2 hover:opacity-60">
              {subName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>

      <header className="border-b border-black pb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-black/60">
          {fw(entry.framework)} · {c(entry.kind)}
        </p>
        <h1 className="h-display text-4xl md:text-6xl mt-3 leading-none">{name}</h1>
        <p className="mt-4 text-lg max-w-prose">{description}</p>
        <p className="mt-3 text-sm text-black/60 font-mono">{c(entry.browserEvidence.status)}</p>
      </header>

      {/* One row, details open: this page exists so a single entry has a URL,
          a canonical and its own metadata, not a new rendering of the same data. */}
      <ModelTable models={[entry]} locale={locale} expanded />

      {apps.length > 0 && (
        <section className="border-t border-black pt-6">
          <h2 className="font-mono text-xl mb-3">{tApps('title')}</h2>
          <ul className="flex flex-wrap gap-4">
            {apps.map((app) => (
              <li key={app.id}>
                <Link className="underline" href={`/applications#${app.id}`}>
                  {tApps(`items.${app.id}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-black pt-6">
          <h2 className="font-mono text-xl mb-3">{subName}</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {related.map((m) => (
              <li key={m.id}>
                <Link className="underline" href={`${basePath}/${m.id}`}>
                  {m.nameKey && any.has(m.nameKey) ? any(m.nameKey) : m.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: tNav('home'), item: `${SITE_URL}/${locale}` },
            { '@type': 'ListItem', position: 2, name: catName, item: `${SITE_URL}/${locale}/${cat.slug}` },
            { '@type': 'ListItem', position: 3, name: subName, item: `${SITE_URL}/${locale}${basePath}` },
            { '@type': 'ListItem', position: 4, name, item: pageUrl },
          ],
        }}
      />
    </div>
  );
}
