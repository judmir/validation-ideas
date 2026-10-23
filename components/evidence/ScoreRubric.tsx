import { RULES, type Idea, type ScoreKey } from "@/lib/types";

const ROWS: { k: ScoreKey; label: string }[] = [
  { k: "demand", label: "Demand" },
  { k: "competition", label: "Competition gap" },
  { k: "buildEffort", label: "Build effort (higher = easier)" },
  { k: "monetization", label: "Monetization" },
];

/** 4 sub-scores 0–100, the scout's rationale, and the total /100 against the 75 bar. */
export default function ScoreRubric({ idea }: { idea: Idea }) {
  const t = idea.scores.total;
  const pass = t >= RULES.passBar;
  return (
    <div>
      <ul className="space-y-3 rounded-2xl bg-tile-2 p-4">
        {ROWS.map(({ k, label }) => {
          const v = idea.scores[k];
          return (
            <li key={k}>
              <div className="flex items-baseline justify-between gap-2 text-[13px]">
                <span className="min-w-0 truncate text-zinc-200">{label}</span>
                <span className="shrink-0 font-semibold tabular-nums text-zinc-50">{v}</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.08]" role="img" aria-label={`${label}: ${v} of 100`}>
                <div className="h-1.5 rounded-full bg-accent-light" style={{ width: `${v}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 rounded-2xl bg-tile-2 px-4 py-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[13px] text-zinc-300">Total</span>
          <span className="tabular-nums"><b className="text-[22px] font-medium text-zinc-50">{t}</b><span className="text-[12px] text-zinc-400">/{RULES.maxScore}</span></span>
        </div>
        <div className="relative mt-2 h-2.5 rounded-full bg-white/[0.08]">
          <div className={`h-2.5 rounded-full ${pass ? "bg-accent-light" : t >= RULES.nearMissMin ? "bg-[#fbbf24]" : "bg-zinc-500"}`} style={{ width: `${(t / RULES.maxScore) * 100}%` }} />
          <span className="absolute -bottom-1 -top-1 w-[2px] rounded-full bg-zinc-100" style={{ left: `${(RULES.passBar / RULES.maxScore) * 100}%` }} aria-hidden />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-zinc-400"><span>{pass ? "At or above the bar" : `${RULES.passBar - t} below the bar`}</span><span>bar {RULES.passBar}</span></div>
      </div>
      <div className="mt-3 rounded-2xl bg-tile-2 p-4">
        <div className="label">Why this score</div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-200">{idea.rationale}</p>
      </div>
    </div>
  );
}
