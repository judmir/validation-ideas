import type { Idea } from "./data";
import type { ValidationState } from "./store";

/** One status vocabulary for lists and headers. */
export type Stage = "scouting" | "ready" | "running" | "report";

export const stageOf = (v: ValidationState): Stage => (v.status === "running" ? "running" : v.status === "finished" ? "report" : "ready");

/** Sort order for the home list: live work first, finished reports last. */
export const STAGE_ORDER: Record<Stage, number> = { running: 0, scouting: 1, ready: 2, report: 3 };

export const budgetOf = (idea: Idea) => (idea.ad ? idea.ad.budget.daily * idea.ad.budget.days : 0);

/** Spend, signups and a trend series for any validation state. */
export function testNumbers(idea: Idea, v: ValidationState) {
  const total = budgetOf(idea);
  const days = idea.ad?.budget.days ?? 0;
  if (v.status === "running") {
    const { spend, signups, ticks } = v.live;
    const used = Math.min(days, Math.floor(spend / (total / days)));
    return { total, days, spend, signups, trend: [0, ...ticks.map((t) => t.signups)], daysLeft: days - used };
  }
  if (v.status === "finished") {
    const r = v.result;
    return { total, days: r.daily.length, spend: r.spend, signups: r.signups, trend: r.daily.map((d) => d.signups), daysLeft: 0 };
  }
  return { total, days, spend: 0, signups: 0, trend: [] as number[], daysLeft: days };
}
