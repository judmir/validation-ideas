import type { Idea, NightRun } from "@/lib/types";
import { SourceBars, StepPills } from "./NightParts";
import { IconChevronRight } from "./icons";

/** One night run, calm: label, niches, steps and a one-line count; sources, blocked list and brief path collapsed. */
export default function NightCard({ night, ideas, winner }: { night: NightRun; ideas: Idea[]; winner: Idea | null }) {
  return (
    <article className="rounded-[20px] bg-tile p-4 sm:p-5">
      <div className="min-w-0">
        <h3 className="text-[16px] font-semibold tracking-tight text-zinc-50">{night.label ?? "US run"}</h3>
        <p className="mt-1 text-[13px] text-zinc-400">{night.niches.join(" + ")}</p>
      </div>
      <div className="mt-4"><StepPills steps={night.steps} /></div>
      <p className="mt-4 text-[13px] text-zinc-300">
        <b className="font-semibold tabular-nums text-zinc-50">{night.scout.complaints}</b> complaints · <b className="font-semibold tabular-nums text-zinc-50">{night.scout.provenModels}</b> proven models · <b className="font-semibold tabular-nums text-zinc-50">{ideas.length}</b> new pains · <b className="font-semibold tabular-nums text-zinc-50">{night.analyst.survivors}</b> survivors · {winner ? `winner ${winner.name ?? winner.painId}` : "no winner"}
      </p>
      {night.note && <p className="mt-1 text-[12px] text-zinc-400">{night.note}.</p>}
      <details className="group mt-4 border-t border-white/[0.06] pt-3">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-[13px] font-semibold text-zinc-300 hover:text-zinc-50">
          <span className="min-w-0 flex-1">Sources{night.scout.blocked.length ? <span className="font-medium text-zinc-400"> · {night.scout.blocked.length} blocked</span> : null}</span>
          <IconChevronRight size={14} className="shrink-0 text-zinc-400 transition group-open:rotate-90" />
        </summary>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="min-w-0"><SourceBars bySource={night.scout.bySource} /></div>
          <div className="min-w-0">
            {night.scout.blocked.length ? (
              <ul className="space-y-1.5 text-[12px]">
                {night.scout.blocked.map((b) => <li key={b.source} className="leading-snug"><span className="font-semibold text-zinc-200">{b.source}</span> <span className="text-zinc-400">· {b.reason}</span></li>)}
              </ul>
            ) : <span className="text-[12px] text-zinc-400">No blocked sources</span>}
            <p className="mt-3 font-mono text-[11px] text-zinc-400">{night.briefPath}</p>
          </div>
        </div>
      </details>
    </article>
  );
}
