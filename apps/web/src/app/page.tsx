import Link from "next/link";
import { SceneCanvas } from "@/components/scene-canvas";
import { SiteHeader } from "@/components/site-header";
import { landingScene } from "@/lib/landing-scene";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 py-8 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-copper">
            Vertical slice
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-tight md:text-6xl">
            Temper the brand.
            <br />
            Ship the hero.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            URL, description, and an optional goal image become a brand-matched
            React Three Fiber product pedestal — scored by a stub critic, then
            exported as embed or source.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/forge"
              className="rounded-full bg-copper px-5 py-3 font-medium text-ink hover:bg-paper"
            >
              Open the Forge
            </Link>
            <Link
              href="/forge/demo"
              className="rounded-full border border-line px-5 py-3 text-paper hover:border-copper"
            >
              View demo job
            </Link>
          </div>
        </div>
        <div className="tk-ring h-[460px] overflow-hidden rounded-3xl md:h-[560px]">
          <SceneCanvas spec={landingScene()} className="h-full" />
        </div>
      </main>
    </div>
  );
}
