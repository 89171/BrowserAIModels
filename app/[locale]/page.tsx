import { HomeContent } from '@/components/HomeContent';
import { HomeLink } from '@/components/HomeLink';
import { homeMetadata } from '@/lib/home-metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return homeMetadata((await params).locale);
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  // Static hosting needs a redirect document at /en; nested /en/* routes stay intact.
  if (locale === 'en') {
    return <><meta httpEquiv="refresh" content="0;url=/" /><p><HomeLink locale="en">Continue to home</HomeLink></p></>;
  }
  return <HomeContent locale={locale} />;
}
