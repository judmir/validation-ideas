"use client";
import Link from "next/link";
import { RUNS, formatDate, type Idea } from "@/lib/data";
import { useQueue } from "@/lib/store";
import StatusBadge from "./StatusBadge";
import { Badge, Bar, ScorePill } from "./ui";

export default function RunList() {
  const runs = [...RUNS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <ol className="relative space-y-10 border-l border-line pl-5">
      {runs.map((run) => {
        const [top, ...rest] = run.ideas;
        return (
          <li key={run.id} className="relative">
            <span className="absolute -left-[25.5px] top-[7px] h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg" />
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3">
              <h2 className="text-[15px] font-semibold text-zinc-100">{formatDate(run.date)}</h2>
              <span className="label">Scout run · 3 ideas</span>
            </div>
            <p className="mb-2 text-sm leading-relaxed text-zinc-400">{run.summary}</p>
            <details className="group mb-4 text-xs text-zinc-500">
              <summary className="cursor-pointer select-none list-none font-medium text-zinc-500 transition-colors hover:text-zinc-300">
                <span className="inline-block transition group-open:rotate-90">›</span> Run notes
              </summary>
              <ul className="ml-4 mt-1.5 list-disc space-y-0.5 text-zinc-400">{run.notes.map((n) => <li key={n}>{n}</li>)}</ul>
            </details>

            <TopCard idea={top} />
            <div className="mt-2 space-y-2">
              {rest.map((idea, i) => <MutedRow key={idea.id} idea={idea} rank={i + 2} />)}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function TopCard({ idea }: { idea: Idea }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/50 bg-surface shadow-[0_0_0_1px_rgb(139_92_246/0.15),0_8px_30px_-12px_rgb(139_92_246/0.35)]">
      <span className="absolute inset-y-0 left-0 w-[3px] bg-accent" />
      <Link href={`/idea/${idea.id}/`} className="block p-4 transition-colors hover:bg-white/[0.02] sm:p-5">
        <div className="flex items-start gap-3">
          <ScorePill score={idea.score} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge color="indigo">★ Top pick</Badge>
              <StatusBadge idea={idea} />
            </div>
            <h3 className="mt-1.5 text-lg font-semibold leading-tight tracking-tight text-zinc-50">{idea.name}</h3>
            <p className="mt-0.5 text-sm text-zinc-400">{idea.pitch}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition" value={idea.subScores.competition} />
          <Bar label="Build effort" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
      </Link>
      <div className="flex flex-wrap items-center gap-2 border-t border-line bg-white/[0.015] px-4 py-2.5 text-xs sm:px-5">
        <a href={idea.demoUrl} target="_blank" rel="noreferrer" className="rounded-md border border-line-strong px-2 py-1 font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-zinc-100">Demo ↗</a>
        <a href={idea.validationUrl} target="_blank" rel="noreferrer" className="rounded-md border border-line-strong px-2 py-1 font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-zinc-100">Validation page ↗</a>
        <Link href={`/idea/${idea.id}/`} className="ml-auto font-medium text-accent-soft hover:text-white">Open flow →</Link>
      </div>
    </div>
  );
}

function MutedRow({ idea, rank }: { idea: Idea; rank: number }) {
  const [q, , loaded] = useQueue(idea.id);
  return (
    <Link href={`/idea/${idea.id}/create/`} className="group flex items-center gap-3 rounded-xl border border-line bg-transparent px-3 py-2.5 text-zinc-500 transition-colors hover:border-line-strong hover:bg-white/[0.02]">
      <span className="w-5 text-center text-xs font-medium tabular-nums text-zinc-600">#{rank}</span>
      <ScorePill score={idea.score} muted />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300">{idea.name}</span>
          {loaded && q.status === "queued" ? <Badge color="blue">⏳ Queued</Badge> : <span className="text-[11px] text-zinc-600">No demo or validation page yet</span>}
        </div>
        <p className="truncate text-xs text-zinc-500">{idea.pitch}</p>
      </div>
      <span className="text-zinc-600 transition-colors group-hover:text-zinc-400">›</span>
    </Link>
  );
}
