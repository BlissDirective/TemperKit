import { contrastRatio } from "./brand";
import {
  type BrandTokens,
  type IngestInput,
  SCENE_TEMPLATE,
  type SceneSpec,
} from "./types";

export function buildPedestalScene(
  brand: BrandTokens,
  input: IngestInput,
): SceneSpec {
  const metallic =
    brand.mood === "luxury" || brand.mood === "heritage" ? 0.72 : 0.28;
  const roughness =
    brand.mood === "organic" || brand.mood === "beauty" ? 0.46 : 0.32;
  const dusty = brand.mood === "luxury" || brand.mood === "ember" ? 90 : 48;

  return {
    template: SCENE_TEMPLATE,
    brand,
    pedestal: {
      color: brand.colors.secondary,
      radius: 1.15,
      height: 0.14,
      metallic: Math.min(1, metallic + 0.12),
      roughness: Math.max(0.18, roughness - 0.08),
      rimGlow: true,
    },
    product: {
      shape: brand.productShape,
      color: brand.colors.primary,
      metallic,
      roughness,
      scale: 1,
    },
    motion: {
      turntableSpeed: 0.42,
      pointerTilt: 0.18,
    },
    lighting: {
      exposure: 1.15,
      keyIntensity: 3.4,
      fillIntensity: 1.1,
      ambientIntensity: 0.48,
    },
    atmosphere: {
      dustCount: input.goalImage ? dusty + 20 : dusty,
      bgTop: brand.colors.background,
      bgBottom: brand.colors.surface,
    },
  };
}

export function textOnBackgroundRatio(brand: BrandTokens): number {
  return contrastRatio(brand.colors.text, brand.colors.background);
}
