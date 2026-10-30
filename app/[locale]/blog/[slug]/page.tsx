import { HomeLink } from '@/components/HomeLink';
import { JsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { blogPosts, findPost, type BlogBlock } from '@/lib/data/blog';
import { localizedUrl, languageAlternates } from '@/lib/urls';

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
  const c = post.i18n[locale as 'zh' | 'en'] ?? post.i18n.en;
  const url = localizedUrl(locale, `/blog/${slug}`);
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: url, languages: languageAlternates(`/blog/${slug}`) },
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

function Block({ block }: { block: BlogBlock }) {
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
          {block.items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:opacity-60"
              >
                {item.label} ↗
              </a>
            </li>
          ))}
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
  const c = post.i18n[locale as 'zh' | 'en'] ?? post.i18n.en;
  const pageUrl = localizedUrl(locale, `/blog/${slug}`);

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
          <li aria-current="page" className="truncate max-w-[16rem]">{c.title}</li>
        </ol>
      </nav>

      <article className="space-y-6">
        <header className="border-b border-black pb-8">
          <h1 className="h-display text-3xl md:text-5xl leading-tight max-w-prose">{c.title}</h1>
          <p className="mt-4 text-sm text-black/60 max-w-prose">{c.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-black/50">
            <time dateTime={post.date}>{post.date}</time>
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </header>

        {c.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </article>

      <p className="border-t border-black/10 pt-6 text-sm">
        <Link href="/blog" className="underline underline-offset-2 hover:opacity-60">
          ← {t('backToBlog')}
        </Link>
      </p>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: c.title,
          description: c.description,
          datePublished: post.date,
          url: pageUrl,
          keywords: post.tags.join(', '),
          inLanguage: locale,
        }}
      />
    </div>
  );
}
