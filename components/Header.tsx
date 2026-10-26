import { HomeLink } from '@/components/HomeLink';
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
        <HomeLink
          locale={locale}
          className="font-mono text-lg tracking-tight hover:opacity-60"
        >
          <span aria-hidden="true">◼︎</span> {tSite('shortName')}
        </HomeLink>
        <nav className="flex items-center gap-3 sm:gap-6 text-sm">
          <HomeLink locale={locale} className="hover:opacity-60">
            {tNav('home')}
          </HomeLink>
          <Link href="/applications" className="hover:opacity-60">{tNav('applications')}</Link>
          <Link href="/demos" className="hover:opacity-60">{tNav('demos')}</Link>
          <Link href="/methodology" className="hover:opacity-60">{tNav('methodology')}</Link>
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
