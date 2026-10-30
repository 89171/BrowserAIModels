import { HomeLink } from '@/components/HomeLink';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { blogPosts } from '@/lib/data/blog';
import { localizedUrl, languageAlternates } from '@/lib/urls';

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
    alternates: { canonical: url, languages: languageAlternates('/blog') },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-14">
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
        <ul className="divide-y divide-black/10 border-y border-black/10">
          {posts.map((post) => {
            const c = post.i18n[locale as 'zh' | 'en'] ?? post.i18n.en;
            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block py-6 hover:opacity-70"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="font-semibold text-lg">{c.title}</h2>
                    <time dateTime={post.date} className="font-mono text-xs text-black/50">
                      {post.date}
                    </time>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed max-w-prose text-black/70">
                    {c.description}
                  </p>
                  <p className="mt-3 font-mono text-xs text-black/50">
                    {post.tags.map((tag) => (
                      <span key={tag} className="mr-3">#{tag}</span>
                    ))}
                  </p>
                  <p className="mt-2 text-sm font-medium group-hover:underline">
                    {t('readMore')} →
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
