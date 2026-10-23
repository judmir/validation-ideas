"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import type { PipelineVerdict } from "@/lib/types";
import { RULES } from "@/lib/types";
import { eur0, int, shortDate, weekday } from "@/lib/format";
import { usePersistedMany, valKey, type ValidationState } from "@/lib/store";
import { stageOf, testNumbers } from "@/lib/status";
import { useSearch } from "./Search";
import { StageMeter, StatCell, StatusPill } from "./ui";
import { IconChevronRight } from "./icons";

export type PainRow = { id: string; title: string; sub: string; score: number; verdict: PipelineVerdict; veto: boolean; demo: boolean; rank: number };
export type NightMeta = { date: string; label: string | null; line: string; pains: PainRow[] };
export type LegacyNight = { date: string; label: string; note: string; pains: { id: string; title: string; score: number; verdict: PipelineVerdict }[] };
export type TestMeta = { id: string; initial: ValidationState; budgetEur: number };
export type Stats = { pains: number; runs: number; sinceWinner: number; best: { score: number; id: string }; complaints: number; lastWinner: string };

const localIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const signupsTxt = (n: number) => `${int(n)} signup${Math.round(n) === 1 ? "" : "s"}`;
const VERDICT_TXT: Record<PipelineVerdict, string> = { winner: "Winner", "near-miss": "Near-miss", killed: "Killed", "below-bar": "Below bar" };

