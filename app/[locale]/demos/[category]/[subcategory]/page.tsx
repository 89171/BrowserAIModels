import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { allDemoPaths, hasDemo } from '@/lib/data/registry';
import { DemoTaskPage } from '@/components/DemoTaskPage';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import { socialMetadata } from '@/lib/social';
import { demoModels } from '@/lib/demo-catalog';
import { taskKeywords } from '@/lib/seo';

type Params = { locale: string; category: string; subcategory: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => allDemoPaths().map((path) => ({ locale, ...path })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, category, subcategory } = await params;
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const name = tSubs(subcategory as 'classification');
  const catName = tCats(category as 'text');
  const description = tSubs(`${subcategory}Desc` as 'classificationDesc');
  const url = localizedUrl(locale, `/demos/${category}/${subcategory}`);
  return {
    title: `${name} · ${catName}`,
    description,
    keywords: taskKeywords(locale, name, catName, demoModels(category, subcategory)),
    alternates: {
      canonical: url,
      languages: languageAlternates(`/demos/${category}/${subcategory}`),
    },
    ...socialMetadata(locale, `${name} · ${catName}`, description, url),
  };
}

export default async function DemoTasksPage({ params }: { params: Promise<Params> }) {
  const { locale, category, subcategory } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  if (!hasDemo(category, subcategory)) notFound();
  return <DemoTaskPage locale={locale} category={category} subcategory={subcategory} />;
}
