"use client";
import { useEffect, useState } from "react";
import { eur, int, pct, type Idea } from "@/lib/data";
import type { ValidationState } from "@/lib/store";
import { emptyLive, simulateEnd, tick } from "@/lib/sim";
import { verdict } from "@/lib/verdict";
import { Badge, Card, CardHeader, Sparkline, Spinner, Stat, btn } from "../ui";
import { IconCheck, IconChevronRight, IconSparkle, IconStop } from "../icons";

type Props = { idea: Idea; v: ValidationState; setV: (v: ValidationState | ((p: ValidationState) => ValidationState)) => void; loaded: boolean; onFinished: () => void };

const PREP_STEPS = ["Drafting ad copy…", "Building audience…", "Estimating budget…"];

export default function ValidateStage({ idea, v, setV, loaded, onFinished }: Props) {
  const [preparing, setPreparing] = useState(false);
  const [prepStep, setPrepStep] = useState(0);
  const [launching, setLaunching] = useState(false);

  // Live metrics ticker while running
  useEffect(() => {
    if (v.status !== "running") return;
    const t = setInterval(() => {
      const cap = idea.ad!.budget.daily * idea.ad!.budget.days;
      setV((p) => (p.status === "running" && p.live.spend < cap ? { ...p, live: tick(idea, p.live) } : p));
    }, 1200);
    return () => clearInterval(t);
  }, [v.status, idea, setV]);

  if (!loaded) return <Card><div className="h-40 animate-pulse rounded-2xl bg-white/[0.04]" /></Card>;

  const purchase = () => {
    setPreparing(true);
    setPrepStep(0);
    const iv = setInterval(() => setPrepStep((s) => Math.min(s + 1, PREP_STEPS.length - 1)), 700);
    setTimeout(() => {
      clearInterval(iv);
      setPreparing(false);
      setV({ status: "ready" });
    }, 2100);
  };
  const run = () => {
    setLaunching(true);
    setTimeout(() => {
      setLaunching(false);
      setV({ status: "running", startedAt: Date.now(), live: emptyLive() });
    }, 900);
  };
  const finish = () => {
    if (v.status !== "running") return;
    setV({ status: "finished", result: simulateEnd(idea, v.live) });
    onFinished();
  };

  if (v.status === "on_hold") {
    const total = idea.ad!.budget.daily * idea.ad!.budget.days;
    return (
      <section className="rounded-[24px]bg-[linear-gradient(160deg,#c9c0fc_0%,#9a8cf8_45%,#6f60e6_100%)] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-2.5 py-1 text-[11px] font-bold text-accent-ink"><IconSparkle size={12} strokeWidth={2} /> App Ideas bot</span>
          <span className="rounded-full bg-[#1c1830] px-2.5 py-1 text-[11px] font-semibold text-white">{preparing ? "Preparing…" : "On hold"}</span>
        </div>
        {preparing ? (
          <div className="mt-5 rounded-2xl rounded-bl-md bg-white p-4 text-ink" aria-live="polite">
            <p className="flex items-center gap-2 font-bold"><Spinner /> Preparing Facebook validation…</p>
            <ol className="mt-3 space-y-1.5 text-[13px]">
              {PREP_STEPS.map((s, i) => (
                <li key={s} className={`flex items-center gap-2 ${i < prepStep ? "text-[#4c3fb8]" : i === prepStep ? "font-semibold text-ink" : "text-ink-soft"}`}>
                  <span className={`grid h-4 w-4 place-items-center rounded-full ${i < prepStep ? "bg-accent-pale" : "bg-[#ebe9f0]"}`}>{i < prepStep && <IconCheck size={10} strokeWidth={3} />}</span>{s}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <>
            <h2 className="mt-5 text-[22px] font-bold tracking-tight text-accent-ink">Validation is on hold</h2>
            <p className="mt-3 rounded-2xl rounded-bl-md bg-white p-4 text-[13px] leading-relaxed text-ink">
              I&apos;ve built a <a className="font-bold text-[#4c3fb8] underline underline-offset-2" href={idea.validationUrl} target="_blank" rel="noreferrer">validation page</a> for <b>{idea.name}</b>. Purchase a small Facebook ad test to send real traffic to it and measure signups.
              <span className="mt-2 block text-ink-soft">Estimated test: {eur(idea.ad!.budget.daily)}/day × {idea.ad!.budget.days} days = <b className="tabular-nums text-ink">{eur(total)}</b></span>
            </p>
            <button onClick={purchase} className={btn.primary + " mt-6 w-full sm:w-auto"}>Purchase / Run validation</button>
          </>
        )}
      </section>
    );
  }

  if (v.status === "finished") {
    const vd = verdict(idea, v.result);
    return (
      <div className="space-y-4">
        <AdSetup idea={idea} status={<Badge color="slate">Completed</Badge>} compact />
        <Card className="text-center">
          <Badge color={vd.winner ? "green" : "red"}>{vd.winner ? "✓ Winning idea" : "✕ Not a winner"}</Badge>
          <p className="mt-2.5 text-[13px] text-zinc-300">Test finished {v.result.finishedAt}: {int(v.result.signups)} signups from {eur(v.result.spend)} spend.</p>
          <button onClick={onFinished} className={btn.primary + " mt-4"}>View report →</button>
        </Card>
      </div>
    );
  }

  if (v.status === "ready") {
    return (
      <div className="space-y-4">
        <AdSetup idea={idea} status={<Badge color="violet">Ready to run</Badge>} />
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button onClick={() => setV({ status: "on_hold" })} className={btn.ghost} disabled={launching}>Cancel</button>
          <button onClick={run} className={btn.fb} disabled={launching}>
            {launching ? <><Spinner /> Publishing…</> : <>Run in Facebook Ads Manager</>}
          </button>
        </div>
      </div>
    );
  }

  // running
  const l = v.live;
  const budget = idea.ad!.budget.daily * idea.ad!.budget.days;
  const used = Math.min(100, (l.spend / budget) * 100);
  const ctr = l.impressions ? l.clicks / l.impressions : 0;
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        {/* Light "time tracker" card: budget gauge */}
        <section className="flex flex-col rounded-[22px] bg-paper p-5 text-ink sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[17px] font-bold tracking-tight">Live campaign</h2>
              <div className="mt-1.5"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffedd5] px-2.5 py-0.5 text-[11px] font-bold text-[#9a3412]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ea580c]" />Running</span></div>
            </div>
            <button onClick={finish} aria-label="Simulate end of test" title="Simulate end of test" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f97316] text-white ring-4 ring-[#ffedd5] transition-colors hover:bg-[#ea580c]">
              <IconStop size={13} />
            </button>
          </div>
          <div className="relative mx-auto mt-4 w-full max-w-[280px]">
            <svg viewBox="0 0 240 132" className="w-full" aria-hidden>
              <defs>
                <linearGradient id="gauge-grad" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#f2622e" /><stop offset=".6" stopColor="#fb923c" /><stop offset="1" stopColor="#fdba5c" /></linearGradient>
              </defs>
              <path d="M 22 120 A 98 98 0 0 1 218 120" fill="none" stroke="#e7e5ec" strokeWidth="16" strokeLinecap="round" pathLength={100} />
              {/* Any spend > 0 shows at least a short arc; a near-zero dash would render as a stray dot. */}
              {l.spend > 0 && <path d="M 22 120 A 98 98 0 0 1 218 120" fill="none" stroke="url(#gauge-grad)" strokeWidth="16" strokeLinecap="round" pathLength={100} strokeDasharray={`${Math.max(5, used)} 100`} className="transition-[stroke-dasharray] duration-700" />}
            </svg>
            <div className="absolute inset-x-0 bottom-0 text-center">
              <div className="text-[34px] font-medium leading-none tabular-nums tracking-tight sm:text-[40px]">{eur(l.spend)}</div>
              <div className="mt-1.5 text-[12px] font-medium text-ink-soft">of {eur(budget)} budget</div>
            </div>
          </div>
          <p className="mt-5 text-center text-xs text-ink-soft">{l.spend >= budget ? "Budget fully spent — press “Simulate end of test” to see the report." : "Mock metrics update every ~1 s while this page is open."}</p>
        </section>

        <Card className="min-w-0">
          <CardHeader title="Live metrics" sub="Facebook ad test · mock" />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Stat label="Impressions" value={int(l.impressions)} tick />
            <Stat label="Clicks" value={int(l.clicks)} tick />
            <Stat label="CTR" value={pct(ctr)} tick />
            <Stat label="Signups" value={int(l.signups)} highlight tick />
          </div>
          <div className="mt-3 rounded-2xl bg-tile-2/60 p-3">
            <div className="mb-2 text-[11px] text-zinc-400">Signups over time</div>
            <Sparkline points={[0, ...l.ticks.map((t) => t.signups)]} label={l.ticks.length ? "Signups over time" : "Collecting signup data…"} className="h-16" />
          </div>
        </Card>
      </div>
      <AdSetup idea={idea} status={<Badge color="orange">Live</Badge>} compact />
      <div className="flex justify-end">
        <button onClick={finish} className={btn.primary}>Simulate end of test →</button>
      </div>
    </div>
  );
}

function AdSetup({ idea, status, compact }: { idea: Idea; status: React.ReactNode; compact?: boolean }) {
  const ad = idea.ad!;
  const host = idea.validationUrl?.replace(/^https?:\/\//, "").split("/")[0];
  const body = (
    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 [&>*]:min-w-0">
      {/* Mock FB ad preview — keeps Facebook's own look */}
      <div className="self-start rounded-2xl bg-tile-2 p-3">
      <div className="label mb-2 px-0.5">Ad preview</div>
      <div className="overflow-hidden rounded-lg bg-white text-sm text-zinc-900">
        <div className="flex items-center gap-2 p-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-violet-600 text-xs font-bold text-white">{idea.name[0]}</div>
          <div><div className="font-semibold leading-tight">{idea.name}</div><div className="text-[11px] text-zinc-500">Sponsored</div></div>
        </div>
        <p className="px-3 pb-3 text-zinc-700">{ad.primaryText}</p>
        <div className="grid h-28 place-items-center bg-gradient-to-br from-violet-600 to-indigo-500 px-4 text-center font-semibold text-white">{ad.headline}</div>
        <div className="flex items-center justify-between gap-2 bg-zinc-100 p-3">
          <div className="min-w-0"><div className="truncate text-[11px] uppercase text-zinc-500">{host}</div><div className="truncate font-semibold">{ad.headline}</div></div>
          <span className="shrink-0 rounded-md bg-zinc-200 px-3 py-1.5 text-xs font-semibold">{ad.cta}</span>
        </div>
      </div>
      </div>
      <div className="space-y-5 text-sm">
        <Section title="Ad copy">
          <Row k="Headline" v={ad.headline} />
          <Row k="Primary text" v={ad.primaryText} />
          <Row k="CTA" v={ad.cta} />
        </Section>
        <Section title="Suggested audience">
          <Row k="Location" v={ad.audience.location} />
          <Row k="Age" v={ad.audience.age} />
          <div className="flex flex-wrap gap-1.5 pt-1">{ad.audience.interests.map((i) => <span key={i} className="rounded-full bg-white/[0.08] px-2.5 py-0.5 text-xs font-medium text-zinc-200">{i}</span>)}</div>
        </Section>
        <Section title="Estimated budget">
          <div className="grid grid-cols-3 gap-2 text-center">
            <Mini k="Daily" v={eur(ad.budget.daily)} />
            <Mini k="Duration" v={`${ad.budget.days} days`} />
            <Mini k="Total" v={eur(ad.budget.daily * ad.budget.days)} />
          </div>
        </Section>
      </div>
    </div>
  );
  return (
    <Card>
      <CardHeader title={<>Facebook ad setup <span className="text-xs font-normal text-zinc-400">(mock)</span></>} right={status} />
      {compact ? (
        <details className="group">
          <summary className="mt-3 inline-flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-zinc-400 transition-colors hover:text-zinc-200"><IconChevronRight size={12} className="transition group-open:rotate-90" /> Show ad copy, audience & budget</summary>
          {body}
        </details>
      ) : body}
    </Card>
  );
}
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div><h3 className="label mb-2">{title}</h3><div className="space-y-1.5">{children}</div></div>
);
const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex gap-2"><span className="w-24 shrink-0 text-zinc-400">{k}</span><span className="text-zinc-100">{v}</span></div>
);
const Mini = ({ k, v }: { k: string; v: string }) => (
  <div className="rounded-2xl bg-tile-2 px-2 py-2.5"><div className="text-[11px] text-zinc-400">{k}</div><div className="mt-0.5 font-semibold tabular-nums text-zinc-50">{v}</div></div>
);
