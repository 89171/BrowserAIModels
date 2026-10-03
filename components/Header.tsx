import { getLocale, getTranslations } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';

export async function Header() {
  const tSite = await getTranslations('site');
  const tNav = await getTranslations('nav');
  const locale = await getLocale();
  const tLanguages = await getTranslations('languages');

  return (
    <header className="border-b border-black">
      <div className="container-prose flex items-center justify-between min-h-16 py-3 flex-wrap gap-3">
        <Link
          href="/"
          className="font-mono text-lg tracking-tight hover:opacity-60"
        >
          <span aria-hidden="true">◼︎</span> {tSite('shortName')}
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6 text-sm">
          <Link href="/" className="hover:opacity-60">
            {tNav('home')}
          </Link>
          <Link href="/applications" className="hover:opacity-60">{tNav('applications')}</Link>
          <LanguageSwitcher
            locale={locale}
            label={tLanguages('label')}
            options={routing.locales.map(value => ({ value, label: tLanguages(value) }))}
          />
        </nav>
      </div>
    </header>
  );
}
