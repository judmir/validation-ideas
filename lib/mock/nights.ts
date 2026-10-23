import type { NightRun, StepKey } from "../types";

/** Fixed nightly schedule (Europe/Berlin). */
export const STEP_TIMES: Record<StepKey, string> = { scout: "00:30", analyst: "03:00", builder: "04:30", brief: "07:30" };
export const STEP_ORDER: StepKey[] = ["scout", "analyst", "builder", "brief"];

/** US runs, real counts from log.md and the briefs. Newest first. */
export const NIGHTS: NightRun[] = [
  {
    date: "2026-10-23",
    market: "US",
    niches: ["home maintenance & homeowners", "home fitness & workout logging"],
    steps: { scout: "done", analyst: "done", builder: "done", brief: "done" },
    scout: {
      complaints: 91,
      provenModels: 5,
      bySource: { google_play: 28, app_store: 28, reddit: 24, x: 11, hn: 0, trustpilot: 0, forums: 0 },
      blocked: [
        { source: "Trustpilot", reason: "403 from the box" },
        { source: "Reddit www", reason: "403 (Arctic Shift worked; its full-text search gave 422s, so whole subs were filtered locally)" },
        { source: "fitbod.me/pricing", reason: "403" },
        { source: "hevyapp.com/pricing", reason: "404, Hevy prices are the scout's r/Hevy figures (unverified)" },
        { source: "homezada.com/pricing", reason: "Returned the site's not-found page; tiers unverified" },
      ],
    },
    analyst: { newPainIds: ["p-078", "p-079", "p-080", "p-081", "p-082", "p-083", "p-084", "p-085"], survivors: 0 },
    builder: { winnerPainId: null, poc: null },
    briefPath: "briefs/2026-10-23.md",
    note: "4th night in a row with no winner",
  },
  {
    date: "2026-10-22",
    label: "US one-off test",
    market: "US",
    niches: ["meal planning & recipes", "car owners"],
    steps: { scout: "done", analyst: "done", builder: "skipped", brief: "done" },
    scout: {
      complaints: 70,
      provenModels: 5,
      bySource: { google_play: 46, app_store: 0, reddit: 18, x: 6, hn: 0, trustpilot: 0, forums: 0 },
      blocked: [
        { source: "App Store RSS", reason: "Empty feeds for every app (curl and WebFetch)" },
        { source: "Mealime on Google Play", reason: "Listing returns 404, fails the working-link rule" },
        { source: "Trustpilot", reason: "403 'Verifying Connection', 500 via WebFetch" },
        { source: "toyotanation.com", reason: "202 bot challenge" },
        { source: "f150forum.com", reason: "403" },
        { source: "Reddit www", reason: "403 (Arctic Shift OK)" },
      ],
    },
    analyst: { newPainIds: ["p-072", "p-073", "p-074", "p-075", "p-076", "p-077"], survivors: 0 },
    builder: { winnerPainId: null, poc: null },
    briefPath: "briefs/2026-10-22-us-test.md",
    note: "One-off US test: scout, analyst and brief only; the builder did not run",
  },
];

/** Older Germany-market runs (light timeline nodes; shown with the Germany filter). */
export const LEGACY_NIGHTS: { date: string; label: string; complaints: number | null; briefPath: string; winner: string | null; note: string }[] = [
  { date: "2026-10-22", label: "Germany run", complaints: null, briefPath: "briefs/2026-10-22.md", winner: null, note: "No winner." },
  { date: "2026-10-21", label: "Germany run", complaints: null, briefPath: "briefs/2026-10-21.md", winner: null, note: "No winner." },
  { date: "2026-10-20", label: "Germany run · Night B", complaints: 84, briefPath: "briefs/2026-10-20.md", winner: null, note: "No winner; Fristly (p-011) killed on the stress-test evidence." },
  { date: "2026-10-19", label: "Germany run · Night A", complaints: 77, briefPath: "briefs/2026-10-19.md", winner: "p-011", note: "Winner Fristly (19/25), pitched, then killed by the stress test." },
];

export const LAST_WINNER = { date: "2026-10-19", name: "Fristly", painId: "p-011", market: "DE" as const };
