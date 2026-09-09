# TemperKit

Brand-matched animated web components from a URL, goal image, and description.

This repository currently ships a **thin vertical slice**, not the full platform. It proves one path:

**URL + description (+ optional goal image) → brand-matched R3F hero → critic score → export**

The only scene template in this slice is `product-pedestal`. Ingest and critic are deterministic stubs. There is no crawl, Meshy, Inngest, Stripe, MCP, or ledger.

## Stack

- pnpm + Turborepo
- Next.js 15 App Router, React 19, Tailwind v4
- three / React Three Fiber / drei
- Zod, Vitest, Biome
- Strict TypeScript, no secrets

## Monorepo

| Path | Role |
| --- | --- |
| `apps/web` | Forge UI, in-memory job API, R3F preview, embed route |
| `packages/temperkit-schema` | Zod contracts, stub ingest, stub critic, export bundle |
| `packages/temperkit-runtime` | `ProductPedestal` scene only |
| `packages/config` | Shared TypeScript configs |

## Demo

Requires Node 20+ and pnpm 10.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

1. The landing page shows a live product-pedestal hero using the seeded TemperKit brand.
2. Click **Open the Forge** (or go to `/forge`).
3. Submit the prefilled brief (`https://www.nocturne.paris` + heritage perfume copy). Optionally attach a goal image; the client extracts a palette and sends hex colors only.
4. The result page (`/forge/[id]`) shows the brand-matched R3F preview, critic stub score (ship gate 88), and export panel.
5. Copy the **Embed** iframe (`/embed/[id]`) or download **Source** (`ProductHero.tsx` + `scene.json`).
6. Seeded shortcut: [http://localhost:3000/forge/demo](http://localhost:3000/forge/demo).

Jobs live in process memory. Restarting the dev server drops non-demo jobs.

```bash
pnpm lint
pnpm test
pnpm build
```

## What is stubbed

- **Ingest** — no HTML fetch. Host, description keywords, and optional goal-image colors map onto a palette, mood, and procedural product shape.
- **Critic** — heuristic 100-point rubric (`brandMatch`, `composition`, `motion`, `accessibility`, `performance`). Marked `stub: true`.
- **Product** — lathe/box/sphere stand-ins, not a Meshy GLB.

## Out of scope (this slice)

- Inngest full pipeline
- Ledger certs
- Stripe
- MCP
- Meshy
- Spec §12 chrome
- Extra templates beyond product-pedestal

## TODOs

- [ ] Replace ingest stub with a real URL crawl + token extract (still no secrets in git)
- [ ] Swap procedural product for Meshy/GLB when a model pipeline exists
- [ ] Run critic against a captured frame, not just heuristics
- [ ] Persist jobs (replace the in-memory map)
- [ ] Inngest orchestration for long-running forge work
- [ ] Additional scene templates
- [ ] Spec §12 studio chrome
- [ ] Ledger certs, Stripe billing, MCP server
