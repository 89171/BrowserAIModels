'use client';

import { useEffect, useState } from 'react';

export interface BlogBrowserPost {
  slug: string;
  date: string;
  category: string;
  tags: string[];
  title: string;
  description: string;
  href: string;
}

export interface BlogBrowserCategory {
  key: string;
  label: string;
  description: string;
  /** Static category landing page; the chip links there instead of using a hash. */
  href: string;
}

/** Plain strings, not ICU templates: the caller can pass them straight to `t()`. */
export interface BlogBrowserLabels {
  all: string;
  browseByTopic: string;
  readMore: string;
  clear: string;
  countSuffix: string;
  tagLabel: string;
  categoryLabel: string;
  filterByTagPrefix: string;
  filterByCategoryPrefix: string;
  viewCategory: string;
}

type Filter = { type: 'tag' | 'cat'; value: string } | null;

type Props = {
  posts: BlogBrowserPost[];
  categories: BlogBrowserCategory[];
  labels: BlogBrowserLabels;
};

/**
 * The export is fully static, so filtering lives in the browser. The server
 * still renders every group and every link into the initial HTML; only the
 * active view changes after hydration. The filter is kept in the URL hash so
 * a tag link on a post page can land straight on a filtered index, and so a
 * filtered view can be shared.
 */
function parseHash(hash: string): Filter {
  const match = /^#(tag|cat)=(.+)$/.exec(hash);
  if (!match) return null;
  try {
    return { type: match[1] as 'tag' | 'cat', value: decodeURIComponent(match[2]) };
  } catch {
    return null;
  }
}

function chipClass(active: boolean): string {
  return [
    'inline-flex items-baseline gap-2 border border-black px-3 py-1.5 font-mono text-xs transition-colors',
    active ? 'bg-black text-white' : 'bg-white text-black hover:bg-black/5',
  ].join(' ');
}

function PostRow({
  post,
  labels,
  onTag,
}: {
  post: BlogBrowserPost;
  labels: BlogBrowserLabels;
  onTag: (tag: string) => void;
}) {
  return (
    <li className="py-6">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h3 className="font-semibold text-lg">
          <a href={post.href} className="underline-offset-2 hover:underline">
            {post.title}
          </a>
        </h3>
        <time dateTime={post.date} className="font-mono text-xs text-black/50">
          {post.date}
        </time>
      </div>
      <p className="mt-2 text-sm leading-relaxed max-w-prose text-black/70">
        {post.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {post.tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTag(tag)}
            aria-label={labels.filterByTagPrefix + tag}
            className="font-mono text-xs text-black/50 underline-offset-2 hover:text-black hover:underline focus:outline-none focus-visible:underline"
          >
            #{tag}
          </button>
        ))}
      </div>
      <a
        href={post.href}
        className="mt-2 inline-block text-sm font-medium underline-offset-2 hover:underline"
      >
        {labels.readMore} →
      </a>
    </li>
  );
}

export function BlogBrowser({ posts, categories, labels }: Props) {
  const [filter, setFilter] = useState<Filter>(null);

  useEffect(() => {
    const validCats = new Set(categories.map((c) => c.key));
    const validTags = new Set(posts.flatMap((p) => p.tags));
    const sync = () => {
      const parsed = parseHash(window.location.hash);
      const valid =
        parsed &&
        (parsed.type === 'cat' ? validCats.has(parsed.value) : validTags.has(parsed.value));
      setFilter(valid ? parsed : null);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [posts, categories]);

  function apply(next: Filter) {
    setFilter(next);
    const hash = next
      ? `#${next.type}=${encodeURIComponent(next.value)}`
      : '';
    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search + hash,
    );
  }

  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  const visible = filter
    ? posts.filter((post) =>
        filter.type === 'cat'
          ? post.category === filter.value
          : post.tags.includes(filter.value),
      )
    : posts;
  const countLabel = String(visible.length) + labels.countSuffix;
  const activeCategory = filter?.type === 'cat'
    ? categories.find((c) => c.key === filter.value)
    : undefined;

  return (
    <div>
      <div className="border-y border-black/10 py-5">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-black/50">
          {labels.browseByTopic}
        </p>
        <div role="group" aria-label={labels.browseByTopic} className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={!filter}
            onClick={() => apply(null)}
            className={chipClass(!filter)}
          >
            {labels.all}
            <span className="opacity-60">{posts.length}</span>
          </button>
          {categories.map((cat) => {
            // Categories have their own indexable pages. Hash filtering is
            // still parsed for old shared links, but no longer produced here.
            const active = filter?.type === 'cat' && filter.value === cat.key;
            return (
              <a
                key={cat.key}
                href={cat.href}
                aria-current={active ? 'page' : undefined}
                aria-label={labels.filterByCategoryPrefix + cat.label}
                className={chipClass(active)}
              >
                {cat.label}
                <span className="opacity-60">{counts.get(cat.key) ?? 0}</span>
              </a>
            );
          })}
        </div>
      </div>

      {filter ? (
        <section aria-labelledby="blog-filter-title" className="pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black pb-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-black/50">
                {filter.type === 'tag' ? labels.tagLabel : labels.categoryLabel}
              </p>
              <h2 id="blog-filter-title" className="mt-1 font-mono text-2xl">
                {filter.type === 'tag'
                  ? `#${filter.value}`
                  : activeCategory?.label ?? filter.value}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-black/50">{countLabel}</span>
              <button
                type="button"
                onClick={() => apply(null)}
                className="border border-black px-3 py-1.5 font-mono text-xs hover:bg-black hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
              >
                {labels.clear} <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <ul className="divide-y divide-black/10">
            {visible.map((post) => (
              <PostRow
                key={post.slug}
                post={post}
                labels={labels}
                onTag={(tag) => apply({ type: 'tag', value: tag })}
              />
            ))}
          </ul>
        </section>
      ) : (
        <div className="space-y-10">
          {categories.map((cat) => {
            const group = posts.filter((post) => post.category === cat.key);
            if (!group.length) return null;
            const headingId = `blog-group-${cat.key}`;
            return (
              <section key={cat.key} id={headingId} aria-labelledby={`${headingId}-title`} className="pt-10">
                <div className="border-b border-black pb-3">
                  <h2 id={`${headingId}-title`} className="font-mono text-2xl">
                    {cat.label}
                    <span className="ml-3 text-sm text-black/40">{group.length}</span>
                  </h2>
                  <p className="mt-2 text-sm text-black/60">{cat.description}</p>
                  <a
                    href={cat.href}
                    className="mt-2 inline-block font-mono text-xs text-black/50 underline-offset-2 hover:text-black hover:underline"
                  >
                    {labels.viewCategory} →
                  </a>
                </div>
                <ul className="divide-y divide-black/10">
                  {group.map((post) => (
                    <PostRow
                      key={post.slug}
                      post={post}
                      labels={labels}
                      onTag={(tag) => apply({ type: 'tag', value: tag })}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
