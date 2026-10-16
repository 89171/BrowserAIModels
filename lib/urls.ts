import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';
import { localizedPath } from '@/lib/paths';

export function localizedUrl(locale: string, path = ''): string {
  return `${SITE_URL.replace(/\/$/, '')}${localizedPath(locale, path)}`;
}

export function languageAlternates(path = ''): Record<string, string> {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
    ),
    // English is the fixed fallback; only its homepage is served at `/`.
    'x-default': localizedUrl(routing.defaultLocale, path),
  };
}
