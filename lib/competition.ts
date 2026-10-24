// Competition as a demand signal (settings v2). Reads only what the data records; nothing is derived or invented.
import type { Idea } from "./types";

export const COMPETITION_HELP =
  "1–3 strong US competitors proves demand and adds +1 when the idea names a wedge. The veto applies only at 4+ competitors or when a funded leader already solves it well.";
export const OLD_VETO_TITLE =
  "Vetoed under the old rule (any strong overlap with an existing app), before settings v2. Not re-checked against the new rule (veto only at 4+ strong US competitors or a funded leader solving it well).";
export const FALLBACK_LABEL = "Fallback (below bar)";

type V = Pick<Idea, "competitor_veto" | "competition">;
/** "Vetoed" only when the data says 4+ competitors or a funded leader; older vetoes say so. */
export function vetoTag(i: V): { text: string; title: string } | null {
  if (!i.competitor_veto) return null;
  const v = i.competition?.veto ?? "old-rule";
  if (v === "count") return { text: "Vetoed", title: "Vetoed: 4+ strong US competitors" };
  if (v === "funded_leader") return { text: "Vetoed", title: "Vetoed: a funded leader already solves it well" };
  return { text: "Vetoed (old rule)", title: OLD_VETO_TITLE };
}
