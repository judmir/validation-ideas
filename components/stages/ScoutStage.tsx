import Link from "next/link";
import { formatDate, type Idea, type ScoutRun } from "@/lib/data";
import { Badge, Bar, Card, CardHeader, ScorePill, btn } from "../ui";
import { IconChevronRight, IconExternal, IconLink, IconStar } from "../icons";

export default function ScoutStage({ idea, run }: { idea: Idea; run: ScoutRun }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
      <Card className="min-w-0 border-zinc-600/70">
        <div className="flex items-start gap-3">
          <ScorePill score={idea.score} top />
          <div className="min-w-0">
            <Badge color="indigo"><IconStar size={10} fill="currentColor" /> Top pick of {formatDate(run.date)}</Badge>
            <p className="mt-1.5 text-[13px] text-zinc-400">Overall score <span className="tabular-nums text-zinc-100">{idea.score}/100</span> from the App Ideas bot.</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 rounded-lg border border-line bg-surface-2 p-4 sm:grid-cols-2">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition (higher = less crowded)" value={idea.subScores.competition} />
          <Bar label="Build effort (higher = easier)" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
        <h3 className="label mt-6">Scoring rationale</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-300">{idea.rationale}</p>
        <h3 className="label mt-5">Sources & signals</h3>
        <ul className="mt-2 space-y-1.5">
          {idea.signals.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="group flex items-center gap-2.5 rounded-lg bg-surface-2 px-3 py-2 text-[13px] transition-colors hover:bg-surface-3">
                <IconLink size={14} className="shrink-0 text-zinc-500" />
                <span className="min-w-0 flex-1 truncate text-zinc-200 group-hover:text-white">{s.label}</span>
                <span className="shrink-0 text-xs text-zinc-500">{s.source}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a href={idea.demoUrl} target="_blank" rel="noreferrer" className={btn.primary}>Open demo <IconExternal size={13} /></a>
          <a href={idea.validationUrl} target="_blank" rel="noreferrer" className={btn.ghost}>Validation page <IconExternal size={13} /></a>
        </div>
      </Card>

      <Card className="min-w-0">
        <CardHeader title="Run report" sub={formatDate(run.date)} />
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">{run.summary}</p>
        <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs text-zinc-400">{run.notes.map((n) => <li key={n}>{n}</li>)}</ul>
        <h3 className="label mt-5">All ideas this run</h3>
        <ol className="mt-2 space-y-1.5">
          {run.ideas.map((x, i) => (
            <li key={x.id}>
              {i === 0 ? (
                <div className="flex items-center gap-3 rounded-lg border border-zinc-600/70 bg-surface-2 px-2 py-1.5 text-[13px]">
                  <ScorePill score={x.score} top /><span className="min-w-0 truncate font-medium text-zinc-100">{x.name}</span> <span className="ml-auto shrink-0 pr-1 text-xs text-zinc-400">this idea</span>
                </div>
              ) : (
                <Link href={`/idea/${x.id}/create/`} className="group flex items-center gap-3 rounded-lg border border-transparent px-2 py-1.5 text-[13px] text-zinc-400 transition hover:border-line hover:bg-surface-2/50">
                  <ScorePill score={x.score} muted />
                  <span className="min-w-0 flex-1"><span className="text-zinc-300">{x.name}</span><span className="block truncate text-xs text-zinc-400">{x.rationale}</span></span>
                  <IconChevronRight size={14} className="shrink-0 text-zinc-500 group-hover:text-zinc-300" />
                </Link>
              )}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
