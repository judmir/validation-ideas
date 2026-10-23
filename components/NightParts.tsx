import type { NightRun, StepKey, StepStatus } from "@/lib/types";
import { STEP_ORDER, STEP_TIMES } from "@/lib/mock/nights";
import { IconCheck, IconX } from "./icons";

const STEP_LABEL: Record<StepKey, string> = { scout: "Scout", analyst: "Analyst", builder: "Builder", brief: "Brief" };
const STATUS_CLS: Record<StepStatus, string> = {
  done: "bg-accent-light text-accent-ink",
  skipped: "bg-white/[0.1] text-zinc-300",
  failed: "bg-[#fecaca] text-[#7f1d1d]",
};

/** The 4 nightly steps with fixed times and done/skipped/failed state. */
export function StepPills({ steps }: { steps: NightRun["steps"] }) {
  return (
    <ol className="grid grid-cols-2 gap-1.5 sm:grid-cols-4" aria-label="Night steps">
      {STEP_ORDER.map((k) => {
        const s = steps[k];
        return (
          <li key={k} className="min-w-0 rounded-2xl bg-tile-2 px-2.5 py-2 sm:px-3">
            <div className="flex items-center gap-1.5">
              <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ${STATUS_CLS[s]}`} aria-hidden>
                {s === "done" ? <IconCheck size={10} strokeWidth={3} /> : s === "failed" ? <IconX size={10} strokeWidth={3} /> : <span className="h-0.5 w-2 rounded bg-current" />}
              </span>
              <span className="truncate text-[12px] font-semibold text-zinc-100">{STEP_LABEL[k]}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5 text-[11px]">
              <span className="font-semibold tabular-nums text-zinc-300">{STEP_TIMES[k]}</span>
              <span className={s === "failed" ? "text-[#fca5a5]" : "text-zinc-400"}>{s}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** One bar per scanned source (posts scanned). */
export function SourceBars({ bySource }: { bySource: NightRun["scout"]["bySource"] }) {
  const max = Math.max(1, ...bySource.map((b) => b.n));
  return (
    <ul className="space-y-1.5">
      {bySource.map(({ label, n }) => (
        <li key={label} className="flex items-center gap-2.5 text-[12px]">
          <span className="w-[112px] shrink-0 truncate text-zinc-300" title={label}>{label}</span>
          <span className="h-2 min-w-0 flex-1 rounded-full bg-white/[0.06]">
            {n > 0 && <span className="block h-2 rounded-full bg-accent-light" style={{ width: `${Math.max(4, (n / max) * 100)}%` }} />}
          </span>
          <span className="w-8 shrink-0 text-right font-semibold tabular-nums text-zinc-100">{n}</span>
        </li>
      ))}
    </ul>
  );
}

/** "N sources blocked" chip that expands to source + reason. */
export function BlockedChip({ blocked }: { blocked: NightRun["scout"]["blocked"] }) {
  if (!blocked.length) return <span className="text-[12px] text-zinc-400">No blocked sources</span>;
  return (
    <details className="group">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full bg-warm/15 px-3 py-1 text-[12px] font-semibold text-[#fdba74] transition-colors hover:bg-warm/25">
        <span className="h-1.5 w-1.5 rounded-full bg-warm" aria-hidden />
        {blocked.length} source{blocked.length > 1 ? "s" : ""} blocked
        <span className="text-zinc-400 transition group-open:rotate-90" aria-hidden>›</span>
      </summary>
      <ul className="mt-2 space-y-1.5 rounded-2xl bg-tile-2 p-3 text-[12px]">
        {blocked.map((b) => (
          <li key={b.source} className="leading-snug"><span className="font-semibold text-zinc-100">{b.source}</span> <span className="text-zinc-400">· {b.reason}</span></li>
        ))}
      </ul>
    </details>
  );
}
