import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5">
        <h1 className="font-serif text-4xl">Job cooled off</h1>
        <p className="mt-3 text-muted">
          This slice stores jobs in memory. Re-run the Forge, or open the seeded
          demo.
        </p>
        <Link href="/forge/demo" className="mt-6 text-copper">
          Open demo job →
        </Link>
      </main>
    </div>
  );
}
