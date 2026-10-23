import Link from "next/link";
import { formatDate, type Idea, type ScoutRun } from "@/lib/data";
import { Badge, Bar, Card, CardHeader, Ring, ScorePill, btn } from "../ui";
import { IconChevronRight, IconExternal, IconLink, IconStar } from "../icons";

export default function ScoutStage({ idea, run }: { idea: Idea; run: ScoutRun }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
      <Card className="min-w-0">
        <div className="flex flex-wrap items-center gap-5">
          <Ring size={124} stroke={14} rings={[{ value: idea.score, color: "var(--color-accent)" }]} label={`Overall score ${idea.score} of 100`}>
            <div><div className="text-[30px] font-semibold leading-none tabular-nums text-zinc-50">{idea.score}</div><div className="mt-1 text-[11px] text-zinc-400">of 100</div></div>
          </Ring>
          <div className="min-w-0 flex-1">
            <Badge color="indigo"><IconStar size={10} fill="currentColor" /> Top pick of {formatDate(run.date)}</Badge>
            <p className="mt-2 text-[14px] leading-relaxed text-zinc-300">Overall score <span className="font-semibold tabular-nums text-zinc-50">{idea.score}/100</span> from the App Ideas bot.</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 rounded-2xl bg-tile-2 p-5 sm:grid-cols-2">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition (higher = less crowded)" value={idea.subScores.competition} />
          <Bar label="Build effort (higher = easier)" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
        <h3 className="label mt-7">Scoring rationale</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-zinc-300">{idea.rationale}</p>
        <h3 className="label mt-6">Sources & signals</h3>
        <ul className="mt-2.5 space-y-2">
          {idea.signals.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-2xl bg-tile-2 px-4 py-3 text-[13px] transition-colors hover:bg-[#36363c]">
                <IconLink size={14} className="shrink-0 text-accent-light" />
                <span className="min-w-0 flex-1 truncate text-zinc-200 group-hover:text-white">{s.label}</span>
                <span className="shrink-0 text-xs text-zinc-400">{s.source}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <a href={idea.demoUrl} target="_blank" rel="noreferrer" className={btn.primary}>Open demo <IconExternal size={13} /></a>
          <a href={idea.validationUrl} target="_blank" rel="noreferrer" className={btn.ghost}>Validation page <IconExternal size={13} /></a>
        </div>
      </Card>

      <Card className="min-w-0">
        <CardHeader title="Run report" sub={formatDate(run.date)} />
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">{run.summary}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-400">{run.notes.map((n) => <li key={n}>{n}</li>)}</ul>
        <h3 className="label mt-6">All ideas this run</h3>
        <ol className="mt-2.5 space-y-2">
          {run.ideas.map((x, i) => (
            <li key={x.id}>
              {i === 0 ? (
                <div className="flex items-center gap-3 rounded-2xl bg-[#2c2840] px-2.5 py-2 text-[13px] ring-1 ring-inset ring-accent/35">
                  <ScorePill score={x.score} top /><span className="min-w-0 truncate font-semibold text-zinc-50">{x.name}</span> <span className="ml-auto shrink-0 pr-1 text-xs text-zinc-300">this idea</span>
                </div>
              ) : (
                <Link href={`/idea/${x.id}/create/`} className="group flex items-center gap-3 rounded-2xl bg-tile-2/60 px-2.5 py-2 text-[13px] transition-colors hover:bg-tile-2">
                  <ScorePill score={x.score} muted />
                  <span className="min-w-0 flex-1"><span className="font-semibold text-zinc-200">{x.name}</span><span className="block truncate text-xs text-zinc-400">{x.rationale}</span></span>
                  <IconChevronRight size={14} className="shrink-0 text-zinc-400 group-hover:text-zinc-200" />
                </Link>
              )}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
