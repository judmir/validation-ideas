"use client";
import { useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** One POC screenshot from out/demo/<date>/ (synced at deploy, never committed). Missing file: a quiet note, not a broken image. */
export default function DemoShotImg({ src, alt, w, h, tall }: { src: string; alt: string; w: number; h: number; tall?: boolean }) {
  const [missing, setMissing] = useState(false);
  const url = `${BASE}/${src}`;
  if (missing) return <div className="grid place-items-center rounded-xl bg-black/40 p-6 text-center text-[12px] text-zinc-400" style={{ aspectRatio: `${w} / ${Math.min(h, w * 2.2)}` }}>Screenshot not published yet<br />(scripts/sync-demo-shots.sh)</div>;
  return (
    <a href={url} target="_blank" rel="noreferrer" className={`block overflow-hidden rounded-xl bg-black ring-1 ring-white/[0.08] ${tall ? "max-h-[520px] overflow-y-auto" : ""}`} title="Open full size">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={alt} width={w} height={h} loading="lazy" decoding="async" onError={() => setMissing(true)} className="block h-auto w-full" />
    </a>
  );
}
