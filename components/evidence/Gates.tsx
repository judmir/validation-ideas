import { GATE_STATUS_LABEL, checkGates, gateDef, simplestWay, vetoOf, type GateStatus } from "@/lib/gates";
import type { Idea } from "@/lib/types";
import { COMPETITION_HELP, vetoTag } from "@/lib/competition";

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
  const vt = vetoTag(idea);
  const c = idea.competition;
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
            <div className="text-[14px] font-semibold text-zinc-50">Competitor veto: {vt ? vt.text.toLowerCase() : "none"}</div>
            <div className="text-[12px] text-zinc-400">Separate check, not a gate. Now only at 4+ strong US competitors or a funded leader solving it well.</div>
          </div>
          <span title={vt?.title} className={`inline-flex shrink-0 cursor-help items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${veto.vetoed ? "bg-[#fecaca] text-[#7f1d1d]" : "bg-white/[0.1] text-zinc-200"}`}>{vt ? `✕ ${vt.text}` : "None"}</span>
        </div>
        {veto.reason && <p className="mt-2 text-[13px] leading-relaxed text-zinc-200">{veto.reason}</p>}
      </div>

      <div className="rounded-2xl bg-tile-2 p-4" data-competition={c.checked ? "checked" : "not-checked"}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[14px] font-semibold text-zinc-50">Competition</div>
            <div className="text-[12px] text-zinc-400">{COMPETITION_HELP}</div>
          </div>
          {c.demand_signal ? <span className="inline-flex shrink-0 items-center rounded-full bg-[#bbf7d0] px-2.5 py-0.5 text-[11px] font-semibold text-[#14532d]">Demand signal +1</span> : !c.checked ? <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/[0.1] px-2.5 py-0.5 text-[11px] font-semibold text-zinc-300">– Not checked</span> : null}
        </div>
        {c.checked ? (
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[13px]">
            <dt className="text-zinc-400">Strong US competitors</dt><dd className="tabular-nums text-zinc-200">{c.count ?? "Not checked"}</dd>
            <dt className="text-zinc-400">Wedge</dt><dd className="text-zinc-200">{c.wedge ?? "Not checked"}</dd>
          </dl>
        ) : <p className="mt-2 text-[13px] text-zinc-400">Not checked: this entry predates the competition rule; the count and wedge are recorded from the 25 Oct run onward.</p>}
      </div>

      {principle && (
        <p className="px-1 text-[12px] leading-relaxed text-zinc-400"><span className="font-semibold text-zinc-300">Build principle · simplest way:</span> {principle}</p>
      )}
    </div>
  );
}
