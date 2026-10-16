import type { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { SiteDocument } from '@/components/SiteDocument';
import { siteMetadata } from '@/lib/site-metadata';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return siteMetadata((await params).locale);
}

export default async function LocaleLayout({ children, params }: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <SiteDocument locale={(await params).locale}>{children}</SiteDocument>;
}
