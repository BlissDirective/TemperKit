"use client";

import type { ForgeJob, HexColor } from "@temperkit/schema";
import { ImagePlus, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { extractPalette } from "@/lib/extract-palette";

const SAMPLE_DESCRIPTION =
  "Heritage navy perfume bottle with a gold collar. Slow studio turntable, warm key light, quiet luxury.";

export function ForgeForm() {
  const router = useRouter();
  const [url, setUrl] = useState("https://www.nocturne.paris");
  const [description, setDescription] = useState(SAMPLE_DESCRIPTION);
  const [fileName, setFileName] = useState<string | null>(null);
  const [colors, setColors] = useState<HexColor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [phase, setPhase] = useState<string | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) {
      setFileName(null);
      setColors([]);
      return;
    }
    setFileName(file.name);
    const palette = await extractPalette(file);
    setColors(palette);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    setPhase("Ingesting URL + copy");
    try {
      await new Promise((resolve) => setTimeout(resolve, 280));
      setPhase("Matching brand tokens");
      await new Promise((resolve) => setTimeout(resolve, 280));
      setPhase("Composing product-pedestal");
      const response = await fetch("/api/forge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          url,
          description,
          goalImage:
            fileName && colors.length > 0
              ? { name: fileName, colors }
              : undefined,
        }),
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        throw new Error(
          "Ingest rejected this brief. Check the URL and description.",
        );
      }
      const job = payload as ForgeJob;
      router.push(`/forge/${job.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Forge failed.");
      setPending(false);
      setPhase(null);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="tk-ring flex flex-col gap-5 rounded-3xl p-6 md:p-8"
    >
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.18em] text-muted">
          Product URL
        </span>
        <input
          required
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="rounded-2xl border border-line bg-ink px-4 py-3 text-paper outline-none ring-copper focus:ring-2"
          placeholder="https://brand.example"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.18em] text-muted">
          Description
        </span>
        <textarea
          required
          minLength={8}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={5}
          className="resize-y rounded-2xl border border-line bg-ink px-4 py-3 text-paper outline-none ring-copper focus:ring-2"
        />
      </label>
      <label className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-dashed border-line px-4 py-4">
        <span className="flex items-center gap-2 text-sm text-muted">
          <ImagePlus className="size-4" />
          Goal image (optional)
        </span>
        <input
          type="file"
          accept="image/*"
          className="text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-copper file:px-3 file:py-1 file:text-ink"
          onChange={(event) => {
            void onFile(event.target.files?.[0]);
          }}
        />
        {colors.length > 0 ? (
          <span className="flex items-center gap-2">
            {colors.map((color) => (
              <span
                key={color}
                className="size-6 rounded-full border border-line"
                style={{ background: color }}
                title={color}
              />
            ))}
            <span className="text-xs text-muted">{fileName}</span>
          </span>
        ) : null}
      </label>
      {error ? <p className="text-sm text-ember">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-copper px-5 py-3 font-medium text-ink transition hover:bg-paper disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Sparkles className="size-4" />
        )}
        {pending ? (phase ?? "Forging") : "Forge hero"}
      </button>
    </form>
  );
}
