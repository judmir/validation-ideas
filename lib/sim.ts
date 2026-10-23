import type { SimProfile, SourceSignals, TrafficSource } from "./types";

const jitter = (base: number, spread = 0.3) => base * (1 - spread + Math.random() * spread * 2);
const chance = (p: number) => (Math.random() < p ? 1 : 0);

export const emptySignals = (sources: TrafficSource[]): SourceSignals[] =>
  sources.map((source) => ({ source, spendEur: 0, visitors: 0, priceClicks: 0, checkoutStarts: 0, waitlistSignups: 0 }));

/** One mock tick (~1.2 s): each active source buys a few visitors, some click the price, a few start checkout or join the waitlist. */
export function tickSignals(rows: SourceSignals[], sim: SimProfile, active: TrafficSource[], budgetEur: number): SourceSignals[] {
  const spent = rows.reduce((a, r) => a + r.spendEur, 0);
  if (spent >= budgetEur) return rows;
  return rows.map((r) => {
    if (!active.includes(r.source)) return r;
    const p = sim[r.source];
    const visitors = Math.max(1, Math.round(jitter(r.source === "meta" ? 4 : 2, 0.5)));
    let priceClicks = 0, checkoutStarts = 0, waitlistSignups = 0;
    for (let i = 0; i < visitors; i++) {
      const clicked = chance(jitter(p.priceClickRate));
      priceClicks += clicked;
      if (clicked) checkoutStarts += chance(p.checkoutRate);
      waitlistSignups += chance(jitter(p.waitlistRate));
    }
    return {
      ...r,
      spendEur: +(r.spendEur + visitors * jitter(p.eurPerVisitor, 0.2)).toFixed(2),
      visitors: r.visitors + visitors,
      priceClicks: r.priceClicks + priceClicks,
      checkoutStarts: r.checkoutStarts + checkoutStarts,
      waitlistSignups: r.waitlistSignups + waitlistSignups,
    };
  });
}
