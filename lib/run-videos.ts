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

/** The night's video: undefined while the manifest loads, null when the manifest doesn't list the date. */
export function useRunVideoStatus(date: string | null | undefined): RunVideo | null | undefined {
  const [v, setV] = useState<RunVideo | null | undefined>(undefined);
  useEffect(() => {
    if (!date) { setV(null); return; }
    let live = true;
    load().then((m) => live && setV(m.get(date) ?? null));
    return () => { live = false; };
  }, [date]);
  return v;
}

/** The night's video, or null (also while loading). */
export function useRunVideo(date: string | null | undefined): RunVideo | null {
  return useRunVideoStatus(date) ?? null;
}

/** Scroll to the night's run-video player on this page and start it. False when the page has no player for that date. */
export function playRunVideo(date: string): boolean {
  const el = document.querySelector<HTMLElement>(`[data-run-video="${date}"]`);
  const video = el?.querySelector("video");
  if (!el || !video) return false;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  video.play().catch(() => video.focus());
  return true;
}
