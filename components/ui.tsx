import type { ReactNode } from "react";

export function ScorePill({ score, muted }: { score: number; muted?: boolean }) {
  const color = muted
    ? "bg-white/[0.03] text-zinc-500 ring-line"
    : score >= 80
      ? "bg-accent/15 text-accent-soft ring-accent/30"
      : score >= 65
        ? "bg-amber-400/10 text-amber-300 ring-amber-400/20"
        : "bg-white/[0.05] text-zinc-300 ring-line-strong";
  return <span className={`inline-flex h-10 w-12 shrink-0 items-center justify-center rounded-lg text-[15px] font-semibold tabular-nums ring-1 ring-inset ${color}`}>{score}</span>;
}

export function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-xs">
      <div className="mb-1.5 flex justify-between gap-2 text-zinc-400"><span>{label}</span><span className="font-medium tabular-nums text-zinc-200">{value}</span></div>
      <div className="h-1 rounded-full bg-white/[0.07]"><div className="h-1 rounded-full bg-accent" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

const badgeColors: Record<string, string> = {
  slate: "bg-white/[0.05] text-zinc-300 ring-white/10",
  amber: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  blue: "bg-sky-400/10 text-sky-300 ring-sky-400/20",
  green: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  red: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
  indigo: "bg-accent/15 text-accent-soft ring-accent/30",
};
export function Badge({ color = "slate", children, pulse }: { color?: keyof typeof badgeColors | string; children: ReactNode; pulse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${badgeColors[color] ?? badgeColors.slate}`}>
      {pulse && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-line bg-surface p-4 sm:p-6 ${className}`}>{children}</section>;
}

export function Stat({ label, value, sub, highlight, tick }: { label: string; value: string; sub?: ReactNode; highlight?: boolean; tick?: boolean }) {
  return (
    <div key={tick ? value : undefined} className={`${tick ? "tick " : ""}rounded-xl border px-3.5 py-3 ${highlight ? "border-accent/40 bg-accent/[0.07]" : "border-line bg-surface-2"}`}>
      <div className="label">{label}</div>
      <div className={`mt-1 text-xl font-semibold tabular-nums tracking-tight ${highlight ? "text-accent-soft" : "text-zinc-50"}`}>{value}</div>
      {sub && <div className="mt-0.5 text-[11px]">{sub}</div>}
    </div>
  );
}

export function Spinner() {
  return <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />;
}

const base = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-50";
export const btn = {
  primary: `${base} bg-accent text-white hover:bg-accent-hover disabled:bg-white/[0.06] disabled:text-zinc-400 disabled:opacity-100`,
  fb: `${base} bg-[#1877F2] text-white hover:bg-[#2d86f5]`,
  ghost: `${base} border border-line-strong bg-white/[0.02] text-zinc-200 hover:bg-white/[0.06]`,
};
