import type { BrandMood, HexColor, ProductShape } from "./types.ts";

export type Palette = {
  mood: BrandMood;
  colors: {
    primary: HexColor;
    secondary: HexColor;
    accent: HexColor;
    background: HexColor;
    surface: HexColor;
    text: HexColor;
    muted: HexColor;
  };
};

export const DEFAULT_PALETTE: Palette = {
  mood: "ember",
  colors: {
    primary: "#e8a87c",
    secondary: "#2a221c",
    accent: "#c45c26",
    background: "#0b0b0c",
    surface: "#161412",
    text: "#f4f1ea",
    muted: "#9a958a",
  },
};

export const PALETTES: readonly Palette[] = [
  DEFAULT_PALETTE,
  {
    mood: "luxury",
    colors: {
      primary: "#c6a35d",
      secondary: "#1a1612",
      accent: "#efe6d2",
      background: "#0c0b09",
      surface: "#171410",
      text: "#f7f1e4",
      muted: "#b3a790",
    },
  },
  {
    mood: "tech",
    colors: {
      primary: "#5b8cff",
      secondary: "#111827",
      accent: "#22d3ee",
      background: "#07090f",
      surface: "#10141d",
      text: "#e8eefc",
      muted: "#8b97ad",
    },
  },
  {
    mood: "organic",
    colors: {
      primary: "#7c9a6e",
      secondary: "#2b241c",
      accent: "#d08c5a",
      background: "#12110e",
      surface: "#1c1a16",
      text: "#f2ece1",
      muted: "#a39a8a",
    },
  },
  {
    mood: "beauty",
    colors: {
      primary: "#e8b4b8",
      secondary: "#2a1f22",
      accent: "#c9a27c",
      background: "#140f11",
      surface: "#1e1719",
      text: "#f8eef0",
      muted: "#b39aa0",
    },
  },
  {
    mood: "sport",
    colors: {
      primary: "#ff4d2e",
      secondary: "#111111",
      accent: "#f5f5f5",
      background: "#0a0a0a",
      surface: "#161616",
      text: "#f7f7f7",
      muted: "#9a9a9a",
    },
  },
  {
    mood: "heritage",
    colors: {
      primary: "#1e3a5f",
      secondary: "#c6a35d",
      accent: "#d9c8a0",
      background: "#0d1218",
      surface: "#151c24",
      text: "#f3efe6",
      muted: "#9aa4b2",
    },
  },
  {
    mood: "minimal",
    colors: {
      primary: "#ececec",
      secondary: "#2c2c2c",
      accent: "#8a8a8a",
      background: "#101010",
      surface: "#1a1a1a",
      text: "#f5f5f5",
      muted: "#9c9c9c",
    },
  },
] as const;

export const COLOR_WORDS: Record<string, HexColor> = {
  navy: "#1e3a5f",
  blue: "#3b6ea8",
  gold: "#c6a35d",
  brass: "#b08d57",
  copper: "#c45c26",
  bronze: "#8c5a32",
  black: "#141414",
  white: "#f4f1ea",
  ivory: "#f3ead7",
  cream: "#efe6d2",
  green: "#3f6b4a",
  forest: "#2f4f38",
  sage: "#7c9a6e",
  rose: "#e8b4b8",
  pink: "#e8a0b0",
  red: "#c44536",
  orange: "#e07a3d",
  silver: "#c5c8ce",
  purple: "#6d4d8a",
  violet: "#7c5cbf",
  teal: "#2a9d8f",
  coral: "#e07a5f",
  charcoal: "#1c1c1e",
  ember: "#c45c26",
};

export const SHAPE_WORDS: Record<string, ProductShape> = {
  bottle: "bottle",
  perfume: "bottle",
  fragrance: "bottle",
  serum: "bottle",
  wine: "bottle",
  cologne: "bottle",
  flask: "flask",
  decanter: "flask",
  vase: "flask",
  phone: "device",
  laptop: "device",
  device: "device",
  speaker: "device",
  headphone: "device",
  watch: "device",
  tablet: "device",
  camera: "device",
  can: "canister",
  candle: "canister",
  jar: "canister",
  tin: "canister",
  canister: "canister",
  cream: "canister",
  globe: "orb",
  orb: "orb",
  sphere: "orb",
  ball: "orb",
};

export const MOOD_WORDS: Record<string, BrandMood> = {
  luxury: "luxury",
  luxe: "luxury",
  gold: "luxury",
  heritage: "heritage",
  classic: "heritage",
  navy: "heritage",
  tech: "tech",
  digital: "tech",
  neon: "tech",
  organic: "organic",
  natural: "organic",
  forest: "organic",
  beauty: "beauty",
  beautyhouse: "beauty",
  blush: "beauty",
  sport: "sport",
  athletic: "sport",
  racing: "sport",
  minimal: "minimal",
  quiet: "minimal",
  ember: "ember",
  forge: "ember",
};

export function paletteByMood(mood: BrandMood): Palette {
  return PALETTES.find((palette) => palette.mood === mood) ?? DEFAULT_PALETTE;
}
