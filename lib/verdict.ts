import { RULES, type GateResult, type Idea, type LegacyPain, type PipelineVerdict, type SourceSignals } from "./types";

/** Parse a free-text gate string ("pass…", "weak pass…", "borderline pass…", "fail…", "n/a"). */
export function parseGate(text: string | null | undefined): GateResult {
  const s = (text ?? "").trim().toLowerCase();
  const result: GateResult["result"] = s.startsWith("fail") ? "fail" : s.startsWith("weak pass") ? "weak-pass" : s.startsWith("borderline") || s.startsWith("maybe") ? "borderline" : s.startsWith("pass") ? "pass" : "not-assessed";
  return { result, text: text || "not assessed" };
}

/**
 * Display verdict, derived from score + gates + veto (pains.json `status` is not trusted):
 * PLC decline → killed; ≥18, gates passed, killed ONLY by the competitor veto → near-miss ("Vetoed", never a winner);
 * other veto → killed; ≥18 with a failed gate → killed; ≥18 → winner; 15–17 → near-miss; else below bar.
 */
export function pipelineVerdict(idea: Pick<Idea, "scores" | "gates" | "competitor_veto" | "plc">): PipelineVerdict {
  const t = idea.scores.total;
  if (idea.plc?.stage === "decline") return "killed";
  if (isVetoNearMiss(idea)) return "near-miss";
  if (idea.competitor_veto) return "killed";
  if (t >= RULES.passBar) return Object.values(idea.gates).some((g) => g.result === "fail") ? "killed" : "winner";
  return t >= RULES.nearMissMin ? "near-miss" : "below-bar";
}
/** ≥18/25 with no failed gate and no PLC decline, stopped only by the competitor veto: a near-miss, not a kill (and not passed). */
export function isVetoNearMiss(idea: Pick<Idea, "scores" | "gates" | "competitor_veto" | "plc">): boolean {
  return idea.competitor_veto && idea.scores.total >= RULES.passBar && idea.plc?.stage !== "decline" && !Object.values(idea.gates).some((g) => g.result === "fail");
}
export const VETOED_TITLE = "vetoed by competitors";
export const legacyVerdict = (p: LegacyPain): PipelineVerdict => p.verdict;

export const VERDICT_LABEL: Record<PipelineVerdict, string> = { winner: "Winner", "near-miss": "Near-miss", killed: "Killed", "below-bar": "Below bar" };
export function verdictLabel(v: PipelineVerdict, veto?: boolean) {
  return v === "killed" && veto ? "Killed by veto" : v === "near-miss" && veto ? "Near-miss · vetoed" : VERDICT_LABEL[v];
}

export type ValidationCall = "not-enough-traffic" | "strong" | "inconclusive" | "kill";
export const CALL_LABEL: Record<ValidationCall, string> = { "not-enough-traffic": "Not enough traffic", strong: "Strong", inconclusive: "Inconclusive", kill: "Kill" };

export function totals(rows: SourceSignals[]) {
  const sum = (k: keyof Omit<SourceSignals, "source">) => rows.reduce((a, r) => a + r[k], 0);
  return { spendEur: sum("spendEur"), visitors: sum("visitors"), priceClicks: sum("priceClicks"), checkoutStarts: sum("checkoutStarts"), waitlistSignups: sum("waitlistSignups") };
}

/** Fake-door verdict: <100 visitors → not enough traffic; price-click rate >3% strong; <1% kill; else inconclusive. */
export function validationVerdict(r: { visitors: number; priceClicks: number }) {
  const rate = r.visitors ? r.priceClicks / r.visitors : 0;
  const call: ValidationCall = r.visitors < RULES.minVisitors ? "not-enough-traffic" : rate > RULES.strongPriceClickRate ? "strong" : rate < RULES.killPriceClickRate ? "kill" : "inconclusive";
  return { rate, call };
}

export function recommendation(name: string, call: ValidationCall, visitors: number) {
  switch (call) {
    case "not-enough-traffic":
      return `Only ${visitors} visitors so far. Keep the ads running until at least ${RULES.minVisitors} people have seen the ${name} page before reading the price-click rate.`;
    case "strong":
      return `People click the price. Email the waitlist, talk to 5 of them, and start the 2-week MVP build for ${name}.`;
    case "kill":
      return `Fewer than 1 in 100 visitors clicked the price. Stop spending on ${name} and archive it.`;
    default:
      return `The price-click rate sits between 1% and 3%. Try one sharper headline or a lower price for ${name} within the same €30–50 budget, then decide.`;
  }
}
