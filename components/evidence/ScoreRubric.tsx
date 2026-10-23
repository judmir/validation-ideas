import { RULES, type Idea, type ScoreKey } from "@/lib/types";

const ROWS: { k: ScoreKey; label: string }[] = [
  { k: "frequency", label: "Frequency" },
  { k: "intensity", label: "Intensity" },
  { k: "willingness_to_pay", label: "Willingness to pay" },
  { k: "reachability", label: "Reachability" },
  { k: "buildability", label: "Buildability" },
];

/** 5 rows of 1–5 dots, note on expand, total /25 against the 18 bar. */
export default function ScoreRubric({ idea }: { idea: Idea }) {
  const t = idea.scores.total;
  const pass = t >= RULES.passBar;
  return (
    <div>
      <ul className="divide-y divide-white/[0.06] rounded-2xl bg-tile-2">
        {ROWS.map(({ k, label }) => {
          const v = idea.scores[k];
          const note = idea.score_notes[k];
          const inner = (
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="min-w-0 flex-1 truncate text-[13px] text-zinc-200">{label}</span>
              <span className="flex shrink-0 gap-1" role="img" aria-label={`${v} of 5`}>
                {[1, 2, 3, 4, 5].map((i) => <span key={i} className={`h-2.5 w-2.5 rounded-full ${i <= v ? "bg-accent-light" : "bg-white/[0.1]"}`} />)}
              </span>
              <span className="w-4 shrink-0 text-right text-[13px] font-semibold tabular-nums text-zinc-50">{v}</span>
              {note && <span className="shrink-0 text-zinc-400 transition group-open:rotate-90" aria-hidden>›</span>}
            </div>
          );
          return (
            <li key={k}>
              {note ? (
                <details className="group">
                  <summary className="cursor-pointer list-none">{inner}</summary>
                  <p className="px-4 pb-3 text-[12px] leading-relaxed text-zinc-300">{note}</p>
                </details>
              ) : inner}
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
          <div className={`h-2.5 rounded-full ${pass ? "bg-accent-light" : "bg-[#fbbf24]"}`} style={{ width: `${(t / RULES.maxScore) * 100}%` }} />
          <span className="absolute -bottom-1 -top-1 w-[2px] rounded-full bg-zinc-100" style={{ left: `${(RULES.passBar / RULES.maxScore) * 100}%` }} aria-hidden />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-zinc-400"><span>{pass ? "At or above the bar" : `${RULES.passBar - t} below the bar`}</span><span>bar {RULES.passBar}</span></div>
        {idea.score_notes.method && <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">Method: {idea.score_notes.method}</p>}
      </div>
    </div>
  );
}
