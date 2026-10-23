"use client";
import { useEffect, useRef, useState } from "react";
import { eur, int, pct, type Idea } from "@/lib/data";
import type { ValidationState } from "@/lib/store";
import { emptyLive, simulateEnd, tick } from "@/lib/sim";
import { verdict } from "@/lib/verdict";
import { Badge, Card, CardHeader, Spinner, Stat, btn, linkCls } from "../ui";
import { IconChevronRight } from "../icons";

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

  if (!loaded) return <Card><div className="h-40 animate-pulse rounded-xl bg-white/[0.04]" /></Card>;

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
    return (
      <Card>
        {preparing ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <div className="text-zinc-200"><Spinner /></div>
            <div>
              <p className="font-semibold text-zinc-100">Preparing Facebook validation…</p>
              <ol className="mt-3 space-y-1 text-sm">
                {PREP_STEPS.map((s, i) => (
                  <li key={s} className={i < prepStep ? "text-[#86efac]" : i === prepStep ? "text-zinc-100" : "text-zinc-600"}>{i < prepStep ? "✓ " : ""}{s}</li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2 text-center">
            <Badge color="amber">On hold</Badge>
            <h2 className="text-lg font-medium tracking-tight text-zinc-50">Validation is on hold</h2>
            <p className="mx-auto max-w-md text-[13px] leading-relaxed text-zinc-400">
              The bot has built a <a className={linkCls} href={idea.validationUrl} target="_blank" rel="noreferrer">validation page</a> for {idea.name}. Purchase a small Facebook ad test to send real traffic to it and measure signups.
            </p>
            <p className="text-xs text-zinc-500">Estimated test: {eur(idea.ad!.budget.daily)}/day × {idea.ad!.budget.days} days = <span className="font-semibold tabular-nums text-zinc-200">{eur(idea.ad!.budget.daily * idea.ad!.budget.days)}</span></p>
            <button onClick={purchase} className={btn.primary + " w-full sm:w-auto"}>Purchase / Run validation</button>
          </div>
        )}
      </Card>
    );
  }

  if (v.status === "finished") {
    const vd = verdict(idea, v.result);
    return (
      <div className="space-y-4">
        <AdSetup idea={idea} status={<Badge color="slate">Completed</Badge>} compact />
        <Card className="text-center">
          <Badge color={vd.winner ? "green" : "red"}>{vd.winner ? "✓ Winning idea" : "✕ Not a winner"}</Badge>
          <p className="mt-2 text-[13px] text-zinc-400">Test finished {v.result.finishedAt}: {int(v.result.signups)} signups from {eur(v.result.spend)} spend.</p>
          <button onClick={onFinished} className={btn.primary + " mt-3"}>View report →</button>
        </Card>
      </div>
    );
  }

  if (v.status === "ready") {
    return (
      <div className="space-y-4">
        <AdSetup idea={idea} status={<Badge color="blue">Ready to run</Badge>} />
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
  const ctr = l.impressions ? l.clicks / l.impressions : 0;
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Live campaign" right={<Badge color="green" pulse>Running</Badge>} />
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          <Metric label="Spend" value={eur(l.spend)} />
          <Metric label="Impressions" value={int(l.impressions)} />
          <Metric label="Clicks" value={int(l.clicks)} />
          <Metric label="CTR" value={pct(ctr)} />
          <div className="col-span-2 sm:col-span-1"><Metric label="Signups" value={int(l.signups)} highlight /></div>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs text-zinc-400"><span>Budget used</span><span className="tabular-nums">{eur(l.spend)} / {eur(budget)}</span></div>
          <div className="h-1.5 rounded-full bg-line-strong"><div className="h-1.5 rounded-full bg-zinc-200 transition-all duration-700" style={{ width: `${Math.min(100, (l.spend / budget) * 100)}%` }} /></div>
        </div>
        <Sparkline points={l.ticks.map((t) => t.signups)} />
        <p className="mt-3 text-xs text-zinc-500">{l.spend >= budget ? "Budget fully spent — press “Simulate end of test” to see the report." : "Mock metrics update every ~1 s while this page is open."}</p>
      </Card>
      <AdSetup idea={idea} status={<Badge color="green">Live</Badge>} compact />
      <div className="flex justify-end">
        <button onClick={finish} className={btn.primary}>Simulate end of test →</button>
      </div>
    </div>
  );
}

function Metric({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <Stat label={label} value={value} highlight={highlight} tick />
  );
}

function Sparkline({ points }: { points: number[] }) {
  const ref = useRef<SVGSVGElement>(null);
  if (points.length < 2) return <div className="mt-4 h-16 rounded-lg border border-dashed border-line-strong text-center text-xs leading-[4rem] text-zinc-500">Collecting data…</div>;
  const max = Math.max(...points, 1);
  const d = points.map((p, i) => `${(i / (points.length - 1)) * 100},${40 - (p / max) * 36}`).join(" ");
  return (
    <svg ref={ref} viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-4 h-16 w-full rounded-lg border border-line bg-surface-2">
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.16" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      {[10, 20, 30].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#222" vectorEffect="non-scaling-stroke" />)}
      <polyline points={`0,40 ${d} 100,40`} fill="url(#spark-fill)" stroke="none" />
      <polyline points={d} fill="none" stroke="#f4f4f5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function AdSetup({ idea, status, compact }: { idea: Idea; status: React.ReactNode; compact?: boolean }) {
  const ad = idea.ad!;
  const host = idea.validationUrl?.replace(/^https?:\/\//, "").split("/")[0];
  const body = (
    <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 [&>*]:min-w-0">
      {/* Mock FB ad preview */}
      <div className="self-start rounded-lg border border-line bg-surface-2 p-2.5">
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
      <div className="space-y-4 text-sm">
        <Section title="Ad copy">
          <Row k="Headline" v={ad.headline} />
          <Row k="Primary text" v={ad.primaryText} />
          <Row k="CTA" v={ad.cta} />
        </Section>
        <Section title="Suggested audience">
          <Row k="Location" v={ad.audience.location} />
          <Row k="Age" v={ad.audience.age} />
          <div className="flex flex-wrap gap-1 pt-1">{ad.audience.interests.map((i) => <span key={i} className="rounded-md border border-line-strong bg-surface-3 px-2 py-0.5 text-xs text-zinc-300">{i}</span>)}</div>
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
      <CardHeader title={<>Facebook ad setup <span className="text-xs font-normal text-zinc-500">(mock)</span></>} right={status} />
      {compact ? (
        <details className="group">
          <summary className="mt-3 inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-200"><IconChevronRight size={12} className="transition group-open:rotate-90" /> Show ad copy, audience & budget</summary>
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
  <div className="flex gap-2"><span className="w-24 shrink-0 text-zinc-500">{k}</span><span className="text-zinc-200">{v}</span></div>
);
const Mini = ({ k, v }: { k: string; v: string }) => (
  <div className="rounded-lg border border-line bg-surface-2 px-2 py-2"><div className="text-[11px] text-zinc-400">{k}</div><div className="mt-0.5 font-medium tabular-nums text-zinc-100">{v}</div></div>
);
