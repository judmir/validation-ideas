import type { GateKey, GateResult, Idea } from "@/lib/types";

const GATES: { k: GateKey; label: string; hint: string }[] = [
  { k: "consumer_subscription", label: "Consumer subscription", hint: "Will consumers pay monthly?" },
  { k: "simplest_way", label: "Simplest way", hint: "Open the app, the job is done" },
  { k: "us_entry", label: "US entry", hint: "Reach US users; charge in USD via Paddle / Polar / Lemon Squeezy" },
];
export const GATE_SHORT: Record<GateKey, string> = { consumer_subscription: "Subscription", simplest_way: "Simplest way", us_entry: "US entry" };

const RES: Record<GateResult["result"], { icon: string; label: string; cls: string }> = {
  pass: { icon: "✓", label: "Pass", cls: "bg-[#bbf7d0] text-[#14532d]" },
  "weak-pass": { icon: "~", label: "Weak pass", cls: "bg-[#fde68a] text-[#713f12]" },
  borderline: { icon: "~", label: "Borderline", cls: "bg-[#fde68a] text-[#713f12]" },
  fail: { icon: "✕", label: "Fail", cls: "bg-[#fecaca] text-[#7f1d1d]" },
  "not-assessed": { icon: "–", label: "Not assessed", cls: "bg-white/[0.1] text-zinc-300" },
};

export function GateChip({ label, g }: { label: string; g: GateResult }) {
  const r = RES[g.result];
  return (
    <span title={g.text} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/[0.07] py-0.5 pl-0.5 pr-2.5 text-[11px] font-semibold text-zinc-200">
      <span className={`grid h-[18px] w-[18px] place-items-center rounded-full text-[11px] font-bold ${r.cls}`} aria-label={r.label}>{r.icon}</span>{label}
    </span>
  );
}
export function VetoChip({ veto }: { veto: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full py-0.5 pl-0.5 pr-2.5 text-[11px] font-semibold ${veto ? "bg-[#f87171]/15 text-[#fca5a5]" : "bg-white/[0.07] text-zinc-200"}`}>
      <span className={`grid h-[18px] w-[18px] place-items-center rounded-full text-[11px] font-bold ${veto ? "bg-[#fecaca] text-[#7f1d1d]" : "bg-[#bbf7d0] text-[#14532d]"}`}>{veto ? "✕" : "✓"}</span>
      {veto ? "Competitor veto" : "No competitor veto"}
    </span>
  );
}

export default function Gates({ idea }: { idea: Idea }) {
  return (
    <ul className="space-y-2">
      {GATES.map(({ k, label, hint }) => {
        const g = idea.gates[k];
        const r = RES[g.result];
        return (
          <li key={k} className="rounded-2xl bg-tile-2 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0"><div className="text-[14px] font-semibold text-zinc-50">{label}</div><div className="text-[12px] text-zinc-400">{hint}</div></div>
              <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${r.cls}`}>{r.icon} {r.label}</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{g.text}</p>
          </li>
        );
      })}
      <li className={`rounded-2xl p-4 ${idea.competitor_veto ? "bg-[#f87171]/[0.09] ring-1 ring-inset ring-[#f87171]/25" : "bg-tile-2"}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0"><div className="text-[14px] font-semibold text-zinc-50">Competitor veto</div><div className="text-[12px] text-zinc-400">Is the job already done well, cheaply, for these users?</div></div>
          <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${idea.competitor_veto ? "bg-[#fecaca] text-[#7f1d1d]" : "bg-[#bbf7d0] text-[#14532d]"}`}>{idea.competitor_veto ? "✕ Vetoed" : "✓ Survives"}</span>
        </div>
        {idea.competitor_veto && idea.kill_reason && <p className="mt-2 text-[13px] leading-relaxed text-zinc-200">{idea.kill_reason}</p>}
      </li>
    </ul>
  );
}
