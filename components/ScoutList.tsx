"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { ALL_IDEAS, RUNS, eur0, int, shortDate } from "@/lib/data";
import { initialState, usePersistedMany, useRequests, type QueueState, type ValidationState } from "@/lib/store";
import { STAGE_ORDER, stageOf, testNumbers, type Stage } from "@/lib/status";
import { verdict } from "@/lib/verdict";
import { useSearch } from "./Search";
import { StageMeter, StatusPill } from "./ui";
import { IconChevronRight } from "./icons";

const TOP = ALL_IDEAS.filter((x) => x.rank === 1);
const RUNNERS = ALL_IDEAS.filter((x) => x.rank !== 1);
const VAL_KEYS = TOP.map((x) => "val:" + x.idea.id);
const VAL_FALLBACK = TOP.map((x) => initialState(x.idea));
const QUEUE_KEYS = RUNNERS.map((x) => "queue:" + x.idea.id);
const QUEUE_FALLBACK: QueueState[] = RUNNERS.map(() => ({ status: "none" }));
const BY_DATE = [...RUNS].sort((a, b) => a.date.localeCompare(b.date));
const AVG_TOP = Math.round(TOP.reduce((a, x) => a + x.idea.score, 0) / TOP.length);
const ms = (iso: string) => new Date(iso + "T12:00:00").getTime();

type Row = { key: string; href?: string; name: string; pitch: string; score?: number; stage: Stage; at: number; meta: ReactNode };

function topRow({ idea, run }: (typeof TOP)[number], v: ValidationState): Row {
  const n = testNumbers(idea, v);
  let meta: ReactNode;
  if (v.status === "running") meta = <><b className="font-semibold text-zinc-100">{eur0(n.spend)}</b> of {eur0(n.total)} · {int(n.signups)} signups</>;
  else if (v.status === "finished") {
    const won = verdict(idea, v.result).winner;
    meta = <><span className={won ? "font-semibold text-[#86efac]" : "font-semibold text-[#fca5a5]"}>{won ? "✓ Winner" : "✕ Not a winner"}</span> · {int(n.signups)} signups</>;
  } else meta = v.status === "ready" ? "Ad set up · ready to publish" : "Page live · test not started";
  return { key: idea.id, href: `/idea/${idea.id}/`, name: idea.name, pitch: idea.pitch, score: idea.score, stage: stageOf(v), at: ms(run.date), meta };
}

