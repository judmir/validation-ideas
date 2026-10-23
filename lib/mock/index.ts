import type { Idea, PipelineVerdict, PlcStage, Provenance } from "../types";
import { pipelineVerdict } from "../verdict";
import { IDEAS } from "./ideas";

export { NIGHTS, STEP_ORDER, STEP_TIMES } from "./nights";

/** All mock ideas with the display verdict recomputed, highest score first within each run. */
export const ALL_IDEAS: Idea[] = IDEAS.map((i) => ({ ...i, verdict: pipelineVerdict(i) }));
export const findIdea = (id: string) => ALL_IDEAS.find((x) => x.id === id);
export const ideasOfNight = (date: string) => ALL_IDEAS.filter((x) => x.night === date).sort((a, b) => b.scores.total - a.scores.total);
/** Only a run's top pick gets a landing page and validation test. */
export const TOP_PICKS = ALL_IDEAS.filter((i) => i.validation);

/** Flat, serialisable row for board/timeline lists (keeps client bundles small). */
export type BoardRow = {
  id: string; night: string; market: string; niche: string; rank: number;
  title: string; sub: string; search: string;
  source: Provenance; plc: PlcStage | null;
  wow: { now: number; prev: number; nowIso: string; prevIso: string } | null;
  score: number; verdict: PipelineVerdict; veto: boolean;
  note: string | null; noteTone: "amber" | "red" | null;
  validates: boolean;
};

export function toRow(i: Idea): BoardRow {
  const note = i.verdict === "killed" ? i.kill_reason ?? i.borderline_note : i.verdict === "near-miss" ? i.borderline_note : null;
  return {
    id: i.id, night: i.night, market: i.market, niche: i.niche, rank: i.rank,
    title: i.name, sub: i.pitch,
    search: [i.name, i.pitch, i.rationale, i.niche, i.who].filter(Boolean).join(" ").toLowerCase(),
    source: i.source, plc: i.plc?.stage ?? null,
    wow: i.week_over_week ? { now: i.week_over_week.this_week, prev: i.week_over_week.last_week, nowIso: i.week_over_week.this_week_iso, prevIso: i.week_over_week.last_week_iso } : null,
    score: i.scores.total, verdict: i.verdict, veto: i.competitor_veto,
    note: note ?? null, noteTone: note ? (i.verdict === "killed" ? "red" : "amber") : null,
    validates: !!i.validation,
  };
}

export const ROWS = ALL_IDEAS.map(toRow);
