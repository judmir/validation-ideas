"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RUNS, eur, int, type Idea } from "@/lib/data";
import { PREFIX, initialState, useValidation, type ValidationState } from "@/lib/store";
import { verdict } from "@/lib/verdict";
import { Ring, StatTile, Tag } from "./ui";
import { IconChecks, IconSparkle } from "./icons";

const BY_DATE = [...RUNS].sort((a, b) => a.date.localeCompare(b.date));
const TOP_PICKS = BY_DATE.map((r) => r.ideas[0]);
const LATEST_RUN = BY_DATE[BY_DATE.length - 1];
const shortDate = (iso: string) => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });

/** "Validations run" tile: one dot per top pick — warm when finished, pulsing while live. */
export function ValidationsTile() {
  const [states, setStates] = useState<ValidationState["status"][] | null>(null);
  useEffect(() => {
    const read = (i: Idea) => {
      try {
        const raw = localStorage.getItem(PREFIX + "val:" + i.id);
        return (raw ? (JSON.parse(raw) as ValidationState) : initialState(i)).status;
      } catch {
        return initialState(i).status;
      }
    };
    const sync = () => setStates(TOP_PICKS.map(read));
    sync();
    window.addEventListener("vi-storage", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("vi-storage", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const done = states?.filter((s) => s === "finished").length;
  return (
    <StatTile icon={<IconChecks size={18} />} tone="accent" value={done ?? "–"} unit={`of ${TOP_PICKS.length}`} label="Validations run">
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {TOP_PICKS.map((p, i) => {
          const s = states?.[i];
          return <span key={p.id} title={p.name} className={`h-3 w-3 rounded-full ${s === "finished" ? "bg-warm" : s === "running" ? "animate-pulse bg-warm/70" : "bg-white/[0.12]"}`} />;
        })}
      </div>
    </StatTile>
  );
}

/** Pill bar chart of each day's top score, plus one hatched bar for the projected next run. */
export function ScoreTrends() {
  const scores = TOP_PICKS.map((p) => p.score);
  const projected = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const best = TOP_PICKS.reduce((a, b) => (b.score > a.score ? b : a));
  const h = (s: number) => `${Math.max(18, ((s - 30) / 70) * 100)}%`;
  const fills = ["bg-zinc-100", "bg-accent-light", "bg-accent-deep", "bg-accent-pale", "bg-accent"];
  return (
    <section id="trends" className="scroll-mt-20 rounded-[22px] bg-tile p-5 sm:p-6">
      <div className="grid gap-5 md:grid-cols-[200px_minmax(0,1fr)] md:gap-6">
        <div className="flex flex-col">
          <h2 className="text-[17px] font-semibold tracking-tight text-zinc-50">Score trends</h2>
          <p className="mt-1 text-[13px] text-zinc-400">Top pick score per scout day</p>
          <div className="mt-4 rounded-2xl bg-tile-2 p-4 md:mt-auto">
            <div className="flex items-baseline gap-1.5"><span className="text-[34px] font-medium leading-none tabular-nums text-zinc-50">{best.score}</span><span className="text-[13px] font-medium text-zinc-300">pts</span></div>
            <div className="mt-1.5 text-[13px] text-zinc-400">best score so far</div>
            <div className="mt-2.5"><Tag>{best.name}</Tag></div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex h-48 items-end justify-between gap-2 sm:gap-3">
            {TOP_PICKS.map((p, i) => {
              const latest = i === TOP_PICKS.length - 1;
              return (
                <Link key={p.id} href={`/idea/${p.id}/`} aria-label={`${p.name}: score ${p.score} on ${shortDate(BY_DATE[i].date)}`} className="group relative flex h-full flex-1 justify-center">
                  <span className={`relative mt-auto w-full max-w-[60px] rounded-full transition-opacity group-hover:opacity-85 ${fills[i % fills.length]}`} style={{ height: h(p.score) }}>
                    {latest && (
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-ink shadow">
                        {p.score} pts
                        <span className="absolute -bottom-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-tile bg-white" />
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
            <div className="flex h-full flex-1 justify-center" role="img" aria-label={`Next run, projected score about ${projected}`}>
              <span className="hatch mt-auto w-full max-w-[60px] rounded-full" style={{ height: h(projected) }} />
            </div>
          </div>
          <div className="mt-3 flex justify-between gap-2 text-center sm:gap-3">
            {TOP_PICKS.map((p, i) => (
              <div key={p.id} className="min-w-0 flex-1"><div className="text-[13px] font-semibold tabular-nums text-zinc-100">{p.score}</div><div className="truncate text-[11px] text-zinc-400">{shortDate(BY_DATE[i].date)}</div></div>
            ))}
            <div className="min-w-0 flex-1"><div className="text-[13px] font-semibold tabular-nums text-zinc-300">~{projected}</div><div className="truncate text-[11px] text-zinc-400">Next</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Today's top pick as a ring: outer = its score, inner = the run's average. */
export function TopPickTile() {
  const p = LATEST_RUN.ideas[0];
  const avg = Math.round(LATEST_RUN.ideas.reduce((a, b) => a + b.score, 0) / LATEST_RUN.ideas.length);
  return (
    <Link href={`/idea/${p.id}/`} className="flex flex-col items-center rounded-[22px] bg-tile p-5 transition-colors hover:bg-[#29292e] sm:p-6">
      <Ring size={168} stroke={20} gap={6} rings={[{ value: p.score, color: "var(--color-accent)" }, { value: avg, color: "var(--color-accent-pale)" }]} label={`Score ${p.score} of 100; run average ${avg}`}>
        <div><div className="text-[15px] font-bold text-zinc-50">{p.score}/100</div><div className="text-[11px] text-zinc-400">top score</div></div>
      </Ring>
      <div className="mt-4 w-full text-center">
        <div className="text-[12px] text-zinc-400">Today&apos;s top pick</div>
        <div className="mt-0.5 truncate text-[17px] font-bold tracking-tight text-zinc-50">{p.name}</div>
      </div>
      <dl className="mt-4 w-full space-y-2 text-[13px]">
        <div className="flex items-center gap-2.5"><span className="h-3.5 w-3.5 rounded-[5px] bg-accent" /><dt className="flex-1 text-zinc-300">Top pick</dt><dd className="font-semibold tabular-nums text-zinc-50">{p.score}</dd></div>
        <div className="flex items-center gap-2.5"><span className="h-3.5 w-3.5 rounded-[5px] bg-accent-pale" /><dt className="flex-1 text-zinc-300">Run average</dt><dd className="font-semibold tabular-nums text-zinc-50">{avg}</dd></div>
      </dl>
    </Link>
  );
}

/** Gradient lavender "scout insight": a recommendation bubble plus two pill actions, driven by validation state. */
export function InsightCard() {
  const p = LATEST_RUN.ideas[0];
  const [v, , loaded] = useValidation(p);
  const budget = p.ad ? p.ad.budget.daily * p.ad.budget.days : 0;
  let text: React.ReactNode;
  let action: { label: string; hash: string };
  if (!loaded) {
    text = <>Reading today&apos;s scout run…</>;
    action = { label: "Open flow", hash: "" };
  } else if (v.status === "on_hold") {
    text = <><b>{p.name}</b> scored {p.score} — the best idea today. Start a <b>{eur(budget)} ad test</b> to see if people sign up?</>;
    action = { label: "Start validation", hash: "#validate" };
  } else if (v.status === "ready") {
    text = <>The ad for <b>{p.name}</b> is set up. <b>Publish it</b> to start collecting signups?</>;
    action = { label: "Go live", hash: "#validate" };
  } else if (v.status === "running") {
    text = <><b>{p.name}</b>&apos;s test is live — <b>{int(v.live.signups)} signups</b> so far.</>;
    action = { label: "Watch live", hash: "#validate" };
  } else {
    const w = verdict(p, v.result).winner;
    text = <><b>{p.name}</b>&apos;s test is done: <b>{w ? "a winning idea" : "not a winner"}</b> with {int(v.result.signups)} signups.</>;
    action = { label: "Read report", hash: "#report" };
  }
  return (
    <section className="flex flex-col rounded-[22px] bg-[linear-gradient(160deg,#c9c0fc_0%,#9a8cf8_45%,#6f60e6_100%)] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-2.5 py-1 text-[11px] font-bold text-accent-ink"><IconSparkle size={12} strokeWidth={2} /> Scout insight</span>
        <span className="flex gap-1" aria-hidden><span className="h-1.5 w-4 rounded-full bg-white" /><span className="h-1.5 w-1.5 rounded-full bg-white/60" /><span className="h-1.5 w-1.5 rounded-full bg-white/60" /></span>
      </div>
      <p className="mt-4 rounded-2xl rounded-bl-md bg-white p-3.5 text-[13px] leading-relaxed text-ink [&_b]:font-bold" aria-live="polite">{text}</p>
      <div className="mt-6 grid gap-2">
        <Link href={`/idea/${p.id}/`} className="inline-flex h-10 items-center justify-center rounded-full bg-[#1c1830] text-[13px] font-semibold text-white transition-colors hover:bg-[#2a2545]">View scout</Link>
        <Link href={`/idea/${p.id}/${action.hash}`} className="inline-flex h-10 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-ink transition-colors hover:bg-zinc-100">{action.label}</Link>
      </div>
    </section>
  );
}
