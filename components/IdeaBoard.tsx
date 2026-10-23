"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { BoardRow } from "@/lib/mock";
import type { PipelineVerdict } from "@/lib/types";
import { eur0, int, shortDate, weekday } from "@/lib/format";
import { usePersisted, usePersistedMany, valKey, type ValidationState } from "@/lib/store";
import { stageOf, testNumbers } from "@/lib/status";
import { useSearch } from "./Search";
import { RowList } from "./IdeaRow";
import { Timeline, TimelineNode } from "./Timeline";
import { PlcChip, ScoreMini, StageMeter, StatCell, StatusPill, StreamBadge, VerdictBadge } from "./ui";

export type NightMeta = { date: string; label: string; summary: string; headline: string; winnerId: string | null };
export type TestMeta = { id: string; initial: ValidationState; budgetEur: number };
type View = "night" | "outcome";

const GROUPS: { v: PipelineVerdict; title: string; sub: string }[] = [
  { v: "winner", title: "Winner", sub: "Score ≥ 75, all 3 gates pass, survives the competitor veto." },
  { v: "near-miss", title: "Near-misses", sub: "Scored 60–74: close, but under the bar." },
  { v: "killed", title: "Killed", sub: "Competitor veto, a failed gate or a failed validation test." },
  { v: "below-bar", title: "Below bar", sub: "Under 60." },
];

