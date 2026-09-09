import { deriveBrand } from "./brand";
import { scoreCritic } from "./critic";
import { toJobId } from "./id";
import { buildPedestalScene } from "./scene";
import {
  type ForgeJob,
  forgeJobSchema,
  type IngestInput,
  ingestInputSchema,
} from "./types";

export const DEMO_INGEST: IngestInput = {
  url: "https://temperkit.dev",
  description:
    "Copper and charcoal fragrance bottle for a heritage atelier. Slow studio turntable, warm key light, quiet luxury.",
};

export function forgeFromIngest(
  input: IngestInput,
  createdAt = new Date().toISOString(),
): ForgeJob {
  const parsed = ingestInputSchema.parse(input);
  const brand = deriveBrand(parsed);
  const scene = buildPedestalScene(brand, parsed);
  const critic = scoreCritic(parsed, scene);
  const id = toJobId(
    JSON.stringify({
      url: parsed.url,
      description: parsed.description,
      goal: parsed.goalImage?.colors ?? [],
    }),
  );

  return forgeJobSchema.parse({
    id,
    status: "ready",
    createdAt,
    ingest: parsed,
    brand,
    scene,
    critic,
  });
}

export function createDemoJob(
  createdAt = "2026-09-01T00:00:00.000Z",
): ForgeJob {
  const job = forgeFromIngest(DEMO_INGEST, createdAt);
  return { ...job, id: "demo" };
}
