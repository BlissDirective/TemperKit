import { textOnBackgroundRatio } from "./scene";
import {
  CRITIC_THRESHOLD,
  type CriticScore,
  type IngestInput,
  type SceneSpec,
} from "./types";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export function scoreCritic(input: IngestInput, scene: SceneSpec): CriticScore {
  const notes: string[] = ["Stub critic — heuristic only, not a vision model."];

  let brandMatch = 12;
  if (input.goalImage) {
    brandMatch += 6;
    notes.push("Goal image palette applied to materials and lighting.");
  } else {
    notes.push("No goal image; palette inferred from URL + description.");
  }
  if (
    /\b(navy|gold|copper|forest|blush|neon|ivory|teal)\b/i.test(
      input.description,
    )
  ) {
    brandMatch += 2;
  }
  brandMatch = clamp(brandMatch, 0, 20);

  let composition = 14;
  if (scene.template === "product-pedestal") {
    composition += 3;
  }
  if (scene.pedestal.rimGlow) {
    composition += 1;
  }
  composition = clamp(composition, 0, 20);

  let motion = 13;
  if (scene.motion.turntableSpeed > 0) {
    motion += 4;
  }
  if (scene.motion.pointerTilt > 0) {
    motion += 2;
  }
  motion = clamp(motion, 0, 20);

  const contrast = textOnBackgroundRatio(scene.brand);
  let accessibility = contrast >= 4.5 ? 16 : contrast >= 3 ? 11 : 7;
  notes.push(`Text/background contrast ${contrast.toFixed(2)}:1.`);
  if (input.description.length >= 40) {
    accessibility += 2;
  }
  accessibility = clamp(accessibility, 0, 20);

  // Procedural geometry, no remote HDRI, capped DPR in the runtime.
  const performance = 19;

  const overall = round1(
    brandMatch + composition + motion + accessibility + performance,
  );

  if (input.description.length < 24) {
    notes.push("Short description limits brand-intent matching.");
  }

  return {
    overall,
    threshold: CRITIC_THRESHOLD,
    ship: overall >= CRITIC_THRESHOLD,
    stub: true,
    dimensions: {
      brandMatch,
      composition,
      motion,
      accessibility,
      performance,
    },
    notes,
  };
}
