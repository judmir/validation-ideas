"use client";
import { useState } from "react";
import type { TrafficSource, Validation } from "@/lib/types";
import { IconCheck } from "../icons";
import MockedPill from "../MockedPill";

export const SOURCE_NAME: Record<TrafficSource, string> = { meta: "Meta (Facebook + Instagram)", google_search: "Google Search", reddit: "Reddit" };

/** Phase 1 ad kit: copy blocks to paste into Meta Ads Manager by hand. No publish button. */
export default function AdKit({ kit, slug }: { kit: Validation["adKit"]; slug: string }) {
  const m = kit.meta;
  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        {m.primaryText.map((t, i) => <Copy key={t} label={`Primary text ${i + 1}`} text={t} />)}
        {m.headlines.map((t, i) => <Copy key={t} label={`Headline ${i + 1}`} text={t} />)}
        <Copy label="Description" text={m.description} />
        <Copy label="Audience" text={`${m.audience.country} · age ${m.audience.age} · ${m.audience.interests.join(", ")}`} />
      </div>
      <div className="rounded-2xl bg-tile-2 p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-[13px] font-semibold text-zinc-50">Budget</div>
          <div className="text-[20px] font-medium tabular-nums tracking-tight text-zinc-50">EUR {kit.budgetEur.min}–{kit.budgetEur.max} <span className="text-[12px] font-medium text-zinc-400">per idea, total</span></div>
        </div>
      </div>
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2"><span className="label">UTM link per source · placeholder path</span><MockedPill /></div>
        <ul className="space-y-1.5">
          {(Object.keys(kit.utm) as TrafficSource[]).map((s) => <Copy key={s} label={SOURCE_NAME[s]} text={`/v/${slug}/${kit.utm[s]}`} mono />)}
        </ul>
      </div>
      <div className="rounded-2xl bg-tile-2 p-4">
        <div className="text-[13px] font-semibold text-zinc-50">Paste into Meta Ads Manager</div>
        <ol className="mt-2 space-y-1.5 text-[13px] text-zinc-300">
          {["Create a Traffic campaign, country United States, age and interests as above.", `Set a lifetime budget inside EUR ${kit.budgetEur.min}–${kit.budgetEur.max}.`, "Paste 2 primary texts and 2 headlines; let Meta rotate them.", "Use the Meta UTM link as the website URL.", "Publish yourself in Ads Manager. This app never publishes."].map((s, i) => (
            <li key={s} className="flex gap-2.5"><span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[0.08] text-[11px] font-bold tabular-nums text-zinc-200">{i + 1}</span><span>{s}</span></li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Copy({ label, text, mono }: { label: string; text: string; mono?: boolean }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch { /* clipboard blocked: the text is still selectable */ }
    setDone(true);
    setTimeout(() => setDone(false), 1400);
  };
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-2xl bg-tile-2 p-3.5">
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-zinc-400">{label}</div>
        <div className={`mt-1 select-all break-words text-zinc-100 ${mono ? "font-mono text-[12px]" : "text-[13px] leading-relaxed"}`}>{text}</div>
      </div>
      <button onClick={copy} aria-label={`Copy ${label}`} className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full bg-white/[0.08] px-2.5 text-[11px] font-semibold text-zinc-100 transition-colors hover:bg-white/[0.14]">
        {done ? <><IconCheck size={11} strokeWidth={2.4} /> Copied</> : "Copy"}
      </button>
    </div>
  );
}
