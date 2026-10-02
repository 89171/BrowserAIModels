import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { TAXONOMY } from '@/data/taxonomy';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const url =
      locale === routing.defaultLocale
        ? `${SITE_URL}/`
        : `${SITE_URL}/${locale}`;
    out.push({
      url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: { en: `${SITE_URL}/`, zh: `${SITE_URL}/zh` },
      },
    });
  }

  for (const locale of routing.locales) {
    for (const cat of TAXONOMY) {
      const catPath =
        locale === routing.defaultLocale
          ? `/${cat.slug}`
          : `/${locale}/${cat.slug}`;
      out.push({
        url: `${SITE_URL}${catPath}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `${SITE_URL}/${cat.slug}`,
            zh: `${SITE_URL}/zh/${cat.slug}`,
          },
        },
      });

      for (const sub of cat.subcategories) {
        const subPath =
          locale === routing.defaultLocale
            ? `/${cat.slug}/${sub.slug}`
            : `/${locale}/${cat.slug}/${sub.slug}`;
        out.push({
          url: `${SITE_URL}${subPath}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.6,
          alternates: {
            languages: {
              en: `${SITE_URL}/${cat.slug}/${sub.slug}`,
              zh: `${SITE_URL}/zh/${cat.slug}/${sub.slug}`,
            },
          },
        });
      }
    }
  }
  return out;
}
