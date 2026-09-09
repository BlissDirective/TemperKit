import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ForgeStudio } from "@/components/forge-studio";
import { SiteHeader } from "@/components/site-header";
import { getJob } from "@/lib/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ForgeJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) {
    notFound();
  }
  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    "localhost:3000";
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  const origin = `${proto}://${host}`;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 md:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-copper">
          Job {job.id}
        </p>
        <h1 className="mt-2 font-serif text-4xl">{job.brand.name}</h1>
        <p className="mt-2 max-w-2xl text-muted">{job.ingest.description}</p>
        <p className="mt-4 mb-6 text-sm text-muted">
          <Link href="/forge" className="text-copper hover:text-paper">
            ← New brief
          </Link>
        </p>
        <ForgeStudio job={job} origin={origin} />
      </main>
    </div>
  );
}
