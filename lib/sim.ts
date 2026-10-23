import type { FinishedResult, Idea } from "./data";
import type { Live } from "./store";

const jitter = (base: number, spread = 0.25) => base * (1 - spread + Math.random() * spread * 2);

export function emptyLive(): Live {
  return { spend: 0, impressions: 0, clicks: 0, signups: 0, ticks: [] };
}

/** One live tick (~every 1.5 s). Values are floats; UI rounds them. */
export function tick(idea: Idea, l: Live): Live {
  const sim = idea.sim!;
  const dSpend = jitter(1.2, 0.5);
  const dImp = (dSpend / jitter(sim.cpm, 0.15)) * 1000;
  const dClicks = dImp * jitter(sim.ctr, 0.4);
  const dSign = dClicks * jitter(sim.signupRate, 0.5);
  const next = { spend: l.spend + dSpend, impressions: l.impressions + dImp, clicks: l.clicks + dClicks, signups: l.signups + dSign };
  const ticks = [...l.ticks, { t: Date.now(), spend: next.spend, signups: next.signups }].slice(-40);
  return { ...next, ticks };
}

/** Fast-forward the rest of the test to the full budget. */
export function simulateEnd(idea: Idea, l: Live): FinishedResult {
  const sim = idea.sim!;
  const { daily, days } = idea.ad!.budget;
  const weights = Array.from({ length: days }, () => jitter(1, 0.25));
  const dailyRows = weights.map((w, i) => {
    const spend = +((w * daily * days) / weights.reduce((a, b) => a + b, 0)).toFixed(2);
    const imp = (spend / jitter(sim.cpm, 0.1)) * 1000;
    const clicks = Math.round(imp * jitter(sim.ctr, 0.15));
    const signups = Math.round(clicks * jitter(sim.signupRate, 0.2));
    return { day: i + 1, spend, clicks, signups, imp };
  });
  const sum = (k: "spend" | "clicks" | "signups" | "imp") => dailyRows.reduce((a, r) => a + r[k], 0);
  return {
    spend: Math.max(+sum("spend").toFixed(2), l.spend),
    impressions: Math.max(Math.round(sum("imp")), Math.round(l.impressions)),
    clicks: Math.max(sum("clicks"), Math.round(l.clicks)),
    signups: Math.max(sum("signups"), Math.round(l.signups)),
    daily: dailyRows.map(({ day, spend, clicks, signups }) => ({ day, spend, clicks, signups })),
    finishedAt: new Date().toISOString().slice(0, 10),
  };
}
