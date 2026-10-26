import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { TAXONOMY } from '@/data/taxonomy';
import { hasDemo } from '@/lib/data/registry';
import { demoModels } from '@/lib/demo-catalog';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import { socialMetadata } from '@/lib/social';
import { demosKeywords } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'demos' });
  const url = localizedUrl(locale, '/demos');
  return {
    title: t('title'),
    description: t('intro'),
    keywords: demosKeywords(locale),
    alternates: { canonical: url, languages: languageAlternates('/demos') },
    ...socialMetadata(locale, t('title'), t('intro'), url),
  };
}

export default async function DemosIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'demos' });
  const tSeo = await getTranslations({ locale, namespace: 'seo.demos' });
  const tc = await getTranslations({ locale, namespace: 'seo.common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const pageUrl = localizedUrl(locale, '/demos');
  const faqs = [
    { q: tSeo('q1'), a: tSeo('a1') },
    { q: tSeo('q2'), a: tSeo('a2') },
    { q: tc('privacyQ'), a: tc('privacyA') },
  ];

  // Only tasks that actually ship a playground are listed; the catalogue keeps
  // the rest (audio/vad) and their pages stay catalogue-only.
  const sections = TAXONOMY.map((cat) => ({
    slug: cat.slug,
    name: tCats(cat.slug as 'text'),
    desc: tCats(`${cat.slug}Desc` as 'textDesc'),
    tasks: cat.subcategories
      .filter((sub) => hasDemo(cat.slug, sub.slug))
      .map((sub) => ({
        slug: sub.slug,
        name: tSubs(sub.slug as 'classification'),
        count: demoModels(cat.slug, sub.slug).length,
      })),
  })).filter((section) => section.tasks.length > 0);

  const totalDemos = sections.reduce((n, s) => n + s.tasks.length, 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <header className="border-b border-black pb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-black/60">
          ◼︎ {t('title')} · {totalDemos} {locale === 'zh' ? '页' : 'pages'}
        </p>
        <h1 className="h-display text-5xl md:text-6xl mt-3 leading-none">{t('title')}</h1>
        <p className="mt-4 text-lg max-w-prose">{t('intro')}</p>
        <p className="mt-3 text-sm text-black/60 font-mono">{t('notice')}</p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <section key={section.slug} className="border border-black p-5 flex flex-col">
            <h2 className="font-mono text-lg">
              <Link href={`/${section.slug}`} className="hover:opacity-60">{section.name}</Link>
            </h2>
            <p className="mt-1 text-xs text-black/60 leading-relaxed">{section.desc}</p>
            <ul className="mt-4 space-y-1.5 flex-1">
              {section.tasks.map((task) => (
                <li key={task.slug}>
                  <Link
                    href={`/demos/${section.slug}/${task.slug}`}
                    className="flex items-baseline gap-2 text-sm hover:opacity-60"
                  >
                    <span aria-hidden="true" className="font-mono text-xs">▸</span>
                    <span className="flex-1">{task.name}</span>
                    <span className="font-mono text-[11px] text-black/50">{task.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section aria-labelledby="demos-about" className="mt-12 border-t border-black pt-8 space-y-3">
        <h2 id="demos-about" className="font-mono text-2xl">{tSeo('extendedTitle')}</h2>
        <p className="max-w-prose leading-relaxed">{tSeo('extendedBody')}</p>
        <h3 className="font-mono text-lg pt-2">{tSeo('whyTitle')}</h3>
        <ul className="max-w-prose list-disc pl-5 space-y-2 text-sm leading-relaxed">
          {(['1', '2', '3'] as const).map((n) => (
            <li key={n}>{tSeo(`point${n}` as 'point1')}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="demos-faq" className="border-t border-black pt-8 space-y-4">
        <h2 id="demos-faq" className="font-mono text-2xl">{tSeo('faqTitle')}</h2>
        <dl className="space-y-5 max-w-prose">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-l-2 border-black pl-4">
              <dt className="font-semibold">{faq.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-black/70">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-10 text-sm">
        <Link href="/" className="underline">{t('catalogLink')} →</Link>
      </p>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': pageUrl,
              url: pageUrl,
              name: t('title'),
              description: t('intro'),
              inLanguage: locale,
              isPartOf: { '@id': `${SITE_URL}/#website` },
              hasPart: sections.flatMap((section) =>
                section.tasks.map((task) => ({
                  '@type': 'WebPage',
                  url: `${SITE_URL}/${locale}/demos/${section.slug}/${task.slug}`,
                  name: `${task.name} · ${section.name}`,
                })),
              ),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: tNav('home'), item: localizedUrl(locale) },
                { '@type': 'ListItem', position: 2, name: t('title'), item: pageUrl },
              ],
            },
            {
              '@type': 'FAQPage',
              '@id': `${pageUrl}#faq`,
              mainEntity: faqs.map((faq) => ({
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
