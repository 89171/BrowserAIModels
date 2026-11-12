import { HomeLink } from '@/components/HomeLink';
import { BlogBrowser, type BlogBrowserLabels } from '@/components/BlogBrowser';
import { JsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { blogCategories, sortedPosts } from '@/lib/data/blog';
import { localizedPath } from '@/lib/paths';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import { socialMetadata } from '@/lib/social';
import { blogKeywords } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const url = localizedUrl(locale, '/blog');
  return {
    title: t('title'),
    description: t('intro'),
    keywords: blogKeywords(locale),
    alternates: { canonical: url, languages: languageAlternates('/blog') },
    ...socialMetadata(locale, t('title'), t('intro'), url),
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const lang = locale as 'zh' | 'en';
  const posts = sortedPosts().map((post) => {
    const c = post.i18n[lang] ?? post.i18n.en;
    return {
      slug: post.slug,
      date: post.date,
      category: post.category,
      tags: post.tags,
      title: c.title,
      description: c.description,
      // Plain <a> in the client component avoids a next-intl context dependency.
      href: localizedPath(locale, `/blog/${post.slug}`),
    };
  });
  const categories = blogCategories.map((cat) => ({
    key: cat.key,
    label: cat.label[lang] ?? cat.label.en,
    description: cat.description[lang] ?? cat.description.en,
    href: localizedPath(locale, `/blog/category/${cat.key}`),
  }));
  const labels: BlogBrowserLabels = {
    all: t('allPosts'),
    browseByTopic: t('browseByTopic'),
    readMore: t('readMore'),
    clear: t('clearFilter'),
    countSuffix: t('countSuffix'),
    tagLabel: t('tagLabel'),
    categoryLabel: t('categoryLabel'),
    filterByTagPrefix: t('filterByTagPrefix'),
    filterByCategoryPrefix: t('filterByCategoryPrefix'),
    viewCategory: t('viewCategory'),
  };

  return (
    <div className="space-y-10">
      <nav aria-label={tNav('breadcrumb')} className="text-xs font-mono">
        <ol className="flex items-center gap-2">
          <li>
            <HomeLink locale={locale} className="underline underline-offset-2 hover:opacity-60">
              {tNav('home')}
            </HomeLink>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{t('title')}</li>
        </ol>
      </nav>

      <header className="border-b border-black pb-10">
        <h1 className="h-display text-4xl md:text-6xl leading-none">{t('title')}</h1>
        <p className="mt-6 text-lg max-w-prose">{t('intro')}</p>
      </header>

      <section aria-label={t('title')}>
        <BlogBrowser posts={posts} categories={categories} labels={labels} />
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Blog',
              name: t('title'),
              description: t('intro'),
              url: localizedUrl(locale, '/blog'),
              inLanguage: locale,
              publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                url: SITE_URL,
              },
              blogPost: posts.map((post) => ({
                '@type': 'BlogPosting',
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                url: localizedUrl(locale, `/blog/${post.slug}`),
                inLanguage: locale,
              })),
            },
            {
              '@type': 'ItemList',
              name: t('title'),
              numberOfItems: posts.length,
              itemListElement: posts.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: post.title,
                url: localizedUrl(locale, `/blog/${post.slug}`),
              })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: tNav('home'),
                  item: localizedUrl(locale),
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: t('title'),
                  item: localizedUrl(locale, '/blog'),
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
