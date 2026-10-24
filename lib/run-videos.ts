"use client";
// Run videos live only on gh-pages (scripts/sync-run-videos.sh writes out/videos/manifest.json at deploy time).
// Fetched at runtime; a missing manifest or a missing date means no player.
import { useEffect, useState } from "react";

export type RunVideo = { date: string; src: string; bytes: number; duration_s: number | null };
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
let manifest: Promise<Map<string, RunVideo>> | null = null;

function load() {
  manifest ??= fetch(`${BASE}/videos/manifest.json`, { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : { videos: [] }))
    .then((m: { videos?: RunVideo[] }) => new Map((Array.isArray(m.videos) ? m.videos : []).filter((v) => /^\d{4}-\d{2}-\d{2}$/.test(v?.date) && typeof v.src === "string").map((v) => [v.date, v])))
    .catch(() => new Map());
  return manifest;
}

export const videoUrl = (v: RunVideo) => `${BASE}/videos/${encodeURIComponent(v.src)}`;

/** The night's video, or null (also while loading). */
export function useRunVideo(date: string | null | undefined): RunVideo | null {
  const [v, setV] = useState<RunVideo | null>(null);
  useEffect(() => {
    if (!date) return;
    let live = true;
    load().then((m) => live && setV(m.get(date) ?? null));
    return () => { live = false; };
  }, [date]);
  return v;
}
