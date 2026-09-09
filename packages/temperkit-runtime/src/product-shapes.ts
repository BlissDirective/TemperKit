import type { ProductShape } from "@temperkit/schema";

export const PRODUCT_SHAPES = [
  "bottle",
  "flask",
  "device",
  "canister",
  "orb",
] as const satisfies readonly ProductShape[];
