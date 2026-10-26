import { getTranslations } from 'next-intl/server';
import { formatGib } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import type { ModelEntry } from '@/types/taxonomy';
import { JsonLd } from './JsonLd';

type Props = {
  locale: string;
  category: string;
  subcategory: string;
  entry: ModelEntry;
  /** Localised entry name, already resolved against the message catalogue. */
  name: string;
  pageUrl: string;
};

/**
 * Below-the-fold context for a single entry: what it would take to ship it, and
 * the three questions a developer actually asks before adding a dependency
 * (licence, download size, integration path). Every statement is read off the
 * entry, and gaps are stated as gaps.
 */
export async function ModelInsights({
  locale,
  category,
  subcategory,
  entry,
  name,
  pageUrl,
}: Props) {
  const t = await getTranslations({ locale, namespace: 'seo.model' });
  const tc = await getTranslations({ locale, namespace: 'seo.common' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const fw = await getTranslations({ locale, namespace: 'frameworks' });
  const lic = await getTranslations({ locale, namespace: 'licenses' });
  const c = await getTranslations({ locale, namespace: 'catalog' });

  const catName = tCats(category as 'text');
  const taskName = tSubs(subcategory as 'classification');
  const frameworkLabel = fw(entry.framework);

  const bytes = entry.variants
    .map((variant) => variant.downloadBytes)
    .filter((value): value is number => typeof value === 'number' && value > 0)
    .sort((a, b) => a - b)[0];
  // Unit included, because the copy reads it as a size.
  const size = formatGib(bytes);

  const evidence =
    entry.browserEvidence.status === 'tested'
      ? t('evidenceTested')
      : entry.browserEvidence.status === 'upstream-example'
        ? t('evidenceUpstream')
        : t('evidencePending');

  const code = entry.codeLicense ? lic(entry.codeLicense) : undefined;
  const weights = entry.weightLicense ? lic(entry.weightLicense) : undefined;

  const faqs = [
    {
      q: t('q1', { name }),
      a: code && weights ? t('a1', { license: `${code} / ${weights}` }) : t('a1Unknown'),
    },
    { q: t('q2', { name }), a: size ? t('a2', { size }) : t('a2Unknown') },
    { q: t('q3', { name }), a: t('a3', { framework: frameworkLabel }) },
    { q: tc('privacyQ'), a: tc('privacyA') },
  ];

  return (
    <>
      <section aria-labelledby="model-about" className="border-t border-black pt-8 space-y-4">
        <h2 id="model-about" className="font-mono text-2xl">
          {t('heading', { name })}
        </h2>
        <div className="text-base leading-relaxed space-y-4 max-w-prose">
          <p>
            {t('p1', {
              name,
              cat: catName,
              task: taskName,
              kind: c(entry.kind),
              framework: frameworkLabel,
              size: `${size ? t('sizeKnown', { size }) : t('sizeUnknown')} ${evidence}`,
            })}
          </p>
          <p>
            {t('p2', {
              license:
                code && weights
                  ? t('licenseKnown', { code, weights })
                  : t('licenseUnknown'),
            })}
          </p>
        </div>
      </section>

      <section aria-labelledby="model-faq" className="border-t border-black pt-8 space-y-4">
        <h2 id="model-faq" className="font-mono text-2xl">
          {t('faqTitle', { name })}
        </h2>
        <dl className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-l-2 border-black pl-4">
              <dt className="font-semibold">{faq.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-black/70">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'SoftwareApplication',
              '@id': `${pageUrl}#software`,
              name,
              description: `${name} — ${catName} / ${taskName}. Runs through ${frameworkLabel}.`,
              applicationCategory: taskName,
              applicationSubCategory: catName,
              operatingSystem: 'Web browser',
              browserRequirements: 'WebAssembly; WebGPU optional',
              url: pageUrl,
              inLanguage: locale,
              isAccessibleForFree: true,
              ...(size ? { fileSize: size } : {}),
              // `license` expects a licence document URL, and the catalogue stores
              // slugs, so the licence is stated in the visible copy instead of here.
              offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
              isPartOf: { '@id': `${SITE_URL}/#website` },
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
    </>
  );
}
