"use client";
import { useCallback, useEffect, useState } from "react";
import type { Idea, SourceSignals, TrafficSource } from "./types";

export const PREFIX = "vi:";

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
  if (r) return { status: "finished", endedAt: r.endedAt ?? r.startedAt, active: r.bySource.filter((s) => s.visitors > 0).map((s) => s.source), bySource: r.bySource, seeded: true };
  return { status: "idle", active: defaultSources(idea) };
}

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function write(key: string, v: unknown) {
  localStorage.setItem(PREFIX + key, JSON.stringify(v));
  queueMicrotask(() => window.dispatchEvent(new Event("vi-storage")));
}

/** Generic persisted state hook; `loaded` is false until localStorage has been read (avoids hydration mismatch). */
export function usePersisted<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const sync = () => setValue(read<T>(key) ?? fallback);
    sync();
    setLoaded(true);
    window.addEventListener("vi-storage", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("vi-storage", sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
        write(key, next);
        return next;
      });
    },
    [key]
  );
  return [value, set, loaded] as const;
}

// v2 key: the old CPS-based state shape is incompatible.
export const useValidation = (idea: Idea) => usePersisted<ValidationState>("val2:" + idea.painId, initialState(idea));

export function resetAll() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(PREFIX))
    .forEach((k) => localStorage.removeItem(k));
  window.dispatchEvent(new Event("vi-storage"));
}
