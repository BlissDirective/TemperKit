"use client";

import { buildExportBundle, type ForgeJob } from "@temperkit/schema";
import { Check, Copy, Download } from "lucide-react";
import { useMemo, useState } from "react";

export function ExportPanel({
  job,
  origin,
}: {
  job: ForgeJob;
  origin: string;
}) {
  const bundle = useMemo(() => buildExportBundle(job, origin), [job, origin]);
  const [tab, setTab] = useState<"embed" | "source">("embed");
  const [copied, setCopied] = useState(false);
  const source = bundle.sourceFiles[0]?.contents ?? "";
  const displayed = tab === "embed" ? bundle.embedHtml : source;

  async function copy() {
    await navigator.clipboard.writeText(displayed);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function download() {
    for (const file of bundle.sourceFiles) {
      const blob = new Blob([file.contents], { type: "text/plain" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = file.path;
      link.click();
      URL.revokeObjectURL(href);
    }
  }

  return (
    <section className="tk-ring rounded-3xl p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Export</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("embed")}
          className={`rounded-full px-3 py-1.5 text-sm ${tab === "embed" ? "bg-copper text-ink" : "text-muted"}`}
        >
          Embed
        </button>
        <button
          type="button"
          onClick={() => setTab("source")}
          className={`rounded-full px-3 py-1.5 text-sm ${tab === "source" ? "bg-copper text-ink" : "text-muted"}`}
        >
          Source
        </button>
      </div>
      <pre className="mt-3 max-h-48 overflow-auto rounded-2xl bg-ink p-3 text-[11px] leading-5 text-paper/90">
        {displayed}
      </pre>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            void copy();
          }}
          className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
        {tab === "source" ? (
          <button
            type="button"
            onClick={download}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm"
          >
            <Download className="size-4" />
            Download
          </button>
        ) : null}
      </div>
    </section>
  );
}
