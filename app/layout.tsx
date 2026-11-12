import type { ReactNode } from 'react';
import { SITE_URL, ADSENSE_ACCOUNT } from '@/lib/site';
import './globals.css';

// The locale layout overrides all of these for real pages. This default only
// reaches the standalone 404 document, which has no locale layout of its own.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Page not found · Web AI Models', template: '%s · Web AI Models' },
  description:
    'This page is not available. Go back to Web AI Models, a catalogue of AI models, tools and demos that run in the browser.',
  robots: { index: false, follow: true },
  other: { 'google-adsense-account': ADSENSE_ACCOUNT },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
