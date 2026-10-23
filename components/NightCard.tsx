import Link from "next/link";
import type { Idea, NightRun } from "@/lib/types";
import { BlockedChip, SourceBars, StepPills } from "./NightParts";

/** One scout run: steps, posts by source, notes, the ideas it scored (linked) and its top pick. */
export default function NightCard({ night, ideas, winner }: { night: NightRun; ideas: Idea[]; winner: Idea | null }) {
  return (
    <article className="rounded-[20px] bg-tile p-4 sm:p-5">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[16px] font-semibold tracking-tight text-zinc-50">{night.label}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${winner ? "bg-warm text-[#431407]" : "bg-white/[0.09] text-zinc-200"}`}>{winner ? `Top pick: ${winner.name}` : "Top pick: none"}</span>
        </div>
        <p className="mt-1 text-[13px] text-zinc-400">{night.niches.join(" + ")}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{night.summary}</p>
      </div>
      <div className="mt-4"><StepPills steps={night.steps} /></div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 text-[12px] text-zinc-400">
            <span>Posts by source</span>
            <span><b className="font-semibold tabular-nums text-zinc-100">{night.scout.scanned}</b> scanned · <b className="font-semibold tabular-nums text-zinc-100">{night.scout.candidates}</b> candidates · <b className="font-semibold tabular-nums text-zinc-100">{night.scout.deepScored}</b> deep-scored</span>
          </div>
          <SourceBars bySource={night.scout.bySource} />
          <div className="mt-3"><BlockedChip blocked={night.scout.blocked} /></div>
          <ul className="mt-3 space-y-1 text-[12px] leading-snug text-zinc-400">
            {night.notes.map((n) => <li key={n} className="flex gap-2"><span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-zinc-500" aria-hidden />{n}</li>)}
          </ul>
        </div>
        <div className="min-w-0">
          <div className="mb-2 text-[12px] text-zinc-400">Ideas scored</div>
          <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl bg-tile-2">
            {ideas.map((i) => (
              <li key={i.id}>
                <Link href={`/idea/${i.id}/`} className="flex items-center gap-3 px-3.5 py-2 transition-colors hover:bg-white/[0.04]">
                  <span className="w-6 shrink-0 text-[11px] font-semibold tabular-nums text-zinc-400">#{i.rank}</span>
                  <span className="min-w-0 flex-1 truncate text-[13px] text-zinc-200">{i.name}</span>
                  <ScoreInline score={i.scores.total} verdict={i.verdict} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function ScoreInline({ score, verdict }: { score: number; verdict: Idea["verdict"] }) {
  const c = verdict === "near-miss" ? "text-[#fcd34d]" : verdict === "killed" ? "text-[#fca5a5]" : verdict === "winner" ? "text-accent-light" : "text-zinc-400";
  return <span className={`shrink-0 text-[13px] font-semibold tabular-nums ${c}`}>{score}<span className="text-[11px] text-zinc-400">/100</span></span>;
}
