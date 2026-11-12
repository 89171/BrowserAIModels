import { HomeLink } from '@/components/HomeLink';
import { JsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import {
  blogPosts,
  findPost,
  relatedPosts,
  blogCategoryByKey,
  type BlogBlock,
} from '@/lib/data/blog';
import { localizedPath } from '@/lib/paths';
import { localizedUrl, languageAlternates } from '@/lib/urls';
import { socialMetadata } from '@/lib/social';
import { SITE_NAME, SITE_URL, SITE_DEFAULT_OG } from '@/lib/site';
import { compactTitle } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  const lang = locale as 'zh' | 'en';
  const c = post.i18n[lang] ?? post.i18n.en;
  const url = localizedUrl(locale, `/blog/${slug}`);
  const category = blogCategoryByKey(post.category);
  const social = socialMetadata(locale, c.title, c.description, url);
  return {
    // Keep the long, specific headline in the h1 and the social card; only the
    // result-page title is shortened so the site name still fits.
    title: compactTitle(c.title, locale),
    description: c.description,
    keywords: post.tags,
    alternates: { canonical: url, languages: languageAlternates(`/blog/${slug}`) },
    ...social,
    openGraph: {
      ...social.openGraph,
      type: 'article',
      publishedTime: post.date,
      authors: [SITE_NAME],
      ...(category ? { section: category.label[lang] ?? category.label.en } : {}),
    },
  };
}

/**
 * Minimal inline formatting: `code` spans and **bold**. Everything else renders
 * as plain text — this is a catalog, not a CMS.
 */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="font-mono text-[0.9em] bg-black/5 px-1 py-0.5 rounded">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/**
 * Blog bodies store internal links without a locale prefix so the same block
 * can be shared by both languages; the renderer adds the active locale here.
 */
const isExternal = (href: string) => /^[a-z]+:\/\//i.test(href) || href.startsWith('//');

function Block({ block, locale }: { block: BlogBlock; locale: string }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="font-mono text-2xl pt-4">{block.text}</h2>;
    case 'p':
      return (
        <p className="text-sm leading-relaxed max-w-prose">
          <Inline text={block.text} />
        </p>
      );
    case 'ul':
      return (
        <ul className="space-y-2 text-sm leading-relaxed max-w-prose list-disc pl-5">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <figure className="max-w-prose">
          {block.label && (
            <figcaption className="font-mono text-xs text-black/50 mb-1">{block.label}</figcaption>
          )}
          <pre className="overflow-x-auto border border-black p-4 text-xs leading-relaxed font-mono">
            <code>{block.text}</code>
          </pre>
        </figure>
      );
    case 'table':
      return (
        <figure className="max-w-prose overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h} className="border-b border-black text-left py-2 pr-6 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, j) => (
                    <td key={j} className="border-b border-black/10 py-2 pr-6 font-mono text-xs">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <figcaption className="mt-2 font-mono text-xs text-black/50">{block.caption}</figcaption>
          )}
        </figure>
      );
    case 'links':
      return (
        <ul className="space-y-1.5 text-sm">
          {block.items.map((item) => {
            const external = isExternal(item.href);
            return (
              <li key={item.href}>
                <a
                  href={external ? item.href : localizedPath(locale, item.href)}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="underline underline-offset-2 hover:opacity-60"
                >
                  {item.label}
                  {external ? ' ↗' : ''}
                </a>
              </li>
            );
          })}
        </ul>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const post = findPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const lang = locale as 'zh' | 'en';
  const c = post.i18n[lang] ?? post.i18n.en;
  const pageUrl = localizedUrl(locale, `/blog/${slug}`);
  const blogIndexPath = localizedPath(locale, '/blog');
  const category = blogCategoryByKey(post.category);
  const categoryPath = `/blog/category/${post.category}`;
  const categoryLabel = category ? (category.label[lang] ?? category.label.en) : undefined;
  const related = relatedPosts(slug);

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
          {categoryLabel && (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={categoryPath} className="underline underline-offset-2 hover:opacity-60">
                  {categoryLabel}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="truncate max-w-[16rem]">{c.title}</li>
        </ol>
      </nav>

      <article className="space-y-6">
        <header className="border-b border-black pb-8">
          <h1 className="h-display text-3xl md:text-5xl leading-tight max-w-prose">{c.title}</h1>
          <p className="mt-4 text-sm text-black/60 max-w-prose">{c.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-black/50">
            <time dateTime={post.date}>{post.date}</time>
            {categoryLabel && (
              <a
                href={localizedPath(locale, categoryPath)}
                className="border border-black/30 px-1.5 py-0.5 text-black/70 hover:bg-black hover:text-white"
              >
                {categoryLabel}
              </a>
            )}
            {post.tags.map((tag) => (
              <a
                key={tag}
                href={`${blogIndexPath}#tag=${encodeURIComponent(tag)}`}
                className="underline-offset-2 hover:text-black hover:underline"
              >
                #{tag}
              </a>
            ))}
          </div>
        </header>

        {c.blocks.map((block, i) => (
          <Block key={i} block={block} locale={locale} />
        ))}
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-posts" className="space-y-4 border-t border-black pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="related-posts" className="font-mono text-2xl">{t('relatedTitle')}</h2>
            <Link href="/blog" className="text-sm underline underline-offset-2 hover:opacity-60">
              {t('relatedAll')} →
            </Link>
          </div>
          <ul className="divide-y divide-black/10 border-y border-black/10">
            {related.map((item) => {
              const rc = item.i18n[lang] ?? item.i18n.en;
              const rcCategory = blogCategoryByKey(item.category);
              return (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group block py-4 hover:opacity-70"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-semibold">{rc.title}</h3>
                      <time dateTime={item.date} className="font-mono text-xs text-black/50">
                        {item.date}
                      </time>
                    </div>
                    <p className="mt-1 text-sm text-black/70 max-w-prose">{rc.description}</p>
                    {rcCategory && (
                      <p className="mt-1.5 font-mono text-xs text-black/45">
                        {rcCategory.label[lang] ?? rcCategory.label.en}
                      </p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <p className="border-t border-black/10 pt-6 text-sm">
        <Link href="/blog" className="underline underline-offset-2 hover:opacity-60">
          ← {t('backToBlog')}
        </Link>
      </p>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              '@id': `${pageUrl}#article`,
              headline: c.title,
              description: c.description,
              datePublished: post.date,
              url: pageUrl,
              mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
              author: {
                '@type': 'Organization',
                name: SITE_NAME,
                url: SITE_URL,
              },
              publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                url: SITE_URL,
                logo: {
                  '@type': 'ImageObject',
                  url: `${SITE_URL}${SITE_DEFAULT_OG}`,
                },
              },
              image: `${SITE_URL}${SITE_DEFAULT_OG}`,
              isPartOf: {
                '@type': 'Blog',
                '@id': `${localizedUrl(locale, '/blog')}#blog`,
                name: t('title'),
                url: localizedUrl(locale, '/blog'),
              },
              keywords: post.tags.join(', '),
              ...(category
                ? { articleSection: category.label[lang] ?? category.label.en }
                : {}),
              inLanguage: locale,
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
                ...(categoryLabel
                  ? [{
                      '@type': 'ListItem',
                      position: 3,
                      name: categoryLabel,
                      item: localizedUrl(locale, categoryPath),
                    }]
                  : []),
                {
                  '@type': 'ListItem',
                  position: categoryLabel ? 4 : 3,
                  name: c.title,
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
