import type { ReactNode } from 'react';
import { AppProvider } from '@/lib/client-context';
import type { Locale } from '@/lib/types';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Everything under /[locale]/demos is client-side inference, so the whole
 * subtree shares one provider. The locale comes from the route: the demo UI
 * used to keep it in localStorage, which would disagree with the URL here.
 */
export default async function DemosLayout({ children, params }: Props) {
  const { locale } = await params;
  const demoLocale: Locale = locale === 'zh' ? 'zh' : 'en';
  return (
    <div className="demo-scope">
      <AppProvider locale={demoLocale}>{children}</AppProvider>
    </div>
  );
}
