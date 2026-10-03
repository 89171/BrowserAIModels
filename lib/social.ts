import type { Metadata } from 'next';
import { SITE_DEFAULT_OG, SITE_NAME } from '@/lib/site';

export function socialMetadata(
  locale: string,
  title: string,
  description: string,
  url: string,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      title,
      description,
      url,
      images: [{ url: SITE_DEFAULT_OG, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      // No site/creator handle: @webaimodels does not exist.
      card: 'summary_large_image',
      title,
      description,
      images: [SITE_DEFAULT_OG],
    },
  };
}
