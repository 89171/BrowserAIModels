import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getCategory } from '@/data/taxonomy';
import type { ModelEntry } from '@/types/taxonomy';
import { formatGib, taskFacts } from '@/lib/seo';
import { JsonLd } from './JsonLd';

type Props = {
  locale: string;
  category: string;
  subcategory: string;
  models: ModelEntry[];
  /** Canonical URL of the task page, used by the FAQ structured data. */
  pageUrl: string;
};

/**
 * Long-form context under the model table. The copy is derived from the entries
 * themselves (how many, how verified, how heavy), so a page with three models
 * says something different from a page with twelve — and nothing is invented for
 * entries whose size or evidence is still unknown.
 */
export async function TaskInsights({ locale, category, subcategory, models, pageUrl }: Props) {
  const t = await getTranslations({ locale, namespace: 'seo.task' });
  const tc = await getTranslations({ locale, namespace: 'seo.common' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });
  const fw = await getTranslations({ locale, namespace: 'frameworks' });

  const name = tSubs(subcategory as 'classification');
  const catName = tCats(category as 'text');
  const facts = taskFacts(models);
  // Format with the unit attached: the copy interpolates it as a size, not a number.
  const size = formatGib(facts.smallestBytes);
  const frameworkLabel =
    facts.frameworks
      .slice(0, 2)
      .map((entry) => fw(entry.id))
      .join(locale === 'zh' ? '、' : ' and ') || '—';

  const faqs = [
    { q: t('q1', { name }), a: t('a1', { name, ready: facts.ready }) },
    {
      q: t('q2', { name }),
      a: size ? t('a2', { name, size }) : t('a2Unknown'),
    },
    { q: t('q3', { name }), a: t('a3', { name }) },
    { q: tc('privacyQ'), a: tc('privacyA') },
  ];

  // Name only the kinds that exist: "3 models, 0 tools, 0 applications" is a
  // template artefact, and it hides the one number the reader wants.
  const kinds = [
    facts.models > 0 ? t('kindModel', { count: facts.models }) : '',
    facts.tools > 0 ? t('kindTool', { count: facts.tools }) : '',
    facts.apps > 0 ? t('kindApp', { count: facts.apps }) : '',
  ]
    .filter(Boolean)
    .join(locale === 'zh' ? '、' : ', ');

  const evidenceSentence = (value: typeof facts): string => {
    if (value.ready === 0) return t('p1NoEvidence');
    if (value.tested > 0 && value.upstream > 0) {
      return t('p1EvidenceBoth', { ready: value.ready, tested: value.tested, upstream: value.upstream });
    }
    return value.tested > 0
      ? t('p1EvidenceTested', { ready: value.ready })
      : t('p1EvidenceUpstream', { ready: value.ready });
  };

  const siblings = (getCategory(category)?.subcategories ?? [])
    .filter((entry) => entry.slug !== subcategory)
    .slice(0, 6);

  return (
    <>
      <section aria-labelledby="task-about" className="border-t border-black pt-8 space-y-4">
        <h2 id="task-about" className="font-mono text-2xl">
          {t('heading', { name })}
        </h2>
        <div className="text-base leading-relaxed space-y-4 max-w-prose">
          <p>
            {facts.total > 0
              ? t('p1', { name, cat: catName, total: facts.total, kinds })
              : t('p1Empty', { name, cat: catName })}
          </p>
          {/* Only state the counts that are non-zero: "0 tested, 0 pending"
              reads like a template, not like an answer. */}
          <p>
            {evidenceSentence(facts)}
            {facts.pending > 0 && facts.ready > 0 ? ` ${t('p1Pending', { pending: facts.pending })}` : ''}
          </p>
          <p>{t('p2', { frameworks: frameworkLabel })}</p>
          <p>{t('p3')}</p>
        </div>

        <div className="pt-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-black/60">
            {t('factsTitle')}
          </h3>
          <dl className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4 text-sm">
            <div className="border-l-2 border-black pl-3">
              <dt className="text-black/60">{t('factEntries')}</dt>
              <dd className="font-mono mt-1">{t('factEntriesValue', { total: facts.total })}</dd>
            </div>
            <div className="border-l-2 border-black pl-3">
              <dt className="text-black/60">{t('factFrameworks')}</dt>
              <dd className="font-mono mt-1">{frameworkLabel}</dd>
            </div>
            <div className="border-l-2 border-black pl-3">
              <dt className="text-black/60">{t('factSize')}</dt>
              <dd className="font-mono mt-1">
                {size ? t('factSizeValue', { size }) : t('factSizeUnknown')}
              </dd>
            </div>
            <div className="border-l-2 border-black pl-3">
              <dt className="text-black/60">{t('factEvidence')}</dt>
              <dd className="font-mono mt-1">
                {t('factEvidenceValue', { ready: facts.ready, total: facts.total })}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="task-faq" className="border-t border-black pt-8 space-y-4">
        <h2 id="task-faq" className="font-mono text-2xl">
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

      {siblings.length > 0 && (
        <section className="border-t border-black pt-6">
          <h2 className="font-mono text-xl mb-3">{t('relatedTitle')}</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {siblings.map((sibling) => (
              <li key={sibling.slug}>
                <Link href={`/${category}/${sibling.slug}`} className="underline">
                  {tSubs(sibling.slug as 'classification')}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link href={`/${category}`} className="underline">
              {t('moreLink', { cat: catName })} →
            </Link>
          </p>
        </section>
      )}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        }}
      />
    </>
  );
}
