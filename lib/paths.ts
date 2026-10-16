// Only the English homepage drops its locale prefix; all task URLs keep it.
export function localizedPath(locale: string, path = ''): string {
  if (locale === 'en' && (!path || path === '/')) return '/';
  return `/${locale}${path === '/' ? '' : path}`;
}
