import Link from "next/link";
import { formatDate, type Idea, type ScoutRun } from "@/lib/data";
import { Badge, Bar, Card, ScorePill } from "../ui";

export default function ScoutStage({ idea, run }: { idea: Idea; run: ScoutRun }) {
  return (
    <div className="space-y-4">
      <Card className="border-accent/40">
        <div className="flex items-start gap-3">
          <ScorePill score={idea.score} />
          <div>
            <Badge color="indigo">★ Top pick of {formatDate(run.date)}</Badge>
            <p className="mt-1.5 text-sm text-zinc-400">Overall score {idea.score}/100 from the App Ideas bot.</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition (higher = less crowded)" value={idea.subScores.competition} />
          <Bar label="Build effort (higher = easier)" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
        <h3 className="label mt-6">Scoring rationale</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{idea.rationale}</p>
        <h3 className="label mt-5">Sources & signals</h3>
        <ul className="mt-1 space-y-1.5 text-sm">
          {idea.signals.map((s) => (
            <li key={s.url} className="flex gap-2">
              <span className="text-zinc-600">•</span>
              <span><a href={s.url} target="_blank" rel="noreferrer" className="text-accent-soft underline-offset-2 hover:text-white hover:underline">{s.label}</a> <span className="text-xs text-zinc-500">· {s.source}</span></span>
            </li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a href={idea.demoUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-accent px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-accent-hover">Open demo ↗</a>
          <a href={idea.validationUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-line-strong px-3 py-2.5 text-center text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.06]">Validation page ↗</a>
        </div>
      </Card>

      <Card>
        <h3 className="label">Run report · {formatDate(run.date)}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{run.summary}</p>
        <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs text-zinc-400">{run.notes.map((n) => <li key={n}>{n}</li>)}</ul>
        <h3 className="label mt-5">All ideas this run</h3>
        <ol className="mt-2 space-y-1.5">
          {run.ideas.map((x, i) => (
            <li key={x.id}>
              {i === 0 ? (
                <div className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/[0.06] px-2 py-1.5 text-sm">
                  <ScorePill score={x.score} /> <span className="font-medium text-zinc-100">{x.name}</span> <span className="text-xs text-accent-soft">(this idea)</span>
                </div>
              ) : (
                <Link href={`/idea/${x.id}/create/`} className="flex items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 text-sm text-zinc-500 transition-colors hover:border-line hover:bg-white/[0.02]">
                  <ScorePill score={x.score} muted />
                  <span className="min-w-0 flex-1"><span className="font-medium text-zinc-400">{x.name}</span><span className="block truncate text-xs">{x.rationale}</span></span>
                  <span className="text-zinc-600">›</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
