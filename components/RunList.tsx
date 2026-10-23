"use client";
import Link from "next/link";
import { RUNS, formatDate, type Idea } from "@/lib/data";
import { useQueue } from "@/lib/store";
import StatusBadge from "./StatusBadge";
import { Badge, Bar, ScorePill } from "./ui";

export default function RunList() {
  const runs = [...RUNS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <ol className="relative space-y-8 border-l border-slate-200 pl-5">
      {runs.map((run) => {
        const [top, ...rest] = run.ideas;
        return (
          <li key={run.id} className="relative">
            <span className="absolute -left-[26.5px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-indigo-500 ring-1 ring-indigo-200" />
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3">
              <h2 className="font-semibold">{formatDate(run.date)}</h2>
              <span className="text-xs text-slate-500">Scout run · 3 ideas</span>
            </div>
            <p className="mb-2 text-sm text-slate-600">{run.summary}</p>
            <details className="group mb-3 text-xs text-slate-500">
              <summary className="cursor-pointer select-none list-none font-medium text-slate-500 hover:text-slate-700">
                <span className="inline-block transition group-open:rotate-90">›</span> Run notes
              </summary>
              <ul className="ml-4 mt-1 list-disc space-y-0.5">{run.notes.map((n) => <li key={n}>{n}</li>)}</ul>
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
    <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-500 bg-white shadow-sm shadow-indigo-100">
      <Link href={`/idea/${idea.id}/`} className="block p-4 transition hover:bg-indigo-50/40">
        <div className="flex items-start gap-3">
          <ScorePill score={idea.score} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge color="indigo">★ Top pick</Badge>
              <StatusBadge idea={idea} />
            </div>
            <h3 className="mt-1 text-lg font-semibold leading-tight">{idea.name}</h3>
            <p className="text-sm text-slate-600">{idea.pitch}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition" value={idea.subScores.competition} />
          <Bar label="Build effort" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
      </Link>
      <div className="flex flex-wrap items-center gap-2 border-t border-indigo-100 bg-indigo-50/60 px-4 py-2.5 text-xs">
        <a href={idea.demoUrl} target="_blank" rel="noreferrer" className="rounded-md bg-white px-2 py-1 font-medium text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50">Demo ↗</a>
        <a href={idea.validationUrl} target="_blank" rel="noreferrer" className="rounded-md bg-white px-2 py-1 font-medium text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50">Validation page ↗</a>
        <Link href={`/idea/${idea.id}/`} className="ml-auto font-semibold text-indigo-700 hover:underline">Open flow →</Link>
      </div>
    </div>
  );
}

function MutedRow({ idea, rank }: { idea: Idea; rank: number }) {
  const [q, , loaded] = useQueue(idea.id);
  return (
    <Link href={`/idea/${idea.id}/create/`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-slate-500 transition hover:border-slate-300 hover:bg-white">
      <span className="w-5 text-center text-xs font-medium text-slate-400">#{rank}</span>
      <ScorePill score={idea.score} muted />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-slate-700">{idea.name}</span>
          {loaded && q.status === "queued" ? <Badge color="blue">⏳ Queued</Badge> : <span className="text-[11px] text-slate-400">No demo or validation page yet</span>}
        </div>
        <p className="truncate text-xs">{idea.pitch}</p>
      </div>
      <span className="text-slate-300">›</span>
    </Link>
  );
}
