import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { TAXONOMY } from '@/data/taxonomy';
import { countModels, totalModels } from '@/data/models';
import { JsonLd } from './JsonLd';
import { SITE_URL } from '@/lib/site';
import { localizedUrl } from '@/lib/urls';

export async function HomeContent({ locale }: { locale: string }) {
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const c = await getTranslations({ locale, namespace: 'catalog' });
  const tMethod = await getTranslations({ locale, namespace: 'methodology' });
  const tSeo = await getTranslations({ locale, namespace: 'seo.home' });

  const homeFaqs = [
    { q: tSeo('q1'), a: tSeo('a1') },
    { q: tSeo('q2'), a: tSeo('a2') },
    { q: tSeo('q3'), a: tSeo('a3') },
    { q: tSeo('q4'), a: tSeo('a4') },
  ];

  return (
    <div className="space-y-16">
      <header className="border-b border-black pb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-black/60">
          ◼︎ Catalog v1
        </p>
        <h1 className="h-display text-5xl md:text-7xl mt-3 leading-none">
          {t('title')}
        </h1>
        <p className="mt-3 text-sm text-black/60 font-mono">
          {t('modelsCount', { count: totalModels() })}
        </p>
      </header>

      <section aria-labelledby="about-catalog" className="space-y-4">
        <h2 id="about-catalog" className="font-mono text-2xl">{t('aboutTitle')}</h2>
        <div className="text-base leading-relaxed space-y-4">
          <p>{t('aboutLead')}</p>
          <p>{t('aboutBody')}</p>
        </div>
      </section>

      <section aria-labelledby="why-browser" className="space-y-6">
        <div className="space-y-3">
          <h2 id="why-browser" className="font-mono text-2xl">{tSeo('whyTitle')}</h2>
          <p className="max-w-prose leading-relaxed">{tSeo('whyLead')}</p>
        </div>
        <dl className="grid gap-6 md:grid-cols-3">
          {(['1', '2', '3'] as const).map((n) => (
            <div key={n} className="border-t-2 border-black pt-4">
              <dt className="font-semibold">{tSeo(`point${n}Title` as 'point1Title')}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-black/70">
                {tSeo(`point${n}` as 'point1')}
              </dd>
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


      <section aria-labelledby="how-to-use" className="space-y-4">
        <h2 id="how-to-use" className="font-mono text-2xl">{tSeo('howTitle')}</h2>
        <ol className="grid gap-4 md:grid-cols-3 list-none">
          {(['1', '2', '3'] as const).map((n) => (
            <li key={n} className="border-l-2 border-black pl-4 text-sm leading-relaxed">
              <span className="font-mono text-xs text-black/60">{n.padStart(2, '0')}</span>
              <p className="mt-1">{tSeo(`how${n}` as 'how1')}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="task-index" className="space-y-4">
        <h2 id="task-index" className="font-mono text-2xl">{tSeo('tasksTitle')}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TAXONOMY.map((cat) => (
            <div key={cat.slug}>
              <h3 className="font-mono text-sm uppercase tracking-widest text-black/60">
                <Link href={`/${cat.slug}`} className="hover:opacity-60">
                  {tCats(cat.slug as 'text')}
                </Link>
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                {cat.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link href={`/${cat.slug}/${sub.slug}`} className="hover:opacity-60">
                      {tSubs(sub.slug as 'classification')}
                      <span className="ml-2 font-mono text-[11px] text-black/50">
                        {countModels(cat.slug, sub.slug)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="home-faq" className="space-y-4">
        <h2 id="home-faq" className="font-mono text-2xl">{tSeo('faqTitle')}</h2>
        <dl className="space-y-5 max-w-prose">
          {homeFaqs.map((faq) => (
            <div key={faq.q} className="border-l-2 border-black pl-4">
              <dt className="font-semibold">{faq.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-black/70">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border border-black p-6 space-y-3" aria-labelledby="catalog-method">
        <h2 id="catalog-method" className="font-mono text-xl">{c('methodTitle')}</h2>
        <p className="text-sm leading-relaxed">{c('methodBody')}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/methodology" className="underline">{tMethod('title')} →</Link>
          <Link href="/applications" className="underline">{c('applicationLink')} →</Link>
        </div>
      </section>

      {/* The headings here are not questions, and Google stopped showing FAQ rich
          results on 2026-05-07, so this list is marked up as what it is. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ItemList',
              name: t('categoriesCount', { count: TAXONOMY.length }),
              itemListElement: TAXONOMY.map((cat, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: tCats(cat.slug as 'text'),
                url: `${SITE_URL}/${locale}/${cat.slug}`,
              })),
            },
            {
              '@type': 'FAQPage',
              '@id': `${localizedUrl(locale)}#faq`,
              mainEntity: homeFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            },
          ],
        }}
      />
    </div>
  );
}
