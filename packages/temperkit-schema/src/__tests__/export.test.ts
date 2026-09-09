import { describe, expect, it } from "vitest";
import { buildExportBundle } from "../export";
import { createDemoJob, forgeFromIngest } from "../forge";
import { forgeJobSchema, sceneSpecSchema } from "../types";

describe("schemas", () => {
  it("round-trips a forged job", () => {
    const job = forgeFromIngest({
      url: "https://flask.studio",
      description: "A glass flask of forest serum on a dark pedestal",
    });
    expect(forgeJobSchema.parse(job).id).toBe(job.id);
    expect(sceneSpecSchema.parse(job.scene).template).toBe("product-pedestal");
  });

  it("builds embed HTML and source files", () => {
    const job = createDemoJob();
    const bundle = buildExportBundle(job, "http://localhost:3000");
    expect(bundle.embedHtml).toContain("/embed/demo");
    expect(bundle.embedHtml).toContain("<iframe");
    expect(bundle.sourceFiles.map((file) => file.path)).toEqual([
      "ProductHero.tsx",
      "scene.json",
    ]);
    expect(bundle.sourceFiles[0]?.contents).toContain("ProductPedestal");
    expect(bundle.sourceFiles[0]?.contents).toContain("product-pedestal");
  });
});
