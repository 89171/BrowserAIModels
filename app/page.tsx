import { routing } from '@/i18n/routing';

// Static export cannot run middleware. A meta refresh works without JS and is
// suitable for ESA Pages static hosting (unlike next/navigation redirect).
export default function RootPage() {
  const href = `/${routing.defaultLocale}`;
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${href}`} />
        <link rel="canonical" href={href} />
        <title>{routing.defaultLocale}</title>
      </head>
      <body>
        <p>
          <a href={href}>Continue</a>
        </p>
      </body>
    </html>
  );
}
