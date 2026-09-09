import { CRITIC_THRESHOLD, type CriticScore } from "@temperkit/schema";

const LABELS: Record<keyof CriticScore["dimensions"], string> = {
  brandMatch: "Brand match",
  composition: "Composition",
  motion: "Motion",
  accessibility: "Accessibility",
  performance: "Performance",
};

export function CriticPanel({ critic }: { critic: CriticScore }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = critic.overall / 100;

  return (
    <section className="tk-ring rounded-3xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Critic stub
          </p>
          <h2 className="mt-1 font-serif text-2xl">Score</h2>
        </div>
        <div className="relative size-24">
          <svg
            viewBox="0 0 100 100"
            className="size-24 -rotate-90"
            role="img"
            aria-label={`Critic score ${Math.round(critic.overall)} of 100`}
          >
            <title>Critic score</title>
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={critic.ship ? "var(--color-ok)" : "var(--color-ember)"}
              strokeWidth="8"
              strokeDasharray={`${circumference * progress} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-serif text-2xl">
              {Math.round(critic.overall)}
            </span>
          </div>
        </div>
      </div>
      <p className={`mt-2 text-sm ${critic.ship ? "text-ok" : "text-ember"}`}>
        {critic.ship
          ? `Ship gate met (${CRITIC_THRESHOLD}+).`
          : `Below ship gate of ${CRITIC_THRESHOLD}.`}
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {(Object.keys(LABELS) as Array<keyof CriticScore["dimensions"]>).map(
          (key) => (
            <li key={key}>
              <div className="mb-1 flex justify-between text-xs text-muted">
                <span>{LABELS[key]}</span>
                <span>{critic.dimensions[key]}/20</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-copper"
                  style={{ width: `${(critic.dimensions[key] / 20) * 100}%` }}
                />
              </div>
            </li>
          ),
        )}
      </ul>
      <ul className="mt-4 flex flex-col gap-1 text-xs text-muted">
        {critic.notes.map((note) => (
          <li key={note}>· {note}</li>
        ))}
      </ul>
    </section>
  );
}
