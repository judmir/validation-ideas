"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { BoardRow } from "@/lib/mock";
import type { PipelineVerdict } from "@/lib/types";
import { shortDate, weekday } from "@/lib/format";
import { usePersisted } from "@/lib/store";
import { useSearch } from "./Search";
import { RowList } from "./IdeaRow";
import { Timeline, TimelineNode } from "./Timeline";
import { PlcChip, ScoreMini, StreamBadge, VerdictBadge } from "./ui";

export type NightMeta = { date: string; market: "US" | "DE"; label: string; summary: string; winnerPainId: string | null; note?: string };
type View = "night" | "outcome";

const GROUPS: { v: PipelineVerdict; title: string; sub: string }[] = [
  { v: "winner", title: "Winner", sub: "Score ≥ 18, all 3 gates pass, survives the competitor veto." },
  { v: "near-miss", title: "Near-misses", sub: "Scored 15–17: close, but under the bar." },
  { v: "killed", title: "Killed", sub: "Competitor veto, a failed gate at ≥ 18, or PLC decline." },
  { v: "below-bar", title: "Below bar", sub: "Under 15." },
];

export default function IdeaBoard({ rows, legacyRows, nights, niches, sinceWinner, lastWinnerDate }: {
  rows: BoardRow[]; legacyRows: BoardRow[]; nights: NightMeta[]; niches: string[]; sinceWinner: number; lastWinnerDate: string;
}) {
  const [view, setView] = usePersisted<View>("board:view", "night");
  const [showDe, setShowDe] = useState(false);
  const [niche, setNiche] = useState<string | null>(null);
  const { q, setQ } = useSearch();
  const query = q.trim().toLowerCase();

  const pool = [...rows, ...(showDe ? legacyRows : [])];
  const visible = pool.filter((r) => (!niche || r.niche === niche) && (!query || r.search.includes(query)));
  const clear = () => { setQ(""); setNiche(null); };

  return (
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
        <Chip on={showDe} onClick={() => setShowDe((s) => !s)} outline>{showDe ? "✓ " : ""}Old Germany pains p-001–p-071</Chip>
      </div>

      {!visible.length ? (
        <div className="rounded-[20px] bg-tile p-8 text-center text-[13px] text-zinc-400">
          No ideas match{q ? ` “${q}”` : " this filter"}. <button onClick={clear} className="font-semibold text-zinc-100 underline decoration-accent-light/70 underline-offset-2">Clear filters</button>
        </div>
      ) : view === "night" ? (
        <ByNight rows={visible} nights={nights.filter((n) => showDe || n.market === "US")} />
      ) : (
        <ByOutcome rows={visible} sinceWinner={sinceWinner} lastWinnerDate={lastWinnerDate} />
      )}
    </section>
  );
}

