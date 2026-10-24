import { ALL_IDEAS, LAST_WINNER, LEGACY_NIGHTS, NIGHTS, ideasOfNight } from "./index";

const dayMs = 86400000;
const latestNight = [...NIGHTS, ...LEGACY_NIGHTS].map((n) => n.date).sort().at(-1)!;
/** Calendar nights from the last winner (Fristly, Germany, 19 Oct 2026) to the latest scouted night: 19 → 24 Oct = 5. */
export const NIGHTS_SINCE_WINNER = Math.round((Date.parse(latestNight + "T12:00:00Z") - Date.parse(LAST_WINNER.date + "T12:00:00Z")) / dayMs);
/** No US run has produced a winner yet (the only winner so far is Germany's Fristly). */
export const US_WINNER_YET = ALL_IDEAS.some((i) => i.verdict === "winner");
export const US_WINNER_NOTE = US_WINNER_YET ? null : "Fristly was a Germany run. No US run has had a winner yet";

export const US_COMPLAINTS = NIGHTS.reduce((a, n) => a + n.scout.complaints, 0);
export const NEAR_MISSES = ALL_IDEAS.filter((i) => i.verdict === "near-miss").length;

/** ISO week (YYYY-Www) of a date. */
export function isoWeek(iso: string) {
  const d = new Date(iso.slice(0, 10) + "T12:00:00Z");
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const y = d.getUTCFullYear();
  const jan4 = new Date(Date.UTC(y, 0, 4));
  const w = 1 + Math.round(((d.getTime() - jan4.getTime()) / 86400000 - 3 + ((jan4.getUTCDay() + 6) % 7)) / 7);
  return `${y}-W${String(w).padStart(2, "0")}`;
}
const latestWeek = isoWeek(NIGHTS[0].date);
export const BEST_THIS_WEEK = ALL_IDEAS.filter((i) => isoWeek(i.night) === latestWeek).sort((a, b) => b.scores.total - a.scores.total)[0];

export function nightSummary(date: string) {
  const n = NIGHTS.find((x) => x.date === date)!;
  const ideas = ideasOfNight(date);
  const near = ideas.filter((i) => i.verdict === "near-miss").length;
  const killed = ideas.filter((i) => i.verdict === "killed").length;
  return `${n.scout.complaints} complaints + ${n.scout.provenModels} proven models → ${ideas.length} pains · ${near} near-miss${near === 1 ? "" : "es"}, ${killed} killed · ${n.niches.join(" + ")}`;
}
