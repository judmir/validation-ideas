import type { ReactNode } from "react";
import { eur0 } from "@/lib/format";
import { RULES, type PipelineVerdict, type PlcStage } from "@/lib/types";

/** Rounded score chip. `top` = lavender accent (the day's pick); `muted` = quiet gray for #2/#3. */
export function ScorePill({ score, muted, top }: { score: number; muted?: boolean; top?: boolean }) {
  const color = top ? "bg-accent text-accent-ink" : muted ? "bg-tile-2 text-zinc-300" : "bg-tile-2 text-zinc-50";
  return <span className={`inline-flex h-9 min-w-11 shrink-0 items-center justify-center rounded-full px-2.5 text-[14px] font-semibold tabular-nums ${color}`}>{score}</span>;
}

/** Concentric progress rings (0–100), outermost first, with optional centered content. */
export function Ring({ rings, size = 120, stroke = 14, gap = 4, track = "rgb(255 255 255 / 0.07)", label, children }: {
  rings: { value: number; color: string }[];
  size?: number;
  stroke?: number;
  gap?: number;
  track?: string;
  label?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role={label ? "img" : undefined} aria-label={label}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        {rings.map((r, i) => {
          const w = i === 0 ? stroke : Math.max(4, stroke * 0.55);
          const rad = size / 2 - stroke / 2 - i * (stroke + gap) + (i ? (stroke - w) / 2 : 0);
          const c = 2 * Math.PI * rad;
          const v = Math.max(0, Math.min(100, r.value));
          return (
            <g key={i}>
              <circle cx={size / 2} cy={size / 2} r={rad} fill="none" stroke={track} strokeWidth={w} />
              {v > 0 && <circle cx={size / 2} cy={size / 2} r={rad} fill="none" stroke={r.color} strokeWidth={w} strokeLinecap="round" strokeDasharray={`${(v / 100) * c} ${c}`} />}
            </g>
          );
        })}
      </svg>
      {children && <div className="absolute inset-0 grid place-items-center text-center">{children}</div>}
    </div>
  );
}

export function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0 text-xs">
      <div className="mb-2 flex items-baseline justify-between gap-2 text-zinc-400"><span className="min-w-0 truncate" title={label}>{label}</span><span className="shrink-0 font-semibold tabular-nums text-zinc-100">{value}</span></div>
      <div className="h-1.5 rounded-full bg-white/[0.08]"><div className="h-1.5 rounded-full bg-accent-light" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