function Chip({ on, onClick, outline, children }: { on: boolean; onClick: () => void; outline?: boolean; children: ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={on} className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light ${on ? "bg-zinc-100 text-ink" : outline ? "text-zinc-300 ring-1 ring-inset ring-white/[0.14] hover:text-zinc-50" : "bg-tile text-zinc-300 hover:text-zinc-50"}`}>
      {children}
    </button>
  );
}

/** Default view: the scout timeline (dots, date beside), one node per night run. */
function ByNight({ rows, nights }: { rows: BoardRow[]; nights: NightMeta[] }) {
  const nodes = nights
    .map((n) => ({ n, ideas: rows.filter((r) => r.night === n.date && r.market === n.market).sort((a, b) => b.score - a.score) }))
    .filter((x) => x.ideas.length);
  return (
    <Timeline>
      {nodes.map(({ n, ideas }, i) => {
        const winner = ideas.find((r) => r.painId === n.winnerPainId) ?? null;
        const top = winner ?? ideas.find((r) => r.demo) ?? ideas[0];
        const rest = ideas.filter((r) => r !== top);
        return (
          <TimelineNode key={n.market + n.date} date={shortDate(n.date)} sub={<>{weekday(n.date)} · {n.market}</>} dot={winner ? "winner" : n.market === "DE" ? "legacy" : i === 0 ? "latest" : "past"} last={i === nodes.length - 1}>
            <div className="sm:pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 text-[13px] font-semibold text-zinc-200">
                <span>{n.label}</span><span className="text-zinc-400">·</span>
                <span className={winner ? "text-[#fdba74]" : "text-zinc-400"}>{winner ? "1 winner" : "No winner"}</span>
              </div>
              <p className="mt-0.5 text-[13px] leading-snug text-zinc-400">{n.summary}</p>
            </div>
            <div className="mt-3 space-y-2">
              <TopCard row={top} isWinner={!!winner} />
              {rest.length > 0 && <RowList rows={rest} showDate={false} />}
            </div>
          </TimelineNode>
        );
      })}
    </Timeline>
  );
}

const pill = "relative z-10 inline-flex h-7 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light";

/** The night's winner (or its best idea when there is none). Demo/Validation only for winners and the simulated demo. */
function TopCard({ row, isWinner }: { row: BoardRow; isWinner: boolean }) {
  const href = `/idea/${row.painId}/`;
  const validates = isWinner || row.demo;
  const kicker = isWinner ? "Winner" : row.demo ? "Best of the night · simulated winner" : "Best of the night";
  return (
    <article className={`group relative rounded-[20px] bg-tile p-4 transition-colors sm:p-5 ${row.linkable ? "hover:bg-[#2c2c31]" : ""} ${isWinner ? "ring-1 ring-inset ring-warm/30" : row.demo ? "ring-1 ring-inset ring-accent/30" : ""}`}>
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${isWinner ? "text-[#fdba74]" : "text-accent-light"}`}>{kicker}</span>
            <VerdictBadge verdict={row.verdict} veto={row.veto} />
          </div>
          <h3 className="mt-2 text-[17px] font-semibold leading-tight tracking-tight text-zinc-50">
            {row.linkable ? <Link href={href} className="after:absolute after:inset-0 after:rounded-[20px] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent-light">{row.title}</Link> : row.title}
            <span className="ml-2 whitespace-nowrap text-[12px] font-semibold tabular-nums text-zinc-400">{row.painId}</span>
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-zinc-400">{row.sub}</p>
          <div className="mt-2 flex flex-wrap gap-1.5"><StreamBadge source={row.source} /><PlcChip stage={row.plc} /></div>
        </div>
        <ScoreMini score={row.score} verdict={row.verdict} size="lg" />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 border-t border-white/[0.06] pt-3">
        <p className={`min-w-0 flex-1 basis-56 line-clamp-2 text-[12px] leading-snug ${row.noteTone === "red" ? "text-[#fca5a5]" : row.noteTone === "amber" ? "text-[#fcd34d]" : "text-zinc-400"}`}>
          {row.demo ? "Actually killed by the competitor check. Demo/Validation are simulated." : row.pitched ? "Pitched 19 Oct → killed by stress test." : row.note ?? "Below the 18 bar."}
        </p>
        {validates && row.linkable ? (
          <div className="flex shrink-0 gap-2">
            <Link href={`${href}#page`} className={`${pill} bg-white/[0.08] text-zinc-100 hover:bg-white/[0.14]`}>Demo</Link>
            <Link href={`${href}#validate`} className={`${pill} bg-accent-pale text-[#2a1f6b] hover:bg-white`}>Validation</Link>
          </div>
        ) : row.linkable ? (
          <Link href={href} className={`${pill} shrink-0 bg-white/[0.08] text-zinc-100 hover:bg-white/[0.14]`}>Evidence</Link>
        ) : null}
      </div>
    </article>
  );
}

function ByOutcome({ rows, sinceWinner, lastWinnerDate }: { rows: BoardRow[]; sinceWinner: number; lastWinnerDate: string }) {
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
            {list.length ? (
              <RowList rows={list} />
            ) : (
              <Empty>{g.v === "winner" ? <>No winner since {shortDate(lastWinnerDate)}, <b className="font-semibold text-zinc-100">{sinceWinner} nights</b>.</> : "None in this filter."}</Empty>
            )}
          </div>
        );
      })}
    </div>
  );
}

const Empty = ({ children }: { children: ReactNode }) => <div className="rounded-2xl border border-dashed border-white/[0.12] px-4 py-5 text-center text-[13px] text-zinc-400">{children}</div>;
