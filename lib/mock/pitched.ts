import type { Pitched } from "../types";
import { PITCHED_IMPORTED } from "./imported";

/** pitched.json, verbatim, plus the current status for display. */
const PITCHED_HAND: Pitched[] = [
  {
    date: "2026-10-19",
    name: "Fristly",
    pain_id: "p-011",
    core_feature: "paste/forward a signup or contract confirmation to get the last day to cancel (trial end, notice period) with 7/3/1-day reminders and a prefilled German cancellation letter; no bank login",
    user: "people in Germany/EU caught by free-trial and contract auto-renewals",
    winner: true,
    poc: "poc/2026-10-19.md",
    laterStatus: "killed by stress test (stress-tests/fristly-2026-10-19.md)",
  },
];

/** Newest night first; within a night the winner first. */
export const PITCHED: Pitched[] = [...PITCHED_IMPORTED, ...PITCHED_HAND].sort((a, b) => b.date.localeCompare(a.date) || Number(b.winner) - Number(a.winner));
