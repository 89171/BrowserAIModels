import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'notFound' });

  return (
    <div className="space-y-6">
      <p className="font-mono text-xs text-black/60">404</p>
      <h1 className="h-display text-5xl md:text-7xl">{t('title')}</h1>
      <p className="text-lg max-w-prose">{t('description')}</p>
      <Link href={`/${locale}`} className="font-mono text-sm underline underline-offset-2">
        ← {t('back')}
      </Link>
    </div>
  );
}
