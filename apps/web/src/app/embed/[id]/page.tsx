import { notFound } from "next/navigation";
import { SceneCanvas } from "@/components/scene-canvas";
import { getJob } from "@/lib/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) {
    notFound();
  }

  return (
    <div className="h-screen w-screen bg-ink">
      <SceneCanvas spec={job.scene} className="h-full w-full" />
    </div>
  );
}
