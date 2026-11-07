import { Link } from '@/i18n/routing';
import type { BlogPost } from '@/lib/data/blog';

type Props = {
  posts: BlogPost[];
  locale: string;
  title: string;
  allLabel: string;
};

/**
 * Shown on task and demo pages. The links come from the posts' own link blocks
 * (see `postsForPath`), so every article here genuinely discusses that task.
 */
export function RelatedPosts({ posts, locale, title, allLabel }: Props) {
  if (posts.length === 0) return null;
  const lang = locale as 'zh' | 'en';

  return (
    <section aria-label={title} className="border-t border-black pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-mono text-xl">{title}</h2>
        <Link href="/blog" className="text-sm underline underline-offset-2 hover:opacity-60">
          {allLabel} →
        </Link>
      </div>
      <ul className="mt-4 divide-y divide-black/10 border-y border-black/10">
        {posts.map((post) => {
          const c = post.i18n[lang] ?? post.i18n.en;
          return (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block py-4 hover:opacity-70">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-semibold">{c.title}</h3>
                  <time dateTime={post.date} className="font-mono text-xs text-black/50">
                    {post.date}
                  </time>
                </div>
                <p className="mt-1 text-sm text-black/70 max-w-prose">{c.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
