'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import type { Locale } from './types';
import { UI, type UIKey } from './i18n';

interface AppCtx {
  locale: Locale;
  tr: (key: UIKey) => string;
}

const Ctx = createContext<AppCtx | null>(null);

/**
 * The demo playgrounds were written for a standalone app that owned both the
 * language and the theme. Here the locale is a route segment and the site is
 * light-only, so the provider just carries them down — there is no local state
 * that could drift from the URL.
 */
export function AppProvider({
  children,
  locale = 'zh',
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  const tr = useCallback((key: UIKey) => UI[key][locale], [locale]);
  const value = useMemo(() => ({ locale, tr }), [locale, tr]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
