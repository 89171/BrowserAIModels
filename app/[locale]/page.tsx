import { socialMetadata } from '@/lib/social';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { TAXONOMY } from '@/data/taxonomy';
import { countModels, totalModels } from '@/data/models';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const tSite = await getTranslations({ locale, namespace: 'site' });
  const url = localizedUrl(locale);
  return {
    title: t('title'),
    description: tSite('description'),
    alternates: {
      canonical: url,
      languages: languageAlternates(),
    },
    ...socialMetadata(locale, t('title'), tSite('description'), url),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const c = await getTranslations({ locale, namespace: 'catalog' });
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

      <section aria-label={t('aboutTitle')} className="gap-8">
        <div className="text-base leading-relaxed">
          <p>{t('aboutLead')}</p>
          <p>{t('aboutBody')}</p>
        </div>
      </section>

      <section className="border border-black p-6 space-y-3" aria-labelledby="catalog-method">
        <h2 id="catalog-method" className="font-mono text-xl">{c('methodTitle')}</h2>
        <p className="text-sm leading-relaxed">{c('methodBody')}</p>
        <Link href="/applications" className="inline-block underline">{c('applicationLink')} →</Link>
      </section>

      <section aria-labelledby="whats-inside">
        <h2 id="whats-inside" className="font-mono text-xl mb-3">{t('whatTitle')}</h2>
        <p className="text-sm leading-relaxed max-w-prose">{t('whatLead')}</p>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          {whatItems.map((item) => (
            <div key={item.title} className="border-l-2 border-black pl-4">
              <dt className="font-semibold">{item.title}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-black/70">{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="cats">
        <h2 id="cats" className="font-mono text-2xl mb-6">
          {t('categoriesCount', { count: TAXONOMY.length })}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TAXONOMY.map((cat) => {
            const count = cat.subcategories.reduce(
              (s, x) => s + countModels(cat.slug, x.slug),
              0,
            );
            return (
              <li key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  className="block border border-black p-6 h-full bg-white hover:bg-black hover:text-white transition-colors group"
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
                    {t('categoryCounts', { subcategories: cat.subcategories.length, models: count })}
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

      {/* The headings here are not questions, and Google stopped showing FAQ rich
          results on 2026-05-07, so this list is marked up as what it is. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: t('categoriesCount', { count: TAXONOMY.length }),
          itemListElement: TAXONOMY.map((cat, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: tCats(cat.slug as 'text'),
            url: `${SITE_URL}/${locale}/${cat.slug}`,
          })),
        }}
      />
    </div>
  );
}
