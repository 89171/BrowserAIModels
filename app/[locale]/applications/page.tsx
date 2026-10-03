import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { APPLICATIONS } from '@/data/applications';
import { MODELS } from '@/data/models';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';
import { socialMetadata } from '@/lib/social';
import { localizedUrl, languageAlternates } from '@/lib/urls';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'applications' });
  return {
    title: t('title'), description: t('intro'),
    alternates: { canonical: localizedUrl(locale, '/applications'), languages: languageAlternates('/applications') },
    ...socialMetadata(locale, t('title'), t('intro'), localizedUrl(locale, '/applications')),
  };
}

export default async function ApplicationsPage({ params }: Props) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'applications' });
  const subs = await getTranslations({ locale, namespace: 'subcategories' });
  const any = await getTranslations({ locale });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const pageUrl = localizedUrl(locale, '/applications');
  const entries = Object.entries(MODELS).flatMap(([cat, groups]) => Object.entries(groups).flatMap(([sub, list]) => list.map(model => ({ model, path: `/${cat}/${sub}#model-${model.id}` }))));
  return (
    <div className="space-y-12">
      <header className="border-b border-black pb-8"><h1 className="h-display text-4xl md:text-6xl">{t('title')}</h1><p className="mt-4 max-w-prose">{t('intro')}</p></header>
      <nav className="flex flex-wrap gap-4" aria-label={t('title')}>{APPLICATIONS.map(app => <a key={app.id} className="underline" href={`#${app.id}`}>{t(`items.${app.id}.title`)}</a>)}</nav>
      {APPLICATIONS.map(app => <article key={app.id} id={app.id} className="border border-black p-5 md:p-8 scroll-mt-6">
        <h2 className="font-mono text-2xl mb-6">{t(`items.${app.id}.title`)}</h2>
        <dl className="grid md:grid-cols-2 gap-6">{(['input', 'pipeline', 'output', 'limits', 'example', 'checks'] as const).map(field => <div key={field}><dt className="font-semibold mb-2">{t(field)}</dt><dd className="text-sm leading-relaxed">{t(`items.${app.id}.${field}`)}</dd></div>)}</dl>
        <h3 className="font-semibold mt-6 mb-2">{t('candidates')}</h3>
        <ul className="flex flex-wrap gap-4 text-sm">{app.entries.map(id => { const entry = entries.find(e => e.model.id === id); return entry ? <li key={id}><Link href={entry.path} className="underline">{entry.model.nameKey ? any(entry.model.nameKey) : entry.model.name}</Link></li> : null; })}</ul>
        <h3 className="font-semibold mt-6 mb-2">{t('tasks')}</h3>
        <ul className="flex flex-wrap gap-4 text-sm">{app.tasks.map(path => <li key={path}><Link href={`/${path}`} className="underline">{subs(path.split('/')[1])}</Link></li>)}</ul>
        <p className="mt-6 text-xs"><a className="underline" href={app.source} target="_blank" rel="noreferrer noopener">{t('source')} ↗</a></p>
      </article>)}

      {/* No Article/HowTo markup: these guides carry no author or publication date,
          and Google no longer shows HowTo rich results either. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ItemList',
              name: t('title'),
              description: t('intro'),
              url: pageUrl,
              numberOfItems: APPLICATIONS.length,
              itemListElement: APPLICATIONS.map((app, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: t(`items.${app.id}.title`),
                url: `${pageUrl}#${app.id}`,
              })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: tNav('home'), item: `${SITE_URL}/${locale}` },
                { '@type': 'ListItem', position: 2, name: t('title'), item: pageUrl },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
