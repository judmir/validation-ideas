"use client";
import { useEffect } from "react";
import type { Idea, TrafficSource } from "@/lib/types";
import type { ValidationState } from "@/lib/store";
import { emptySignals, tickSignals } from "@/lib/sim";
import { Card, CardHeader, btn } from "../ui";
import { IconStop } from "../icons";
import AdKit, { SOURCE_NAME } from "./AdKit";
import LandingPreview from "./LandingPreview";
import SignalsTable from "./SignalsTable";

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
    { s: "meta", note: "Default. Paid traffic from the ad kit above.", available: true },
    { s: "google_search", note: val.adKit.searchIntent ? `On: people search for it (${(val.adKit.googleKeywords ?? []).slice(0, 2).join(", ")}…)` : "Off: no search intent for this idea.", available: val.adKit.searchIntent },
    { s: "reddit", note: `Optional paid ads in ${(val.adKit.redditSubs ?? []).join(", ") || "relevant subs"}.`, available: true },
  ];
  const toggle = (s: TrafficSource) => setV((p) => (p.status === "running" ? p : { status: "idle", active: p.active.includes(s) ? p.active.filter((x) => x !== s) : [...p.active, s] }));
  const start = () => setV((p) => ({ status: "running", startedAt: Date.now(), active: p.active.length ? p.active : ["meta"], bySource: emptySignals(ALL) }));
  const stop = () => setV((p) => (p.status === "running" ? { status: "finished", endedAt: new Date().toISOString().slice(0, 10), active: p.active, bySource: p.bySource } : p));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Landing page" sub="One shared template for every winner. Prices in USD." right={<span className="rounded-md bg-white/[0.08] px-2 py-0.5 text-[11px] font-semibold text-zinc-300">Preview only</span>} />
        <div id="landing" className="mt-4 scroll-mt-24"><LandingPreview landing={val.landing} name={name} /></div>
      </Card>

      <Card>
        <CardHeader title="Ad kit · Phase 1" sub="Copy each block into Meta Ads Manager yourself. Nothing is published from here." />
        <div className="mt-4"><AdKit kit={val.adKit} slug={val.landing.slug} /></div>
      </Card>

      <Card>
        <CardHeader title="Traffic plan" sub="No automated organic posting." />
        <ul className="mt-4 space-y-2">
          {plan.map(({ s, note, available }) => {
            const on = v.active.includes(s);
            const locked = v.status === "running" || (!available && !on);
            return (
              <li key={s} className="flex items-center gap-3 rounded-2xl bg-tile-2 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-zinc-50">{SOURCE_NAME[s]}{s === "reddit" && <span className="ml-1.5 text-[12px] font-medium text-zinc-400">optional</span>}</div>
                  <div className="text-[12px] text-zinc-400">{note}</div>
                </div>
                <button role="switch" aria-checked={on} aria-label={`${SOURCE_NAME[s]} ${on ? "on" : "off"}`} disabled={locked} onClick={() => toggle(s)} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${on ? "bg-accent" : "bg-white/[0.14]"}`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-[left] ${on ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card>
        <CardHeader
          title="Signals per source"
          sub={v.status === "running" ? "Simulated · ticks every ~1 s while this page is open" : v.status === "finished" ? `Simulated results · ended ${v.endedAt}${v.status === "finished" && v.seeded ? " (seeded demo)" : ""}` : "Not started"}
          right={loaded && v.status === "running" ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fdba74] px-2.5 py-0.5 text-[11px] font-semibold text-[#431407]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />Running</span> : undefined}
        />
        <div className="mt-4">
          {!loaded ? (
            <div className="h-40 animate-pulse rounded-2xl bg-white/[0.04]" />
          ) : v.status === "idle" ? (
            <div className="rounded-2xl border border-dashed border-white/[0.12] p-5 text-center text-[13px] text-zinc-400">Paste the ad kit, then start the simulation to watch price clicks, checkout starts and waitlist signups per source.</div>
          ) : (
            <SignalsTable rows={v.bySource} active={v.active} live={v.status === "running"} />
          )}
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          {v.status === "running" ? (
            <button onClick={stop} className={btn.primary}><IconStop size={11} /> End simulated test</button>
          ) : (
            <>
              {v.status === "finished" && <button onClick={goReport} className={btn.ghost}>View report</button>}
              <button onClick={start} disabled={!loaded} className={btn.primary}>{v.status === "finished" ? "Re-run simulation" : "Start simulated test"}</button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
