import { productShapeSchema } from "@temperkit/schema";
import { describe, expect, it } from "vitest";
import { PRODUCT_SHAPES } from "../product-shapes";

describe("product-pedestal runtime", () => {
  it("covers every schema product shape", () => {
    expect([...PRODUCT_SHAPES].sort()).toEqual(
      [...productShapeSchema.options].sort(),
    );
  });
});
