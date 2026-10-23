import { ALL_IDEAS, NIGHTS, TOP_PICKS, ideasOfNight } from "./index";

/** Original home stats: ideas scouted, runs, average top score /100. */
export const IDEAS_SCOUTED = ALL_IDEAS.length;
export const RUN_COUNT = NIGHTS.length;
export const AVG_TOP = Math.round(TOP_PICKS.reduce((a, x) => a + x.scores.total, 0) / TOP_PICKS.length);

export function nightSummary(date: string) {
  const ideas = ideasOfNight(date);
  return `Scouted ${ideas.length} ideas · top ${ideas[0]?.scores.total ?? "–"}`;
}
