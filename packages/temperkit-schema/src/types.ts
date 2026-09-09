import { z } from "zod";

export const hexColorSchema = z
  .string()
  .regex(/^#([0-9a-fA-F]{6})$/, "Expected a 6-digit hex color");

export const productShapeSchema = z.enum([
  "bottle",
  "device",
  "canister",
  "orb",
  "flask",
]);

export const brandMoodSchema = z.enum([
  "luxury",
  "tech",
  "organic",
  "beauty",
  "sport",
  "heritage",
  "minimal",
  "ember",
]);

export const goalImageSchema = z.object({
  name: z.string().min(1).max(200),
  colors: z.array(hexColorSchema).min(1).max(8),
});

export const ingestInputSchema = z.object({
  url: z.string().url(),
  description: z.string().trim().min(8).max(2000),
  goalImage: goalImageSchema.optional(),
});

export const brandColorsSchema = z.object({
  primary: hexColorSchema,
  secondary: hexColorSchema,
  accent: hexColorSchema,
  background: hexColorSchema,
  surface: hexColorSchema,
  text: hexColorSchema,
  muted: hexColorSchema,
});

export const brandTokensSchema = z.object({
  name: z.string().min(1),
  domain: z.string().min(1),
  mood: brandMoodSchema,
  colors: brandColorsSchema,
  productShape: productShapeSchema,
});

export const sceneSpecSchema = z.object({
  template: z.literal("product-pedestal"),
  brand: brandTokensSchema,
  pedestal: z.object({
    color: hexColorSchema,
    radius: z.number().positive(),
    height: z.number().positive(),
    metallic: z.number().min(0).max(1),
    roughness: z.number().min(0).max(1),
    rimGlow: z.boolean(),
  }),
  product: z.object({
    shape: productShapeSchema,
    color: hexColorSchema,
    metallic: z.number().min(0).max(1),
    roughness: z.number().min(0).max(1),
    scale: z.number().positive(),
  }),
  motion: z.object({
    turntableSpeed: z.number().min(0),
    pointerTilt: z.number().min(0).max(1),
  }),
  lighting: z.object({
    exposure: z.number().positive(),
    keyIntensity: z.number().min(0),
    fillIntensity: z.number().min(0),
    ambientIntensity: z.number().min(0),
  }),
  atmosphere: z.object({
    dustCount: z.number().int().min(0).max(400),
    bgTop: hexColorSchema,
    bgBottom: hexColorSchema,
  }),
});

export const criticDimensionSchema = z.object({
  brandMatch: z.number().min(0).max(20),
  composition: z.number().min(0).max(20),
  motion: z.number().min(0).max(20),
  accessibility: z.number().min(0).max(20),
  performance: z.number().min(0).max(20),
});

export const criticScoreSchema = z.object({
  overall: z.number().min(0).max(100),
  threshold: z.literal(88),
  ship: z.boolean(),
  stub: z.literal(true),
  dimensions: criticDimensionSchema,
  notes: z.array(z.string()),
});

export const forgeJobSchema = z.object({
  id: z.string().min(1),
  status: z.literal("ready"),
  createdAt: z.string().min(1),
  ingest: ingestInputSchema,
  brand: brandTokensSchema,
  scene: sceneSpecSchema,
  critic: criticScoreSchema,
});

export const exportFileSchema = z.object({
  path: z.string(),
  contents: z.string(),
});

export const exportBundleSchema = z.object({
  embedHtml: z.string(),
  sourceFiles: z.array(exportFileSchema),
});

export type HexColor = z.infer<typeof hexColorSchema>;
export type ProductShape = z.infer<typeof productShapeSchema>;
export type BrandMood = z.infer<typeof brandMoodSchema>;
export type GoalImage = z.infer<typeof goalImageSchema>;
export type IngestInput = z.infer<typeof ingestInputSchema>;
export type BrandTokens = z.infer<typeof brandTokensSchema>;
export type SceneSpec = z.infer<typeof sceneSpecSchema>;
export type CriticScore = z.infer<typeof criticScoreSchema>;
export type ForgeJob = z.infer<typeof forgeJobSchema>;
export type ExportBundle = z.infer<typeof exportBundleSchema>;

export const CRITIC_THRESHOLD = 88;
export const SCENE_TEMPLATE = "product-pedestal" as const;
