"use client";
import Link from "next/link";
import { RUNS, formatDate, type Idea } from "@/lib/data";
import { useQueue } from "@/lib/store";
import StatusBadge from "./StatusBadge";
import { useSearch } from "./Search";
import { Badge, Bar, Ring, ScorePill, Tag } from "./ui";
import { IconArrowRight, IconChevronRight, IconClock, IconExternal, IconStar } from "./icons";

const matches = (idea: Idea, q: string) => (idea.name + " " + idea.pitch).toLowerCase().includes(q);

export default function RunList() {
  const { q, setQ } = useSearch();
  const query = q.trim().toLowerCase();
  const runs = [...RUNS].sort((a, b) => b.date.localeCompare(a.date)).filter((r) => !query || r.ideas.some((i) => matches(i, query)));
  if (!runs.length) {
    return (
      <div className="rounded-[22px] bg-tile p-8 text-center text-[13px] text-zinc-400">
        No ideas match “{q}”. <button onClick={() => setQ("")} className="font-semibold text-zinc-100 underline decoration-accent-light/60 underline-offset-2">Clear search</button>
      </div>
    );
  }
  return (
    <ol className="space-y-4">
      {runs.map((run) => {
        const [top, ...rest] = run.ideas;
        return (
          <li key={run.id} className="rounded-[22px] bg-tile p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <h3 className="text-[16px] font-semibold tracking-tight text-zinc-50">{formatDate(run.date)}</h3>
              <div className="flex gap-1.5"><Tag warm>Scout run</Tag><Tag>3 ideas</Tag></div>
            </div>
            <p className="mt-1.5 px-1 text-[13px] leading-relaxed text-zinc-400">{run.summary}</p>
            <details className="group mt-1.5 px-1 text-xs">
              <summary className="inline-flex cursor-pointer select-none list-none items-center gap-1 font-semibold text-zinc-400 transition-colors hover:text-zinc-200">
                <IconChevronRight size={12} className="transition group-open:rotate-90" /> Run notes
              </summary>
              <ul className="ml-4 mt-1.5 list-disc space-y-0.5 text-zinc-400">{run.notes.map((n) => <li key={n}>{n}</li>)}</ul>
            </details>

            <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
              <TopCard idea={top} />
              <div className="flex min-w-0 flex-col gap-2">
                <div className="label hidden px-1 lg:block">Other ideas</div>
                {rest.map((idea, i) => <MutedRow key={idea.id} idea={idea} rank={i + 2} />)}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function TopCard({ idea }: { idea: Idea }) {
  const pill = "inline-flex h-8 items-center gap-1.5 rounded-full px-3 font-semibold transition-colors";
  return (
    <div className="min-w-0 overflow-hidden rounded-[20px] bg-[#2c2840] ring-1 ring-inset ring-accent/35">
      <Link href={`/idea/${idea.id}/`} className="block p-4 transition-colors hover:bg-white/[0.02] sm:p-5">
        <div className="flex items-start gap-4">
          <Ring size={60} stroke={7} rings={[{ value: idea.score, color: "var(--color-accent)" }]} label={`Score ${idea.score} of 100`}>
            <span className="text-[16px] font-bold tabular-nums text-zinc-50">{idea.score}</span>
          </Ring>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge color="indigo"><IconStar size={10} fill="currentColor" /> Top pick</Badge>
              <StatusBadge idea={idea} />
            </div>
            <h4 className="mt-2 text-[18px] font-bold leading-tight tracking-tight text-zinc-50">{idea.name}</h4>
            <p className="mt-1 text-[13px] leading-snug text-zinc-300">{idea.pitch}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition" value={idea.subScores.competition} />
          <Bar label="Build effort" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
      </Link>
      <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.07] px-4 py-3 text-xs sm:px-5">
        <a href={idea.demoUrl} target="_blank" rel="noreferrer" className={`${pill} bg-white/[0.08] text-zinc-100 hover:bg-white/[0.14]`}><IconExternal size={12} />Demo</a>
        <a href={idea.validationUrl} target="_blank" rel="noreferrer" className={`${pill} bg-white/[0.08] text-zinc-100 hover:bg-white/[0.14]`}><IconExternal size={12} />Validation page</a>
        <Link href={`/idea/${idea.id}/`} className={`${pill} ml-auto bg-white text-ink hover:bg-zinc-200`}>Open flow <IconArrowRight size={12} /></Link>
      </div>
    </div>
  );
}

function MutedRow({ idea, rank }: { idea: Idea; rank: number }) {
  const [q, , loaded] = useQueue(idea.id);
  return (
    <Link href={`/idea/${idea.id}/create/`} className="group flex items-center gap-3 rounded-2xl bg-tile-2/60 px-3.5 py-3 transition-colors hover:bg-tile-2">
      <span className="w-6 shrink-0 text-center text-xs font-semibold tabular-nums text-zinc-400">#{rank}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-zinc-200 group-hover:text-zinc-50">{idea.name}</div>
        <p className="truncate text-xs text-zinc-400">{idea.pitch}</p>
        <div className="mt-1.5">{loaded && q.status === "queued" ? <Badge color="violet"><IconClock size={10} /> Queued</Badge> : <Tag>No demo yet</Tag>}</div>
      </div>
      <ScorePill score={idea.score} muted />
      <IconChevronRight size={14} className="shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-200" />
    </Link>
  );
}
