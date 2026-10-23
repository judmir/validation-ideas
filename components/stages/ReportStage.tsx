"use client";
import { TARGET_CPS, TARGET_SIGNUP_RATE, eur, int, pct, type FinishedResult, type Idea } from "@/lib/data";
import type { ValidationState } from "@/lib/store";
import { verdict } from "@/lib/verdict";
import { Badge, Card, CardHeader, Stat, btn } from "../ui";
import { IconCheck, IconLock, IconX } from "../icons";

type Props = { idea: Idea; v: ValidationState; setV: (v: ValidationState) => void; loaded: boolean; goValidate: () => void };

export default function ReportStage({ idea, v, setV, loaded, goValidate }: Props) {
  if (!loaded) return <Card><div className="h-40 animate-pulse rounded-xl bg-white/[0.04]" /></Card>;
  if (v.status !== "finished") {
    const label = v.status === "running" ? "The test is still running." : v.status === "ready" ? "The ad is set up but not running yet." : "Validation hasn't started yet.";
    return (
      <Card className="py-10 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg border border-line-strong bg-surface-3 text-zinc-300"><IconLock size={20} /></div>
        <h2 className="mt-3 text-[15px] font-medium text-zinc-100">Report not available yet</h2>
        <p className="mt-1 text-[13px] text-zinc-400">{label} Finish the validation test to see results.</p>
        <button onClick={goValidate} className={btn.primary + " mt-4"}>Go to Validate</button>
      </Card>
    );
  }
  const r = v.result;
  const vd = verdict(idea, r);
  return (
    <div className="space-y-4">
      <Card className={vd.winner ? "border-[#bbf7d0]/25" : "border-[#fecaca]/25"}>
        <div className="flex items-start gap-3.5">
          <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${vd.winner ? "bg-[#bbf7d0] text-[#14532d]" : "bg-[#fecaca] text-[#7f1d1d]"}`}>{vd.winner ? <IconCheck size={22} strokeWidth={2.2} /> : <IconX size={22} strokeWidth={2.2} />}</div>
          <div>
            <div className="label">App Ideas bot verdict</div>
            <h2 className="mt-0.5 text-xl font-medium tracking-tight text-zinc-50">{vd.winner ? "Winning idea: Yes" : "Winning idea: No"}</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge color={vd.winner ? "green" : "red"}>{vd.winner ? "Invest more" : "Don't invest further"}</Badge>
              <Badge>Confidence: {vd.confidence}</Badge>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-zinc-300">{vd.recommendation}</p>
      </Card>

      <Card>
        <CardHeader title="Results" right={<span className="text-xs text-zinc-500">Finished {r.finishedAt} · {r.daily.length} days</span>} />
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
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
        <CardHeader
          title="Daily signups & spend"
          right={
            <div className="flex gap-3 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-zinc-500" />Signups</span>
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 bg-zinc-100" />Spend</span>
            </div>
          }
        />
        <Chart r={r} />
      </Card>

      <div className="flex justify-end">
        <button
          className="text-xs font-medium text-zinc-500 underline-offset-2 transition-colors hover:text-zinc-200 hover:underline"
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
    <Stat label={k} value={v} sub={target && <span className={ok ? "text-[#86efac]" : "text-[#fca5a5]"}>{ok ? "✓" : "✕"} {target}</span>} />
  );
}

function Funnel({ r }: { r: FinishedResult }) {
  const rows = [
    { k: "Impressions", n: r.impressions },
    { k: "Clicks", n: r.clicks },
    { k: "Signups", n: r.signups },
  ];
  return (
    <div className="mt-5 space-y-2">
      {rows.map((x, i) => {
        const w = i === 0 ? 100 : Math.max(4, Math.sqrt(x.n / r.impressions) * 100);
        return (
          <div key={x.k} className="flex items-center gap-2 text-xs">
            <span className="w-20 text-zinc-400">{x.k}</span>
            <div className="flex h-5 flex-1 items-center gap-2"><div className="h-5 rounded bg-gradient-to-r from-zinc-700 to-zinc-300" style={{ width: `${w * 0.8}%` }} /><span className="font-medium tabular-nums text-zinc-200">{int(x.n)}</span></div>
          </div>
        );
      })}
      <p className="text-[10px] text-zinc-500">Bar widths on √ scale.</p>
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
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 h-auto max-h-[300px] w-full">
      <defs>
        <linearGradient id="spend-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.12" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      {[0, 0.5, 1].map((f) => (
        <g key={f}>
          <line x1={P.l} x2={W - P.r} y1={P.t + ih * (1 - f)} y2={P.t + ih * (1 - f)} stroke="#222" />
          <text x={P.l - 4} y={P.t + ih * (1 - f) + 3} fontSize="8" textAnchor="end" fill="#71717a">{Math.round(maxS * f)}</text>
          <text x={W - P.r + 4} y={P.t + ih * (1 - f) + 3} fontSize="8" fill="#a1a1aa">€{Math.round(maxSp * f)}</text>
        </g>
      ))}
      {r.daily.map((d, i) => {
        const h = (d.signups / maxS) * ih;
        return (
          <g key={d.day}>
            <rect x={x(i) - bw / 2} y={P.t + ih - h} width={bw} height={h} rx="2" fill="#3f3f46"><title>{`Day ${d.day}: ${d.signups} signups, ${eur(d.spend)}`}</title></rect>
            <text x={x(i)} y={H - 8} fontSize="8" textAnchor="middle" fill="#71717a">D{d.day}</text>
          </g>
        );
      })}
      <polygon points={`${x(0)},${P.t + ih} ${line} ${x(n - 1)},${P.t + ih}`} fill="url(#spend-fill)" />
      <polyline points={line} fill="none" stroke="#f4f4f5" strokeWidth="1.5" strokeLinejoin="round" />
      {r.daily.map((d, i) => <circle key={d.day} cx={x(i)} cy={P.t + ih - (d.spend / maxSp) * ih} r="2.5" fill="#0f0f0f" stroke="#f4f4f5" strokeWidth="1.5" />)}
    </svg>
  );
}
