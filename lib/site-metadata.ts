import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import { socialMetadata } from '@/lib/social';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export async function siteMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'site' });
  const canonical = localizedUrl(locale);
  const languages = languageAlternates();

  return {
    title: {
      default: `${t('name')} — ${t('tagline')}`,
      template: `%s · ${t('name')}`,
    },
    description: t('description'),
    applicationName: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical, languages },
    ...socialMetadata(locale, `${SITE_NAME} — ${t('tagline')}`, t('description'), canonical),
    robots: { index: true, follow: true },
    icons: { icon: '/favicon.svg' },
  };
}

