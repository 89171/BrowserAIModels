import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import { socialMetadata } from '@/lib/social';
import { homeKeywords } from '@/lib/seo';

export async function homeMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tSite = await getTranslations({ locale, namespace: 'site' });
  const url = localizedUrl(locale);
  return {
    title: t('title'),
    description: tSite('description'),
    keywords: homeKeywords(locale),
    alternates: {
      canonical: url,
      languages: languageAlternates(),
    },
    ...socialMetadata(locale, t('title'), tSite('description'), url),
  };
}

