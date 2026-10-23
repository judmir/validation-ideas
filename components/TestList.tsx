"use client";
import Link from "next/link";
import { int, shortDate } from "@/lib/format";
import type { ValidationState } from "@/lib/store";
import type { testNumbers } from "@/lib/status";
import type { TestRow } from "./NightStatusCard";

/** Each run's top pick with its live test status (Ready / Live / ✓ Winner / ✕ Not a winner) and signups. */
export function TestList({ rows, loaded }: { rows: { t: TestRow; v: ValidationState; n: ReturnType<typeof testNumbers> }[]; loaded: boolean }) {
  return (
    <ul className="space-y-1.5 text-[12px]">
      {rows.map(({ t, v, n }) => {
        const tone = v.status === "running" ? "text-warm" : v.status !== "finished" ? "text-zinc-400" : n.call === "strong" ? "text-[#86efac]" : n.call === "kill" ? "text-[#fca5a5]" : "text-[#fcd34d]";
        const status = !loaded ? "" : v.status === "running" ? "Live" : v.status === "idle" ? "Ready" : n.call === "strong" ? "✓ Winner" : n.call === "kill" ? "✕ Not a winner" : "~ Inconclusive";
        const tab = v.status === "finished" ? "#report" : "#validate";
        return (
          <li key={t.id}>
            <Link href={`/idea/${t.id}/${tab}`} className="flex items-baseline gap-2 rounded-lg px-1 py-0.5 transition-colors hover:bg-white/[0.05]">
              <span className="w-11 shrink-0 tabular-nums text-zinc-400">{shortDate(t.night)}</span>
              <span className="min-w-0 flex-1 truncate font-semibold text-zinc-100">{t.name}</span>
              <span className={`shrink-0 font-semibold ${tone}`}>{status}{loaded && v.status !== "idle" ? <span className="font-medium text-zinc-400"> · {int(n.signups)} signups</span> : null}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
