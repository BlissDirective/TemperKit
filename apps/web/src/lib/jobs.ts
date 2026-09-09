import { createDemoJob, type ForgeJob } from "@temperkit/schema";

const jobs = new Map<string, ForgeJob>();

function seed(): void {
  if (!jobs.has("demo")) {
    jobs.set("demo", createDemoJob());
  }
}

export function saveJob(job: ForgeJob): ForgeJob {
  seed();
  jobs.set(job.id, job);
  return job;
}

export function getJob(id: string): ForgeJob | undefined {
  seed();
  return jobs.get(id);
}
