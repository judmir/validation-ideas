"use client";
import Link from "next/link";
import { playRunVideo, useRunVideoStatus, videoUrl } from "@/lib/run-videos";

/** What a night offers beyond its evidence. Computed on the server from lib/mock/imported.ts BRIEFS (actionsOf).
 *  demoUrl / landingUrl: the standalone apps on judmir/scout-apps (GitHub Pages), opened in a new tab.
 *  demo / validation: the in-app screenshot and proposal pages, used only when there is no standalone app. */
export type NightActionsData = {
  date: string; demo: boolean; validation: boolean;
  demoUrl?: string | null; landingUrl?: string | null; demoReason?: string | null; landingReason?: string | null;
};
const ext = { target: "_blank", rel: "noopener" } as const;
const Arrow = () => <span aria-hidden className="text-[0.9em] opacity-70">↗</span>;

const base = "relative z-10 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light";
const SIZE = { sm: "h-8 px-3.5 text-[12.5px]", md: "h-10 px-4 text-[13.5px]" } as const;
const off = "cursor-not-allowed bg-white/[0.04] text-zinc-400 ring-1 ring-inset ring-white/[0.08]";

/** Three pills for a night's winner: ▶ Watch run video · Open demo ↗ · Validation page ↗ (standalone apps, new tab).
 *  No standalone app → the in-app page if there is one, else a disabled pill with the reason. */
export default function NightActions({ a, size = "sm", className = "" }: { a: NightActionsData; size?: keyof typeof SIZE; className?: string }) {
  const v = useRunVideoStatus(a.date);
  const sz = SIZE[size];
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} data-night-actions={a.date}>
      {v === undefined ? (
        <span className={`${base} ${sz} w-[150px] animate-pulse bg-white/[0.06]`} aria-hidden />
      ) : v ? (
        <a
          href={videoUrl(v)}
          onClick={(e) => { if (playRunVideo(a.date)) e.preventDefault(); }}
          className={`${base} ${sz} bg-accent text-accent-ink hover:bg-accent-light`}
          data-action="video"
        >
          <span aria-hidden>▶</span> Watch run video
        </a>
      ) : (
        <span className={`${base} ${sz} ${off}`} title="No run video in videos/manifest.json for this night" aria-disabled="true" data-action="video">
          <span aria-hidden>▶</span> No run video yet
        </span>
      )}
      {a.demoUrl ? (
        <a href={a.demoUrl} {...ext} className={`${base} ${sz} bg-white/[0.09] text-zinc-50 ring-1 ring-inset ring-white/[0.08] hover:bg-white/[0.15]`} data-action="demo" title="Standalone demo app · mocked data · opens in a new tab">
          Open demo <Arrow />
        </a>
      ) : a.demo ? (
        <Link href={`/demo/${a.date}/`} className={`${base} ${sz} bg-white/[0.09] text-zinc-50 ring-1 ring-inset ring-white/[0.08] hover:bg-white/[0.15]`} data-action="demo" title={a.demoReason ? `${a.demoReason}; showing the POC screenshots` : "POC screenshots"}>
          Demo screenshots
        </Link>
      ) : (
        <span className={`${base} ${sz} ${off}`} title={a.demoReason ?? "The builder made no POC this night"} aria-disabled="true" data-action="demo">No demo · {a.demoReason ? "no static demo" : "no POC"}</span>
      )}
      {a.landingUrl ? (
        <a href={a.landingUrl} {...ext} className={`${base} ${sz} bg-accent-pale text-[#2a1f6b] hover:bg-white`} data-action="validation" title="Standalone validation page preview · not launched · opens in a new tab">
          Validation page
          <span className="inline-flex items-center gap-1 rounded-full bg-warm/20 px-1.5 py-px text-[10.5px] font-semibold text-[#9a3412]"><span className="h-1.5 w-1.5 rounded-full bg-warm" aria-hidden />Preview</span>
          <Arrow />
        </a>
      ) : a.validation ? (
        <Link href={`/validation/${a.date}/`} className={`${base} ${sz} bg-accent-pale text-[#2a1f6b] hover:bg-white`} data-action="validation">
          Validation page
          <span className="inline-flex items-center gap-1 rounded-full bg-warm/20 px-1.5 py-px text-[10.5px] font-semibold text-[#9a3412]"><span className="h-1.5 w-1.5 rounded-full bg-warm" aria-hidden />Proposal</span>
        </Link>
      ) : (
        <span className={`${base} ${sz} ${off}`} title={a.landingReason ?? "The brief proposed no validation page this night"} aria-disabled="true" data-action="validation">No validation page</span>
      )}
    </div>
  );
}
