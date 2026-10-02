import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://web-ai-models.example.com'),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
