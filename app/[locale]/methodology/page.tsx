import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';
import { socialMetadata } from '@/lib/social';
import { localizedUrl, languageAlternates } from '@/lib/urls';

type Props = { params: Promise<{ locale: string }> };
type Item = { title: string; body: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'methodology' });
  const url = localizedUrl(locale, '/methodology');
  return {
    title: t('title'),
    description: t('intro'),
    alternates: { canonical: url, languages: languageAlternates('/methodology') },
    ...socialMetadata(locale, t('title'), t('intro'), url),
  };
}

function Definitions({ items }: { items: Item[] }) {
  return (
    <dl className="mt-6 grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="border-l-2 border-black pl-4">
          <dt className="font-semibold">{item.title}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-black/70">{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function MethodologyPage({ params }: Props) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'methodology' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const c = await getTranslations({ locale, namespace: 'catalog' });
  const pageUrl = localizedUrl(locale, '/methodology');

  return (
    <div className="space-y-14">
      <nav aria-label={tNav('breadcrumb')} className="text-xs font-mono">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="underline underline-offset-2 hover:opacity-60">
              {tNav('home')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{t('title')}</li>
        </ol>
      </nav>

      <header className="border-b border-black pb-10">
        <h1 className="h-display text-4xl md:text-6xl leading-none">{t('title')}</h1>
        <p className="mt-6 text-lg max-w-prose">{t('intro')}</p>
      </header>

      <section aria-labelledby="evidence">
        <h2 id="evidence" className="font-mono text-2xl">{t('evidenceTitle')}</h2>
        <p className="mt-3 text-sm leading-relaxed max-w-prose">{t('evidenceLead')}</p>
        <Definitions items={t.raw('evidenceItems') as Item[]} />
      </section>

      <section aria-labelledby="fields">
        <h2 id="fields" className="font-mono text-2xl">{t('fieldsTitle')}</h2>
        <Definitions items={t.raw('fieldsItems') as Item[]} />
      </section>

      <section aria-labelledby="not-claimed" className="border border-black p-6">
        <h2 id="not-claimed" className="font-mono text-xl">{t('notClaimedTitle')}</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed list-disc pl-5">
          {(t.raw('notClaimedItems') as string[]).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="review">
        <h2 id="review" className="font-mono text-2xl">{t('reviewTitle')}</h2>
        <p className="mt-3 text-sm leading-relaxed max-w-prose">{t('reviewBody')}</p>
        <p className="mt-4 text-sm">
          <Link href="/applications" className="underline">{c('applicationLink')} →</Link>
        </p>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: tNav('home'), item: `${SITE_URL}/${locale}` },
            { '@type': 'ListItem', position: 2, name: t('title'), item: pageUrl },
          ],
        }}
      />
    </div>
  );
}
