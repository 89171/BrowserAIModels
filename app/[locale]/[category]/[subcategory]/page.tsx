import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { TAXONOMY, getCategory, getSubcategory } from '@/data/taxonomy';
import { getModels } from '@/data/models';
import { JsonLd } from '@/components/JsonLd';
import { ModelTable } from '@/components/ModelTable';
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
  params: { locale, category, subcategory },
}: {
  params: { locale: string; category: string; subcategory: string };
}): Promise<Metadata> {
  const cat = getCategory(category);
  const sub = getSubcategory(category, subcategory);
  if (!cat || !sub) return {};
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubNS = await getTranslations({ locale, namespace: 'subcategory' });
  const name = tSubs(sub.slug as 'classification');
  const catName = tCats(cat.slug as 'text');
  const desc = tSubNS('description', { name });
  const path =
    locale === routing.defaultLocale
      ? `/${category}/${subcategory}`
      : `/${locale}/${category}/${subcategory}`;
  const url = `${SITE_URL}${path}`;
  return {
    title: `${name} · ${catName}`,
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/${category}/${subcategory}`,
        zh: `${SITE_URL}/zh/${category}/${subcategory}`,
      },
    },
    openGraph: {
      title: `${name} · ${catName}`,
      description: desc,
      url,
    },
  };
}

export default async function SubcategoryPage({
  params: { locale, category, subcategory },
}: {
  params: { locale: string; category: string; subcategory: string };
}) {
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

  return (
    <div className="space-y-10">
      <nav aria-label="Breadcrumb" className="text-xs font-mono">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="underline underline-offset-2 hover:opacity-60">
              Home
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
          {models.length} {models.length === 1 ? 'model' : 'models'}
        </p>
      </header>

      {models.length > 0 ? (
        <ModelTable models={models} />
      ) : (
        <p className="text-black/60 italic">{t('noModels')}</p>
      )}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name,
          description: t('description', { name }),
          url: `${SITE_URL}/${locale}/${cat.slug}/${sub.slug}`,
          numberOfItems: models.length,
          itemListElement: models.map((m, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: m.name,
            url:
              m.demoUrl ??
              m.docsUrl ??
              `${SITE_URL}/${locale}/${cat.slug}/${sub.slug}`,
          })),
        }}
      />
    </div>
  );
}
