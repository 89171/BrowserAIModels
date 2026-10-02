'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { ModelEntry } from '@/types/taxonomy';

function resolveDemoUrl(m: ModelEntry, locale: string): string | undefined {
  if (m.demoUrl) return m.demoUrl;
  if (m.demoBase && m.demoPath) {
    const path = m.demoPath.startsWith('/') ? m.demoPath : `/${m.demoPath}`;
    return `${m.demoBase}/${locale}${path}`;
  }
  return undefined;
}

function resolveString(
  t: ReturnType<typeof useTranslations<never>>,
  key: string | undefined,
  fallback: string,
): string {
  if (!key) return fallback;
  try {
    return t(key);
  } catch {
    return fallback;
  }
}

export function ModelTable({ models }: { models: ModelEntry[] }) {
  const t = useTranslations('table');
  const tAny = useTranslations();
  const tFw = useTranslations('frameworks');
  const tLic = useTranslations('licenses');
  const locale = useLocale();

  return (
    <section aria-labelledby="model-table-title">
      <h2
        id="model-table-title"
        className="font-mono text-2xl mb-4"
      >
        {t('title')}
      </h2>
      <div className="overflow-x-auto border border-black">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-black text-white text-left">
              <th className="font-mono px-3 py-2">{t('name')}</th>
              <th className="font-mono px-3 py-2">{t('framework')}</th>
              <th className="font-mono px-3 py-2">{t('size')}</th>
              <th className="font-mono px-3 py-2">{t('license')}</th>
              <th className="font-mono px-3 py-2">{t('languages')}</th>
              <th className="font-mono px-3 py-2 w-32 whitespace-nowrap">{t('links')}</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m, idx) => (
              <tr
                key={m.id}
                className={
                  idx % 2 === 0
                    ? 'bg-white border-t border-black/10'
                    : 'bg-black/[0.03] border-t border-black/10'
                }
              >
                <td className="px-3 py-3 align-top">
                  <div className="font-medium">
                    {resolveString(tAny, m.nameKey, m.name)}
                  </div>
                  <div className="text-black/60 mt-1 text-xs">
                    {resolveString(tAny, m.descriptionKey, m.description)}
                  </div>
                </td>
                <td className="px-3 py-3 align-top whitespace-nowrap">
                  {tFw(m.framework)}
                </td>
                <td className="px-3 py-3 align-top whitespace-nowrap font-mono">
                  {m.size}
                </td>
                <td className="px-3 py-3 align-top whitespace-nowrap font-mono">
                  {tLic(m.license)}
                </td>
                <td className="px-3 py-3 align-top">
                  <ul className="flex flex-wrap gap-1.5">
                    {m.languages.map((l) => (
                      <li
                        key={l}
                        className="border border-black px-1.5 py-0.5 text-xs font-mono"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-3 py-3 align-top w-32 whitespace-nowrap">
                  <div className="flex flex-col gap-1 text-xs">
                    {resolveDemoUrl(m, locale) && (
                      <a
                        href={resolveDemoUrl(m, locale)}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-2 hover:opacity-60"
                      >
                        {t('demo')} ↗
                      </a>
                    )}
                    {m.docsUrl && (
                      <a
                        href={m.docsUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-2 hover:opacity-60"
                      >
                        {t('docs')} ↗
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