export default function IdeaBoard({ rows, nights, niches, tests, ideasScouted, runCount, avgTop, topScores }: {
  rows: BoardRow[]; nights: NightMeta[]; niches: string[]; tests: TestMeta[]; ideasScouted: number; runCount: number; avgTop: number;
  topScores: { date: string; id: string; name: string; score: number }[];
}) {
  const [view, setView] = usePersisted<View>("board:view", "night");
  const [niche, setNiche] = useState<string | null>(null);
  const { q, setQ } = useSearch();
  const [vals, loaded] = usePersistedMany(tests.map((t) => valKey(t.id)), tests.map((t) => t.initial));
  const testOf = (id: string) => { const i = tests.findIndex((t) => t.id === id); return i < 0 ? null : { v: vals[i], budget: tests[i].budgetEur }; };
  const running = vals.filter((v) => v.status === "running").length;
  const signups = vals.reduce((a, v) => a + testNumbers(v).signups, 0);

  const query = q.trim().toLowerCase();
  const visible = rows.filter((r) => (!niche || r.niche === niche) && (!query || r.search.includes(query)));
  const clear = () => { setQ(""); setNiche(null); };

  return (
    <div className="space-y-8">
      {/* Original stats strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.5fr)]">
        <StatCell label="Ideas scouted" value={ideasScouted} unit={`in ${runCount} runs`} />
        <StatCell label="Running tests" value={loaded ? running : "–"} unit={`of ${tests.length}`} />
        <StatCell label="Avg. top score" value={avgTop} unit="/ 100" />
        <StatCell label="Signups" value={loaded ? int(signups) : "–"} unit="total" />
        <ScoreBars runs={topScores} />
      </div>

      <section aria-labelledby="ideas-title" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <h2 id="ideas-title" className="text-[18px] font-semibold tracking-tight text-zinc-50">Ideas <span className="font-medium tabular-nums text-zinc-400">{visible.length}</span></h2>
          <div role="tablist" aria-label="Group ideas" className="flex rounded-full bg-tile p-1">
            {(["night", "outcome"] as const).map((k) => (
              <button key={k} role="tab" aria-selected={view === k} onClick={() => setView(k)} className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light ${view === k ? "bg-accent-pale text-[#2a1f6b]" : "text-zinc-300 hover:text-zinc-50"}`}>
                {k === "night" ? "By night" : "By outcome"}
              </button>
            ))}
          </div>
        </div>

        <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-1">
          <Chip on={!niche} onClick={() => setNiche(null)}>All niches</Chip>
          {niches.map((n) => <Chip key={n} on={niche === n} onClick={() => setNiche(niche === n ? null : n)}>{n}</Chip>)}
        </div>

        {!visible.length ? (
          <div className="rounded-[20px] bg-tile p-8 text-center text-[13px] text-zinc-400">
            No ideas match{q ? ` “${q}”` : " this filter"}. <button onClick={clear} className="font-semibold text-zinc-100 underline decoration-accent-light/70 underline-offset-2">Clear filters</button>
          </div>
        ) : view === "night" ? (
          <ByNight rows={visible} nights={nights} testOf={testOf} loaded={loaded} />
        ) : (
          <ByOutcome rows={visible} />
        )}
      </section>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={on} className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light ${on ? "bg-zinc-100 text-ink" : "bg-tile text-zinc-300 hover:text-zinc-50"}`}>
      {children}
    </button>
  );
}

type TestOf = (id: string) => { v: ValidationState; budget: number } | null;

/** Default view: the scout timeline (dots, date beside), one node per run. */
function ByNight({ rows, nights, testOf, loaded }: { rows: BoardRow[]; nights: NightMeta[]; testOf: TestOf; loaded: boolean }) {
  const nodes = nights.map((n) => ({ n, ideas: rows.filter((r) => r.night === n.date).sort((a, b) => b.score - a.score) })).filter((x) => x.ideas.length);
  return (
    <Timeline>
      {nodes.map(({ n, ideas }, i) => {
        const top = ideas.find((r) => r.id === n.winnerId) ?? null;
        const rest = ideas.filter((r) => r !== top);
        const t = top ? testOf(top.id) : null;
        const live = loaded && t?.v.status === "running";
        return (
          <TimelineNode key={n.date} date={shortDate(n.date)} sub={live ? <span className="text-accent-light">{weekday(n.date)} · live</span> : weekday(n.date)} dot={live ? "winner" : i === 0 ? "latest" : "past"} last={i === nodes.length - 1}>
            <div className="sm:pt-0.5">
              <div className="text-[13px] font-semibold text-zinc-200">{n.headline}</div>
              <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-zinc-400">{n.summary}</p>
            </div>
            <div className="mt-3 space-y-2">
              {top && t && <TopCard row={top} v={t.v} budget={t.budget} loaded={loaded} />}
              {rest.length > 0 && <RowList rows={rest} showDate={false} showRank />}
            </div>
          </TimelineNode>
        );
      })}
    </Timeline>
  );
}

const pill = "relative z-10 inline-flex h-7 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light";

function statusLine(v: ValidationState, budget: number): ReactNode {
  const n = testNumbers(v);
  const su = `${int(n.signups)} signup${Math.round(n.signups) === 1 ? "" : "s"}`;
  if (v.status === "running") return <><span className="font-semibold text-warm">Live</span> · <b className="font-semibold text-zinc-100">{eur0(n.spend)}</b> of {eur0(budget)} · {su}</>;
  if (v.status === "finished") {
    const won = n.call === "strong";
    const lost = n.call === "kill";
    return <><span className={won ? "font-semibold text-[#86efac]" : lost ? "font-semibold text-[#fca5a5]" : "font-semibold text-[#fcd34d]"}>{won ? "✓ Winner" : lost ? "✕ Not a winner" : "~ Inconclusive"}</span> · {su}</>;
  }
  return "Page live · test not started";
}

/** The run's top pick: the one with a demo + validation page. Whole card links to the idea; pills deep-link. */
function TopCard({ row, v, budget, loaded }: { row: BoardRow; v: ValidationState; budget: number; loaded: boolean }) {
  const href = `/idea/${row.id}/`;
  const stage = stageOf(v);
  return (
    <article className={`group relative rounded-[20px] bg-tile p-4 transition-colors hover:bg-[#2c2c31] sm:p-5 ${loaded && stage === "running" ? "ring-1 ring-inset ring-warm/30" : ""}`}>
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-light">Top pick</span>
            {loaded ? <><StatusPill stage={stage} /><StageMeter stage={stage} /></> : <span className="h-5 w-16 animate-pulse rounded-full bg-white/[0.06]" />}
            {row.verdict === "killed" && <VerdictBadge verdict={row.verdict} veto={row.veto} />}
          </div>
          <h3 className="mt-2 text-[17px] font-semibold leading-tight tracking-tight text-zinc-50">
            <Link href={href} className="after:absolute after:inset-0 after:rounded-[20px] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent-light">{row.title}</Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-zinc-400">{row.sub}</p>
          <div className="mt-2 flex flex-wrap gap-1.5"><StreamBadge source={row.source} /><PlcChip stage={row.plc} /></div>
        </div>
        <ScoreMini score={row.score} verdict={row.verdict} size="lg" />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 border-t border-white/[0.06] pt-3">
        <div className="min-w-0 text-[12px] text-zinc-400">{loaded ? statusLine(v, budget) : "\u00a0"}</div>
        <div className="flex shrink-0 gap-2">
          <Link href={`${href}#page`} className={`${pill} bg-white/[0.08] text-zinc-100 hover:bg-white/[0.14]`}>Demo</Link>
          <Link href={`${href}#${stage === "report" ? "report" : "validate"}`} className={`${pill} bg-accent-pale text-[#2a1f6b] hover:bg-white`}>{stage === "report" ? "Report" : "Validation"}</Link>
        </div>
      </div>
    </article>
  );
}

function ByOutcome({ rows }: { rows: BoardRow[] }) {
  return (
    <div className="space-y-6">
      {GROUPS.map((g) => {
        const list = rows.filter((r) => r.verdict === g.v).sort((a, b) => b.score - a.score || b.night.localeCompare(a.night));
        const head = (
          <div className="flex min-w-0 items-baseline gap-2">
            <h3 className="text-[15px] font-semibold text-zinc-50">{g.title}</h3>
            <span className="text-[13px] font-medium tabular-nums text-zinc-400">{list.length}</span>
            <span className="hidden truncate text-[12px] text-zinc-400 sm:inline">{g.sub}</span>
          </div>
        );
        if (g.v === "below-bar")
          return (
            <details key={g.v} className="group">
              <summary className="flex cursor-pointer list-none items-center gap-2 px-1 pb-2.5">
                <span className="text-zinc-400 transition group-open:rotate-90" aria-hidden>›</span>{head}
                <span className="ml-auto shrink-0 text-[12px] font-semibold text-zinc-400 group-open:hidden">Show</span>
              </summary>
              {list.length ? <RowList rows={list} /> : <Empty>Nothing below the bar.</Empty>}
            </details>
          );
        return (
          <div key={g.v}>
            <div className="px-1 pb-2.5">{head}</div>
            {list.length ? <RowList rows={list} /> : <Empty>None in this filter.</Empty>}
          </div>
        );
      })}
    </div>
  );
}

const Empty = ({ children }: { children: ReactNode }) => <div className="rounded-2xl border border-dashed border-white/[0.12] px-4 py-5 text-center text-[13px] text-zinc-400">{children}</div>;

/** Pill bars of each run's top score on a 0–100 scale; the latest run is highlighted. */
function ScoreBars({ runs }: { runs: { date: string; id: string; name: string; score: number }[] }) {
  return (
    <div className="col-span-2 min-w-0 rounded-[20px] bg-tile p-4 sm:p-5 lg:col-span-1">
      <div className="text-[13px] text-zinc-400">Top score per scout day</div>
      <div className="mt-3 flex h-16 items-end gap-2">
        {runs.map((p, i) => (
          <Link key={p.date} href={`/idea/${p.id}/`} title={`${p.name}: ${p.score} on ${shortDate(p.date)}`} aria-label={`${p.name}: score ${p.score} on ${shortDate(p.date)}`} className="group flex h-full flex-1 items-end justify-center">
            <span className={`w-full max-w-[34px] rounded-full transition-opacity group-hover:opacity-80 ${i === runs.length - 1 ? "bg-accent-light" : "bg-accent-deep"}`} style={{ height: `${p.score}%` }} />
          </Link>
        ))}
      </div>
      <div className="mt-2 flex gap-2 text-center text-[11px] leading-tight" aria-hidden>
        {runs.map((p) => <div key={p.date} className="min-w-0 flex-1"><div className="font-semibold tabular-nums text-zinc-100">{p.score}</div><div className="truncate text-zinc-400">{shortDate(p.date)}</div></div>)}
      </div>
    </div>
  );
}
