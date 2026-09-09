"use client";

import type { ForgeJob } from "@temperkit/schema";
import { BrandTokensPanel } from "@/components/brand-tokens";
import { CriticPanel } from "@/components/critic-panel";
import { ExportPanel } from "@/components/export-panel";
import { SceneCanvas } from "@/components/scene-canvas";

export function ForgeStudio({
  job,
  origin,
}: {
  job: ForgeJob;
  origin: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
      <section className="tk-ring min-h-[520px] overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-3 text-xs uppercase tracking-[0.18em] text-muted">
          <span>R3F preview</span>
          <span>{job.scene.template}</span>
        </div>
        <div className="h-[560px]">
          <SceneCanvas spec={job.scene} className="h-full" />
        </div>
      </section>
      <aside className="flex flex-col gap-4">
        <BrandTokensPanel brand={job.brand} />
        <CriticPanel critic={job.critic} />
        <ExportPanel job={job} origin={origin} />
      </aside>
    </div>
  );
}
