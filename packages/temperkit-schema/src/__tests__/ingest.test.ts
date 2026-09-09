import { describe, expect, it } from "vitest";
import { forgeFromIngest } from "../forge";
import { ingestInputSchema } from "../types";

describe("ingestInputSchema", () => {
  it("accepts a URL, description, and optional goal image", () => {
    const parsed = ingestInputSchema.parse({
      url: "https://atelier.example",
      description: "Navy fragrance bottle with a gold cap",
      goalImage: { name: "mood.jpg", colors: ["#1e3a5f", "#c6a35d"] },
    });
    expect(parsed.goalImage?.colors).toHaveLength(2);
  });

  it("rejects a short description", () => {
    const result = ingestInputSchema.safeParse({
      url: "https://atelier.example",
      description: "short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-URL", () => {
    const result = ingestInputSchema.safeParse({
      url: "not-a-url",
      description: "A long enough product description",
    });
    expect(result.success).toBe(false);
  });
});

describe("forgeFromIngest", () => {
  it("is deterministic for the same input", () => {
    const input = {
      url: "https://www.lumen-audio.com",
      description: "A matte black portable speaker with copper detailing",
    };
    const a = forgeFromIngest(input, "2026-09-09T00:00:00.000Z");
    const b = forgeFromIngest(input, "2026-09-09T00:00:00.000Z");
    expect(a.id).toBe(b.id);
    expect(a.scene.template).toBe("product-pedestal");
    expect(a.brand.productShape).toBe("device");
  });

  it("maps fragrance copy onto a bottle and named colors", () => {
    const job = forgeFromIngest({
      url: "https://www.nocturne.paris",
      description:
        "Heritage navy perfume bottle with gold collar, quiet luxury.",
    });
    expect(job.brand.productShape).toBe("bottle");
    expect(job.brand.mood).toBe("heritage");
    expect(job.brand.colors.primary).toBe("#1e3a5f");
  });

  it("lets goal image colors override named colors", () => {
    const job = forgeFromIngest({
      url: "https://www.nocturne.paris",
      description: "Heritage navy perfume bottle with gold collar.",
      goalImage: { name: "ref.png", colors: ["#22d3ee", "#111827"] },
    });
    expect(job.brand.colors.primary).toBe("#22d3ee");
    expect(job.brand.colors.accent).toBe("#111827");
  });
});
