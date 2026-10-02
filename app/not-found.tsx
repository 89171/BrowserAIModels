import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <div className="space-y-6">
      <p className="font-mono text-xs uppercase tracking-widest text-black/60">
        404
      </p>
      <h1 className="h-display text-5xl md:text-7xl mt-3 leading-none">
        Page not found
      </h1>
      <p className="text-lg max-w-prose">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block font-mono text-sm underline underline-offset-2"
      >
        ← Back home
      </Link>
    </div>
  );
}
