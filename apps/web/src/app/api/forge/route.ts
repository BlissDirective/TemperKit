import { forgeFromIngest, ingestInputSchema } from "@temperkit/schema";
import { NextResponse } from "next/server";
import { saveJob } from "@/lib/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected JSON." }, { status: 400 });
  }

  const parsed = ingestInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid ingest payload.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const job = saveJob(forgeFromIngest(parsed.data));
  return NextResponse.json(job);
}
