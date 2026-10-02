'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { routing, type AppLocale } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('languages');

  function onChange(next: AppLocale) {
    if (next === locale) return;
    const segments = pathname.split('/');
    if (segments[1] && (routing.locales as readonly string[]).includes(segments[1])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const target = segments.join('/') || '/';
    startTransition(() => router.replace(target));
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="sr-only">Language</span>
      <select
        aria-label="Language switcher"
        className="bg-white text-black border border-black rounded-none px-2 py-1 focus:outline-none focus:ring-1 focus:ring-black"
        value={locale}
        onChange={(e) => onChange(e.target.value as AppLocale)}
        disabled={isPending}
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {t(l)}
          </option>
        ))}
      </select>
    </label>
  );
}
