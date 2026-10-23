import type { ReactNode } from "react";

export type Dot = "winner" | "latest" | "past" | "legacy";
const DOT: Record<Dot, string> = {
  winner: "bg-warm ring-4 ring-warm/20",
  latest: "bg-accent-light ring-4 ring-accent/15",
  past: "bg-zinc-500 ring-4 ring-panel",
  legacy: "bg-zinc-700 ring-4 ring-panel",
};

/** Vertical timeline list. Children are <TimelineNode>s. */
export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="scout-timeline">{children}</ol>;
}

/**
 * One timeline entry. Mobile: line on the left edge, date beside the dot above the content.
 * ≥ sm: date in its own right-aligned column left of the line.
 */
export function TimelineNode({ date, sub, dot, last, children }: { date: string; sub: ReactNode; dot: Dot; last: boolean; children: ReactNode }) {
  const active = dot === "latest" || dot === "winner";
  return (
    <li className={`relative pl-8 sm:pl-[156px] ${last ? "" : "pb-9"}`}>
      {!last && <span aria-hidden className="absolute bottom-0 left-[6px] top-[22px] w-0.5 rounded-full bg-white/[0.09] sm:left-[126px]" />}
      <span aria-hidden className="absolute left-0 top-[4px] grid h-3.5 w-3.5 place-items-center sm:left-[120px]">
        <span className={`relative h-3.5 w-3.5 rounded-full ${DOT[dot]}`} />
      </span>
      <div className="mb-2 flex items-baseline gap-2 sm:absolute sm:left-0 sm:top-0 sm:mb-0 sm:w-[100px] sm:flex-col sm:items-end sm:gap-0.5 sm:text-right">
        <span className={`text-[15px] font-semibold leading-[22px] tracking-tight tabular-nums ${active ? "text-zinc-50" : "text-zinc-200"}`}>{date}</span>
        <span className="text-[12px] font-medium text-zinc-400">{sub}</span>
      </div>
      {children}
    </li>
  );
}
