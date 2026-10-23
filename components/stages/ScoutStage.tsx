import Link from "next/link";
import { formatDate, type Idea, type ScoutRun } from "@/lib/data";
import { Badge, Bar, Card, ScorePill } from "../ui";

export default function ScoutStage({ idea, run }: { idea: Idea; run: ScoutRun }) {
  return (
    <div className="space-y-4">
      <Card className="border-indigo-200">
        <div className="flex items-start gap-3">
          <ScorePill score={idea.score} />
          <div>
            <Badge color="indigo">★ Top pick of {formatDate(run.date)}</Badge>
            <p className="mt-1 text-sm text-slate-600">Overall score {idea.score}/100 from the App Ideas bot.</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition (higher = less crowded)" value={idea.subScores.competition} />
          <Bar label="Build effort (higher = easier)" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
        <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">Scoring rationale</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">{idea.rationale}</p>
        <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Sources & signals</h3>
        <ul className="mt-1 space-y-1.5 text-sm">
          {idea.signals.map((s) => (
            <li key={s.url} className="flex gap-2">
              <span className="text-slate-400">•</span>
              <span><a href={s.url} target="_blank" rel="noreferrer" className="text-indigo-700 hover:underline">{s.label}</a> <span className="text-xs text-slate-400">· {s.source}</span></span>
            </li>
          ))}
        </ul>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a href={idea.demoUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-center text-sm font-medium text-indigo-700 hover:bg-indigo-100">Open demo ↗</a>
          <a href={idea.validationUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-center text-sm font-medium text-indigo-700 hover:bg-indigo-100">Validation page ↗</a>
        </div>
      </Card>

      <Card>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Run report · {formatDate(run.date)}</h3>
        <p className="mt-1 text-sm text-slate-700">{run.summary}</p>
        <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs text-slate-500">{run.notes.map((n) => <li key={n}>{n}</li>)}</ul>
        <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">All ideas this run</h3>
        <ol className="mt-2 space-y-1.5">
          {run.ideas.map((x, i) => (
            <li key={x.id}>
              {i === 0 ? (
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50 px-2 py-1.5 text-sm">
                  <ScorePill score={x.score} /> <span className="font-medium">{x.name}</span> <span className="text-xs text-indigo-600">(this idea)</span>
                </div>
              ) : (
                <Link href={`/idea/${x.id}/create/`} className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-slate-500 hover:bg-slate-50">
                  <ScorePill score={x.score} muted />
                  <span className="min-w-0 flex-1"><span className="font-medium text-slate-700">{x.name}</span><span className="block truncate text-xs">{x.rationale}</span></span>
                  <span className="text-slate-300">›</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