// Soft rounded pills with dark text. Green/red are reserved for the win/lose verdict; orange marks live state.
const badgeColors: Record<string, string> = {
  slate: "bg-white/[0.09] text-zinc-200",
  light: "bg-[#ebe9f0] text-ink-soft",
  orange: "bg-[#fdba74] text-[#431407]",
  violet: "bg-accent-pale text-[#2a1f6b]",
  green: "bg-[#bbf7d0] text-[#14532d]",
  red: "bg-[#fecaca] text-[#7f1d1d]",
  amber: "bg-[#fde68a] text-[#713f12]",
  indigo: "bg-accent text-accent-ink",
};
export function Badge({ color = "slate", children, pulse }: { color?: keyof typeof badgeColors | string; children: ReactNode; pulse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-[18px] ${badgeColors[color] ?? badgeColors.slate}`}>
      {pulse && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />}
      {children}
    </span>
  );
}

/** Area sparkline scaled to the data's own min/max so small changes still have visible shape. */
export function Sparkline({ points, label, className = "h-12" }: { points: number[]; label: string; className?: string }) {
  if (points.length < 2) return <div className={`grid place-items-center rounded-xl border border-dashed border-white/[0.12] text-[11px] text-zinc-400 ${className}`}>{label}</div>;
  const min = Math.min(...points), max = Math.max(...points);
  const y = (p: number) => (max === min ? 20 : 36 - ((p - min) / (max - min)) * 32);
  const d = points.map((p, i) => `${((i / (points.length - 1)) * 100).toFixed(2)},${y(p).toFixed(2)}`).join(" ");
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={`w-full ${className}`} role="img" aria-label={label}>
      <polygon points={`0,40 ${d} 100,40`} fill="rgb(139 124 246 / 0.18)" />
      <polyline points={d} fill="none" stroke="#b9aefb" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Budget bar: any spend > 0 shows at least a short pill, never a stray dot. */
export function BudgetBar({ spent, total, className = "" }: { spent: number; total: number; className?: string }) {
  const pct = total ? Math.min(100, (spent / total) * 100) : 0;
  return (
    <div className={className}>
      <div className="h-2.5 rounded-full bg-white/[0.08]" role="img" aria-label={`${eur0(spent)} of ${eur0(total)} spent`}>
        {spent > 0 && <div className="h-2.5 rounded-full bg-warm transition-[width] duration-700" style={{ width: `${Math.max(6, pct)}%` }} />}
      </div>
      <div className="mt-2 text-[12px] text-zinc-400"><span className="font-semibold tabular-nums text-zinc-100">{eur0(spent)}</span> of {eur0(total)}</div>
    </div>
  );
}

/** Small rectangular-ish tag pair, like "Work · 14:00" in the reference. */
export function Tag({ warm, children }: { warm?: boolean; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold ${warm ? "bg-warm text-[#431407]" : "bg-white/[0.09] text-zinc-300"}`}>{children}</span>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-[22px] bg-tile p-5 sm:p-6 ${className}`}>{children}</section>;
}

export function CardHeader({ title, sub, right }: { title: ReactNode; sub?: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div className="min-w-0">
        <h2 className="text-[17px] font-semibold tracking-tight text-zinc-50">{title}</h2>
        {sub && <div className="mt-1 text-[13px] text-zinc-400">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

export function Stat({ label, value, sub, highlight, tick }: { label: string; value: string; sub?: ReactNode; highlight?: boolean; tick?: boolean }) {
  return (
    <div key={tick ? value : undefined} className={`${tick ? "tick " : ""}rounded-2xl px-4 py-3.5 ${highlight ? "bg-accent text-accent-ink" : "bg-tile-2"}`}>
      <div className={`text-xs ${highlight ? "font-semibold text-accent-ink" : "text-zinc-400"}`}>{label}</div>
      <div className={`mt-1 text-[22px] font-medium tabular-nums tracking-tight ${highlight ? "" : "text-zinc-50"}`}>{value}</div>
      {sub && <div className="mt-0.5 text-[11px]">{sub}</div>}
    </div>
  );
}

/** Header metric tile: quiet label, big friendly numeral, then a small visual underneath. */
export function Metric({ label, value, unit, children }: { label: string; value: ReactNode; unit?: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col rounded-[20px] bg-tile p-4 sm:p-5">
      <div className="text-[13px] text-zinc-400">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="text-[30px] font-medium leading-none tracking-tight tabular-nums text-zinc-50 sm:text-[34px]">{value}</span>
        {unit && <span className="truncate text-[13px] font-medium text-zinc-300">{unit}</span>}
      </div>
      {children && <div className="mt-auto pt-4">{children}</div>}
    </div>
  );
}

export function Spinner() {
  return <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />;
}

// Disabled buttons stay legible (no 50% fade on charcoal) and labels never wrap.
const base = "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light disabled:cursor-not-allowed disabled:opacity-75";
export const btn = {
  primary: `${base} bg-white text-ink hover:bg-zinc-200 disabled:bg-tile-2 disabled:text-zinc-300 disabled:opacity-100`,
  ghost: `${base} bg-white/[0.08] text-zinc-100 hover:bg-white/[0.14]`,
};
export const linkCls = "text-zinc-50 underline decoration-accent-light/70 underline-offset-2 transition-colors hover:decoration-accent-light";

/** x/25 with a 5-segment mini bar (5 points each) and a tick at the 18 bar. */
export function ScoreMini({ score, verdict, size = "md" }: { score: number; verdict: PipelineVerdict; size?: "md" | "lg" }) {
  const fill = verdict === "winner" ? "bg-accent-light" : verdict === "near-miss" ? "bg-[#fbbf24]" : verdict === "killed" ? "bg-[#f87171]" : "bg-zinc-500";
  const big = size === "lg";
  return (
    <div className="shrink-0 text-right" aria-label={`Score ${score} of ${RULES.maxScore}, bar ${RULES.passBar}`} role="img">
      <div className="leading-none tabular-nums">
        <span className={`${big ? "text-[36px] sm:text-[40px]" : "text-[22px]"} font-medium tracking-tight text-zinc-50`}>{score}</span>
        <span className={`${big ? "text-[14px]" : "text-[12px]"} font-medium text-zinc-400`}>/{RULES.maxScore}</span>
      </div>
      <div className={`relative ml-auto mt-1.5 flex gap-[3px] ${big ? "w-[92px]" : "w-[64px]"}`}>
        {[0, 1, 2, 3, 4].map((i) => {
          const part = Math.max(0, Math.min(1, (score - i * 5) / 5));
          return (
            <span key={i} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.1]">
              <span className={`absolute inset-y-0 left-0 ${fill}`} style={{ width: `${part * 100}%` }} />
            </span>
          );
        })}
        <span aria-hidden className="absolute -bottom-[3px] -top-[3px] w-[2px] rounded-full bg-zinc-100" style={{ left: `calc(${(RULES.passBar / RULES.maxScore) * 100}% - 1px)` }} />
      </div>
    </div>
  );
}

const VERDICT_BADGE: Record<PipelineVerdict, string> = { winner: "indigo", "near-miss": "amber", killed: "red", "below-bar": "slate" };
export function VerdictBadge({ verdict, veto }: { verdict: PipelineVerdict; veto?: boolean }) {
  const label = verdict === "winner" ? "Winner" : verdict === "near-miss" ? "Near-miss" : verdict === "killed" ? (veto ? "Killed by veto" : "Killed") : "Below bar";
  return <Badge color={VERDICT_BADGE[verdict]}>{label}</Badge>;
}

/** Provenance: Complaints, Proven model or Both. */
export function StreamBadge({ source }: { source: string }) {
  const both = source.includes("+");
  const label = both ? "Both" : source === "proven-model" ? "Proven model" : "Complaints";
  const title = both ? "Complaints + proven model" : label;
  return (
    <span title={title} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-white/[0.07] px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
      <span aria-hidden className="flex gap-0.5">
        {(both || source !== "proven-model") && <span className="h-1.5 w-1.5 rounded-full bg-warm" />}
        {(both || source === "proven-model") && <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />}
      </span>
      {label}
    </span>
  );
}

export const PLC_LABEL: Record<PlcStage, string> = { introduction: "Introduction", growth: "Growth", maturity: "Maturity", decline: "Decline" };
export function PlcChip({ stage }: { stage: PlcStage | null }) {
  if (!stage) return null;
  return <span className={`whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold ${stage === "decline" ? "bg-[#fecaca] text-[#7f1d1d]" : "bg-white/[0.07] text-zinc-300"}`}>PLC · {PLC_LABEL[stage]}</span>;
}

/** Week-over-week chip: this week vs last week (complaints by post date). */
export function WowChip({ now, prev, nowIso, prevIso }: { now: number; prev: number; nowIso: string; prevIso: string }) {
  const d = now - prev;
  const tone = d > 0 ? "text-[#fdba74]" : d < 0 ? "text-zinc-400" : "text-zinc-400";
  return (
    <span title={`${prevIso} ${prev} → ${nowIso} ${now}`} className={`whitespace-nowrap rounded-md bg-white/[0.07] px-2 py-0.5 text-[11px] font-semibold tabular-nums ${tone}`}>
      {d > 0 ? "↑" : d < 0 ? "↓" : "→"} {prev}→{now} <span className="font-medium text-zinc-400">wk</span>
    </span>
  );
}

/** Horizontal funnel, √-scaled widths so small steps stay visible. */
export function Funnel({ rows }: { rows: { k: string; n: number }[] }) {
  const fills = ["bg-accent-pale", "bg-accent-light", "bg-accent"];
  const top = rows[0]?.n || 1;
  return (
    <div className="space-y-2.5">
      {rows.map((x, i) => {
        const w = i === 0 ? 100 : Math.max(4, Math.sqrt(x.n / top) * 100);
        return (
          <div key={x.k} className="flex items-center gap-3 text-xs">
            <span className="w-28 shrink-0 text-zinc-400">{x.k}</span>
            <div className="flex h-6 min-w-0 flex-1 items-center gap-2"><div className={`h-6 rounded-full ${fills[i] ?? "bg-accent"}`} style={{ width: `${w * 0.8}%` }} /><span className="font-semibold tabular-nums text-zinc-100">{x.n.toLocaleString("en-US")}</span></div>
          </div>
        );
      })}
      <p className="text-[11px] text-zinc-400">Bar widths on √ scale.</p>
    </div>
  );
}

/** Rounded callout: amber (borderline), red (kill) or neutral. Collapsible when `collapsible`. */
export function Callout({ tone, title, children, collapsible }: { tone: "amber" | "red" | "accent" | "neutral"; title: string; children: ReactNode; collapsible?: boolean }) {
  const cls = { amber: "bg-[#fbbf24]/[0.09] ring-[#fbbf24]/25", red: "bg-[#f87171]/[0.09] ring-[#f87171]/25", accent: "bg-accent/[0.12] ring-accent/30", neutral: "bg-tile-2 ring-white/[0.06]" }[tone];
  const head = { amber: "text-[#fcd34d]", red: "text-[#fca5a5]", accent: "text-accent-light", neutral: "text-zinc-200" }[tone];
  if (collapsible)
    return (
      <details className={`group rounded-2xl px-4 py-3 ring-1 ring-inset ${cls}`}>
        <summary className={`flex cursor-pointer list-none items-center gap-2 text-[13px] font-semibold ${head}`}>
          <span className="transition group-open:rotate-90" aria-hidden>›</span>{title}
          <span className="ml-auto text-[11px] font-medium text-zinc-400 group-open:hidden">Show</span>
        </summary>
        <div className="mt-2 text-[13px] leading-relaxed text-zinc-200">{children}</div>
      </details>
    );
  return (
    <div className={`rounded-2xl px-4 py-3 ring-1 ring-inset ${cls}`}>
      <div className={`text-[13px] font-semibold ${head}`}>{title}</div>
      <div className="mt-1 text-[13px] leading-relaxed text-zinc-200">{children}</div>
    </div>
  );
}

export const Placeholder = ({ what = "Not written for this idea" }: { what?: string }) => <p className="text-[13px] italic text-zinc-400">{what}. The brief only writes this for the night&apos;s top ideas.</p>;

/** Home stats tile: quiet label, big numeral, small unit. */
export function StatCell({ label, value, unit }: { label: string; value: ReactNode; unit?: ReactNode }) {
  return (
    <div className="min-w-0 rounded-[20px] bg-tile p-4 sm:p-5">
      <div className="truncate text-[13px] text-zinc-400">{label}</div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-[32px] font-medium leading-none tracking-tight tabular-nums text-zinc-50 sm:text-[36px]">{value}</span>
        {unit && <span className="truncate text-[12px] font-medium text-zinc-300">{unit}</span>}
      </div>
    </div>
  );
}
