export function languageSwitchUrl(href: string, next: string, locales: readonly string[]): string {
  const url = new URL(href);
  if (!locales.includes(next)) return url.href;
  const segments = url.pathname.split('/');
  if (locales.includes(segments[1])) segments[1] = next;
  else segments.splice(1, 0, next);
  url.pathname = segments.join('/');
  return url.href;
}
