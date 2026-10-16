import { SiteDocument } from '@/components/SiteDocument';
import { HomeContent } from '@/components/HomeContent';
import { siteMetadata } from '@/lib/site-metadata';
import { homeMetadata } from '@/lib/home-metadata';

export async function generateMetadata() {
  const site = await siteMetadata('en');
  const home = await homeMetadata('en');
  return { ...site, ...home, title: { absolute: `${home.title} · ${site.applicationName}` } };
}

export default function RootPage() {
  return <SiteDocument locale="en"><HomeContent locale="en" /></SiteDocument>;
}
