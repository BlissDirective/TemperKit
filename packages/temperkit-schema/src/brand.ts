import { brandNameFromHost, fnv1a, parseHost } from "./id";
import {
  COLOR_WORDS,
  DEFAULT_PALETTE,
  MOOD_WORDS,
  PALETTES,
  type Palette,
  paletteByMood,
  SHAPE_WORDS,
} from "./palettes";
import type {
  BrandMood,
  BrandTokens,
  HexColor,
  IngestInput,
  ProductShape,
} from "./types";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length > 1);
}

function firstMatch<T>(
  tokens: readonly string[],
  table: Record<string, T>,
): T | undefined {
  for (const token of tokens) {
    const hit = table[token];
    if (hit) {
      return hit;
    }
  }
  return undefined;
}

function collectColorWords(tokens: readonly string[]): HexColor[] {
  const colors: HexColor[] = [];
  for (const token of tokens) {
    const color = COLOR_WORDS[token];
    if (color && !colors.includes(color)) {
      colors.push(color);
    }
  }
  return colors;
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function hexToRgb(hex: HexColor): { r: number; g: number; b: number } {
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): HexColor {
  const toHex = (channel: number) =>
    clampByte(channel).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function mixHex(a: HexColor, b: HexColor, t: number): HexColor {
  const left = hexToRgb(a);
  const right = hexToRgb(b);
  return rgbToHex(
    left.r + (right.r - left.r) * t,
    left.g + (right.g - left.g) * t,
    left.b + (right.b - left.b) * t,
  );
}

export function relativeLuminance(hex: HexColor): number {
  const { r, g, b } = hexToRgb(hex);
  const linearize = (channel: number) => {
    const srgb = channel / 255;
    return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

export function contrastRatio(a: HexColor, b: HexColor): number {
  const left = relativeLuminance(a);
  const right = relativeLuminance(b);
  const hi = Math.max(left, right);
  const lo = Math.min(left, right);
  return (hi + 0.05) / (lo + 0.05);
}

function ensureReadableText(text: HexColor, background: HexColor): HexColor {
  if (contrastRatio(text, background) >= 4.5) {
    return text;
  }
  return relativeLuminance(background) > 0.4 ? "#141414" : "#f4f1ea";
}

function paletteFromGoalColors(
  colors: readonly HexColor[],
  fallback: Palette,
): Palette {
  const primary = colors[0] ?? fallback.colors.primary;
  const accent = colors[1] ?? fallback.colors.accent;
  const secondary = colors[2] ?? mixHex(primary, "#111111", 0.72);
  const background =
    relativeLuminance(secondary) < 0.18
      ? secondary
      : mixHex(secondary, "#050505", 0.55);
  const surface = mixHex(background, "#ffffff", 0.08);
  const text = ensureReadableText("#f4f1ea", background);
  const muted = mixHex(text, background, 0.42);
  return {
    mood: fallback.mood,
    colors: {
      primary,
      secondary,
      accent,
      background,
      surface,
      text,
      muted,
    },
  };
}

export function deriveBrand(input: IngestInput): BrandTokens {
  const domain = parseHost(input.url);
  const tokens = tokenize(
    `${domain} ${input.description} ${input.goalImage?.name ?? ""}`,
  );
  const hashed = fnv1a(domain);
  const fallback = PALETTES[hashed % PALETTES.length] ?? DEFAULT_PALETTE;
  const mood: BrandMood = firstMatch(tokens, MOOD_WORDS) ?? fallback.mood;
  let palette = paletteByMood(mood);

  const namedColors = collectColorWords(tokens);
  if (namedColors.length > 0) {
    palette = paletteFromGoalColors(namedColors, palette);
  }

  if (input.goalImage && input.goalImage.colors.length > 0) {
    palette = paletteFromGoalColors(input.goalImage.colors, palette);
  }

  const productShape: ProductShape =
    firstMatch(tokens, SHAPE_WORDS) ?? "device";

  return {
    name: brandNameFromHost(domain),
    domain,
    mood,
    colors: palette.colors,
    productShape,
  };
}
