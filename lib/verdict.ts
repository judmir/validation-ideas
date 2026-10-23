import { RULES, type GateResult, type Idea, type PipelineVerdict, type SourceSignals } from "./types";

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

/**
 * Display verdict from score /100 + gates + competitor veto (+ a finished test):
 * veto, PLC decline or a "Kill" test result → killed; ≥ 75 with a failed gate → killed; ≥ 75 → winner; 60–74 → near-miss; else below bar.
 */
export function pipelineVerdict(idea: Pick<Idea, "scores" | "gates" | "competitor_veto" | "plc" | "validation">): PipelineVerdict {
  const t = idea.scores.total;
  if (idea.competitor_veto || idea.plc?.stage === "decline") return "killed";
  const r = idea.validation?.results;
  if (r && validationVerdict(totals(r.bySource)).call === "kill") return "killed";
  if (t >= RULES.passBar) return Object.values(idea.gates).some((g: GateResult) => g.result === "fail") ? "killed" : "winner";
  return t >= RULES.nearMissMin ? "near-miss" : "below-bar";
}

export function recommendation(name: string, call: ValidationCall, visitors: number) {
  switch (call) {
    case "not-enough-traffic":
      return `Only ${visitors} visitors so far. Keep the ads running until at least ${RULES.minVisitors} people have seen the ${name} page before reading the price-click rate.`;
    case "strong":
      return `People click the price. Email the waitlist, book 5 discovery calls and start the MVP build for ${name}.`;
    case "kill":
      return `Fewer than 1 in 100 visitors clicked the price. Stop spending on ${name} and archive it.`;
    default:
      return `The price-click rate sits between 1% and 3%. Try one sharper headline or a lower price for ${name} on a small budget, then decide.`;
  }
}
