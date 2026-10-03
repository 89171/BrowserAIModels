import Link from 'next/link';

// The global fallback must work without the locale layout or its provider.
export default function NotFound() {
  return (
    <html lang="en">
      <body className="container-prose py-12">
        <main className="space-y-6">
          <p className="font-mono text-xs text-black/60">404</p>
          <h1 className="h-display text-5xl">Page not found</h1>
          <p lang="zh">页面不存在</p>
          <nav className="flex gap-6" aria-label="Home / 首页">
            <Link href="/en" className="underline">English home</Link>
            <Link href="/zh" lang="zh" className="underline">中文首页</Link>
          </nav>
        </main>
      </body>
    </html>
  );
}
