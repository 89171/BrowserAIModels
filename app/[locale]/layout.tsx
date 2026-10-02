import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import {
  SITE_NAME,
  SITE_DEFAULT_OG,
  SITE_TWITTER,
  SITE_URL,
} from '@/lib/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'site' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const path = locale === routing.defaultLocale ? '/' : `/${locale}`;
  const canonical = `${SITE_URL}${path}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] =
      l === routing.defaultLocale ? `${SITE_URL}/` : `${SITE_URL}/${l}`;
  }

  return {
    title: {
      default: `${t('name')} — ${t('tagline')}`,
      template: `%s · ${t('name')}`,
    },
    description: t('description'),
    applicationName: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: `${SITE_NAME} — ${t('tagline')}`,
      description: t('description'),
      url: canonical,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      images: [
        {
          url: SITE_DEFAULT_OG,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_TWITTER,
      creator: SITE_TWITTER,
      title: SITE_NAME,
      description: tHome('subtitle'),
      images: [SITE_DEFAULT_OG],
    },
    robots: { index: true, follow: true },
    icons: { icon: '/favicon.svg' },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const tSite = await getTranslations({ locale, namespace: 'site' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html lang={locale} className="bg-white text-black">
      <body className="min-h-screen flex flex-col antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
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
          <Footer siteName={tSite('name')} tagline={tSite('footer')} />
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
