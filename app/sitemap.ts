import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { TAXONOMY } from '@/data/taxonomy';
import { MODELS, getModels } from '@/data/models';
import type { ModelEntry } from '@/types/taxonomy';
import { localizedUrl, languageAlternates } from '@/lib/urls';

// Source review is the only dated change signal the catalog has. Pages whose entries
// carry no reviewed source get no lastmod rather than a build timestamp, which would
// claim every page changed on every deploy.
function lastReviewed(models: ModelEntry[]): string | undefined {
  return models
    .flatMap((m) => m.sources)
    .map((s) => s.reviewedAt)
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const everything = Object.values(MODELS).flatMap((groups) =>
    Object.values(groups).flat(),
  );

  const paths = [
    { path: '', lastModified: lastReviewed(everything) },
    { path: '/applications', lastModified: lastReviewed(everything) },
    ...TAXONOMY.flatMap((cat) => [
      {
        path: `/${cat.slug}`,
        lastModified: lastReviewed(
          cat.subcategories.flatMap((sub) => getModels(cat.slug, sub.slug)),
        ),
      },
      ...cat.subcategories.map((sub) => ({
        path: `/${cat.slug}/${sub.slug}`,
        lastModified: lastReviewed(getModels(cat.slug, sub.slug)),
      })),
    ]),
  ];

  // changefreq and priority are omitted: Google documents that it ignores both.
  return routing.locales.flatMap((locale) =>
    paths.map(({ path, lastModified }) => ({
      url: localizedUrl(locale, path),
      lastModified,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
