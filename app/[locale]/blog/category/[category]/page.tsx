import { HomeLink } from '@/components/HomeLink';
import { Link, routing } from '@/i18n/routing';
import { JsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { blogCategories, blogCategoryByKey, sortedPosts } from '@/lib/data/blog';
import { localizedPath } from '@/lib/paths';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import { socialMetadata } from '@/lib/social';
import { blogKeywords, blogCategoryDescription, compactTitle } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogCategories.map((category) => ({ locale, category: category.key })),
  );
}

type Props = { params: Promise<{ locale: string; category: string }> };

function postsInCategory(category: string) {
  return sortedPosts().filter((post) => post.category === category);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = blogCategoryByKey(category);
  if (!cat) return {};
  const lang = locale === 'zh' ? 'zh' : 'en';
  const t = await getTranslations({ locale, namespace: 'blog' });
  const label = cat.label[lang];
  const description = blogCategoryDescription(
    locale,
    cat.description[lang],
    postsInCategory(cat.key).length,
  );
  const pageTitle = `${label} · ${t('title')}`;
  const path = `/blog/category/${cat.key}`;
  const url = localizedUrl(locale, path);
  return {
    title: compactTitle(pageTitle, locale),
    description,
    keywords: [...blogKeywords(locale), label],
    alternates: { canonical: url, languages: languageAlternates(path) },
    ...socialMetadata(locale, pageTitle, description, url),
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale, category } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const cat = blogCategoryByKey(category);
  if (!cat) notFound();
  setRequestLocale(locale);

  const lang = locale === 'zh' ? 'zh' : 'en';
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const label = cat.label[lang];
  const description = blogCategoryDescription(
    locale,
    cat.description[lang],
    postsInCategory(cat.key).length,
  );
  const indexPath = localizedPath(locale, '/blog');
  const pageUrl = localizedUrl(locale, `/blog/category/${cat.key}`);
  const posts = postsInCategory(cat.key).map((post) => ({
    slug: post.slug,
    date: post.date,
    tags: post.tags,
    title: (post.i18n[lang] ?? post.i18n.en).title,
    description: (post.i18n[lang] ?? post.i18n.en).description,
    url: localizedUrl(locale, `/blog/${post.slug}`),
    href: localizedPath(locale, `/blog/${post.slug}`),
  }));

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
          <li>
            <Link href="/blog" className="underline underline-offset-2 hover:opacity-60">
              {t('title')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{label}</li>
        </ol>
      </nav>

      <header className="border-b border-black pb-10">
        <h1 className="h-display text-4xl md:text-6xl leading-none">{label}</h1>
        <p className="mt-6 text-lg max-w-prose">{cat.description[lang]}</p>
        <p className="mt-3 font-mono text-xs text-black/50">
          {String(posts.length) + t('countSuffix')}
        </p>
      </header>

      <section aria-label={label}>
        <ul className="divide-y divide-black/10 border-y border-black/10">
          {posts.map((post) => (
            <li key={post.slug} className="py-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="font-semibold text-lg">
                  <a href={post.href} className="underline-offset-2 hover:underline">
                    {post.title}
                  </a>
                </h2>
                <time dateTime={post.date} className="font-mono text-xs text-black/50">
                  {post.date}
                </time>
              </div>
              <p className="mt-2 text-sm leading-relaxed max-w-prose text-black/70">
                {post.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`${indexPath}#tag=${encodeURIComponent(tag)}`}
                    aria-label={t('filterByTagPrefix') + tag}
                    className="font-mono text-xs text-black/50 underline-offset-2 hover:text-black hover:underline"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="other-topics" className="border-t border-black pt-6">
        <h2 id="other-topics" className="font-mono text-xl">{t('otherTopics')}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {blogCategories.map((other) => (
            <li key={other.key}>
              <Link
                href={`/blog/category/${other.key}`}
                aria-current={other.key === cat.key ? 'page' : undefined}
                className={
                  other.key === cat.key
                    ? 'inline-block border border-black bg-black px-3 py-1.5 font-mono text-xs text-white'
                    : 'inline-block border border-black px-3 py-1.5 font-mono text-xs hover:bg-black/5'
                }
              >
                {other.label[lang]}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <Link href="/blog" className="underline underline-offset-2 hover:opacity-60">
            ← {t('backToBlog')}
          </Link>
        </p>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `${pageUrl}#collection`,
              name: label,
              description,
              url: pageUrl,
              inLanguage: locale,
              isPartOf: {
                '@type': 'Blog',
                '@id': `${localizedUrl(locale, '/blog')}#blog`,
                name: t('title'),
                url: localizedUrl(locale, '/blog'),
              },
            },
            {
              '@type': 'ItemList',
              '@id': `${pageUrl}#posts`,
              name: label,
              numberOfItems: posts.length,
              itemListElement: posts.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: post.title,
                url: post.url,
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
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: label,
                  item: pageUrl,
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
