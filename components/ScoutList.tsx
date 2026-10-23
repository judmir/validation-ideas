"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ALL_IDEAS, RUNS, eur0, int, shortDate, type Idea, type ScoutRun } from "@/lib/data";
import { initialState, usePersistedMany, useRequests, type QueueState, type ValidationState } from "@/lib/store";
import { stageOf, testNumbers } from "@/lib/status";
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
const NEWEST_FIRST = [...RUNS].sort((a, b) => b.date.localeCompare(a.date));
const OLDEST_FIRST = [...NEWEST_FIRST].reverse();
const AVG_TOP = Math.round(TOP.reduce((a, x) => a + x.idea.score, 0) / TOP.length);
const weekday = (iso: string) => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short" });
const localIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const signupsTxt = (n: number) => `${int(n)} signup${Math.round(n) === 1 ? "" : "s"}`;
const dayMonth = (t: number) => new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export default function ScoutList() {
  const [vals, loaded] = usePersistedMany(VAL_KEYS, VAL_FALLBACK);
  const [queues] = usePersistedMany(QUEUE_KEYS, QUEUE_FALLBACK);
  const [requests] = useRequests();
  const { q, setQ } = useSearch();
  // "Today" depends on the viewer's clock, so resolve it after mount (static HTML shows weekdays).
  const [today, setToday] = useState("");
  useEffect(() => setToday(localIso(new Date())), []);

  const valOf = (id: string) => vals[TOP.findIndex((x) => x.idea.id === id)];
  const queueOf = (id: string) => queues[RUNNERS.findIndex((x) => x.idea.id === id)];
  const query = q.trim().toLowerCase();
  const match = (text: string) => !query || text.toLowerCase().includes(query);
  const runs = NEWEST_FIRST.map((run) => ({ run, ideas: run.ideas.filter((i) => match(i.name + " " + i.pitch)) })).filter((r) => r.ideas.length);
  const reqs = requests.filter((r) => match(r.text));

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
        <div className="mb-5 flex items-baseline justify-between gap-3 px-1">
          <h2 id="scouts-title" className="text-[18px] font-semibold tracking-tight text-zinc-50">Scout timeline <span className="font-medium tabular-nums text-zinc-400">{runs.length} runs</span></h2>
          <span className="text-[12px] text-zinc-400">Newest first</span>
        </div>
        {runs.length || reqs.length ? (
          <ol className="scout-timeline">
            {reqs.length > 0 && (
              <Node date="Queued" sub={`${reqs.length} request${reqs.length > 1 ? "s" : ""}`} dot="scouting" last={!runs.length}>
                <p className="mb-3 text-[13px] text-zinc-400">The App Ideas bot is scoring new ideas you asked for.</p>
                <ul className="space-y-2">
                  {reqs.map((r) => (
                    <li key={r.id} className="flex items-center gap-3 rounded-2xl border border-dashed border-white/[0.14] px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[14px] font-semibold text-zinc-50">{r.text}</div>
                        <div className="truncate text-[12px] text-zinc-400">Requested {dayMonth(r.at)} · being scored</div>
                      </div>
                      <StatusPill stage="scouting" />
                    </li>
                  ))}
                </ul>
              </Node>
            )}
            {runs.map(({ run, ideas }, i) => {
              const v = valOf(run.ideas[0].id);
              const live = loaded && v.status === "running";
              const latest = run.id === NEWEST_FIRST[0].id;
              return (
                <Node key={run.id} date={shortDate(run.date)} sub={run.date === today ? "Today" : weekday(run.date)} dot={live ? "running" : latest ? "latest" : "past"} last={i === runs.length - 1}>
                  <RunSummary run={run} />
                  <div className="mt-3 space-y-2">
                    {ideas[0] === run.ideas[0] && <TopPick idea={run.ideas[0]} v={v} loaded={loaded} />}
                    {ideas.some((x) => x !== run.ideas[0]) && (
                      <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07]">
                        {ideas.filter((x) => x !== run.ideas[0]).map((idea) => (
                          <li key={idea.id}><RunnerUp idea={idea} rank={run.ideas.indexOf(idea) + 1} queue={queueOf(idea.id)} /></li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Node>
              );
            })}
          </ol>
        ) : (
          <div className="rounded-[20px] bg-tile p-8 text-center text-[13px] text-zinc-400">
            No scouts match “{q}”. <button onClick={() => setQ("")} className="font-semibold text-zinc-100 underline decoration-accent-light/70 underline-offset-2">Clear search</button>
          </div>
        )}
      </section>
    </div>
  );
}

type Dot = "running" | "latest" | "past" | "scouting";
const DOT: Record<Dot, string> = {
  running: "bg-accent-light ring-4 ring-accent/25",
  latest: "bg-accent-light ring-4 ring-accent/15",
  scouting: "bg-zinc-300 ring-4 ring-white/[0.08]",
  past: "bg-zinc-600 ring-4 ring-panel",
};

/**
 * One timeline entry. Mobile: line on the left edge, date beside the dot above the content.
 * ≥ sm: date in its own right-aligned column left of the line.
 */
function Node({ date, sub, dot, last, children }: { date: string; sub: string; dot: Dot; last: boolean; children: ReactNode }) {
  const active = dot !== "past";
  return (
    <li className={`relative pl-8 sm:pl-[156px] ${last ? "" : "pb-9"}`}>
      {!last && <span aria-hidden className="absolute bottom-0 left-[6px] top-[22px] w-0.5 rounded-full bg-white/[0.09] sm:left-[126px]" />}
      <span aria-hidden className="absolute left-0 top-[4px] grid h-3.5 w-3.5 place-items-center sm:left-[120px]">
        {(dot === "running" || dot === "scouting") && <span className={`absolute inset-0 animate-ping rounded-full ${dot === "running" ? "bg-accent/50" : "bg-white/20"}`} />}
        <span className={`relative h-3.5 w-3.5 rounded-full ${DOT[dot]}`} />
      </span>
      <div className="mb-2 flex items-baseline gap-2 sm:absolute sm:left-0 sm:top-0 sm:mb-0 sm:w-[100px] sm:flex-col sm:items-end sm:gap-0.5 sm:text-right">
        <span className={`text-[15px] font-semibold leading-[22px] tracking-tight tabular-nums ${active ? "text-zinc-50" : "text-zinc-200"}`}>{date}</span>
        <span className={`text-[12px] font-medium ${sub === "Today" || dot === "running" ? "text-accent-light" : "text-zinc-400"}`}>{dot === "running" ? `${sub} · live` : sub}</span>
      </div>
      {children}
    </li>
  );
}

function RunSummary({ run }: { run: ScoutRun }) {
  return (
    <div className="sm:pt-0.5">
      <div className="text-[13px] font-semibold text-zinc-200">
        Scouted {run.ideas.length} ideas <span className="text-zinc-400">·</span> top <span className="tabular-nums text-zinc-50">{run.ideas[0].score}</span>
      </div>
      <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-zinc-400">{run.summary}</p>
    </div>
  );
}

function statusLine(idea: Idea, v: ValidationState): ReactNode {
  const n = testNumbers(idea, v);
  if (v.status === "running") return <><span className="font-semibold text-warm">Live</span> · <b className="font-semibold text-zinc-100">{eur0(n.spend)}</b> of {eur0(n.total)} · {signupsTxt(n.signups)}</>;
  if (v.status === "finished") {
    const won = verdict(idea, v.result).winner;
    return <><span className={won ? "font-semibold text-[#86efac]" : "font-semibold text-[#fca5a5]"}>{won ? "✓ Winner" : "✕ Not a winner"}</span> · {signupsTxt(n.signups)}</>;
  }
  return v.status === "ready" ? "Ad set up · ready to publish" : "Page live · test not started";
}

const pill = "relative z-10 inline-flex h-7 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light";

/** The run's top pick: the one with a demo + validation page built. Whole card links to the idea; pills deep-link. */
function TopPick({ idea, v, loaded }: { idea: Idea; v: ValidationState; loaded: boolean }) {
  const stage = stageOf(v);
  const href = `/idea/${idea.id}/`;
  return (
    <article className={`group relative rounded-[20px] bg-tile p-4 transition-colors hover:bg-[#2c2c31] sm:p-5 ${loaded && stage === "running" ? "ring-1 ring-inset ring-warm/30" : ""}`}>
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-light">Top pick</span>
            {loaded ? <><StatusPill stage={stage} /><StageMeter stage={stage} /></> : <span className="h-5 w-16 animate-pulse rounded-full bg-white/[0.06]" />}
          </div>
          <h3 className="mt-2 text-[17px] font-semibold leading-tight tracking-tight text-zinc-50">
            <Link href={href} className="after:absolute after:inset-0 after:rounded-[20px] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent-light">{idea.name}</Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-zinc-400">{idea.pitch}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[36px] font-medium leading-none tracking-tight tabular-nums text-zinc-50 sm:text-[40px]">{idea.score}</div>
          <div className="mt-1 text-[11px] text-zinc-400">score</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 border-t border-white/[0.06] pt-3">
        <div className="min-w-0 text-[12px] text-zinc-400">{loaded ? statusLine(idea, v) : "\u00a0"}</div>
        <div className="flex shrink-0 gap-2">
          <Link href={`${href}#page`} className={`${pill} bg-white/[0.08] text-zinc-100 hover:bg-white/[0.14]`}>Demo</Link>
          <Link href={`${href}#${stage === "report" ? "report" : "validate"}`} className={`${pill} bg-accent-pale text-[#2a1f6b] hover:bg-white`}>
            {stage === "report" ? "Report" : "Validation"}
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Quiet row for #2/#3. Links to the idea's build page, where a demo can be queued. */
function RunnerUp({ idea, rank, queue }: { idea: Idea; rank: number; queue: QueueState }) {
  return (
    <Link href={`/idea/${idea.id}/create/`} className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none">
      <span className="w-5 shrink-0 text-[12px] font-semibold tabular-nums text-zinc-400">#{rank}</span>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-[14px] font-semibold text-zinc-200">{idea.name}</span>
          {queue.status === "queued" && <span className="shrink-0 rounded-full bg-white/[0.09] px-2 text-[11px] font-semibold leading-[18px] text-zinc-200">Demo queued</span>}
        </div>
        <div className="truncate text-[12px] text-zinc-400">{idea.pitch}</div>
      </div>
      <span className="shrink-0 text-[15px] font-semibold tabular-nums text-zinc-300">{idea.score}</span>
      <IconChevronRight size={14} className="shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-100" />
    </Link>
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
        {OLDEST_FIRST.map((run, i) => {
          const p = run.ideas[0];
          const latest = i === OLDEST_FIRST.length - 1;
          return (
            <Link key={run.id} href={`/idea/${p.id}/`} title={`${p.name}: ${p.score} on ${shortDate(run.date)}`} aria-label={`${p.name}: score ${p.score} on ${shortDate(run.date)}`} className="group flex h-full flex-1 items-end justify-center">
              <span className={`w-full max-w-[34px] rounded-full transition-opacity group-hover:opacity-80 ${latest ? "bg-accent-light" : "bg-accent-deep"}`} style={{ height: `${p.score}%` }} />
            </Link>
          );
        })}
      </div>
      <div className="mt-2 flex gap-2 text-center text-[11px] leading-tight" aria-hidden>
        {OLDEST_FIRST.map((run) => (
          <div key={run.id} className="min-w-0 flex-1"><div className="font-semibold tabular-nums text-zinc-100">{run.ideas[0].score}</div><div className="truncate text-zinc-400">{shortDate(run.date)}</div></div>
        ))}
      </div>
    </div>
  );
}
