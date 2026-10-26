import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { allDemoPaths, hasDemo } from '@/lib/data/registry';
import { demoModels } from '@/lib/demo-catalog';
import { DemoTaskPage } from '@/components/DemoTaskPage';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import { socialMetadata } from '@/lib/social';
import { modelKeywords } from '@/lib/seo';

type Params = { locale: string; category: string; subcategory: string; model: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allDemoPaths().flatMap(({ category, subcategory }) =>
      demoModels(category, subcategory).map((model) => ({
        locale,
        category,
        subcategory,
        model: model.id,
      })),
    ),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, category, subcategory, model } = await params;
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const fw = await getTranslations({ locale, namespace: 'frameworks' });
  const entry = demoModels(category, subcategory).find((m) => m.id === model);
  const name = tSubs(subcategory as 'classification');
  const catName = tCats(category as 'text');
  const description = tSubs(`${subcategory}Desc` as 'classificationDesc');
  // The page is the same playground with one entry preselected: canonicalise it
  // to the task page so the catalogue does not publish 300 near-duplicates.
  const canonical = localizedUrl(locale, `/demos/${category}/${subcategory}`);
  return {
    title: `${entry?.name ?? name} · ${name} · ${catName}`,
    description,
    ...(entry
      ? { keywords: modelKeywords(locale, entry.name, catName, name, entry, fw(entry.framework)) }
      : {}),
    alternates: {
      canonical,
      languages: languageAlternates(`/demos/${category}/${subcategory}`),
    },
    // The canonical already points at the task page; saying so explicitly keeps
    // the near-duplicates out of the index instead of relying on consolidation.
    robots: { index: false, follow: true },
    ...socialMetadata(locale, entry?.name ?? name, description, canonical),
  };
}

export default async function DemoModelPage({ params }: { params: Promise<Params> }) {
  const { locale, category, subcategory, model } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  if (!hasDemo(category, subcategory)) notFound();
  if (!demoModels(category, subcategory).some((m) => m.id === model)) notFound();
  return (
    <DemoTaskPage
      locale={locale}
      category={category}
      subcategory={subcategory}
      model={model}
    />
  );
}
