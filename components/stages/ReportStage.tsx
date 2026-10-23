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
      <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-tile-2 text-zinc-300"><IconLock size={18} /></div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold text-zinc-50">Report not available yet</h3>
          <p className="mt-0.5 text-[13px] text-zinc-400">{label} The verdict appears here when the live test finishes.</p>
        </div>
        <button onClick={goValidate} className={btn.ghost}>Go to live test</button>
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

      {/* Two single-series charts rather than one dual-axis chart: each reads on its own scale. */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader title="Daily signups" sub={`${int(r.signups)} in total`} />
          <DailyBars values={r.daily.map((d) => d.signups)} fill="bg-accent" fmt={(n) => int(n)} unit="signups" />
        </Card>
        <Card className="min-w-0">
          <CardHeader title="Daily spend" sub={`${eur(r.spend)} in total`} />
          <DailyBars values={r.daily.map((d) => d.spend)} fill="bg-warm" fmt={(n) => "€" + Math.round(n)} unit="spent" />
        </Card>
      </div>

      <div className="flex justify-end">
        <button
          className="text-xs font-semibold text-zinc-300 underline decoration-zinc-500 underline-offset-2 transition-colors hover:text-white hover:decoration-zinc-300"
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

/** HTML pill-bar chart (zero baseline, recessive grid) so axis labels stay 11px+ at any width. */
function DailyBars({ values, fill, fmt, unit }: { values: number[]; fill: string; fmt: (n: number) => string; unit: string }) {
  const max = Math.max(...values, 1);
  const ticks = [1, 0.5, 0];
  return (
    <div className="mt-5 flex gap-2">
      <div className="relative h-40 w-8 shrink-0 text-right text-[11px] tabular-nums text-zinc-400" aria-hidden>
        {ticks.map((f) => <span key={f} className="absolute right-0 -translate-y-1/2" style={{ top: `${(1 - f) * 100}%` }}>{fmt(max * f)}</span>)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="relative h-40">
          {ticks.map((f) => <div key={f} className={`absolute inset-x-0 border-t ${f ? "border-dashed border-white/[0.08]" : "border-white/[0.16]"}`} style={{ top: `${(1 - f) * 100}%` }} />)}
          <div className="absolute inset-0 flex items-end gap-1.5">
            {values.map((n, i) => (
              <div key={i} className="group relative flex h-full flex-1 items-end justify-center" title={`Day ${i + 1}: ${fmt(n)} ${unit}`}>
                <span className={`w-full max-w-[22px] rounded-t-full ${fill} transition-opacity group-hover:opacity-80`} style={{ height: `${n > 0 ? Math.max(4, (n / max) * 100) : 0}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex gap-1.5 text-center text-[11px] text-zinc-400" aria-hidden>
          {values.map((_, i) => <span key={i} className="flex-1">D{i + 1}</span>)}
        </div>
        <table className="sr-only">
          <caption>Daily {unit}</caption>
          <tbody>{values.map((n, i) => <tr key={i}><th>Day {i + 1}</th><td>{fmt(n)}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
