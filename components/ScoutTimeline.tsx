"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { eur0, int, shortDate, weekday } from "@/lib/format";
import { usePersistedMany, valKey, type ValidationState } from "@/lib/store";
import { stageOf, testNumbers } from "@/lib/status";
import { useSearch } from "./Search";
import { StageMeter, StatCell, StatusPill } from "./ui";
import { IconChevronRight } from "./icons";

export type RunIdea = { id: string; name: string; pitch: string; score: number; rank: number };
export type RunMeta = { date: string; summary: string; ideas: RunIdea[] };
export type TestMeta = { id: string; initial: ValidationState; budgetEur: number };

const localIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const signupsTxt = (n: number) => `${int(n)} signup${Math.round(n) === 1 ? "" : "s"}`;

/** Minimal home (as in d889d85): one stats strip, then the scout timeline with a top-pick card and quiet runner-up rows per run. */
export default function ScoutTimeline({ runs, tests, ideasScouted, avgTop }: { runs: RunMeta[]; tests: TestMeta[]; ideasScouted: number; avgTop: number }) {
  const [vals, loaded] = usePersistedMany(tests.map((t) => valKey(t.id)), tests.map((t) => t.initial));
  const { q, setQ } = useSearch();
  // "Today" depends on the viewer's clock, so resolve it after mount (static HTML shows weekdays).
  const [today, setToday] = useState("");
  useEffect(() => setToday(localIso(new Date())), []);

  const testOf = (id: string) => { const i = tests.findIndex((t) => t.id === id); return i < 0 ? null : { v: vals[i], budget: tests[i].budgetEur }; };
  const running = vals.filter((v) => v.status === "running").length;
  const signups = vals.reduce((a, v) => a + testNumbers(v).signups, 0);

  const query = q.trim().toLowerCase();
  const shown = runs.map((r) => ({ r, ideas: r.ideas.filter((i) => !query || (i.name + " " + i.pitch).toLowerCase().includes(query)) })).filter((x) => x.ideas.length);
  const oldestFirst = [...runs].reverse();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.5fr)]">
        <StatCell label="Ideas scouted" value={ideasScouted} unit={`in ${runs.length} runs`} />
        <StatCell label="Running tests" value={loaded ? running : "–"} unit={`of ${tests.length}`} />
        <StatCell label="Avg. top score" value={avgTop} unit="/ 100" />
        <StatCell label="Signups" value={loaded ? int(signups) : "–"} unit="total" />
        <ScoreBars runs={oldestFirst} />
      </div>

      <section aria-labelledby="scouts-title">
        <div className="mb-5 flex items-baseline justify-between gap-3 px-1">
          <h2 id="scouts-title" className="text-[18px] font-semibold tracking-tight text-zinc-50">Scout timeline <span className="font-medium tabular-nums text-zinc-400">{shown.length} runs</span></h2>
          <span className="text-[12px] text-zinc-400">Newest first</span>
        </div>
        {shown.length ? (
          <ol className="scout-timeline">
            {shown.map(({ r, ideas }, i) => {
              const top = r.ideas[0];
              const t = testOf(top.id);
              const live = loaded && t?.v.status === "running";
              const sub = r.date === today ? "Today" : weekday(r.date);
              const rest = ideas.filter((x) => x !== top);
              return (
                <Node key={r.date} date={shortDate(r.date)} sub={live ? `${sub} · live` : sub} accent={live || sub === "Today"} dot={live ? "running" : i === 0 && !query ? "latest" : "past"} last={i === shown.length - 1}>
                  <div className="sm:pt-0.5">
                    <div className="text-[13px] font-semibold text-zinc-200">Scouted {r.ideas.length} ideas <span className="text-zinc-400">·</span> top <span className="tabular-nums text-zinc-50">{top.score}</span></div>
                    <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-zinc-400">{r.summary}</p>
                  </div>
                  <div className="mt-3 space-y-2">
                    {ideas.includes(top) && t && <TopPick idea={top} v={t.v} budget={t.budget} loaded={loaded} />}
                    {rest.length > 0 && (
                      <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07]">
                        {rest.map((idea) => <li key={idea.id}><RunnerUp idea={idea} /></li>)}
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

type Dot = "running" | "latest" | "past";
const DOT: Record<Dot, string> = {
  running: "bg-accent-light ring-4 ring-accent/25",
  latest: "bg-accent-light ring-4 ring-accent/15",
  past: "bg-zinc-600 ring-4 ring-panel",
};

function Node({ date, sub, accent, dot, last, children }: { date: string; sub: string; accent: boolean; dot: Dot; last: boolean; children: ReactNode }) {
  return (
    <li className={`relative pl-8 sm:pl-[156px] ${last ? "" : "pb-9"}`}>
      {!last && <span aria-hidden className="absolute bottom-0 left-[6px] top-[22px] w-0.5 rounded-full bg-white/[0.09] sm:left-[126px]" />}
      <span aria-hidden className="absolute left-0 top-[4px] grid h-3.5 w-3.5 place-items-center sm:left-[120px]">
        {dot === "running" && <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />}
        <span className={`relative h-3.5 w-3.5 rounded-full ${DOT[dot]}`} />
      </span>
      <div className="mb-2 flex items-baseline gap-2 sm:absolute sm:left-0 sm:top-0 sm:mb-0 sm:w-[100px] sm:flex-col sm:items-end sm:gap-0.5 sm:text-right">
        <span className={`text-[15px] font-semibold leading-[22px] tracking-tight tabular-nums ${dot !== "past" ? "text-zinc-50" : "text-zinc-200"}`}>{date}</span>
        <span className={`text-[12px] font-medium ${accent ? "text-accent-light" : "text-zinc-400"}`}>{sub}</span>
      </div>
      {children}
    </li>
  );
}

function statusLine(v: ValidationState, budget: number): ReactNode {
  const n = testNumbers(v);
  if (v.status === "running") return <><span className="font-semibold text-warm">Live</span> · <b className="font-semibold text-zinc-100">{eur0(n.spend)}</b> of {eur0(budget)} · {signupsTxt(n.signups)}</>;
  if (v.status === "finished") {
    const won = n.call === "strong";
    return <><span className={won ? "font-semibold text-[#86efac]" : "font-semibold text-[#fca5a5]"}>{won ? "✓ Winner" : "✕ Not a winner"}</span> · {signupsTxt(n.signups)}</>;
  }
  return "Page live · test not started";
}

const pill = "relative z-10 inline-flex h-7 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light";

function TopPick({ idea, v, budget, loaded }: { idea: RunIdea; v: ValidationState; budget: number; loaded: boolean }) {
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
        <div className="min-w-0 text-[12px] text-zinc-400">{loaded ? statusLine(v, budget) : "\u00a0"}</div>
        <div className="flex shrink-0 gap-2">
          <Link href={`${href}#page`} className={`${pill} bg-white/[0.08] text-zinc-100 hover:bg-white/[0.14]`}>Demo</Link>
          <Link href={`${href}#${stage === "report" ? "report" : "validate"}`} className={`${pill} bg-accent-pale text-[#2a1f6b] hover:bg-white`}>{stage === "report" ? "Report" : "Validation"}</Link>
        </div>
      </div>
    </article>
  );
}

function RunnerUp({ idea }: { idea: RunIdea }) {
  return (
    <Link href={`/idea/${idea.id}/`} className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none">
      <span className="w-5 shrink-0 text-[12px] font-semibold tabular-nums text-zinc-400">#{idea.rank}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-zinc-200">{idea.name}</div>
        <div className="truncate text-[12px] text-zinc-400">{idea.pitch}</div>
      </div>
      <span className="shrink-0 text-[15px] font-semibold tabular-nums text-zinc-300">{idea.score}</span>
      <IconChevronRight size={14} className="shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-100" />
    </Link>
  );
}

function ScoreBars({ runs }: { runs: RunMeta[] }) {
  return (
    <div className="col-span-2 min-w-0 rounded-[20px] bg-tile p-4 sm:p-5 lg:col-span-1">
      <div className="text-[13px] text-zinc-400">Top score per scout day</div>
      <div className="mt-3 flex h-16 items-end gap-2">
        {runs.map((r, i) => {
          const p = r.ideas[0];
          return (
            <Link key={r.date} href={`/idea/${p.id}/`} title={`${p.name}: ${p.score} on ${shortDate(r.date)}`} aria-label={`${p.name}: score ${p.score} on ${shortDate(r.date)}`} className="group flex h-full flex-1 items-end justify-center">
              <span className={`w-full max-w-[34px] rounded-full transition-opacity group-hover:opacity-80 ${i === runs.length - 1 ? "bg-accent-light" : "bg-accent-deep"}`} style={{ height: `${p.score}%` }} />
            </Link>
          );
        })}
      </div>
      <div className="mt-2 flex gap-2 text-center text-[11px] leading-tight" aria-hidden>
        {runs.map((r) => <div key={r.date} className="min-w-0 flex-1"><div className="font-semibold tabular-nums text-zinc-100">{r.ideas[0].score}</div><div className="truncate text-zinc-400">{shortDate(r.date)}</div></div>)}
      </div>
    </div>
  );
}
