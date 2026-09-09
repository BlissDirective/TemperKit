import type { ExportBundle, ForgeJob } from "./types";

function escapeForTemplate(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

export function buildExportBundle(job: ForgeJob, origin: string): ExportBundle {
  const embedUrl = `${origin.replace(/\/$/, "")}/embed/${job.id}`;
  const sceneJson = JSON.stringify(job.scene, null, 2);
  const source = `import { ProductPedestal } from "@temperkit/runtime";
import type { SceneSpec } from "@temperkit/schema";

const scene = ${sceneJson} satisfies SceneSpec;

export function ProductHero() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 640 }}>
      <ProductPedestal spec={scene} />
    </div>
  );
}
`;

  return {
    embedHtml: `<iframe src="${embedUrl}" title="${job.brand.name} product hero" width="100%" height="640" style="border:0;border-radius:16px;background:${job.scene.atmosphere.bgTop}" allow="fullscreen" loading="lazy"></iframe>`,
    sourceFiles: [
      {
        path: "ProductHero.tsx",
        contents: source,
      },
      {
        path: "scene.json",
        contents: `${sceneJson}\n`,
      },
    ],
  };
}

export function downloadableSource(job: ForgeJob): string {
  const bundle = buildExportBundle(job, "https://temperkit.local");
  const hero = bundle.sourceFiles[0]?.contents ?? "";
  return escapeForTemplate(hero);
}
