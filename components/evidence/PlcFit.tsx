import type { Plc, PlcStage, PlcVerdict } from "@/lib/types";

const STAGES: PlcStage[] = ["introduction", "growth", "maturity", "decline"];
const LABEL: Record<PlcStage, string> = { introduction: "Introduction", growth: "Growth", maturity: "Maturity", decline: "Decline" };
const V: Record<PlcVerdict, string> = { yes: "bg-[#bbf7d0] text-[#14532d]", maybe: "bg-[#fde68a] text-[#713f12]", no: "bg-[#fecaca] text-[#7f1d1d]" };

/** Product-life-cycle stepper. Decline renders as a kill (red). Always labelled Assessment. */
export default function PlcFit({ plc }: { plc: Plc | null }) {
  if (!plc) return <p className="text-[13px] text-zinc-400">PLC not assessed (below the bar).</p>;
  const at = STAGES.indexOf(plc.stage);
  const decline = plc.stage === "decline";
  return (
    <div className="space-y-4">
      <ol className="grid grid-cols-4 gap-1.5" aria-label={`Stage: ${LABEL[plc.stage]}`}>
        {STAGES.map((s, i) => (
          <li key={s} className="min-w-0">
            <div className={`h-2 rounded-full ${i === at ? (decline ? "bg-[#f87171]" : "bg-accent-light") : i < at ? "bg-accent-deep" : "bg-white/[0.08]"}`} />
            <div className={`mt-1.5 truncate text-[11px] font-semibold sm:text-[12px] ${i === at ? (decline ? "text-[#fca5a5]" : "text-zinc-50") : "text-zinc-400"}`}>{LABEL[s]}</div>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[12px] text-zinc-400">Verdict</span>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${V[plc.verdict]}`}>{plc.verdict}</span>
        {plc.trendTo && <span className="text-[12px] font-semibold text-zinc-300">→ <span className={`rounded-full px-2.5 py-0.5 text-[11px] ${V[plc.trendTo]}`}>{plc.trendTo}</span></span>}
        {decline && <span className="rounded-full bg-[#fecaca] px-2.5 py-0.5 text-[11px] font-semibold text-[#7f1d1d]">Decline = kill</span>}
      </div>
      <p className="text-[13px] leading-relaxed text-zinc-300">{plc.verdictText}</p>
      <ul className="list-disc space-y-1.5 pl-5 text-[12px] leading-relaxed text-zinc-400 marker:text-zinc-500">
        {plc.evidence.map((e) => <li key={e} className="break-words">{e}</li>)}
      </ul>
    </div>
  );
}
