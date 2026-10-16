import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';
import { Header } from './Header';
import { Footer } from './Footer';
import { JsonLd } from './JsonLd';

export async function SiteDocument({ children, locale }: { children: ReactNode; locale: string }) {
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const tSite = await getTranslations({ locale, namespace: 'site' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html lang={locale} className="bg-white text-black">
      <body className="min-h-screen flex flex-col antialiased">
        <NextIntlClientProvider locale={locale} messages={{ languages: messages.languages }}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:text-sm"
          >
            {tNav('skipToContent')}
          </a>
          <Header />
          <main id="main" className="flex-1 container-prose py-12">
            {children}
          </main>
          <Footer siteName={tSite('name')} tagline={tSite('footer')} notice={tSite('notice')} />
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: tSite('name'),
              url: SITE_URL,
              inLanguage: locale,
              description: tSite('description'),
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
