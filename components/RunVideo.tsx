"use client";
import { useRunVideo, videoUrl } from "@/lib/run-videos";
import { shortDate } from "@/lib/format";

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

/** "Watch run video" for one scout night. Renders nothing unless the deployed manifest lists the date. */
export default function RunVideo({ date, className = "" }: { date: string; className?: string }) {
  const v = useRunVideo(date);
  if (!v) return null;
  return (
    <section aria-label={`Run video, ${shortDate(date)}`} className={`rounded-[20px] bg-tile p-3 ring-1 ring-inset ring-accent/25 sm:p-4 ${className}`} data-run-video={date}>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 px-1 pb-2.5">
        <span className="flex items-center gap-2 text-[14px] font-semibold text-zinc-50"><span className="h-2 w-2 rounded-full bg-accent-light" aria-hidden />Watch run video</span>
        <span className="text-[12px] text-zinc-400">Narrated walk-through of the {shortDate(date)} scout night{v.duration_s ? ` · ${mmss(v.duration_s)}` : ""}</span>
      </div>
      <video controls preload="metadata" playsInline className="block aspect-video w-full rounded-2xl bg-black" src={videoUrl(v)}>
        <a href={videoUrl(v)} className="text-accent-light underline">Download the run video</a>
      </video>
    </section>
  );
}
