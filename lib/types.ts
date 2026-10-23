// Mock-data shapes. The ideas and runs are the original fictional mock set (InvoiceChaser, StandupBot Lite, …);
// fields the original mock didn't have are filled with clearly fictional mock values or left null ("Not written").
export type Provenance = "complaints" | "complaints+proven-model" | "proven-model";

/** Original sub-scores, 0–100 each; total is the original overall score /100. */
export type ScoreKey = "demand" | "competition" | "buildEffort" | "monetization";
export type Scores = Record<ScoreKey, number> & { total: number };

/** A scout signal from the original mock (label + where it was seen). Mock links were dropped: no fake URLs. */
export type Signal = { label: string; source: string };

export type GateKey = "subscription" | "simplest_way" | "market_entry";
export type GateResult = { result: "pass" | "weak-pass" | "borderline" | "fail" | "not-assessed"; text: string };

export type QuoteRef = { quote: string; who: string; link?: string | null };
export type Competitor = { name: string; url?: string | null; price: string; price_source?: string | null; loves: QuoteRef[]; hates: QuoteRef[]; loves_hates_note?: string; funding: string };

export type PlcStage = "introduction" | "growth" | "maturity" | "decline";
export type PlcVerdict = "yes" | "maybe" | "no";
export type Plc = { stage: PlcStage; evidence: string[]; verdict: PlcVerdict; trendTo?: PlcVerdict; verdictText: string; assessment: true };

/** Display verdict, derived by lib/verdict.ts:pipelineVerdict() from score + gates + veto (+ a finished validation). */
export type PipelineVerdict = "winner" | "near-miss" | "killed" | "below-bar";

export type WeekOverWeek = { this_week_iso: string; this_week: number; last_week_iso: string; last_week: number; note: string };

export type Idea = {
  id: string; // original slug, e.g. "invoice-chaser"
  night: string; // run date
  rank: number; // 1 = the run's top pick (gets the demo + validation page)
  market: string;
  niche: string;
  name: string;
  pitch: string;
  who: string | null;
  source: Provenance;
  evidenceSummary: string;
  signals: Signal[];
  rationale: string;
  scores: Scores;
  gates: Record<GateKey, GateResult>;
  competitor_veto: boolean;
  kill_reason: string | null;
  borderline_note: string | null;
  competitors: Competitor[];
  gap: string | null;
  price: { text: string; estimate: true } | null;
  mvp: string | null;
  killQuestion: string | null;
  plc: Plc | null;
  weekly_counts: Record<string, number> | null;
  week_over_week: WeekOverWeek | null;
  recurring: boolean;
  verdict: PipelineVerdict; // recomputed by pipelineVerdict()
  validation?: Validation; // top picks only
};

export type TrafficSource = "meta" | "google_search" | "reddit";
export type SourceSignals = { source: TrafficSource; spendEur: number; visitors: number; priceClicks: number; checkoutStarts: number; waitlistSignups: number };
/** Hidden per-source rates the simulator ticks with (derived from the original cpm / ctr / signupRate). */
export type SimProfile = Record<TrafficSource, { eurPerVisitor: number; priceClickRate: number; checkoutRate: number; waitlistRate: number }>;
export type Validation = {
  landing: { slug: string; headline: string; subhead: string; bullets: string[]; price: string; primaryCta: string; secondaryCta: "Join waitlist" };
  adKit: {
    budget: { dailyEur: number; days: number };
    sources: TrafficSource[];
    searchIntent: boolean;
    meta: { primaryText: string[]; headlines: string[]; cta: string; description: string; audience: { location: string; age: string; interests: string[] } };
    googleKeywords?: string[];
    redditSubs?: string[];
    utm: Record<TrafficSource, string>;
  };
  sim: SimProfile;
  results?: { startedAt: string; endedAt: string; bySource: SourceSignals[]; simulated: true };
};

export const RULES = { passBar: 75, nearMissMin: 60, maxScore: 100, minVisitors: 100, strongPriceClickRate: 0.03, killPriceClickRate: 0.01 } as const;

export type StepStatus = "done" | "skipped" | "failed";
export type StepKey = "scout" | "analyst" | "builder" | "brief";
export type NightRun = {
  date: string;
  label: string;
  niches: string[];
  summary: string;
  notes: string[];
  steps: Record<StepKey, StepStatus>; // fixed times 00:30 / 03:00 / 04:30 / 07:30
  scout: { scanned: number; candidates: number; deepScored: number; bySource: { label: string; n: number }[]; blocked: { source: string; reason: string }[] };
  builder: { winnerId: string | null };
};
