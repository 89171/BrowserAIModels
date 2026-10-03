import { socialMetadata } from '@/lib/social';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { TAXONOMY, getCategory } from '@/data/taxonomy';
import { countModels } from '@/data/models';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  const params: { locale: string; category: string }[] = [];
  for (const locale of routing.locales) {
    for (const cat of TAXONOMY) {
      params.push({ locale, category: cat.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const name = tCats(cat.slug as 'text');
  const desc = tCats(`${cat.slug}Desc` as 'textDesc');
  const url = localizedUrl(locale, `/${category}`);
  return {
    title: name,
    description: desc,
    alternates: {
      canonical: url,
      languages: languageAlternates(`/${category}`),
    },
    ...socialMetadata(locale, name, desc, url),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const catOpt = getCategory(category);
  if (!catOpt) notFound();
  const cat = catOpt!;

  const t = await getTranslations({ locale, namespace: 'category' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });

  const name = tCats(cat.slug as 'text');
  const desc = tCats(`${cat.slug}Desc` as 'textDesc');

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
          <li aria-current="page">{name}</li>
        </ol>
      </nav>

      <header className="border-b border-black pb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-black/60">
          {cat.slug}
        </p>
        <h1 className="h-display text-5xl md:text-6xl mt-3 leading-none">
          {name}
        </h1>
        <p className="mt-4 text-lg max-w-prose">{desc}</p>
      </header>

      <section aria-labelledby="subs">
        <h2 id="subs" className="font-mono text-2xl mb-4">
          {t('subcategories')}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cat.subcategories.map((s) => {
            const count = countModels(cat.slug, s.slug);
            return (
              <li key={s.slug}>
                <Link
                  href={`/${cat.slug}/${s.slug}`}
                  className="block border border-black p-6 bg-white h-full hover:bg-black hover:text-white transition-colors group"
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-black/60 group-hover:text-white/70">
                    {s.slug}
                  </div>
                  <div className="font-mono text-xl mt-2">
                    {tSubs(s.slug as 'classification')}
                  </div>
                  <div className="mt-4 text-xs font-mono text-black/60 group-hover:text-white/60">
                    {t('modelsCount', { count })} · {t('viewSubcategory')} →
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name,
              description: desc,
              url: `${SITE_URL}/${locale}/${cat.slug}`,
              hasPart: cat.subcategories.map((s) => ({
                '@type': 'WebPage',
                url: `${SITE_URL}/${locale}/${cat.slug}/${s.slug}`,
                name: tSubs(s.slug as 'classification'),
              })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: tNav('home'), item: `${SITE_URL}/${locale}` },
                { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}/${locale}/${cat.slug}` },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
