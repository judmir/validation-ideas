"use client";
import { RULES, type Idea } from "@/lib/types";
import type { ValidationState } from "@/lib/store";
import { eur0, pct, plural } from "@/lib/format";
import { CALL_LABEL, recommendation, totals, validationVerdict, type ValidationCall } from "@/lib/verdict";
import { Card, CardHeader, Funnel, btn } from "../ui";
import { IconChevronRight, IconLock } from "../icons";
import { SOURCE_NAME } from "./AdKit";

const TONE: Record<ValidationCall, { bg: string; ink: string; bar: string }> = { // bg/ink kept for reuse
  strong: { bg: "bg-[#bbf7d0]", ink: "text-[#14532d]", bar: "#16a34a" },
  kill: { bg: "bg-[#fecaca]", ink: "text-[#7f1d1d]", bar: "#dc2626" },
  inconclusive: { bg: "bg-[#fde68a]", ink: "text-[#713f12]", bar: "#d97706" },
  "not-enough-traffic": { bg: "bg-[#ebe9f0]", ink: "text-ink-soft", bar: "#8b7cf6" },
};
const SCALE = 0.05; // rate bar runs 0–5%

export default function ReportTab({ idea, v, loaded, goValidate }: { idea: Idea; v: ValidationState; loaded: boolean; goValidate: () => void }) {
  if (!loaded) return <Card><div className="h-40 animate-pulse rounded-2xl bg-white/[0.04]" /></Card>;
  if (v.status === "idle")
    return (
      <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-tile-2 text-zinc-300"><IconLock size={18} /></div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold text-zinc-50">No report yet</h3>
          <p className="mt-0.5 text-[13px] text-zinc-400">Start the simulated fake-door test on the Validate tab first.</p>
        </div>
        <button onClick={goValidate} className={btn.ghost}>Go to Validate</button>
      </Card>
    );

  const rows = v.bySource.filter((r) => v.active.includes(r.source) || r.visitors > 0);
  const t = totals(rows);
  const { rate, call } = validationVerdict(t);
  const tone = TONE[call];
  const name = idea.name;
  return (
    <div className="space-y-4">
      <section className="rounded-[24px] bg-paper p-5 text-ink sm:p-7">
        <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft">Verdict · simulated{v.status === "running" ? " · provisional" : ""}</div>
        <h2 className="mt-2 text-[30px] font-bold leading-tight tracking-tight sm:text-[36px]">{CALL_LABEL[call]}</h2>
        <p className="mt-1 text-[14px] text-ink-soft">Price-click rate <b className="tabular-nums text-ink">{t.visitors ? pct(rate) : "—"}</b> from <b className="tabular-nums text-ink">{t.visitors}</b> visitors.</p>
        <RateBar rate={rate} color={tone.bar} dim={call === "not-enough-traffic"} />
        <p className="mt-5 border-t border-[#e7e5ec] pt-5 text-[14px] leading-relaxed text-ink-soft">{recommendation(name, call, t.visitors)}</p>
      </section>

      <Card>
        <CardHeader title="Results" right={<span className="text-xs text-zinc-400">{v.status === "finished" ? `Ended ${v.endedAt}` : "Live"}</span>} />
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Kpi k="Spend" v={eur0(t.spendEur)} />
          <Kpi k="Visitors" v={String(t.visitors)} />
          <Kpi k="Price clicks" v={String(t.priceClicks)} hi />
          <Kpi k="Price-click rate" v={t.visitors ? pct(rate) : "—"} hi />
          <Kpi k="Checkout starts" v={String(t.checkoutStarts)} />
          <Kpi k="Waitlist" v={String(t.waitlistSignups)} />
        </div>
        <div className="mt-5"><Funnel rows={[{ k: "Visitors", n: t.visitors }, { k: "Price clicks", n: t.priceClicks }, { k: "Checkout starts", n: t.checkoutStarts }]} /></div>
      </Card>

      <Card className="!p-0">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-3 p-5 sm:p-6">
            <div className="min-w-0 flex-1">
              <h2 className="text-[17px] font-semibold tracking-tight text-zinc-50">By source</h2>
              <p className="mt-1 text-[13px] text-zinc-400">Each source judged on its own traffic.</p>
            </div>
            <IconChevronRight size={16} className="shrink-0 text-zinc-400 transition group-open:rotate-90" />
          </summary>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <ul className="space-y-2">
              {rows.map((r) => {
                const s = validationVerdict(r);
                return (
                  <li key={r.source} className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl bg-tile-2 px-4 py-3">
                    <div className="min-w-0 flex-1 basis-40">
                      <div className="text-[14px] font-semibold text-zinc-50">{SOURCE_NAME[r.source]}</div>
                      <div className="text-[12px] tabular-nums text-zinc-400">{eur0(r.spendEur)} · {plural(r.visitors, "visitor")} · {plural(r.priceClicks, "price click")} · {r.waitlistSignups} waitlist</div>
                    </div>
                    <span className="text-[13px] font-semibold tabular-nums text-zinc-100">{r.visitors ? pct(s.rate) : "—"} · {CALL_LABEL[s.call]}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-[12px] text-zinc-400">Under {RULES.minVisitors} visitors = not enough traffic · above {RULES.strongPriceClickRate * 100}% = strong · below {RULES.killPriceClickRate * 100}% = kill · otherwise inconclusive.</p>
          </div>
        </details>
      </Card>
    </div>
  );
}

function Kpi({ k, v, hi }: { k: string; v: string; hi?: boolean }) {
  return (
    <div className={`min-w-0 rounded-2xl px-4 py-3.5 ${hi ? "bg-accent/15" : "bg-tile-2"}`}>
      <div className="text-[12px] text-zinc-400">{k}</div>
      <div className="mt-1 text-[24px] font-medium leading-none tracking-tight tabular-nums text-zinc-50">{v}</div>
    </div>
  );
}

/** 0–5% scale with marks at the 1% kill and 3% strong lines. */
function RateBar({ rate, color, dim }: { rate: number; color: string; dim: boolean }) {
  const w = Math.min(1, rate / SCALE) * 100;
  return (
    <div className="mt-6">
      <div className="relative h-3 rounded-full bg-[#e7e5ec]" role="img" aria-label={`Price-click rate ${pct(rate)}; kill below 1%, strong above 3%`}>
        <div className="h-3 rounded-full" style={{ width: `${Math.max(rate > 0 ? 2 : 0, w)}%`, background: color, opacity: dim ? 0.45 : 1 }} />
        {[0.01, 0.03].map((m) => <span key={m} className="absolute -bottom-1.5 -top-1.5 w-[2px] rounded-full bg-ink" style={{ left: `${(m / SCALE) * 100}%` }} aria-hidden />)}
      </div>
      <div className="relative mt-2 h-4 text-[11px] font-semibold text-ink-soft">
        <span className="absolute left-0">0%</span>
        <span className="absolute -translate-x-1/2" style={{ left: "20%" }}>1% kill</span>
        <span className="absolute -translate-x-1/2" style={{ left: "60%" }}>3% strong</span>
        <span className="absolute right-0">5%+</span>
      </div>
    </div>
  );
}
