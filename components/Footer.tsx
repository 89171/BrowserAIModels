type Props = { siteName: string; tagline: string; notice: string };

export function Footer({ siteName, tagline, notice }: Props) {
  return (
    <footer className="border-t border-black mt-24">
      <div className="container-prose py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div>
          <p className="font-mono">
            {siteName} · {new Date().getFullYear()}
          </p>
          <p className="text-black/60 mt-1">{tagline}</p>
        </div>
        <p className="text-black/60">
          {notice}
        </p>
      </div>
    </footer>
  );
}
