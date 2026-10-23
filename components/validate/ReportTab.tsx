"use client";
import { RULES, type Idea } from "@/lib/types";
import type { ValidationState } from "@/lib/store";
import { eur0, pct, plural } from "@/lib/format";
import { CALL_LABEL, recommendation, totals, validationVerdict, type ValidationCall } from "@/lib/verdict";
import { Card, CardHeader, Funnel, btn } from "../ui";
import { IconLock } from "../icons";
import { SOURCE_NAME } from "./AdKit";

const TONE: Record<ValidationCall, { bg: string; ink: string; bar: string }> = {
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
  const name = idea.name ?? idea.painId;
  return (
    <div className="space-y-4">
      <section className="rounded-[24px] bg-paper p-5 text-ink sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft">Fake-door verdict</span>
          {v.status === "running" && <span className="rounded-full bg-[#ffedd5] px-2.5 py-0.5 text-[11px] font-bold text-[#9a3412]">Live · provisional</span>}
          <span className="rounded-full bg-[#ebe9f0] px-2.5 py-0.5 text-[11px] font-bold text-ink-soft">Simulated</span>
        </div>
        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[30px] font-bold leading-tight tracking-tight sm:text-[36px]">{CALL_LABEL[call]}</h2>
            <p className="mt-1 text-[14px] text-ink-soft">Price-click rate <b className="tabular-nums text-ink">{t.visitors ? pct(rate) : "—"}</b> from <b className="tabular-nums text-ink">{t.visitors}</b> visitors ({t.priceClicks} clicked “{idea.validation?.landing.primaryCta ?? "Start for …"}”).</p>
          </div>
          <span className={`self-start rounded-full px-3 py-1 text-[12px] font-bold sm:self-auto ${tone.bg} ${tone.ink}`}>{call === "not-enough-traffic" ? `< ${RULES.minVisitors} visitors` : call === "strong" ? "> 3%" : call === "kill" ? "< 1%" : "1–3%"}</span>
        </div>
        <RateBar rate={rate} color={tone.bar} dim={call === "not-enough-traffic"} />
        <p className="mt-5 border-t border-[#e7e5ec] pt-5 text-[14px] leading-relaxed text-ink-soft"><b className="text-ink">Recommendation:</b> {recommendation(name, call, t.visitors)}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Card className="min-w-0">
          <CardHeader title="Funnel" sub={`${eur0(t.spendEur)} spent across ${rows.length} source${rows.length === 1 ? "" : "s"}`} />
          <div className="mt-5"><Funnel rows={[{ k: "Visitors", n: t.visitors }, { k: "Price clicks", n: t.priceClicks }, { k: "Checkout starts", n: t.checkoutStarts }]} /></div>
        </Card>
        <Card className="min-w-0">
          <CardHeader title="Waitlist" sub="Secondary signal: interest without a price commitment." />
          <div className="mt-4 flex items-baseline gap-2"><span className="text-[40px] font-medium leading-none tracking-tight tabular-nums text-zinc-50">{t.waitlistSignups}</span><span className="text-[13px] text-zinc-300">signups</span></div>
          <p className="mt-2 text-[12px] text-zinc-400">{t.visitors ? pct(t.waitlistSignups / t.visitors) : "—"} of visitors. Doesn&apos;t change the verdict.</p>
        </Card>
      </div>

      <Card>
        <CardHeader title="By source" sub="Each source is judged on its own traffic." />
        <ul className="mt-4 space-y-2">
          {rows.map((r) => {
            const s = validationVerdict(r);
            const tn = TONE[s.call];
            return (
              <li key={r.source} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-tile-2 px-4 py-3">
                <div className="min-w-0 flex-1 basis-40">
                  <div className="text-[14px] font-semibold text-zinc-50">{SOURCE_NAME[r.source]}</div>
                  <div className="text-[12px] tabular-nums text-zinc-400">{eur0(r.spendEur)} · {plural(r.visitors, "visitor")} · {plural(r.priceClicks, "price click")} · {plural(r.checkoutStarts, "checkout start")} · {r.waitlistSignups} waitlist</div>
                </div>
                <span className="text-[13px] font-semibold tabular-nums text-zinc-100">{r.visitors ? pct(s.rate) : "—"}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tn.bg} ${tn.ink}`}>{CALL_LABEL[s.call]}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[11px] text-zinc-400">Rules: under {RULES.minVisitors} visitors = not enough traffic · price clicks ÷ visitors above {RULES.strongPriceClickRate * 100}% = strong · below {RULES.killPriceClickRate * 100}% = kill · otherwise inconclusive.</p>
      </Card>
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
