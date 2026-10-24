"use client";
import { useEffect } from "react";
import type { Idea, TrafficSource } from "@/lib/types";
import type { ValidationState } from "@/lib/store";
import { emptySignals, tickSignals } from "@/lib/sim";
import { Card, CardHeader, btn } from "../ui";
import { IconChevronRight, IconStop } from "../icons";
import AdKit, { SOURCE_NAME } from "./AdKit";
import LandingPreview from "./LandingPreview";
import SignalsTable from "./SignalsTable";
import MockedPill from "../MockedPill";

type Props = { idea: Idea; v: ValidationState; setV: (v: ValidationState | ((p: ValidationState) => ValidationState)) => void; loaded: boolean; goReport: () => void };
const ALL: TrafficSource[] = ["meta", "google_search", "reddit"];

export default function ValidateTab({ idea, v, setV, loaded, goReport }: Props) {
  const val = idea.validation!;
  const name = idea.name ?? idea.painId;
  const budget = val.adKit.budgetEur.max;

  useEffect(() => {
    if (v.status !== "running") return;
    const t = setInterval(() => setV((p) => (p.status === "running" ? { ...p, bySource: tickSignals(p.bySource, val.sim, p.active, budget) } : p)), 1200);
    return () => clearInterval(t);
  }, [v.status, val.sim, budget, setV]);

  const plan: { s: TrafficSource; note: string; available: boolean }[] = [
    { s: "meta", note: "Default. Paid traffic from the ad kit below.", available: true },
    { s: "google_search", note: val.adKit.searchIntent ? `On: people search for it (${(val.adKit.googleKeywords ?? []).slice(0, 2).join(", ")}…)` : "Off: no search intent for this idea.", available: val.adKit.searchIntent },
    { s: "reddit", note: `Optional paid ads in ${(val.adKit.redditSubs ?? []).join(", ") || "relevant subs"}.`, available: true },
  ];
  const toggle = (s: TrafficSource) => setV((p) => (p.status === "running" ? p : { status: "idle", active: p.active.includes(s) ? p.active.filter((x) => x !== s) : [...p.active, s] }));
  const start = () => setV((p) => ({ status: "running", startedAt: Date.now(), active: p.active.length ? p.active : ["meta"], bySource: emptySignals(ALL) }));
  const stop = () => setV((p) => (p.status === "running" ? { status: "finished", endedAt: new Date().toISOString().slice(0, 10), active: p.active, bySource: p.bySource } : p));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader
          title={<span className="inline-flex flex-wrap items-center gap-2">Live test <MockedPill /></span>}
          sub={v.status === "running" ? "Mocked · ticks every ~1 s while this page is open" : v.status === "finished" ? `Mocked results · ended ${v.endedAt}` : `EUR ${val.adKit.budgetEur.min}–${val.adKit.budgetEur.max} budget · not started`}
          right={loaded && v.status === "running" ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fdba74] px-2.5 py-0.5 text-[11px] font-semibold text-[#431407]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />Running</span> : undefined}
        />
        <div className="mt-4">
          {!loaded ? (
            <div className="h-40 animate-pulse rounded-2xl bg-white/[0.04]" />
          ) : v.status === "idle" ? (
            <div className="rounded-2xl border border-dashed border-white/[0.12] p-5 text-center text-[13px] text-zinc-400">Start the mocked test to watch made-up visitors, price clicks and waitlist signups come in.</div>
          ) : (
            <SignalsTable rows={v.bySource} active={v.active} live={v.status === "running"} />
          )}
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          {v.status === "running" ? (
            <button onClick={stop} className={btn.primary}><IconStop size={11} /> End mocked test</button>
          ) : (
            <>
              {v.status === "finished" && <button onClick={goReport} className={btn.ghost}>View report</button>}
              <button onClick={start} disabled={!loaded} className={btn.primary}>{v.status === "finished" ? "Re-run mocked test" : "Start mocked test"}</button>
            </>
          )}
        </div>
        <details className="group mt-5 border-t border-white/[0.06] pt-4">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-[13px] font-semibold text-zinc-300 hover:text-zinc-50">
            <span className="min-w-0 flex-1">Traffic sources <span className="font-medium text-zinc-400">· {v.active.map((s) => SOURCE_NAME[s].split(" (")[0]).join(", ") || "none"}</span></span>
            <IconChevronRight size={14} className="shrink-0 text-zinc-400 transition group-open:rotate-90" />
          </summary>
          <ul className="mt-3 space-y-2">
            {plan.map(({ s, note, available }) => {
              const on = v.active.includes(s);
              const locked = v.status === "running" || (!available && !on);
              return (
                <li key={s} className="flex items-center gap-3 rounded-2xl bg-tile-2 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-zinc-50">{SOURCE_NAME[s]}</div>
                    <div className="text-[12px] text-zinc-400">{note}</div>
                  </div>
                  <button role="switch" aria-checked={on} aria-label={`${SOURCE_NAME[s]} ${on ? "on" : "off"}`} disabled={locked} onClick={() => toggle(s)} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${on ? "bg-accent" : "bg-white/[0.14]"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-[left] ${on ? "left-[22px]" : "left-0.5"}`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </details>
      </Card>

      <Card>
        <CardHeader title={<span className="inline-flex flex-wrap items-center gap-2">Landing page <MockedPill /></span>} sub="One shared template for every winner. Prices in USD. Mocked preview, not deployed." />
        <div id="landing" className="mt-4 scroll-mt-24"><LandingPreview landing={val.landing} name={name} /></div>
      </Card>

      <Card className="!p-0">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-3 p-5 sm:p-6">
            <div className="min-w-0 flex-1">
              <h2 className="flex flex-wrap items-center gap-2 text-[17px] font-semibold tracking-tight text-zinc-50">Ad kit <MockedPill /></h2>
              <p className="mt-1 text-[13px] text-zinc-400">Copy for Meta Ads Manager. Nothing is published from here.</p>
            </div>
            <IconChevronRight size={16} className="shrink-0 text-zinc-400 transition group-open:rotate-90" />
          </summary>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6"><AdKit kit={val.adKit} slug={val.landing.slug} /></div>
        </details>
      </Card>
    </div>
  );
}
