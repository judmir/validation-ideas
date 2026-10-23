"use client";
import { useCallback, useEffect, useState } from "react";
import type { FinishedResult, Idea } from "./data";

export const PREFIX = "vi:";

export type Live = { spend: number; impressions: number; clicks: number; signups: number; ticks: { t: number; spend: number; signups: number }[] };

export type ValidationState =
  | { status: "on_hold" }
  | { status: "ready" }
  | { status: "running"; startedAt: number; live: Live }
  | { status: "finished"; result: FinishedResult };

export function initialState(idea: Idea): ValidationState {
  return idea.seededResult ? { status: "finished", result: idea.seededResult } : { status: "on_hold" };
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

/** Read-only snapshot of several keys at once (list views); `keys` and `fallbacks` should be stable. */
export function usePersistedMany<T>(keys: readonly string[], fallbacks: readonly T[]) {
  const [values, setValues] = useState<readonly T[]>(fallbacks);
  const [loaded, setLoaded] = useState(false);
  const sig = keys.join("|");
  useEffect(() => {
    const sync = () => setValues(keys.map((k, i) => read<T>(k) ?? fallbacks[i]));
    sync();
    setLoaded(true);
    window.addEventListener("vi-storage", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("vi-storage", sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);
  return [values, loaded] as const;
}

export const useValidation = (idea: Idea) => usePersisted<ValidationState>("val:" + idea.id, initialState(idea));
export type QueueState = { status: "none" } | { status: "queued"; at: number };
export const useQueue = (id: string) => usePersisted<QueueState>("queue:" + id, { status: "none" });

/** Free-text "New idea" requests handed to the App Ideas bot (mock). */
export type ScoutRequest = { id: string; text: string; at: number };
const NO_REQUESTS: ScoutRequest[] = [];
export const useRequests = () => usePersisted<ScoutRequest[]>("requests", NO_REQUESTS);

export function resetAll() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(PREFIX))
    .forEach((k) => localStorage.removeItem(k));
  window.dispatchEvent(new Event("vi-storage"));
}
