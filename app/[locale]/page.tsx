import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { TAXONOMY } from '@/data/taxonomy';
import { countModels, totalModels } from '@/data/models';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tSite = await getTranslations({ locale, namespace: 'site' });
  const path = locale === routing.defaultLocale ? '/' : `/${locale}`;
  const url = `${SITE_URL}${path}`;
  return {
    title: t('title'),
    description: tSite('description'),
    alternates: {
      canonical: url,
      languages: { en: `${SITE_URL}/`, zh: `${SITE_URL}/zh` },
    },
    openGraph: {
      title: t('title'),
      description: tSite('description'),
      url,
    },
  };
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const whatItems = t.raw('whatItems') as Array<{ title: string; body: string }>;

  return (
    <div className="space-y-16">
      <header className="border-b border-black pb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-black/60">
          ◼︎ Catalog v1
        </p>
        <h1 className="h-display text-5xl md:text-7xl mt-3 leading-none">
          {t('title')}
        </h1>
        <p className="mt-6 text-lg max-w-prose">{t('subtitle')}</p>
        <p className="mt-3 text-sm text-black/60 font-mono">
          {t('modelsCount', { count: totalModels() })}
        </p>
      </header>

      <section aria-labelledby="about" className="gap-8">
        <div className="text-base leading-relaxedß">
          <p>{t('aboutLead')}</p>
          <p>{t('aboutBody')}</p>
        </div>
      </section>

      <section aria-labelledby="cats">
        <h2 id="cats" className="font-mono text-2xl mb-6">
          {TAXONOMY.length} Categories
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-black divide-y divide-x divide-black/20">
          {TAXONOMY.map((cat, idx) => {
            const count = cat.subcategories.reduce(
              (s, x) => s + countModels(cat.slug, x.slug),
              0,
            );
            return (
              <li key={cat.slug} className="bg-white">
                <Link
                  href={`/${cat.slug}`}
                  className="block p-6 h-full hover:bg-black hover:text-white transition-colors group"
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-black/60 group-hover:text-white/70">
                    {cat.slug}
                  </div>
                  <div className="font-mono text-xl mt-2">
                    {tCats(cat.slug as 'text')}
                  </div>
                  <p className="mt-2 text-sm text-black/70 group-hover:text-white/80">
                    {tCats(`${cat.slug}Desc` as 'textDesc')}
                  </p>
                  <div className="mt-4 text-xs font-mono text-black/60 group-hover:text-white/60">
                    {cat.subcategories.length} subcategories / {count} models
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {cat.subcategories.map((s) => (
                      <li
                        key={s.slug}
                        className="border border-black/40 group-hover:border-white/40 px-1.5 py-0.5 text-[11px] font-mono"
                      >
                        {tSubs(s.slug as 'classification')}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: TAXONOMY.map((c, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: c.slug,
            url: `${SITE_URL}/${locale}/${c.slug}`,
          })),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: t('aboutTitle'),
              acceptedAnswer: {
                '@type': 'Answer',
                text: `${t('aboutLead')} ${t('aboutBody')}`,
              },
            },
            {
              '@type': 'Question',
              name: t('whatTitle'),
              acceptedAnswer: {
                '@type': 'Answer',
                text: whatItems.map((i) => `${i.title}: ${i.body}`).join(' '),
              },
            },
            {
              '@type': 'Question',
              name: t('howTitle'),
              acceptedAnswer: {
                '@type': 'Answer',
                text: t('howBody'),
              },
            },
          ],
        }}
      />
    </div>
  );
}
