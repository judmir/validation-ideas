import type { ReactNode } from "react";
import { IconMore } from "./icons";

export function ScorePill({ score, muted, top }: { score: number; muted?: boolean; top?: boolean }) {
  const color = muted
    ? "border-line-strong bg-transparent text-zinc-400"
    : top
      ? "border-white bg-white text-black"
      : score >= 65
        ? "border-line-strong bg-surface-3 text-zinc-50"
        : "border-line-strong bg-surface-2 text-zinc-300";
  return <span className={`inline-flex h-10 w-12 shrink-0 items-center justify-center rounded-lg border text-[15px] font-medium tabular-nums ${color}`}>{score}</span>;
}

export function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0 text-xs">
      <div className="mb-1.5 flex items-baseline justify-between gap-2 text-zinc-400"><span className="min-w-0 truncate" title={label}>{label}</span><span className="shrink-0 tabular-nums text-zinc-200">{value}</span></div>
      <div className="h-1 rounded-full bg-line-strong"><div className="h-1 rounded-full bg-zinc-200" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

// Small solid pastel pills with dark text, as in the reference ("Paid", "Past due", "Draft", "Sent").
const badgeColors: Record<string, string> = {
  slate: "bg-surface-3 text-zinc-300 ring-1 ring-inset ring-line-strong",
  amber: "bg-[#fde68a] text-[#713f12]",
  blue: "bg-[#bfdbfe] text-[#1e3a8a]",
  green: "bg-[#bbf7d0] text-[#14532d]",
  red: "bg-[#fecaca] text-[#7f1d1d]",
  indigo: "bg-white text-black",
};
export function Badge({ color = "slate", children, pulse }: { color?: keyof typeof badgeColors | string; children: ReactNode; pulse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-[5px] px-1.5 py-px text-[11px] font-medium leading-[18px] ${badgeColors[color] ?? badgeColors.slate}`}>
      {pulse && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-line bg-surface p-4 sm:p-5 ${className}`}>{children}</section>;
}

/** Panel title row, like "Sales" / "Recent Projects" in the reference. */
export function CardHeader({ title, sub, right }: { title: ReactNode; sub?: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="min-w-0">
        <h2 className="text-[15px] font-medium text-zinc-50">{title}</h2>
        {sub && <div className="mt-0.5 text-xs text-zinc-500">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

export function Stat({ label, value, sub, highlight, tick }: { label: string; value: string; sub?: ReactNode; highlight?: boolean; tick?: boolean }) {
  return (
    <div key={tick ? value : undefined} className={`${tick ? "tick " : ""}rounded-lg border px-3.5 py-3 ${highlight ? "border-zinc-500/60 bg-surface-3" : "border-line bg-surface-2"}`}>
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-xl font-medium tabular-nums tracking-tight text-zinc-50">{value}</div>
      {sub && <div className="mt-0.5 text-[11px]">{sub}</div>}
    </div>
  );
}

/** Stat card with a square icon tile and a kebab, mirroring the reference's top row. */
export function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 sm:gap-3.5 sm:p-3.5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line-strong bg-surface-3 text-zinc-300 sm:h-12 sm:w-12">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs text-zinc-400 sm:text-[13px]">{label}</div>
        <div className="mt-0.5 text-xl font-medium tabular-nums tracking-tight text-zinc-50">{value}</div>
      </div>
      <IconMore className="hidden shrink-0 self-start text-zinc-600 sm:block" size={14} />
    </div>
  );
}

export function Spinner() {
  return <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />;
}

const base = "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3.5 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-50 sm:h-9";
export const btn = {
  primary: `${base} bg-zinc-100 text-zinc-950 hover:bg-white disabled:bg-surface-3 disabled:text-zinc-400 disabled:opacity-100`,
  fb: `${base} bg-[#1877F2] text-white hover:bg-[#2d86f5]`,
  ghost: `${base} border border-line-strong bg-surface-2 text-zinc-200 hover:bg-surface-3 hover:text-white`,
};
export const linkCls = "text-zinc-100 underline decoration-zinc-600 underline-offset-2 transition-colors hover:decoration-zinc-300";
