"use client";
import Link from "next/link";
import { RUNS, formatDate, type Idea } from "@/lib/data";
import { useQueue } from "@/lib/store";
import StatusBadge from "./StatusBadge";
import { Badge, Bar, CardHeader, ScorePill } from "./ui";
import { IconArrowRight, IconChevronRight, IconClock, IconExternal, IconStar } from "./icons";

export default function RunList() {
  const runs = [...RUNS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <ol className="space-y-4 lg:space-y-5">
      {runs.map((run) => {
        const [top, ...rest] = run.ideas;
        return (
          <li key={run.id} className="rounded-xl border border-line bg-surface p-3 sm:p-4">
            <div className="px-1 pt-1 sm:px-1.5">
              <CardHeader title={formatDate(run.date)} right={<span className="text-xs text-zinc-500">Scout run · 3 ideas</span>} />
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">{run.summary}</p>
              <details className="group mt-1.5 text-xs text-zinc-500">
                <summary className="inline-flex cursor-pointer select-none list-none items-center gap-1 font-medium text-zinc-500 transition-colors hover:text-zinc-300">
                  <IconChevronRight size={12} className="transition group-open:rotate-90" /> Run notes
                </summary>
                <ul className="ml-4 mt-1.5 list-disc space-y-0.5 text-zinc-400">{run.notes.map((n) => <li key={n}>{n}</li>)}</ul>
              </details>
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-4">
              <TopCard idea={top} />
              <div className="flex min-w-0 flex-col">
                <div className="mb-2 hidden grid-cols-[1fr_auto] px-3 text-xs text-zinc-400 lg:grid"><span>Other ideas</span><span>Score</span></div>
                <div className="space-y-1.5">
                  {rest.map((idea, i) => <MutedRow key={idea.id} idea={idea} rank={i + 2} />)}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function TopCard({ idea }: { idea: Idea }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-zinc-600/70 bg-surface-2 shadow-[0_0_0_1px_rgb(255_255_255/0.03),0_10px_30px_-18px_rgb(255_255_255/0.25)]">
      <Link href={`/idea/${idea.id}/`} className="block p-3.5 transition-colors hover:bg-white/[0.015] sm:p-4">
        <div className="flex items-start gap-3">
          <ScorePill score={idea.score} top />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge color="indigo"><IconStar size={10} fill="currentColor" /> Top pick</Badge>
              <StatusBadge idea={idea} />
            </div>
            <h3 className="mt-1.5 text-[17px] font-medium leading-tight tracking-tight text-zinc-50">{idea.name}</h3>
            <p className="mt-0.5 text-[13px] text-zinc-400">{idea.pitch}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition" value={idea.subScores.competition} />
          <Bar label="Build effort" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
      </Link>
      <div className="flex flex-wrap items-center gap-2 border-t border-line px-3.5 py-2.5 text-xs sm:px-4">
        <a href={idea.demoUrl} target="_blank" rel="noreferrer" className="inline-flex h-7 items-center gap-1.5 rounded-md border border-line-strong bg-surface-3 px-2.5 font-medium text-zinc-300 transition-colors hover:text-white"><IconExternal size={12} />Demo</a>
        <a href={idea.validationUrl} target="_blank" rel="noreferrer" className="inline-flex h-7 items-center gap-1.5 rounded-md border border-line-strong bg-surface-3 px-2.5 font-medium text-zinc-300 transition-colors hover:text-white"><IconExternal size={12} />Validation page</a>
        <Link href={`/idea/${idea.id}/`} className="ml-auto inline-flex items-center gap-1 font-medium text-zinc-100 hover:text-white">Open flow <IconArrowRight size={12} /></Link>
      </div>
    </div>
  );
}

function MutedRow({ idea, rank }: { idea: Idea; rank: number }) {
  const [q, , loaded] = useQueue(idea.id);
  return (
    <Link href={`/idea/${idea.id}/create/`} className="group flex items-center gap-3 rounded-lg border border-transparent bg-surface-2/50 px-3 py-2.5 text-zinc-400 transition hover:border-line hover:bg-surface-2">
      <span className="w-5 shrink-0 text-center text-xs tabular-nums text-zinc-400">#{rank}</span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-[13px] text-zinc-300 group-hover:text-zinc-100">{idea.name}</span>
          {loaded && q.status === "queued" ? <Badge color="blue"><IconClock size={10} /> Queued</Badge> : <span className="text-[11px] text-zinc-400">No demo or validation page yet</span>}
        </div>
        <p className="truncate text-xs text-zinc-400">{idea.pitch}</p>
      </div>
      <ScorePill score={idea.score} muted />
      <IconChevronRight size={14} className="shrink-0 text-zinc-500 transition-colors group-hover:text-zinc-300" />
    </Link>
  );
}
