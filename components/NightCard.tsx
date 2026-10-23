import Link from "next/link";
import type { Idea, NightRun } from "@/lib/types";
import { BlockedChip, SourceBars, StepPills } from "./NightParts";

/** One night run: steps, counts by source, blocked sources, new pains (linked), survivors, winner, brief path. */
export default function NightCard({ night, ideas, winner }: { night: NightRun; ideas: Idea[]; winner: Idea | null }) {
  return (
    <article className="rounded-[20px] bg-tile p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[16px] font-semibold tracking-tight text-zinc-50">{night.label ?? "US run"}</h3>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${winner ? "bg-warm text-[#431407]" : "bg-white/[0.09] text-zinc-200"}`}>{winner ? `Winner: ${winner.name ?? winner.painId}` : "Winner: none"}</span>
          </div>
          <p className="mt-1 text-[13px] text-zinc-400">{night.niches.join(" + ")}</p>
        </div>
        <span className="font-mono text-[11px] text-zinc-400">{night.briefPath}</span>
      </div>
      <div className="mt-4"><StepPills steps={night.steps} /></div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <div className="mb-2 flex items-baseline justify-between gap-2 text-[12px] text-zinc-400">
            <span>Complaints by source</span>
            <span><b className="font-semibold tabular-nums text-zinc-100">{night.scout.complaints}</b> complaints · <b className="font-semibold tabular-nums text-zinc-100">{night.scout.provenModels}</b> proven models</span>
          </div>
          <SourceBars bySource={night.scout.bySource} />
          <div className="mt-3"><BlockedChip blocked={night.scout.blocked} /></div>
        </div>
        <div className="min-w-0">
          <div className="mb-2 flex items-baseline justify-between gap-2 text-[12px] text-zinc-400">
            <span>New pains</span>
            <span>Survivors <b className="font-semibold tabular-nums text-zinc-100">{night.analyst.survivors}</b></span>
          </div>
          <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl bg-tile-2">
            {ideas.map((i) => (
              <li key={i.painId}>
                <Link href={`/idea/${i.painId}/`} className="flex items-center gap-3 px-3.5 py-2 transition-colors hover:bg-white/[0.04]">
                  <span className="w-11 shrink-0 text-[11px] font-semibold tabular-nums text-zinc-400">{i.painId}</span>
                  <span className="min-w-0 flex-1 truncate text-[13px] text-zinc-200">{i.name ?? i.label}</span>
                  <ScoreInline score={i.scores.total} verdict={i.verdict} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {night.note && <p className="mt-3 text-[12px] text-zinc-400">{night.note}.</p>}
    </article>
  );
}

function ScoreInline({ score, verdict }: { score: number; verdict: Idea["verdict"] }) {
  const c = verdict === "near-miss" ? "text-[#fcd34d]" : verdict === "killed" ? "text-[#fca5a5]" : verdict === "winner" ? "text-accent-light" : "text-zinc-400";
  return <span className={`shrink-0 text-[13px] font-semibold tabular-nums ${c}`}>{score}<span className="text-[11px] text-zinc-400">/25</span></span>;
}
