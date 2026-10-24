// Pipeline settings: config/pipeline-settings.json is the source of truth (schema:
// config/pipeline-settings.schema.json). The /settings page loads it at build time; nightly
// routines read the raw file from main. This module only reads and compares; it never writes.
import raw from "@/config/pipeline-settings.json";
import { GATE_IDS, type GateId } from "./gates";
import type { ScoreKey } from "./types";

type Range = { min: number; max: number };
export type SourceId = "app_store" | "google_play" | "reddit_arctic_shift" | "x" | "hacker_news" | "trustpilot" | "niche_forums";

export interface PipelineSettings {
  $schema?: string;
  version: 1;
  updated: string;
  scouting: {
    markets: { us: boolean; germany: boolean };
    germany_paused_since: string | null;
    complaint_lookback_days: number;
    complaints_per_night: Range;
    proven_models_enabled: boolean;
    proven_models_per_night: Range;
    sources: Record<SourceId, boolean>;
    exclude_regulated_finance_medical: boolean;
    niche_rotation: string;
  };
  scoring: {
    criterion_scale: { min: 1; max: 5 };
    weights: Record<ScoreKey, number>;
    /** Out of 25 at 1× weights. */
    winning_bar: number;
    near_miss_band: Range;
    competitor_veto: boolean;
    /** Keys are the gate ids from lib/gates.ts. */
    gates: Record<GateId, boolean>;
    principles: { simplest_way: boolean };
  };
  winner: {
    ideas_per_brief: number;
    never_repeat: true;
    near_tie_prefers_plc: boolean;
    fallback_enabled: boolean;
    fallback: { min_score: number; allow_vetoed: boolean; allow_plc_maybe: boolean; allow_plc_no: false };
  };
  poc: { nightly: boolean; max_builds_per_night: number; ready_by: string; private_only: true };
  validation: { status: "proposed" | "active"; ad_budget_eur: Range; min_visitors: number; strong_price_click_pct: number; kill_price_click_pct: number; two_button_page: boolean };
  schedule: { timezone: "Europe/Berlin"; scout: string; analyst: string; builder: string; brief: string; weekly: string; note: string };
}

export const SAVED = raw as PipelineSettings;

// Keep the JSON's gate keys in step with the shared gate definition.
const jsonGates = Object.keys(SAVED.scoring.gates).sort().join(",");
if (jsonGates !== [...GATE_IDS].sort().join(",")) throw new Error(`config/pipeline-settings.json gates (${jsonGates}) do not match lib/gates.ts (${GATE_IDS.join(",")})`);

export const SCORE_KEYS: ScoreKey[] = ["frequency", "intensity", "willingness_to_pay", "reachability", "buildability"];
export const BASE_MAX = 25;

/** Max possible score with the current weights (each criterion 1–5). */
export const maxScore = (s: PipelineSettings) => SCORE_KEYS.reduce((a, k) => a + s.scoring.weights[k] * s.scoring.criterion_scale.max, 0);
/** A value out of 25 (at 1× weights) scaled to the weighted max. */
export const scaled = (s: PipelineSettings, v: number) => Math.round(((v * maxScore(s)) / BASE_MAX) * 10) / 10;

/** Flatten to dotted paths ("winner.fallback_enabled") for highlighting and the diff. */
export function flatten(o: unknown, prefix = "", out: Record<string, unknown> = {}): Record<string, unknown> {
  if (o && typeof o === "object" && !Array.isArray(o)) {
    for (const [k, v] of Object.entries(o as Record<string, unknown>)) {
      if (k === "$schema") continue;
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  } else out[prefix] = o;
  return out;
}
const fmt = (v: unknown) => (typeof v === "string" ? JSON.stringify(v) : String(v));
/** One line per change: `winner.fallback_enabled: false → true`. */
export function diffLines(saved: PipelineSettings, draft: PipelineSettings): string[] {
  const a = flatten(saved), b = flatten(draft);
  return Object.keys(b).filter((k) => a[k] !== b[k]).map((k) => `${k}: ${fmt(a[k])} → ${fmt(b[k])}`);
}
export function changedPaths(saved: PipelineSettings, draft: PipelineSettings): Set<string> {
  const a = flatten(saved), b = flatten(draft);
  return new Set(Object.keys(b).filter((k) => a[k] !== b[k]));
}

/** Immutable set by dotted path. */
export function setPath<T>(obj: T, path: string, value: unknown): T {
  const [head, ...rest] = path.split(".");
  const o = obj as Record<string, unknown>;
  return { ...o, [head]: rest.length ? setPath(o[head], rest.join("."), value) : value } as T;
}
export function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown>)?.[k], obj);
}

export const GITHUB_EDIT_URL = "https://github.com/judmir/validation-ideas/edit/main/config/pipeline-settings.json";
