import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { TAXONOMY } from '@/data/taxonomy';
import { hasDemo } from '@/lib/data/registry';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string; category: string; subcategory: string }>;
};

/**
 * The demo index (the migrated AI-Demos sidebar) next to the playground. It is a
 * layout rather than part of each page so switching between tasks keeps the
 * scrolling position of the index list.
 */
export default async function DemoTaskLayout({ children, params }: Props) {
  const { locale, category, subcategory } = await params;
  const t = await getTranslations({ locale, namespace: 'demos' });
  const tCats = await getTranslations({ locale, namespace: 'categories' });
  const tSubs = await getTranslations({ locale, namespace: 'subcategories' });

  return (
    <div className="mx-auto flex w-full max-w-[1600px] items-start">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 overflow-y-auto border-r border-black/15 px-4 py-6 lg:block scroll-thin">
        <Link href="/demos" className="font-mono text-xs underline">← {t('backToDemos')}</Link>
        <nav className="mt-6 space-y-5">
          {TAXONOMY.map((cat) => {
            const tasks = cat.subcategories.filter((sub) => hasDemo(cat.slug, sub.slug));
            if (!tasks.length) return null;
            return (
              <div key={cat.slug}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-black/50">
                  {tCats(cat.slug as 'text')}
                </p>
                <ul className="mt-1.5 space-y-0.5">
                  {tasks.map((sub) => {
                    const active = cat.slug === category && sub.slug === subcategory;
                    return (
                      <li key={sub.slug}>
                        <Link
                          href={`/demos/${cat.slug}/${sub.slug}`}
                          aria-current={active ? 'page' : undefined}
                          className={`block px-2 py-1 text-[13px] transition-colors ${
                            active ? 'bg-black text-white' : 'hover:bg-black/5'
                          }`}
                        >
                          {tSubs(sub.slug as 'classification')}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
