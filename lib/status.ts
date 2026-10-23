import type { Stage } from "@/components/ui";
import type { ValidationState } from "./valstate";
import { totals, validationVerdict } from "./verdict";

export const stageOf = (v: ValidationState): Stage => (v.status === "running" ? "running" : v.status === "finished" ? "report" : "ready");

/** Spend, visitors, waitlist signups and the fake-door call for any test state. */
export function testNumbers(v: ValidationState) {
  if (v.status === "idle") return { spend: 0, visitors: 0, priceClicks: 0, signups: 0, call: null };
  const t = totals(v.bySource);
  return { spend: t.spendEur, visitors: t.visitors, priceClicks: t.priceClicks, signups: t.waitlistSignups, call: validationVerdict(t).call };
}