/** Minimal home (d889d85 style) on the real pipeline data: stats strip, then the night timeline. */
export default function ScoutTimeline({ nights, legacy, tests, stats, chart }: {
  nights: NightMeta[]; legacy: LegacyNight[]; tests: TestMeta[]; stats: Stats; chart: { date: string; score: number; id: string | null }[];
}) {
  const [vals, loaded] = usePersistedMany(tests.map((t) => valKey(t.id)), tests.map((t) => t.initial));
  const { q, setQ } = useSearch();
  const [today, setToday] = useState("");
  useEffect(() => setToday(localIso(new Date())), []);
  const testOf = (id: string) => { const i = tests.findIndex((t) => t.id === id); return i < 0 ? null : { v: vals[i], budget: tests[i].budgetEur }; };
  const running = vals.filter((v) => v.status === "running").length;

  const query = q.trim().toLowerCase();
  const match = (p: { title: string; id: string; sub?: string }) => !query || [p.title, p.id, p.sub ?? ""].join(" ").toLowerCase().includes(query);
  const shown = nights.map((n) => ({ n, pains: n.pains.filter(match) })).filter((x) => x.pains.length);
  const legacyShown = legacy.map((n) => ({ ...n, pains: n.pains.filter(match) })).filter((n) => n.pains.length);
  const legacyCount = legacy.reduce((a, n) => a + n.pains.length, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.5fr)]">
        <StatCell label="US pains scored" value={stats.pains} unit={`in ${stats.runs} runs`} />
        <StatCell label="Nights since winner" value={stats.sinceWinner} unit={`last: ${stats.lastWinner}`} />
        <StatCell label="Best this week" value={stats.best.score} unit={`/ ${RULES.maxScore} · bar ${RULES.passBar}`} />
        <StatCell label={running ? "Running tests" : "US complaints"} value={running ? running : stats.complaints} unit={running ? "simulated" : `in ${stats.runs} runs`} />
        <ScoreBars runs={chart} />
      </div>

      <section aria-labelledby="scouts-title">
        <div className="mb-5 flex items-baseline justify-between gap-3 px-1">
          <h2 id="scouts-title" className="text-[18px] font-semibold tracking-tight text-zinc-50">Night timeline <span className="font-medium tabular-nums text-zinc-400">{shown.length} US runs</span></h2>
          <span className="text-[12px] text-zinc-400">Newest first</span>
        </div>
        {shown.length || legacyShown.length ? (
          <ol className="scout-timeline">
            {shown.map(({ n, pains }, i) => {
              const top = n.pains[0];
              const t = testOf(top.id);
              const live = loaded && t?.v.status === "running";
              const sub = n.date === today ? "Today" : weekday(n.date);
              const rest = pains.filter((x) => x !== top);
              return (
                <Node key={n.date} date={shortDate(n.date)} sub={live ? `${sub} · live` : n.label ? `${sub} · ${n.label}` : sub} accent={live || sub === "Today"} dot={live ? "running" : i === 0 && !query ? "latest" : "past"} last={i === shown.length - 1 && !legacyShown.length}>
                  <div className="sm:pt-0.5">
                    <div className="text-[13px] font-semibold text-zinc-200">Scored {n.pains.length} pains <span className="text-zinc-400">·</span> top <span className="tabular-nums text-zinc-50">{top.score}</span><span className="text-zinc-400">/{RULES.maxScore}</span></div>
                    <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-zinc-400">{n.line}</p>
                  </div>
                  <div className="mt-3 space-y-2">
                    {pains.includes(top) && <TopCard row={top} t={t} loaded={loaded} />}
                    {rest.length > 0 && (
                      <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07]">
                        {rest.map((p) => <li key={p.id}><RunnerUp row={p} /></li>)}
                      </ul>
                    )}
                  </div>
                </Node>
              );
            })}
            {legacyShown.length > 0 && (
              <Node date="19–22 Oct" sub="Germany" accent={false} dot="past" last>
                <details className="group rounded-[20px] border border-white/[0.07]" open={!!query}>
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5">
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-semibold text-zinc-200">Earlier Germany runs</div>
                      <div className="text-[12px] text-zinc-400">{legacy.length} nights · {legacyCount} pains (p-001–p-071) · winner Fristly on 19 Oct, later killed</div>
                    </div>
                    <IconChevronRight size={14} className="shrink-0 text-zinc-400 transition group-open:rotate-90" />
                  </summary>
                  <div className="space-y-4 border-t border-white/[0.06] px-4 py-4">
                    {legacyShown.map((n) => (
                      <div key={n.date}>
                        <div className="text-[12px] text-zinc-400"><span className="font-semibold text-zinc-200">{shortDate(n.date)} · {n.label}</span> · {n.note}</div>
                        <ul className="mt-2 divide-y divide-white/[0.05]">
                          {n.pains.map((p) => (
                            <li key={p.id} className="flex items-center gap-3 py-1.5 text-[13px]">
                              <span className="w-11 shrink-0 text-[11px] font-semibold tabular-nums text-zinc-400">{p.id}</span>
                              <span className="min-w-0 flex-1 truncate text-zinc-300">{p.title}</span>
                              <span className="shrink-0 font-semibold tabular-nums text-zinc-300">{p.score}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              </Node>
            )}
          </ol>
        ) : (
          <div className="rounded-[20px] bg-tile p-8 text-center text-[13px] text-zinc-400">
            No pains match “{q}”. <button onClick={() => setQ("")} className="font-semibold text-zinc-100 underline decoration-accent-light/70 underline-offset-2">Clear search</button>
          </div>
        )}
      </section>
    </div>
  );
}

type Dot = "running" | "latest" | "past";
const DOT: Record<Dot, string> = { running: "bg-accent-light ring-4 ring-accent/25", latest: "bg-accent-light ring-4 ring-accent/15", past: "bg-zinc-600 ring-4 ring-panel" };

function Node({ date, sub, accent, dot, last, children }: { date: string; sub: string; accent: boolean; dot: Dot; last: boolean; children: ReactNode }) {
  return (
    <li className={`relative pl-8 sm:pl-[156px] ${last ? "" : "pb-9"}`}>
      {!last && <span aria-hidden className="absolute bottom-0 left-[6px] top-[22px] w-0.5 rounded-full bg-white/[0.09] sm:left-[126px]" />}
      <span aria-hidden className="absolute left-0 top-[4px] grid h-3.5 w-3.5 place-items-center sm:left-[120px]">
        {dot === "running" && <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />}
        <span className={`relative h-3.5 w-3.5 rounded-full ${DOT[dot]}`} />
      </span>
      <div className="mb-2 flex items-baseline gap-2 sm:absolute sm:left-0 sm:top-0 sm:mb-0 sm:w-[100px] sm:flex-col sm:items-end sm:gap-0.5 sm:text-right">
        <span className={`whitespace-nowrap text-[15px] font-semibold leading-[22px] tracking-tight tabular-nums ${dot !== "past" ? "text-zinc-50" : "text-zinc-200"}`}>{date}</span>
        <span className={`text-[12px] font-medium ${accent ? "text-accent-light" : "text-zinc-400"}`}>{sub}</span>
      </div>
      {children}
    </li>
  );
}

const pill = "relative z-10 inline-flex h-7 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light";

function testLine(v: ValidationState, budget: number): ReactNode {
  const n = testNumbers(v);
  if (v.status === "running") return <><span className="font-semibold text-warm">Live</span> · <b className="font-semibold text-zinc-100">{eur0(n.spend)}</b> of {eur0(budget)} · {signupsTxt(n.signups)}</>;
  if (v.status === "finished") {
    const won = n.call === "strong";
    return <><span className={won ? "font-semibold text-[#86efac]" : n.call === "kill" ? "font-semibold text-[#fca5a5]" : "font-semibold text-[#fcd34d]"}>{won ? "✓ Strong" : n.call === "kill" ? "✕ Kill" : "~ Inconclusive"}</span> · {signupsTxt(n.signups)} · simulated</>;
  }
  return "Page ready · test not started";
}

/** Best pain of the night. Pills only for a winner or the DinnerList simulated demo. */
function TopCard({ row, t, loaded }: { row: PainRow; t: { v: ValidationState; budget: number } | null; loaded: boolean }) {
  const href = `/idea/${row.id}/`;
  const validates = row.verdict === "winner" || row.demo;
  const stage = t ? stageOf(t.v) : null;
  return (
    <article className={`group relative rounded-[20px] bg-tile p-4 transition-colors hover:bg-[#2c2c31] sm:p-5 ${loaded && stage === "running" ? "ring-1 ring-inset ring-warm/30" : ""}`}>
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-light">{row.demo ? "Simulated winner" : row.verdict === "winner" ? "Winner" : "Best of the night"}</span>
            {validates && stage && (loaded ? <><StatusPill stage={stage} /><StageMeter stage={stage} /></> : <span className="h-5 w-16 animate-pulse rounded-full bg-white/[0.06]" />)}
          </div>
          <h3 className="mt-2 text-[17px] font-semibold leading-tight tracking-tight text-zinc-50">
            <Link href={href} className="after:absolute after:inset-0 after:rounded-[20px] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent-light">{row.title}</Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-zinc-400">{row.sub}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[36px] font-medium leading-none tracking-tight tabular-nums text-zinc-50 sm:text-[40px]">{row.score}</div>
          <div className="mt-1 text-[11px] text-zinc-400">/ {RULES.maxScore}</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 border-t border-white/[0.06] pt-3">
        <div className="min-w-0 text-[12px] text-zinc-400">
          {validates && t ? (loaded ? testLine(t.v, t.budget) : "\u00a0") : <><span className={row.verdict === "killed" ? "font-semibold text-[#fca5a5]" : "font-semibold text-zinc-300"}>{row.veto ? "Killed by competitor veto" : VERDICT_TXT[row.verdict]}</span> · no winner this night</>}
        </div>
        {validates && stage && (
          <div className="flex shrink-0 gap-2">
            <Link href={`${href}#page`} className={`${pill} bg-white/[0.08] text-zinc-100 hover:bg-white/[0.14]`}>Demo</Link>
            <Link href={`${href}#${stage === "report" ? "report" : "validate"}`} className={`${pill} bg-accent-pale text-[#2a1f6b] hover:bg-white`}>{stage === "report" ? "Report" : "Validation"}</Link>
          </div>
        )}
      </div>
    </article>
  );
}

function RunnerUp({ row }: { row: PainRow }) {
  return (
    <Link href={`/idea/${row.id}/`} className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none">
      <span className="w-5 shrink-0 text-[12px] font-semibold tabular-nums text-zinc-400">#{row.rank}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-zinc-200">{row.title}</div>
        <div className="truncate text-[12px] text-zinc-400">{row.sub}</div>
      </div>
      <span className="shrink-0 text-[15px] font-semibold tabular-nums text-zinc-300">{row.score}</span>
      <IconChevronRight size={14} className="shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-100" />
    </Link>
  );
}

/** Top score per night (US and Germany runs), 0–25 scale, with the 18 bar as a faint line. */
function ScoreBars({ runs }: { runs: { date: string; score: number; id: string | null }[] }) {
  const bar = (RULES.passBar / RULES.maxScore) * 100;
  return (
    <div className="col-span-2 min-w-0 rounded-[20px] bg-tile p-4 sm:p-5 lg:col-span-1">
      <div className="text-[13px] text-zinc-400">Top score per night</div>
      <div className="relative mt-3 flex h-16 items-end gap-2">
        <span aria-hidden className="absolute inset-x-0 border-t border-dashed border-white/25" style={{ bottom: `${bar}%` }} />
        {runs.map((r, i) => {
          const cls = `w-full max-w-[34px] rounded-full ${i === runs.length - 1 ? "bg-accent-light" : "bg-accent-deep"}`;
          const label = `Top score ${r.score} of ${RULES.maxScore} on ${shortDate(r.date)}`;
          return r.id ? (
            <Link key={r.date} href={`/idea/${r.id}/`} title={label} aria-label={label} className="group flex h-full flex-1 items-end justify-center"><span className={`${cls} transition-opacity group-hover:opacity-80`} style={{ height: `${(r.score / RULES.maxScore) * 100}%` }} /></Link>
          ) : (
            <span key={r.date} title={label} aria-label={label} role="img" className="flex h-full flex-1 items-end justify-center"><span className={cls} style={{ height: `${(r.score / RULES.maxScore) * 100}%` }} /></span>
          );
        })}
      </div>
      <div className="mt-2 flex gap-2 text-center text-[11px] leading-tight" aria-hidden>
        {runs.map((r) => <div key={r.date} className="min-w-0 flex-1"><div className="font-semibold tabular-nums text-zinc-100">{r.score}</div><div className="truncate text-zinc-400">{shortDate(r.date)}</div></div>)}
      </div>
    </div>
  );
}
