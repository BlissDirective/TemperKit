import { ForgeForm } from "@/components/forge-form";
import { SiteHeader } from "@/components/site-header";

export default function ForgePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-10">
        <p className="text-xs uppercase tracking-[0.22em] text-copper">Forge</p>
        <h1 className="mt-2 font-serif text-4xl">Brief the studio</h1>
        <p className="mt-3 mb-6 text-muted">
          Ingest is stubbed in-process: no crawl, no Meshy, no Inngest. Tokens
          are derived from the host, copy, and optional goal-image palette.
        </p>
        <ForgeForm />
      </main>
    </div>
  );
}
