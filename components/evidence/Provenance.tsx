import type { Idea } from "@/lib/types";
import { StreamBadge } from "../ui";

/** Stream badge, one-line evidence summary and the scout signals (label + where it was seen). */
export default function Provenance({ idea }: { idea: Idea }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <StreamBadge source={idea.source} />
        <span className="text-[12px] text-zinc-400">{idea.source.includes("+") ? "Complaints + proven model" : idea.source === "proven-model" ? "Proven model only" : "Complaints only"}</span>
      </div>
      <p className="text-[15px] leading-relaxed text-zinc-100">{idea.evidenceSummary}</p>
      <ul className="grid gap-2 md:grid-cols-2">
        {idea.signals.map((s) => (
          <li key={s.label} className="min-w-0 rounded-2xl bg-tile-2 p-4">
            <div className="text-[14px] font-semibold leading-snug text-zinc-50">{s.label}</div>
            <div className="mt-1 text-[12px] text-zinc-400">{s.source}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
