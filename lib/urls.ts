import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';

export function localizedUrl(locale: string, path = ''): string {
  return `${SITE_URL.replace(/\/$/, '')}/${locale}${path}`;
}

export function languageAlternates(path = ''): Record<string, string> {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
    ),
    // `/` negotiates by Accept-Language, so name the fallback instead of leaving
    // the choice of entry version to the crawler.
    'x-default': localizedUrl(routing.defaultLocale, path),
  };
}
