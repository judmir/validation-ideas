import type { ReactNode } from "react";

export function ScorePill({ score, muted }: { score: number; muted?: boolean }) {
  const color = muted ? "bg-slate-100 text-slate-500" : score >= 80 ? "bg-emerald-100 text-emerald-800" : score >= 65 ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700";
  return <span className={`inline-flex h-9 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-bold tabular-nums ${color}`}>{score}</span>;
}

export function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-xs">
      <div className="mb-1 flex justify-between text-slate-600"><span>{label}</span><span className="tabular-nums font-medium">{value}</span></div>
      <div className="h-1.5 rounded-full bg-slate-200"><div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

const badgeColors: Record<string, string> = {
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  amber: "bg-amber-50 text-amber-800 ring-amber-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-200",
};
export function Badge({ color = "slate", children, pulse }: { color?: keyof typeof badgeColors | string; children: ReactNode; pulse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${badgeColors[color] ?? badgeColors.slate}`}>
      {pulse && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 ${className}`}>{children}</section>;
}

export function Spinner() {
  return <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />;
}

export const btn = {
  primary: "inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed",
  fb: "inline-flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-110 disabled:opacity-60",
  ghost: "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed",
};
