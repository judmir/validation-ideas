"use client";
import { TARGET_CPS, TARGET_SIGNUP_RATE, eur, int, pct, type FinishedResult, type Idea } from "@/lib/data";
import type { ValidationState } from "@/lib/store";
import { verdict } from "@/lib/verdict";
import { Badge, Card, CardHeader, Ring, Stat, btn } from "../ui";
import { IconCheck, IconLock, IconX } from "../icons";

type Props = { idea: Idea; v: ValidationState; setV: (v: ValidationState) => void; loaded: boolean; goValidate: () => void };

export default function ReportStage({ idea, v, setV, loaded, goValidate }: Props) {
  if (!loaded) return <Card><div className="h-40 animate-pulse rounded-2xl bg-white/[0.04]" /></Card>;
  if (v.status !== "finished") {
    const label = v.status === "running" ? "The test is still running." : v.status === "ready" ? "The ad is set up but not running yet." : "Validation hasn't started yet.";
    return (
      <Card className="py-12 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-tile-2 text-zinc-300"><IconLock size={20} /></div>
        <h2 className="mt-4 text-[17px] font-semibold text-zinc-50">Report not available yet</h2>
        <p className="mt-1.5 text-[13px] text-zinc-400">{label} Finish the validation test to see results.</p>
        <button onClick={goValidate} className={btn.primary + " mt-5"}>Go to Validate</button>
      </Card>
    );
  }
  const r = v.result;
  const vd = verdict(idea, r);
  const okRate = vd.signupRate >= TARGET_SIGNUP_RATE;
  const okCps = vd.cps <= TARGET_CPS;
  return (
    <div className="space-y-4">
      {/* Verdict: the one light card on this page */}
      <section className="rounded-[24px] bg-paper p-5 text-ink sm:p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Ring
            size={148}
            stroke={16}
            track="#e7e5ec"
            rings={[{ value: Math.min(1, vd.signupRate / TARGET_SIGNUP_RATE) * 100, color: vd.winner ? "#16a34a" : "#dc2626" }]}
            label={`Signup rate ${pct(vd.signupRate)}, target ${(TARGET_SIGNUP_RATE * 100).toFixed(0)}%`}
          >
            <div>
              <div className={`mx-auto grid h-7 w-7 place-items-center rounded-full ${vd.winner ? "bg-[#bbf7d0] text-[#14532d]" : "bg-[#fecaca] text-[#7f1d1d]"}`}>{vd.winner ? <IconCheck size={15} strokeWidth={2.6} /> : <IconX size={15} strokeWidth={2.6} />}</div>
              <div className="mt-1 text-[20px] font-bold tabular-nums leading-tight">{(vd.signupRate * 100).toFixed(1)}%</div>
              <div className="text-[11px] font-medium text-ink-soft">signup rate</div>
            </div>
          </Ring>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft">App Ideas bot verdict</div>
            <h2 className="mt-1 text-[26px] font-bold leading-tight tracking-tight sm:text-[30px]">{vd.winner ? "Winning idea: Yes" : "Winning idea: No"}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge color={vd.winner ? "green" : "red"}>{vd.winner ? "Invest more" : "Don't invest further"}</Badge>
              <Badge color="light">Confidence: {vd.confidence}</Badge>
            </div>
            <ul className="mt-3 space-y-1 text-[13px] font-medium">
              <li className={okRate ? "text-[#15803d]" : "text-[#b91c1c]"}>{okRate ? "✓" : "✕"} Signup rate {pct(vd.signupRate)} · target ≥ {(TARGET_SIGNUP_RATE * 100).toFixed(0)}%</li>
              <li className={okCps ? "text-[#15803d]" : "text-[#b91c1c]"}>{okCps ? "✓" : "✕"} Cost / signup {isFinite(vd.cps) ? eur(vd.cps) : "—"} · target ≤ {eur(TARGET_CPS)}</li>
            </ul>
          </div>
        </div>
        <p className="mt-5 border-t border-[#e7e5ec] pt-5 text-[14px] leading-relaxed text-ink-soft">{vd.recommendation}</p>
      </section>

      <Card>
        <CardHeader title="Results" right={<span className="text-xs text-zinc-400">Finished {r.finishedAt} · {r.daily.length} days</span>} />
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Kpi k="Spend" v={eur(r.spend)} />
          <Kpi k="Impressions" v={int(r.impressions)} />
          <Kpi k="Clicks" v={int(r.clicks)} />
          <Kpi k="CTR" v={pct(vd.ctr)} />
          <Kpi k="Signups" v={int(r.signups)} />
          <Kpi k="Signup rate" v={pct(vd.signupRate)} target={`target ≥ ${(TARGET_SIGNUP_RATE * 100).toFixed(0)}%`} ok={okRate} />
          <Kpi k="Cost / signup" v={isFinite(vd.cps) ? eur(vd.cps) : "—"} target={`target ≤ ${eur(TARGET_CPS)}`} ok={okCps} />
          <Kpi k="Cost / click" v={eur(vd.cpc)} />
        </div>
        <Funnel r={r} />
      </Card>

      <Card>
        <CardHeader
          title="Daily signups & spend"
          right={
            <div className="flex gap-3 text-[11px] text-zinc-300">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent" />Signups</span>
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded bg-warm" />Spend</span>
            </div>
          }
        />
        <Chart r={r} />
      </Card>

      <div className="flex justify-end">
        <button
          className="text-xs font-semibold text-zinc-400 underline-offset-2 transition-colors hover:text-zinc-200 hover:underline"
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
  const fills = ["bg-accent-pale", "bg-accent-light", "bg-accent"];
  return (
    <div className="mt-6 space-y-2.5">
      {rows.map((x, i) => {
        const w = i === 0 ? 100 : Math.max(6, Math.sqrt(x.n / r.impressions) * 100);
        return (
          <div key={x.k} className="flex items-center gap-3 text-xs">
            <span className="w-20 text-zinc-400">{x.k}</span>
            <div className="flex h-6 flex-1 items-center gap-2"><div className={`h-6 rounded-full ${fills[i]}`} style={{ width: `${w * 0.8}%` }} /><span className="font-semibold tabular-nums text-zinc-100">{int(x.n)}</span></div>
          </div>
        );
      })}
      <p className="text-[11px] text-zinc-400">Bar widths on √ scale.</p>
    </div>
  );
}

function Chart({ r }: { r: FinishedResult }) {
  const W = 320, H = 160, P = { l: 24, r: 30, t: 10, b: 22 };
  const n = r.daily.length;
  const maxS = Math.max(...r.daily.map((d) => d.signups), 1);
  const maxSp = Math.max(...r.daily.map((d) => d.spend), 1);
  const iw = W - P.l - P.r, ih = H - P.t - P.b, bw = Math.min(14, (iw / n) * 0.55);
  const x = (i: number) => P.l + (iw / n) * (i + 0.5);
  const line = r.daily.map((d, i) => `${x(i)},${P.t + ih - (d.spend / maxSp) * ih}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 h-auto max-h-[300px] w-full">
      {[0, 0.5, 1].map((f) => (
        <g key={f}>
          <line x1={P.l} x2={W - P.r} y1={P.t + ih * (1 - f)} y2={P.t + ih * (1 - f)} stroke="#34343a" strokeDasharray={f ? "2 3" : undefined} />
          <text x={P.l - 4} y={P.t + ih * (1 - f) + 3} fontSize="8" textAnchor="end" fill="#a1a1aa">{Math.round(maxS * f)}</text>
          <text x={W - P.r + 4} y={P.t + ih * (1 - f) + 3} fontSize="8" fill="#a1a1aa">€{Math.round(maxSp * f)}</text>
        </g>
      ))}
      {r.daily.map((d, i) => {
        const h = Math.max(bw, (d.signups / maxS) * ih);
        return (
          <g key={d.day}>
            <rect x={x(i) - bw / 2} y={P.t + ih - h} width={bw} height={h} rx={bw / 2} fill="#8b7cf6"><title>{`Day ${d.day}: ${d.signups} signups, ${eur(d.spend)}`}</title></rect>
            <text x={x(i)} y={H - 8} fontSize="8" textAnchor="middle" fill="#a1a1aa">D{d.day}</text>
          </g>
        );
      })}
      <polyline points={line} fill="none" stroke="#fb923c" strokeWidth="1.6" strokeLinejoin="round" />
      {r.daily.map((d, i) => <circle key={d.day} cx={x(i)} cy={P.t + ih - (d.spend / maxSp) * ih} r="2.5" fill="#252529" stroke="#fb923c" strokeWidth="1.5" />)}
    </svg>
  );
}