export default function ScoutList() {
  const [vals, loaded] = usePersistedMany(VAL_KEYS, VAL_FALLBACK);
  const [queues] = usePersistedMany(QUEUE_KEYS, QUEUE_FALLBACK);
  const [requests] = useRequests();
  const { q, setQ } = useSearch();

  const rows: Row[] = [
    ...TOP.map((x, i) => topRow(x, vals[i])),
    ...RUNNERS.flatMap(({ idea }, i): Row[] => {
      const qs = queues[i];
      return qs.status === "queued"
        ? [{ key: idea.id, href: `/idea/${idea.id}/create/`, name: idea.name, pitch: idea.pitch, score: idea.score, stage: "scouting", at: qs.at, meta: `Building demo · queued ${new Date(qs.at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` }]
        : [];
    }),
    ...requests.map((r): Row => ({ key: r.id, name: r.text, pitch: "New idea · the App Ideas bot is scoring it", stage: "scouting", at: r.at, meta: `Requested ${new Date(r.at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` })),
  ].sort((a, b) => STAGE_ORDER[a.stage] - STAGE_ORDER[b.stage] || b.at - a.at);

  const query = q.trim().toLowerCase();
  const shown = query ? rows.filter((r) => (r.name + " " + r.pitch).toLowerCase().includes(query)) : rows;
  const nums = TOP.map((x, i) => testNumbers(x.idea, vals[i]));
  const running = vals.filter((v) => v.status === "running").length;
  const signups = nums.reduce((a, n) => a + n.signups, 0);

  return (
    <div className="space-y-8">
      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.5fr)]">
        <StatCell label="Ideas scouted" value={ALL_IDEAS.length} unit={`in ${RUNS.length} runs`} />
        <StatCell label="Running tests" value={loaded ? running : "–"} unit={`of ${TOP.length}`} live={running > 0} />
        <StatCell label="Avg. top score" value={AVG_TOP} unit="/ 100" />
        <StatCell label="Signups" value={loaded ? int(signups) : "–"} unit="total" />
        <ScoreBars />
      </div>

      <section aria-labelledby="scouts-title">
        <div className="mb-3 flex items-baseline justify-between gap-3 px-1">
          <h2 id="scouts-title" className="text-[18px] font-semibold tracking-tight text-zinc-50">All scouts <span className="font-medium tabular-nums text-zinc-400">{shown.length}</span></h2>
          <span className="text-[12px] text-zinc-400">Running first</span>
        </div>
        {shown.length ? (
          <ul className="space-y-2.5">{shown.map((r) => <li key={r.key}><ScoutRow row={r} /></li>)}</ul>
        ) : (
          <div className="rounded-[20px] bg-tile p-8 text-center text-[13px] text-zinc-400">
            No scouts match “{q}”. <button onClick={() => setQ("")} className="font-semibold text-zinc-100 underline decoration-accent-light/70 underline-offset-2">Clear search</button>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCell({ label, value, unit, live }: { label: string; value: ReactNode; unit: string; live?: boolean }) {
  return (
    <div className="min-w-0 rounded-[20px] bg-tile p-4 sm:p-5">
      <div className="flex items-center gap-1.5 text-[13px] text-zinc-400">{live && <span className="h-2 w-2 animate-pulse rounded-full bg-warm" aria-hidden />}{label}</div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-[32px] font-medium leading-none tracking-tight tabular-nums text-zinc-50 sm:text-[36px]">{value}</span>
        <span className="truncate text-[12px] font-medium text-zinc-300">{unit}</span>
      </div>
    </div>
  );
}

/** Pill bars of each scout day's top score on a 0–100 scale; the latest day is highlighted. */
function ScoreBars() {
  return (
    <div className="col-span-2 min-w-0 rounded-[20px] bg-tile p-4 sm:p-5 lg:col-span-1">
      <div className="text-[13px] text-zinc-400">Top score per scout day</div>
      <div className="mt-3 flex h-16 items-end gap-2">
        {BY_DATE.map((run, i) => {
          const p = run.ideas[0];
          const latest = i === BY_DATE.length - 1;
          return (
            <Link key={run.id} href={`/idea/${p.id}/`} title={`${p.name}: ${p.score} on ${shortDate(run.date)}`} aria-label={`${p.name}: score ${p.score} on ${shortDate(run.date)}`} className="group flex h-full flex-1 items-end justify-center">
              <span className={`w-full max-w-[34px] rounded-full transition-opacity group-hover:opacity-80 ${latest ? "bg-accent-light" : "bg-accent-deep"}`} style={{ height: `${p.score}%` }} />
            </Link>
          );
        })}
      </div>
      <div className="mt-2 flex gap-2 text-center text-[11px] leading-tight" aria-hidden>
        {BY_DATE.map((run) => (
          <div key={run.id} className="min-w-0 flex-1"><div className="font-semibold tabular-nums text-zinc-100">{run.ideas[0].score}</div><div className="truncate text-zinc-400">{shortDate(run.date)}</div></div>
        ))}
      </div>
    </div>
  );
}

function ScoutRow({ row }: { row: Row }) {
  const body = (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_210px_auto_16px] sm:gap-x-6">
      <div className="min-w-0">
        <h3 className="truncate text-[16px] font-semibold tracking-tight text-zinc-50">{row.name}</h3>
        <p className="mt-0.5 truncate text-[13px] text-zinc-400">{row.pitch}</p>
      </div>
      <div className="order-3 col-span-2 flex min-w-0 items-center gap-3 sm:order-none sm:col-span-1 sm:flex-col sm:items-start sm:gap-2">
        <div className="flex shrink-0 items-center gap-2.5"><StatusPill stage={row.stage} /><StageMeter stage={row.stage} /></div>
        <div className="min-w-0 truncate text-[12px] text-zinc-400">{row.meta}</div>
      </div>
      <div className="min-w-[52px] text-right">
        <div className="text-[30px] font-medium leading-none tracking-tight tabular-nums text-zinc-50 sm:text-[34px]">{row.score ?? "–"}</div>
        <div className="mt-1 text-[11px] text-zinc-400">score</div>
      </div>
      <IconChevronRight size={16} className="hidden text-zinc-400 transition-colors group-hover:text-zinc-100 sm:block" />
    </div>
  );
  if (!row.href) return <div className="rounded-[20px] border border-dashed border-white/[0.14] px-4 py-4 sm:px-5">{body}</div>;
  return (
    <Link
      href={row.href}
      className={`group block rounded-[20px] bg-tile px-4 py-4 transition-colors hover:bg-[#2c2c31] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light sm:px-5 ${row.stage === "running" ? "ring-1 ring-inset ring-warm/30" : ""}`}
    >
      {body}
    </Link>
  );
}
