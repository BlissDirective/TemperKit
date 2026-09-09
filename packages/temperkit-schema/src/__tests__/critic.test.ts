import { describe, expect, it } from "vitest";
import { scoreCritic } from "../critic";
import { forgeFromIngest } from "../forge";
import { CRITIC_THRESHOLD } from "../types";

describe("scoreCritic", () => {
  it("scores a complete brief at or above the ship threshold", () => {
    const job = forgeFromIngest({
      url: "https://www.nocturne.paris",
      description:
        "Heritage navy perfume bottle with gold collar. Slow studio turntable, warm key, quiet luxury.",
      goalImage: { name: "goal.jpg", colors: ["#1e3a5f", "#c6a35d"] },
    });
    expect(job.critic.stub).toBe(true);
    expect(job.critic.threshold).toBe(CRITIC_THRESHOLD);
    expect(job.critic.overall).toBeGreaterThanOrEqual(CRITIC_THRESHOLD);
    expect(job.critic.ship).toBe(true);
    const total =
      job.critic.dimensions.brandMatch +
      job.critic.dimensions.composition +
      job.critic.dimensions.motion +
      job.critic.dimensions.accessibility +
      job.critic.dimensions.performance;
    expect(total).toBe(job.critic.overall);
  });

  it("ships a complete brief with named colors even without a goal image", () => {
    const job = forgeFromIngest({
      url: "https://www.nocturne.paris",
      description:
        "Heritage navy perfume bottle with gold collar. Slow studio turntable, warm key, quiet luxury.",
    });
    expect(job.critic.overall).toBeGreaterThanOrEqual(CRITIC_THRESHOLD);
    expect(job.critic.ship).toBe(true);
  });

  it("scores higher when a goal image is present", () => {
    const base = {
      url: "https://www.nocturne.paris",
      description:
        "Heritage navy perfume bottle with gold collar and warm light.",
    };
    const without = forgeFromIngest(base);
    const withImage = forgeFromIngest({
      ...base,
      goalImage: { name: "goal.jpg", colors: ["#1e3a5f"] },
    });
    expect(withImage.critic.dimensions.brandMatch).toBeGreaterThan(
      without.critic.dimensions.brandMatch,
    );
  });

  it("always marks the critic as a stub", () => {
    const job = forgeFromIngest({
      url: "https://example.com",
      description: "A simple product on a pedestal in studio light",
    });
    expect(scoreCritic(job.ingest, job.scene).stub).toBe(true);
  });
});
