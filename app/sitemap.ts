import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { TAXONOMY } from '@/data/taxonomy';
import { MODELS, getModels } from '@/data/models';
import { allDemoPaths } from '@/lib/data/registry';
import { blogPosts } from '@/lib/data/blog';
import type { ModelEntry } from '@/types/taxonomy';
import { localizedUrl, languageAlternates } from '@/lib/urls';

export const dynamic = 'force-static';

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
    { path: '/methodology', lastModified: lastReviewed(everything) },
    // Demo pages have no per-entry review date; they carry no lastmod rather
    // than a build timestamp.
    { path: '/demos', lastModified: undefined },
    ...allDemoPaths().map(({ category, subcategory }) => ({
      path: `/demos/${category}/${subcategory}`,
      lastModified: undefined,
    })),
    // Blog: the post date is the real change signal.
    { path: '/blog', lastModified: blogPosts.map((p) => p.date).sort().at(-1) },
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: post.date,
    })),
    ...TAXONOMY.flatMap((cat) => [
      {
        path: `/${cat.slug}`,
        lastModified: lastReviewed(
          cat.subcategories.flatMap((sub) => getModels(cat.slug, sub.slug)),
        ),
      },
      ...cat.subcategories.flatMap((sub) => [
        {
          path: `/${cat.slug}/${sub.slug}`,
          lastModified: lastReviewed(getModels(cat.slug, sub.slug)),
        },
        ...getModels(cat.slug, sub.slug).map((model) => ({
          path: `/${cat.slug}/${sub.slug}/${model.id}`,
          lastModified: lastReviewed([model]),
        })),
      ]),
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
