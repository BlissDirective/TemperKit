import { type HexColor, hexColorSchema } from "@temperkit/schema";

function rgbToHex(r: number, g: number, b: number): HexColor {
  const toHex = (channel: number) =>
    Math.max(0, Math.min(255, Math.round(channel)))
      .toString(16)
      .padStart(2, "0");
  return hexColorSchema.parse(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
}

function colorKey(r: number, g: number, b: number): string {
  const quantize = (channel: number) => Math.round(channel / 24) * 24;
  return `${quantize(r)}:${quantize(g)}:${quantize(b)}`;
}

export async function extractPalette(
  file: File,
  maxColors = 4,
): Promise<HexColor[]> {
  const bitmap = await createImageBitmap(file);
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("Could not read the goal image.");
  }
  context.drawImage(bitmap, 0, 0, size, size);
  const { data } = context.getImageData(0, 0, size, size);
  const counts = new Map<
    string,
    { r: number; g: number; b: number; n: number }
  >();

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] ?? 0;
    const g = data[i + 1] ?? 0;
    const b = data[i + 2] ?? 0;
    const a = data[i + 3] ?? 0;
    if (a < 96) {
      continue;
    }
    const key = colorKey(r, g, b);
    const current = counts.get(key);
    if (current) {
      current.r += r;
      current.g += g;
      current.b += b;
      current.n += 1;
    } else {
      counts.set(key, { r, g, b, n: 1 });
    }
  }

  return [...counts.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, maxColors)
    .map((bucket) =>
      rgbToHex(bucket.r / bucket.n, bucket.g / bucket.n, bucket.b / bucket.n),
    );
}
