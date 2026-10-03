import { socialMetadata } from '@/lib/social';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { TAXONOMY, getCategory, getSubcategory } from '@/data/taxonomy';
import { getModels } from '@/data/models';
import { JsonLd } from '@/components/JsonLd';
import { ModelTable } from '@/components/ModelTable';
import { APPLICATIONS } from '@/data/applications';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  const params: {
    locale: string;
    category: string;
    subcategory: string;
  }[] = [];
  for (const locale of routing.locales) {
    for (const cat of TAXONOMY) {
      for (const sub of cat.subcategories) {
        params.push({ locale, category: cat.slug, subcategory: sub.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { locale, category, subcategory } = await params;
  const cat = getCategory(category);
  const sub = getSubcategory(category, subcategory);
  if (!cat || !sub) return {};
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubNS = await getTranslations({ locale, namespace: 'subcategory' });
  const name = tSubs(sub.slug as 'classification');
  const catName = tCats(cat.slug as 'text');
  const desc = tSubNS('description', { name });
  const url = localizedUrl(locale, `/${category}/${subcategory}`);
  return {
    title: `${name} · ${catName}`,
    description: desc,
    alternates: {
      canonical: url,
      languages: languageAlternates(`/${category}/${subcategory}`),
    },
    ...socialMetadata(locale, `${name} · ${catName}`, desc, url),
  };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; subcategory: string }>;
}) {
  const { locale, category, subcategory } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const catOpt = getCategory(category);
  const subOpt = getSubcategory(category, subcategory);
  if (!catOpt || !subOpt) notFound();
  const cat = catOpt!;
  const sub = subOpt!;

  const t = await getTranslations({ locale, namespace: 'subcategory' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });

  const name = tSubs(sub.slug as 'classification');
  const catName = tCats(cat.slug as 'text');
  const models = getModels(cat.slug, sub.slug);
  const tApps = await getTranslations({ locale, namespace: 'applications' });
  const related = APPLICATIONS.filter(app => (app.tasks as readonly string[]).includes(`${cat.slug}/${sub.slug}`));
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tAny = await getTranslations({ locale });
  const pageUrl = `${SITE_URL}/${locale}/${cat.slug}/${sub.slug}`;

  return (
    <div className="space-y-10">
      <nav aria-label={tNav('breadcrumb')} className="text-xs font-mono">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="underline underline-offset-2 hover:opacity-60">
              {tNav('home')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/${cat.slug}`}
              className="underline underline-offset-2 hover:opacity-60"
            >
              {catName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>

      <header className="border-b border-black pb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-black/60">
          {cat.slug} / {sub.slug}
        </p>
        <h1 className="h-display text-5xl md:text-6xl mt-3 leading-none">
          {name}
        </h1>
        <p className="mt-4 text-lg max-w-prose">
          {t('description', { name })}
        </p>
        <p className="mt-3 text-sm text-black/60 font-mono">
          {t('modelsCount', { count: models.length })}
        </p>
      </header>

      {models.length > 0 ? (
        <ModelTable models={models} locale={locale} />
      ) : (
        <p className="text-black/60 italic">{t('noModels')}</p>
      )}

      {related.length > 0 && <section className="border-t border-black pt-6">
        <h2 className="font-mono text-xl mb-3">{tApps('title')}</h2>
        <ul className="flex flex-wrap gap-4">{related.map(app => <li key={app.id}><Link className="underline" href={`/applications#${app.id}`}>{tApps(`items.${app.id}.title`)}</Link></li>)}</ul>
      </section>}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ItemList',
              name,
              description: t('description', { name }),
              url: pageUrl,
              numberOfItems: models.length,
              // Point at the row on this page, not at the vendor's site: the list
              // lives here, and the names must match what the table renders.
              itemListElement: models.map((m, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: m.nameKey && tAny.has(m.nameKey) ? tAny(m.nameKey) : m.name,
                url: `${pageUrl}#model-${m.id}`,
              })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: tNav('home'), item: `${SITE_URL}/${locale}` },
                { '@type': 'ListItem', position: 2, name: catName, item: `${SITE_URL}/${locale}/${cat.slug}` },
                { '@type': 'ListItem', position: 3, name, item: pageUrl },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
