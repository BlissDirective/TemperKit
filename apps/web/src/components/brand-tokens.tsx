import type { BrandTokens } from "@temperkit/schema";

const SWATCHES: Array<keyof BrandTokens["colors"]> = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "text",
  "muted",
];

export function BrandTokensPanel({ brand }: { brand: BrandTokens }) {
  return (
    <section className="tk-ring rounded-3xl p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">
        Brand tokens
      </p>
      <h2 className="mt-1 font-serif text-2xl">{brand.name}</h2>
      <p className="text-sm text-muted">
        {brand.domain} · {brand.mood} · {brand.productShape}
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-2">
        {SWATCHES.map((name) => (
          <li key={name} className="flex items-center gap-2 text-xs text-muted">
            <span
              className="size-5 rounded-full border border-line"
              style={{ background: brand.colors[name] }}
            />
            <span className="capitalize">{name}</span>
            <span className="ml-auto font-mono text-[11px]">
              {brand.colors[name]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
