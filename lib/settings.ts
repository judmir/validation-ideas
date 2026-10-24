// Pipeline settings. Source of truth: Supabase table pipeline_settings_versions (append-only; the view
// pipeline_settings_latest is the current version, which the nightly routines read).
// config/pipeline-settings.json mirrors the current live version (v4) and is the offline fallback.
// Shape: config/pipeline-settings.schema.json. Reading/saving lives in lib/settings-store.ts.
import raw from "@/config/pipeline-settings.json";
import { GATE_IDS, type GateId } from "./gates";
import type { ScoreKey } from "./types";

type Range = { min: number; max: number };
export type SourceId = "app_store" | "google_play" | "reddit_arctic_shift" | "x" | "hacker_news" | "trustpilot" | "niche_forums";
/** Gate keys as stored in the settings JSON. */
export type GateSettingKey = "consumer_subscription" | "buildable_2_weeks" | "us_entry_point" | "plc_decline_kills";

export interface PipelineSettings {
  scouting: {
    markets: { US: boolean; DE: boolean };
    sources: Record<SourceId, boolean>;
    proven_models: Range & { enabled: boolean };
    complaints_per_night: Range;
    complaint_lookback_days: number;
    exclude_regulated_finance_medical: boolean;
  };
  scoring: {
    criteria: Record<ScoreKey, number>;
    criterion_scale: { min: number; max: number };
    /** Derived (5 × sum of weights); kept in sync by the page. */
    max_score: number;
    /** Out of 25 at 1× weights. */
    winning_bar: number;
    near_miss_band: Range;
    /** v2: competition is a demand signal; replaces v1's competitor_veto boolean. */
    competition: {
      mode: "signal" | "veto";
      sweet_spot: Range;
      sweet_spot_bonus: number;
      veto_at_competitors: number;
      veto_if_funded_leader_solves_well: boolean;
      require_wedge: boolean;
      zero_competitors: string;
    };
    gates: Record<GateSettingKey, boolean> & { simplest_way_flag: boolean };
  };
  winner: {
    ideas_per_brief: number;
    no_repeats: boolean;
    prefer_stronger_plc_on_tie: boolean;
    fallback: {
      enabled: boolean;
      always_one_per_night: boolean;
      min_score: number;
      prefer_not_vetoed: boolean;
      allow_vetoed_as_last_resort: boolean;
      allow_plc_maybe: boolean;
      /** Always false (locked): a declining market is a kill. */
      allow_plc_no: boolean;
      label: string;
    };
  };
  poc: { enabled: boolean; max_per_night: number; ready_by: string; private_only: boolean };
  validation: { status: string; ad_budget_eur: Range; min_visitors: number; strong_price_click_pct: number; kill_price_click_pct: number; two_button_page: boolean };
  /** v3: the nightly narrated run video (~07:00). */
  report: { run_video: { enabled: boolean; voiceover: boolean; subtitles: boolean; ready_by: string } };
  schedule: { timezone: string; us_scout: string; analyst: string; builder: string; brief: string; weekly: string; read_only: boolean };
}

export const SEED = raw as PipelineSettings;

/** The shared gates (lib/gates.ts) → their key in the settings JSON. simplest_way_flag is a principle, not a gate. */
export const GATE_SETTING_KEY: Record<GateId, GateSettingKey> = {
  consumer_subscription: "consumer_subscription",
  buildable_2wk: "buildable_2_weeks",
  us_entry: "us_entry_point",
  plc_fit: "plc_decline_kills",
};
{
  const mapped = new Set(Object.values(GATE_SETTING_KEY));
  const inJson = Object.keys(SEED.scoring.gates).filter((k) => k !== "simplest_way_flag");
  if (GATE_IDS.length !== mapped.size || inJson.length !== mapped.size || !inJson.every((k) => mapped.has(k as GateSettingKey)))
    throw new Error("config/pipeline-settings.json gates do not match lib/gates.ts");
}

export const SCORE_KEYS: ScoreKey[] = ["frequency", "intensity", "willingness_to_pay", "reachability", "buildability"];
export const BASE_MAX = 25;

/** Max possible score with the current weights (each criterion 1–5). */
export const maxScore = (s: PipelineSettings) => SCORE_KEYS.reduce((a, k) => a + s.scoring.criteria[k] * s.scoring.criterion_scale.max, 0);
/** A value out of 25 (at 1× weights) scaled to the weighted max. */
export const scaled = (s: PipelineSettings, v: number) => Math.round(((v * maxScore(s)) / BASE_MAX) * 10) / 10;

/** Flatten to dotted paths ("winner.fallback.enabled") for highlighting and the diff. */
export function flatten(o: unknown, prefix = "", out: Record<string, unknown> = {}): Record<string, unknown> {
  if (o && typeof o === "object" && !Array.isArray(o)) {
    for (const [k, v] of Object.entries(o as Record<string, unknown>)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  } else out[prefix] = o;
  return out;
}
const fmt = (v: unknown) => (v === undefined ? "—" : typeof v === "string" ? JSON.stringify(v) : String(v));
/** One line per change: `winner.fallback.enabled: false → true`. */
export function diffLines(prev: PipelineSettings, next: PipelineSettings): string[] {
  const a = flatten(prev), b = flatten(next);
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
  return keys.filter((k) => a[k] !== b[k]).map((k) => `${k}: ${fmt(a[k])} → ${fmt(b[k])}`);
}
export function changedPaths(prev: PipelineSettings, next: PipelineSettings): Set<string> {
  const a = flatten(prev), b = flatten(next);
  return new Set(Object.keys(b).filter((k) => a[k] !== b[k]));
}
/** Short auto note for a save, e.g. "winner.fallback.enabled → true; winner.ideas_per_brief → 4". */
export function autoNote(prev: PipelineSettings, next: PipelineSettings): string {
  const a = flatten(prev), b = flatten(next);
  const parts = Object.keys(b).filter((k) => a[k] !== b[k]).map((k) => `${k} → ${fmt(b[k])}`);
  const s = parts.slice(0, 3).join("; ");
  return parts.length > 3 ? `${s}; +${parts.length - 3} more` : s;
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
