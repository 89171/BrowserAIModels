import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { DemoPlayground } from '@/components/demo/DemoPlayground';
import { demoModels } from '@/lib/demo-catalog';
import { JsonLd } from '@/components/JsonLd';
import { localizedUrl } from '@/lib/urls';
import { SITE_URL } from '@/lib/site';

type Props = {
  locale: string;
  category: string;
  subcategory: string;
  model?: string;
};

/**
 * Shared body for /demos/:category/:subcategory and its /:model variant. The
 * only difference between the two routes is which entry the switcher starts on,
 * so the task chrome lives here once.
 */
export async function DemoTaskPage({ locale, category, subcategory, model }: Props) {
  const t = await getTranslations({ locale, namespace: 'demos' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const catName = tCats(category as 'text');
  const subName = tSubs(subcategory as 'classification');
  const taskUrl = localizedUrl(locale, `/demos/${category}/${subcategory}`);

  return (
    <>
      <DemoPlayground
        key={`${category}/${subcategory}/${locale}`}
        category={category}
        subcategory={subcategory}
        categoryName={catName}
        subcategoryName={subName}
        models={demoModels(category, subcategory)}
        initialModelId={model}
      />
      <div className="mx-auto w-full max-w-[1420px] px-4 pb-12 lg:px-8">
        <p className="border-t border-black/15 pt-4 text-sm">
          <Link href={`/${category}/${subcategory}`} className="underline">
            {t('taskCatalog')} →
          </Link>
        </p>
      </div>

      {/* The playground is a free, client-side application: say exactly that
          rather than claiming an AI product the page does not host. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebApplication',
              name: `${subName} · ${catName}`,
              url: taskUrl,
              applicationCategory: subName,
              operatingSystem: 'Web browser',
              browserRequirements: 'WebAssembly; WebGPU optional',
              isAccessibleForFree: true,
              inLanguage: locale,
              offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
              isPartOf: { '@id': `${SITE_URL}/#website` },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: tNav('home'), item: localizedUrl(locale) },
                { '@type': 'ListItem', position: 2, name: t('title'), item: localizedUrl(locale, '/demos') },
                { '@type': 'ListItem', position: 3, name: catName, item: `${SITE_URL}/${locale}/${category}` },
                { '@type': 'ListItem', position: 4, name: subName, item: taskUrl },
              ],
            },
          ],
        }}
      />
    </>
  );
}
