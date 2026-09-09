import { buildExportBundle, createDemoJob } from "@temperkit/schema";
import { describe, expect, it } from "vitest";
import { getJob, saveJob } from "./jobs";

describe("job store", () => {
  it("seeds the demo job", () => {
    const demo = getJob("demo");
    expect(demo?.id).toBe("demo");
    const extra = createDemoJob();
    saveJob({ ...extra, id: "tk_test" });
    expect(getJob("tk_test")?.brand.name).toBe(extra.brand.name);
    expect(getJob("demo")?.scene.template).toBe("product-pedestal");
  });
});

describe("export helper", () => {
  it("points the iframe at this origin", () => {
    const html = buildExportBundle(
      createDemoJob(),
      "http://localhost:3000",
    ).embedHtml;
    expect(html).toContain("http://localhost:3000/embed/demo");
  });
});
