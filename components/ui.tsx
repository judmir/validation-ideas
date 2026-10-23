import type { ReactNode } from "react";

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
              <circle cx={size / 2} cy={size / 2} r={rad} fill="none" stroke={r.color} strokeWidth={w} strokeLinecap="round" strokeDasharray={`${(v / 100) * c} ${c}`} />
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
  slate: "bg-white/[0.08] text-zinc-200",
  light: "bg-[#ebe9f0] text-ink-soft",
  orange: "bg-[#fdba74] text-[#431407]",
  amber: "bg-[#fdba74] text-[#431407]",
  violet: "bg-accent-pale text-[#2a1f6b]",
  blue: "bg-accent-pale text-[#2a1f6b]",
  green: "bg-[#bbf7d0] text-[#14532d]",
  red: "bg-[#fecaca] text-[#7f1d1d]",
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

/** Small rectangular-ish tag pair, like "Work · 14:00" in the reference. */
export function Tag({ warm, children }: { warm?: boolean; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold ${warm ? "bg-warm text-[#431407]" : "bg-white/[0.09] text-zinc-300"}`}>{children}</span>;
}

/** Rounded icon chip used at the top of stat tiles. */
export function IconChip({ tone = "dark", children }: { tone?: "light" | "accent" | "dark"; children: ReactNode }) {
  const c = tone === "light" ? "bg-white text-ink" : tone === "accent" ? "bg-accent text-accent-ink" : "bg-tile-2 text-zinc-200";
  return <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${c}`}>{children}</span>;
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

/** Bento stat tile: icon chip, big numeral with a small unit word, quiet label. */
export function StatTile({ icon, tone, value, unit, label, children }: { icon?: ReactNode; tone?: "light" | "accent" | "dark"; value: ReactNode; unit?: string; label: string; children?: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col rounded-[22px] bg-tile p-4 sm:p-5">
      {icon && <IconChip tone={tone}>{icon}</IconChip>}
      <div className={`${icon ? "mt-auto pt-5" : ""} flex items-baseline gap-1.5`}>
        <span className="text-[36px] font-medium leading-none tracking-tight tabular-nums text-zinc-50 sm:text-[40px]">{value}</span>
        {unit && <span className="text-[14px] font-medium text-zinc-300">{unit}</span>}
      </div>
      <div className="mt-2 text-[13px] text-zinc-400">{label}</div>
      {children}
    </div>
  );
}

export function Spinner() {
  return <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />;
}

const base = "inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light disabled:cursor-not-allowed disabled:opacity-50";
export const btn = {
  primary: `${base} bg-white text-ink hover:bg-zinc-200 disabled:bg-tile-2 disabled:text-zinc-400 disabled:opacity-100`,
  accent: `${base} bg-accent text-accent-ink hover:bg-accent-light`,
  dark: `${base} bg-[#1c1830] text-white hover:bg-[#2a2545]`,
  fb: `${base} bg-[#166fe5] text-white hover:bg-[#1460c7]`,
  ghost: `${base} bg-white/[0.07] text-zinc-100 hover:bg-white/[0.12]`,
};
export const linkCls = "text-zinc-50 underline decoration-accent-light/60 underline-offset-2 transition-colors hover:decoration-accent-light";
