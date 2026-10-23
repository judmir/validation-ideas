"use client";
import { TARGET_CPS, TARGET_SIGNUP_RATE, eur, int, pct, type FinishedResult, type Idea } from "@/lib/data";
import type { ValidationState } from "@/lib/store";
import { verdict } from "@/lib/verdict";
import { Badge, Card, btn } from "../ui";

type Props = { idea: Idea; v: ValidationState; setV: (v: ValidationState) => void; loaded: boolean; goValidate: () => void };

export default function ReportStage({ idea, v, setV, loaded, goValidate }: Props) {
  if (!loaded) return <Card><div className="h-40 animate-pulse rounded-xl bg-slate-100" /></Card>;
  if (v.status !== "finished") {
    const label = v.status === "running" ? "The test is still running." : v.status === "ready" ? "The ad is set up but not running yet." : "Validation hasn't started yet.";
    return (
      <Card className="py-10 text-center">
        <div className="text-3xl">🔒</div>
        <h2 className="mt-2 font-semibold">Report not available yet</h2>
        <p className="mt-1 text-sm text-slate-600">{label} Finish the validation test to see results.</p>
        <button onClick={goValidate} className={btn.primary + " mt-4"}>Go to Validate</button>
      </Card>
    );
  }
  const r = v.result;
  const vd = verdict(idea, r);
  return (
    <div className="space-y-4">
      <Card className={vd.winner ? "border-emerald-300 bg-emerald-50/40" : "border-rose-300 bg-rose-50/40"}>
        <div className="flex items-start gap-3">
          <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-2xl ${vd.winner ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>{vd.winner ? "✓" : "✕"}</div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">App Ideas bot verdict</div>
            <h2 className="text-xl font-bold">{vd.winner ? "Winning idea: Yes" : "Winning idea: No"}</h2>
            <div className="mt-1 flex flex-wrap gap-2">
              <Badge color={vd.winner ? "green" : "red"}>{vd.winner ? "Invest more" : "Don't invest further"}</Badge>
              <Badge>Confidence: {vd.confidence}</Badge>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">{vd.recommendation}</p>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Results</h3>
          <span className="text-xs text-slate-500">Finished {r.finishedAt} · {r.daily.length} days</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Kpi k="Spend" v={eur(r.spend)} />
          <Kpi k="Impressions" v={int(r.impressions)} />
          <Kpi k="Clicks" v={int(r.clicks)} />
          <Kpi k="CTR" v={pct(vd.ctr)} />
          <Kpi k="Signups" v={int(r.signups)} />
          <Kpi k="Signup rate" v={pct(vd.signupRate)} target={`target ≥ ${(TARGET_SIGNUP_RATE * 100).toFixed(0)}%`} ok={vd.signupRate >= TARGET_SIGNUP_RATE} />
          <Kpi k="Cost / signup" v={isFinite(vd.cps) ? eur(vd.cps) : "—"} target={`target ≤ ${eur(TARGET_CPS)}`} ok={vd.cps <= TARGET_CPS} />
          <Kpi k="Cost / click" v={eur(vd.cpc)} />
        </div>
        <Funnel r={r} />
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Daily signups & spend</h3>
          <div className="flex gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-indigo-500" />Signups</span>
            <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-amber-500" />Spend</span>
          </div>
        </div>
        <Chart r={r} />
      </Card>

      <div className="flex justify-end">
        <button
          className="text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline"
          onClick={() => { if (confirm("Discard these results and run the validation again?")) { setV({ status: "on_hold" }); goValidate(); } }}
        >
          Re-run validation
        </button>
      </div>
    </div>
  );
}

function Kpi({ k, v, target, ok }: { k: string; v: string; target?: string; ok?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{k}</div>
      <div className="text-lg font-semibold tabular-nums">{v}</div>
      {target && <div className={`text-[11px] ${ok ? "text-emerald-600" : "text-rose-600"}`}>{ok ? "✓" : "✕"} {target}</div>}
    </div>
  );
}

function Funnel({ r }: { r: FinishedResult }) {
  const rows = [
    { k: "Impressions", n: r.impressions },
    { k: "Clicks", n: r.clicks },
    { k: "Signups", n: r.signups },
  ];
  return (
    <div className="mt-4 space-y-1.5">
      {rows.map((x, i) => {
        const w = i === 0 ? 100 : Math.max(4, Math.sqrt(x.n / r.impressions) * 100);
        return (
          <div key={x.k} className="flex items-center gap-2 text-xs">
            <span className="w-20 text-slate-500">{x.k}</span>
            <div className="flex h-5 flex-1 items-center gap-2"><div className="h-5 rounded bg-indigo-500/80" style={{ width: `${w * 0.8}%` }} /><span className="font-medium tabular-nums text-slate-700">{int(x.n)}</span></div>
          </div>
        );
      })}
      <p className="text-[10px] text-slate-400">Bar widths on √ scale.</p>
    </div>
  );
}

function Chart({ r }: { r: FinishedResult }) {
  const W = 320, H = 160, P = { l: 24, r: 28, t: 10, b: 22 };
  const n = r.daily.length;
  const maxS = Math.max(...r.daily.map((d) => d.signups), 1);
  const maxSp = Math.max(...r.daily.map((d) => d.spend), 1);
  const iw = W - P.l - P.r, ih = H - P.t - P.b, bw = (iw / n) * 0.6;
  const x = (i: number) => P.l + (iw / n) * (i + 0.5);
  const line = r.daily.map((d, i) => `${x(i)},${P.t + ih - (d.spend / maxSp) * ih}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full">
      {[0, 0.5, 1].map((f) => (
        <g key={f}>
          <line x1={P.l} x2={W - P.r} y1={P.t + ih * (1 - f)} y2={P.t + ih * (1 - f)} stroke="#e2e8f0" />
          <text x={P.l - 4} y={P.t + ih * (1 - f) + 3} fontSize="8" textAnchor="end" fill="#64748b">{Math.round(maxS * f)}</text>
          <text x={W - P.r + 4} y={P.t + ih * (1 - f) + 3} fontSize="8" fill="#b45309">€{Math.round(maxSp * f)}</text>
        </g>
      ))}
      {r.daily.map((d, i) => {
        const h = (d.signups / maxS) * ih;
        return (
          <g key={d.day}>
            <rect x={x(i) - bw / 2} y={P.t + ih - h} width={bw} height={h} rx="2" fill="#6366f1"><title>{`Day ${d.day}: ${d.signups} signups, ${eur(d.spend)}`}</title></rect>
            <text x={x(i)} y={H - 8} fontSize="8" textAnchor="middle" fill="#64748b">D{d.day}</text>
          </g>
        );
      })}
      <polyline points={line} fill="none" stroke="#f59e0b" strokeWidth="2" />
      {r.daily.map((d, i) => <circle key={d.day} cx={x(i)} cy={P.t + ih - (d.spend / maxSp) * ih} r="2.5" fill="#f59e0b" />)}
    </svg>
  );
}
