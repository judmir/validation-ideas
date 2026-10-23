import type { Idea, SourceSignals, TrafficSource } from "./types";

/** Simulated fake-door test. `seeded` = the mock results that ship with the demo. */
export type ValidationState =
  | { status: "idle"; active: TrafficSource[] }
  | { status: "running"; startedAt: number; active: TrafficSource[]; bySource: SourceSignals[] }
  | { status: "finished"; endedAt: string; active: TrafficSource[]; bySource: SourceSignals[]; seeded?: boolean };

export function defaultSources(idea: Idea): TrafficSource[] {
  const kit = idea.validation?.adKit;
  if (!kit) return [];
  return ["meta", ...(kit.searchIntent ? (["google_search"] as const) : [])];
}

export function initialState(idea: Idea): ValidationState {
  const r = idea.validation?.results;
  if (r) return { status: "finished", endedAt: r.endedAt, active: r.bySource.filter((s) => s.visitors > 0).map((s) => s.source), bySource: r.bySource, seeded: true };
  return { status: "idle", active: defaultSources(idea) };
}

