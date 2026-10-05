import { Fragment } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { resolveDemoUrl } from '@/lib/catalog';
import type { ModelEntry } from '@/types/taxonomy';

type Props = {
  models: ModelEntry[];
  locale: string;
  /** Set on a list page: each row links to the entry's own page. */
  basePath?: string;
  /** Set on an entry's own page, where the details are the point of the page. */
  expanded?: boolean;
};

export async function ModelTable({ models, locale, basePath, expanded }: Props) {
  const t = await getTranslations({ locale, namespace: 'table' });
  const c = await getTranslations({ locale, namespace: 'catalog' });
  const any = await getTranslations({ locale });
  const fw = await getTranslations({ locale, namespace: 'frameworks' });
  const lic = await getTranslations({ locale, namespace: 'licenses' });
  const tasks = await getTranslations({ locale, namespace: 'subcategories' });
  const resolve = (key: string | undefined, fallback: string) => key && any.has(key) ? any(key) : fallback;
  const unknown = c('unknown');

  return (
    <section aria-labelledby="model-table-title" className="space-y-4">
      <h2 id="model-table-title" className="font-mono text-2xl">{t('title')}</h2>
      <p className="text-sm text-black/70">{c('methodBody')}</p>
      <div className="overflow-x-auto border border-black">
        <table className="w-full text-sm border-collapse">
          <caption className="sr-only">{t('title')}</caption>
          <thead className="bg-black text-white text-left">
            <tr>{[t('name'), c('kind'), t('framework'), t('size'), t('license'), c('evidence'), t('links')].map(label => <th key={label} scope="col" className="px-3 py-2 font-mono whitespace-nowrap">{label}</th>)}</tr>
          </thead>
          <tbody>
            {models.map(m => {
              const demo = resolveDemoUrl(m, locale);
              return (
                <Fragment key={m.id}>
                  <tr id={`model-${m.id}`} className="border-t border-black/20 scroll-mt-4">
                    <th scope="row" className="px-3 py-3 align-top text-left font-normal min-w-56">
                      <p className="font-semibold">
                        {basePath ? (
                          <Link href={`${basePath}/${m.id}`} className="underline underline-offset-2 hover:opacity-60">
                            {resolve(m.nameKey, m.name)}
                          </Link>
                        ) : (
                          resolve(m.nameKey, m.name)
                        )}
                      </p>
                      <p className="text-xs text-black/70 mt-2">{resolve(m.descriptionKey, m.description)}</p>
                      {m.identityUnresolved ? <p className="text-xs mt-2 font-semibold">{c('identityWarning')}</p> : !m.sources.some(s => s.reviewedAt) && <p className="text-xs mt-2 italic">{c('legacyWarning')}</p>}
                      <p className="text-xs mt-2">{c('tasks')}: {m.tasks.map(task => tasks(task)).join(' · ')}</p>
                    </th>
                    <td className="px-3 py-3 align-top whitespace-nowrap">{c(m.kind)}</td>
                    <td className="px-3 py-3 align-top min-w-36">{fw(m.framework)}</td>
                    <td className="px-3 py-3 align-top min-w-40 text-xs">
                      {m.variants.length ? m.variants.map(v => <p key={v.id} className="mb-2">{v.label === 'default' ? c('download') : v.label}: {v.downloadBytes != null ? `${(v.downloadBytes / 1048576).toFixed(1)} MiB` : v.reportedDownloadSize ? c('reportedSize', { size: v.reportedDownloadSize }) : unknown}</p>) : <p>{c('noWeights')}</p>}
                    </td>
                    <td className="px-3 py-3 align-top min-w-36 text-xs">
                      <p>{c('codeLicense')}: {m.codeLicense ? lic(m.codeLicense) : unknown}</p>
                      <p className="mt-2">{c('weightLicense')}: {m.weightLicense ? lic(m.weightLicense) : unknown}</p>
                    </td>
                    <td className="px-3 py-3 align-top min-w-44">
                      <p className="font-medium">{c(m.browserEvidence.status)}</p>
                      {m.browserEvidence.url && <a href={m.browserEvidence.url} target="_blank" rel="noreferrer noopener" className="underline text-xs">{c('source')} ↗</a>}
                      <p className="mt-2 text-xs text-black/60">{c('reviewNotice')}</p>
                    </td>
                    <td className="px-3 py-3 align-top whitespace-nowrap">
                      <div className="flex flex-col gap-2">
                        {demo && <a href={demo} target="_blank" rel="noreferrer noopener" className="underline">{t('demo')} ↗</a>}
                        {m.docsUrl && <a href={m.docsUrl} target="_blank" rel="noreferrer noopener" className="underline">{t('docs')} ↗</a>}
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-black/[0.025]">
                    <td colSpan={7} className="px-3 pb-4">
                      <details open={expanded}>
                        <summary className="cursor-pointer py-2 font-mono underline underline-offset-4">{c('details')}</summary>
                        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 my-4">
                          {[
                            [c('modelId'), m.modelId || unknown],
                            [c('naturalLanguages'), m.naturalLanguages.join(', ') || c('none')],
                            [c('programmingLanguages'), m.programmingLanguages.join(', ') || c('none')],
                            [c('capabilities'), m.capabilities.join(', ') || c('none')],
                            [c('package'), m.npmPackage || unknown],
                            [c('runtimeVersion'), m.runtimeVersion || unknown],
                            [c('backend'), m.backends?.join(', ') || unknown],
                            [c('codeLicense'), m.codeLicense ? lic(m.codeLicense) : unknown],
                            [c('weightLicense'), m.weightLicense ? lic(m.weightLicense) : unknown],
                            ...(m.reportedLicense ? [[c('reportedLicense'), lic(m.reportedLicense)]] : []),
                          ].map(([label, value]) => <div key={label}><dt className="text-xs text-black/60">{label}</dt><dd className="mt-1 break-words">{value}</dd></div>)}
                        </dl>
                        <h3 className="font-mono mt-5 mb-3">{c('variants')}</h3>
                        {m.variants.length ? <div className="grid gap-4 md:grid-cols-2">{m.variants.map(v => <dl key={v.id} className="border border-black/20 p-3 space-y-2">
                          <dt className="font-semibold">{v.label === 'default' ? c('default') : v.label}</dt>
                          <dd>{c('download')}: {v.downloadBytes != null ? `${(v.downloadBytes / 1048576).toFixed(1)} MiB` : v.reportedDownloadSize ? c('reportedSize', { size: v.reportedDownloadSize }) : unknown}</dd>
                          <dd>{c('memory')}: {v.peakMemoryMB != null ? `${v.peakMemoryMB} MB` : c('notTested')}</dd>
                          <dd>{c('precision')}: {v.quantization || unknown}</dd>
                          <dd>{c('revision')}: {v.revision || unknown}</dd>
                          {v.demoPath && <dd><a href={resolveDemoUrl({ ...m, ...v }, locale)} target="_blank" rel="noreferrer noopener" className="underline">{t('demo')} ↗</a></dd>}
                          {v.artifactUrl && <dd><a href={v.artifactUrl} target="_blank" rel="noreferrer noopener" className="underline">{c('artifact')} ↗</a></dd>}
                        </dl>)}</div> : <p>{c('noWeights')}</p>}
                        <h3 className="font-mono mt-5 mb-2">{c('benchmarks')}</h3>
                        <p className="text-xs text-black/60">{c('benchmarkHelp')}</p>
                        {m.benchmarks?.length ? <ul className="mt-2 space-y-2">{m.benchmarks.map((b, i) => <li key={i}><a className="underline" href={b.sourceUrl} target="_blank" rel="noreferrer noopener">{b.metric}: {b.value} {b.unit}</a><p>{b.date} · {b.hardware} · {b.os} · {b.browser} · {b.backend} · {b.runtimeVersion} · {b.variantId} · {b.input}</p></li>)}</ul> : <p className="mt-2">{c('notTested')}</p>}
                        <ul className="mt-5 space-y-2 text-xs">{m.sources.map((s, i) => <li key={`${s.url}-${i}`}>
                          <a href={s.url} target="_blank" rel="noreferrer noopener" className="underline break-all">{c('source')}: {s.url}</a>
                          <span className="block text-black/60">{s.reviewedAt ? c('reviewedAt', { date: s.reviewedAt }) : unknown}</span>
                        </li>)}</ul>
                      </details>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
