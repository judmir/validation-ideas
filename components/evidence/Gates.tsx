import { GATE_STATUS_LABEL, checkGates, gateDef, simplestWay, vetoOf, type GateStatus } from "@/lib/gates";
import type { Idea } from "@/lib/types";

const RES: Record<GateStatus, { icon: string; cls: string }> = {
  pass: { icon: "✓", cls: "bg-[#bbf7d0] text-[#14532d]" },
  "weak-pass": { icon: "~", cls: "bg-[#fde68a] text-[#713f12]" },
  borderline: { icon: "~", cls: "bg-[#fde68a] text-[#713f12]" },
  fail: { icon: "✕", cls: "bg-[#fecaca] text-[#7f1d1d]" },
  "not-checked": { icon: "–", cls: "bg-white/[0.1] text-zinc-300" },
};

/** The 4 gates from lib/gates.ts, then the competitor veto as its own row, then the build principle. */
export default function Gates({ idea }: { idea: Idea }) {
  const veto = vetoOf(idea);
  const principle = simplestWay(idea);
  return (
    <div className="space-y-4">
      <ul className="space-y-2" aria-label="Gates">
        {checkGates(idea).map((g) => {
          const def = gateDef(g.id);
          const r = RES[g.status];
          const muted = g.status === "not-checked";
          return (
            <li key={g.id} className="rounded-2xl bg-tile-2 p-4" data-gate={g.id} data-status={g.status}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0"><div className="text-[14px] font-semibold text-zinc-50">{def.label}</div><div className="text-[12px] text-zinc-400">{def.description}</div></div>
                <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${r.cls}`}>{r.icon} {GATE_STATUS_LABEL[g.status]}</span>
              </div>
              <p className={`mt-2 text-[13px] leading-relaxed ${muted ? "text-zinc-400" : "text-zinc-300"}`}>{g.text}</p>
            </li>
          );
        })}
      </ul>

      <div className={`rounded-2xl p-4 ${veto.vetoed ? "bg-[#f87171]/[0.09] ring-1 ring-inset ring-[#f87171]/25" : "bg-tile-2"}`} data-veto={veto.label}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[14px] font-semibold text-zinc-50">Competitor veto: {veto.label}</div>
            <div className="text-[12px] text-zinc-400">Separate check, not a gate: is the job already done well and cheaply for these users?</div>
          </div>
          <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${veto.vetoed ? "bg-[#fecaca] text-[#7f1d1d]" : "bg-white/[0.1] text-zinc-200"}`}>{veto.vetoed ? "✕ Vetoed" : "None"}</span>
        </div>
        {veto.reason && <p className="mt-2 text-[13px] leading-relaxed text-zinc-200">{veto.reason}</p>}
      </div>

      {principle && (
        <p className="px-1 text-[12px] leading-relaxed text-zinc-400"><span className="font-semibold text-zinc-300">Build principle · simplest way:</span> {principle}</p>
      )}
    </div>
  );
}
