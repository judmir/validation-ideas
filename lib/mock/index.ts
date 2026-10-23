import type { Idea } from "../types";
import { pipelineVerdict } from "../verdict";
import { IDEAS } from "./ideas";

export { NIGHTS, STEP_ORDER, STEP_TIMES } from "./nights";

/** All mock ideas with the display verdict recomputed, highest score first within each run. */
export const ALL_IDEAS: Idea[] = IDEAS.map((i) => ({ ...i, verdict: pipelineVerdict(i) }));
export const findIdea = (id: string) => ALL_IDEAS.find((x) => x.id === id);
export const ideasOfNight = (date: string) => ALL_IDEAS.filter((x) => x.night === date).sort((a, b) => b.scores.total - a.scores.total);
/** Only a run's top pick gets a landing page and validation test. */
export const TOP_PICKS = ALL_IDEAS.filter((i) => i.validation);
