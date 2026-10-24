// The one gate definition. Idea pages, near-miss "Fails gate" tags, lib/verdict.ts and the
// Architecture analyst panel all read from here. (/workspace/vi-gen/gen.py mirrors GATE_IDS.)
//
// The competitor veto is NOT a gate (see vetoOf) and "simplest way" is a build principle, not a gate.
import type { GateResult, Idea } from "./types";

export type GateId = "consumer_subscription" | "buildable_2wk" | "us_entry" | "plc_fit";
export type GateDef = { id: GateId; label: string; short: string; description: string };

export const GATES: readonly GateDef[] = [
  { id: "consumer_subscription", label: "Consumer subscription", short: "Subscription", description: "Consumers, not businesses, will pay for it as a recurring subscription." },
  { id: "buildable_2wk", label: "Buildable in 2 weeks", short: "Buildable", description: "One person can build the MVP in 2 weeks." },
  { id: "us_entry", label: "US entry", short: "US entry", description: "US users can be reached and charged in USD (Paddle / Polar / Lemon Squeezy)." },
  { id: "plc_fit", label: "Product life cycle fit", short: "PLC fit", description: "The market's life-cycle stage supports a new subscription; a declining market is a kill." },
] as const;
export const GATE_IDS = GATES.map((g) => g.id);
export const gateDef = (id: GateId) => GATES.find((g) => g.id === id)!;

/** "not-checked" = the data has no value for this gate. Never shown as a pass. */
export type GateStatus = "pass" | "weak-pass" | "borderline" | "fail" | "not-checked";
export type GateCheck = { id: GateId; status: GateStatus; text: string; source: string };

export const GATE_STATUS_LABEL: Record<GateStatus, string> = { pass: "Pass", "weak-pass": "Weak pass", borderline: "Borderline", fail: "Fail", "not-checked": "Not checked" };

/** Parse a free-text gate string ("pass…", "weak pass…", "borderline…"/"maybe…", "fail…"; anything else → not checked). */
export function parseGate(text: string | null | undefined): GateResult {
  const s = (text ?? "").trim().toLowerCase();
  const result: GateResult["result"] = s.startsWith("fail") ? "fail" : s.startsWith("weak pass") ? "weak-pass" : s.startsWith("borderline") || s.startsWith("maybe") ? "borderline" : s.startsWith("pass") ? "pass" : "not-assessed";
  return { result, text: text || "not assessed" };
}

/** gate_failed in pains.json is free text like "buildability / consumer_subscription" or "us_entry/buildability". */
export function gateFailedIds(gateFailed: string | null | undefined): Set<GateId> {
  const ids = new Set<GateId>();
  for (const t of (gateFailed ?? "").split(/[/,]/).map((x) => x.trim()).filter(Boolean)) {
    const id = t === "buildability" ? "buildable_2wk" : t;
    if ((GATE_IDS as string[]).includes(id)) ids.add(id as GateId);
  }
  return ids;
}

type GateInput = Pick<Idea, "gates" | "gate_failed" | "plc" | "score_notes">;
const fromText = (r: GateResult["result"]): GateStatus => (r === "not-assessed" ? "not-checked" : r);

/**
 * Map the data onto the 4 gates:
 * - consumer_subscription, us_entry ← pains.json `gates.<id>` text (fail also if listed in `gate_failed`);
 * - buildable_2wk ← `gate_failed` contains "buildability" → fail; otherwise not checked (the score note is shown as context);
 * - plc_fit ← `plc`: stage decline → fail (kill); verdict yes → pass, maybe → borderline, no → fail; no PLC → not checked.
 */
export function checkGates(idea: GateInput): GateCheck[] {
  const failed = gateFailedIds(idea.gate_failed);
  return GATES.map(({ id }): GateCheck => {
    if (id === "consumer_subscription" || id === "us_entry") {
      const g = idea.gates[id];
      const status = failed.has(id) ? "fail" : fromText(g.result);
      return { id, status, text: status === "not-checked" ? `Not checked${g.text && !/^(n\/a|not assessed)$/i.test(g.text) ? ` (${g.text})` : ""}.` : g.text, source: `gates.${id}` };
    }
    if (id === "buildable_2wk") {
      const note = idea.score_notes.buildability;
      if (failed.has(id)) return { id, status: "fail", text: note ?? `gate_failed: ${idea.gate_failed}`, source: "gate_failed" };
      return { id, status: "not-checked", text: note ? `No gate result recorded. Buildability score note: ${note}` : "No gate result recorded.", source: "—" };
    }
    const plc = idea.plc;
    if (!plc) return { id, status: "not-checked", text: "No product life cycle assessment for this entry.", source: "—" };
    if (plc.stage === "decline") return { id, status: "fail", text: `Declining market: a kill. ${plc.verdictText}`, source: "plc.stage" };
    const status: GateStatus = plc.verdict === "yes" ? "pass" : plc.verdict === "maybe" ? "borderline" : "fail";
    return { id, status, text: `${plc.stage[0].toUpperCase()}${plc.stage.slice(1)} stage. ${plc.verdictText}`, source: "plc.verdict" };
  });
}

/** Gates that fail, in GATES order (from the data, never hardcoded per pain). */
export const failedGates = (idea: GateInput) => checkGates(idea).filter((g) => g.status === "fail");
export const notCheckedGates = (idea: GateInput) => checkGates(idea).filter((g) => g.status === "not-checked");

/** The competitor veto: a separate check, not a gate. */
export function vetoOf(idea: Pick<Idea, "competitor_veto" | "kill_reason">) {
  return { vetoed: idea.competitor_veto, label: idea.competitor_veto ? "vetoed" : "none", reason: idea.competitor_veto ? idea.kill_reason : null };
}

/** Build principle (not a gate): the simplest way to get the job done, from the data's simplest_way note. */
export function simplestWay(idea: Pick<Idea, "simplest_way">): string | null {
  const t = (idea.simplest_way ?? "").replace(/^(weak pass|borderline|maybe|pass)\b\s*/i, "").replace(/^[(:]\s*/, "").replace(/\)$/, "").trim();
  return t ? t[0].toUpperCase() + t.slice(1) : null;
}

/** One-line gate summary for the Architecture analyst panel. */
export const GATES_LINE = `Gates: ${GATES.map((g) => g.label).join(" · ")}. A declining market is a kill.`;
