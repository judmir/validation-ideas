import { RULES, type SourceSignals, type TrafficSource } from "@/lib/types";
import { eur0, pct, plural } from "@/lib/format";
import { totals } from "@/lib/verdict";

const SHORT: Record<TrafficSource, string> = { meta: "Meta", google_search: "Google Search", reddit: "Reddit" };
const COLS: { k: keyof Omit<SourceSignals, "source">; label: string; short: string }[] = [
  { k: "spendEur", label: "Spend", short: "Spend" },
  { k: "visitors", label: "Visitors", short: "Visitors" },
  { k: "priceClicks", label: "Price clicks", short: "Price clicks" },
  { k: "checkoutStarts", label: "Checkout starts", short: "Checkouts" },
  { k: "waitlistSignups", label: "Waitlist", short: "Waitlist" },
];

/** Per-source fake-door signals (price clicks, checkout starts, waitlist) with progress to 100 visitors. */
export default function SignalsTable({ rows, active, live }: { rows: SourceSignals[]; active: TrafficSource[]; live?: boolean }) {
  const shown = rows.filter((r) => active.includes(r.source) || r.visitors > 0);
  const t = totals(shown);
  const fmt = (k: string, n: number) => (k === "spendEur" ? eur0(n) : Math.round(n).toLocaleString("en-US"));
  return (
    <div className="space-y-2">
      {shown.map((r) => {
        const rate = r.visitors ? r.priceClicks / r.visitors : 0;
        const prog = Math.min(1, r.visitors / RULES.minVisitors);
        return (
          <div key={r.source} className="rounded-2xl bg-tile-2 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-center gap-2 text-[14px] font-semibold text-zinc-50">{live && <span className="h-2 w-2 animate-pulse rounded-full bg-warm" aria-hidden />}{SHORT[r.source]}</div>
              <div className="text-[12px] text-zinc-400">Price-click rate <b className="font-semibold tabular-nums text-zinc-50">{r.visitors ? pct(rate) : "—"}</b></div>
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {COLS.map((c) => (
                <div key={`${c.k}-${live ? r[c.k] : ""}`} className={`${live ? "tick " : ""}min-w-0 rounded-xl px-2.5 py-2 ${c.k === "priceClicks" ? "bg-accent/20" : "bg-white/[0.04]"}`}>
                  <dt className="truncate text-[11px] text-zinc-400">{c.short}</dt>
                  <dd className="mt-0.5 text-[17px] font-medium tabular-nums text-zinc-50">{fmt(c.k, r[c.k])}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3">
              <div className="h-1.5 rounded-full bg-white/[0.08]" role="img" aria-label={`${r.visitors} of ${RULES.minVisitors} visitors`}>
                <div className={`h-1.5 rounded-full transition-[width] duration-700 ${prog >= 1 ? "bg-accent-light" : "bg-warm"}`} style={{ width: `${Math.max(r.visitors ? 3 : 0, prog * 100)}%` }} />
              </div>
              <div className="mt-1 text-[11px] text-zinc-400">{r.visitors >= RULES.minVisitors ? `Past ${RULES.minVisitors} visitors: rate is readable` : `${r.visitors} of ${RULES.minVisitors} visitors needed`}</div>
            </div>
          </div>
        );
      })}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/[0.07] px-4 py-3 text-[12px] text-zinc-400">
        <span>All sources</span>
        <span className="tabular-nums"><b className="font-semibold text-zinc-100">{eur0(t.spendEur)}</b> · {plural(t.visitors, "visitor")} · <b className="font-semibold text-zinc-100">{plural(t.priceClicks, "price click")}</b> ({t.visitors ? pct(t.priceClicks / t.visitors) : "—"}) · {plural(t.checkoutStarts, "checkout start")} · {t.waitlistSignups} waitlist</span>
      </div>
    </div>
  );
}
