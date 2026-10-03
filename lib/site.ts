export const SITE_NAME = 'Web AI Models';
export const SITE_DEFAULT_OG = '/og.png';

// Every canonical, hreflang, sitemap and robots URL is built from this. A placeholder
// that survives into a production build points the whole site at a domain we do not
// own, so refuse to build instead of emitting one.
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (configured) return configured;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL is required for production builds. Set it to the public origin, e.g. https://example.com (see .env.example).',
    );
  }
  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();
