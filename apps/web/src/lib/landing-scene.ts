import { createDemoJob, type SceneSpec } from "@temperkit/schema";

export function landingScene(): SceneSpec {
  return createDemoJob().scene;
}
