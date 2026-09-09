import Link from "next/link";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
      <Link href="/" className="flex items-baseline gap-2 tracking-tight">
        <span className="font-serif text-2xl text-paper">TemperKit</span>
        {compact ? null : (
          <span className="hidden text-xs uppercase tracking-[0.22em] text-muted sm:inline">
            thin slice
          </span>
        )}
      </Link>
      <nav className="flex items-center gap-3 text-sm text-muted">
        <Link
          href="/forge"
          className="rounded-full px-3 py-1.5 transition hover:text-paper"
        >
          Forge
        </Link>
        <Link
          href="/forge/demo"
          className="rounded-full bg-copper px-3 py-1.5 font-medium text-ink transition hover:bg-paper"
        >
          Demo
        </Link>
      </nav>
    </header>
  );
}
