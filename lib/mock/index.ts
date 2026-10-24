import type { Idea, LegacyPain, PipelineVerdict, PlcStage, Provenance } from "../types";
import { pipelineVerdict } from "../verdict";
import { IDEAS } from "./ideas";
import { LEGACY } from "./legacy";
import { DINNERLIST_VALIDATION } from "./validation";

export { NIGHTS, LEGACY_NIGHTS, LAST_WINNER, STEP_ORDER, STEP_TIMES } from "./nights";
export { PITCHED } from "./pitched";
export { LEGACY };

const DEMO_ID = "p-072";
export const DEMO_BANNER = "Mocked: this idea did not pass. DinnerList (p-072) scored 19/25 but was vetoed by competitors (a near-miss); it stands in as a winner so you can see the Validate and Report flow. No real ads, payments or emails.";

/** All US ideas, with the display verdict recomputed and the DinnerList demo kit attached. */
export const ALL_IDEAS: Idea[] = IDEAS.map((i) => {
  const idea: Idea = { ...i, verdict: pipelineVerdict(i) };
  if (i.painId === DEMO_ID) Object.assign(idea, { validation: DINNERLIST_VALIDATION, demo: { simulatedWinner: true, banner: DEMO_BANNER } });
  return idea;
});
export const findIdea = (id: string) => ALL_IDEAS.find((x) => x.painId === id);
export const ideasOfNight = (date: string) => ALL_IDEAS.filter((x) => x.night === date).sort((a, b) => b.scores.total - a.scores.total);
/** Winners get Validate; the simulated demo does too. */
export const canValidate = (i: Idea) => i.verdict === "winner" || !!i.demo;

/** Flat, serialisable row for board/timeline lists (keeps client bundles small). */
export type BoardRow = {
  painId: string; night: string; market: "US" | "DE"; niche: string;
  title: string; named: boolean; sub: string; search: string;
  source: Provenance | string; plc: PlcStage | null;
  wow: { now: number; prev: number; nowIso: string; prevIso: string } | null;
  score: number; verdict: PipelineVerdict; veto: boolean;
  note: string | null; noteTone: "amber" | "red" | null;
  demo: boolean; pitched: boolean; linkable: boolean;
};

const shortDesc = (s: string) => {
  const first = s.replace(/\s*\([^)]*\)/g, "").split(/[:;]|\.\s/)[0].replace(/\.$/, "").trim();
  return first.length > 70 ? first.slice(0, 67).trimEnd() + "…" : first;
};

export function toRow(i: Idea): BoardRow {
  const veto = i.competitor_veto;
  const note = i.verdict === "killed" ? (i.kill_reason ?? i.borderline_note) : i.verdict === "near-miss" ? (i.borderline_note ?? (veto ? i.kill_reason : null)) : null;
  return {
    painId: i.painId, night: i.night, market: "US", niche: i.niche,
    title: i.name ?? i.label ?? shortDesc(i.description), named: !!i.name,
    sub: i.pitch ?? i.who,
    search: [i.name, i.label, i.pitch, i.description, i.niche, i.who, i.painId].filter(Boolean).join(" ").toLowerCase(),
    source: i.source, plc: i.plc?.stage ?? null,
    wow: { now: i.week_over_week.this_week, prev: i.week_over_week.last_week, nowIso: i.week_over_week.this_week_iso, prevIso: i.week_over_week.last_week_iso },
    score: i.scores.total, verdict: i.verdict, veto,
    note: note ?? null, noteTone: note ? (i.verdict === "killed" ? "red" : "amber") : null,
    demo: !!i.demo, pitched: false, linkable: true,
  };
}

export function legacyRow(p: LegacyPain): BoardRow {
  const note = p.verdict === "killed" ? p.kill_reason : null;
  return {
    painId: p.painId, night: p.night, market: "DE", niche: "Germany (legacy)",
    title: p.name ?? shortDesc(p.description), named: !!p.name, sub: p.who,
    search: [p.name, p.description, p.who, p.painId, "germany"].filter(Boolean).join(" ").toLowerCase(),
    source: p.source, plc: null, wow: null, score: p.scores.total, verdict: p.verdict, veto: false,
    note, noteTone: note ? "red" : null, demo: false, pitched: p.pitched, linkable: false,
  };
}

export const US_ROWS = ALL_IDEAS.map(toRow);
export const LEGACY_ROWS = LEGACY.map(legacyRow);
