import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';

export async function Header() {
  const tSite = await getTranslations('site');
  const tNav = await getTranslations('nav');

  return (
    <header className="border-b border-black">
      <div className="container-prose flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-mono text-lg tracking-tight hover:opacity-60"
        >
          <span aria-hidden="true">◼︎</span> {tSite('shortName')}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:opacity-60">
            {tNav('home')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
