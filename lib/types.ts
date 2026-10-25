// Mock-data shapes for the nightly startup-research pipeline. Fields copied verbatim from
// pains.json / us/*.jsonl keep their snake_case names so a later loader can map 1:1.
export type Competition = {
  /** Strong US competitors; null = not checked. */
  count: number | null;
  wedge: string | null;
  /** +1 sweet-spot bonus applied (1–3 strong competitors and a named wedge), as recorded in the data. */
  demand_signal: boolean;
  /** Why it was vetoed: new rule (4+ competitors / funded leader) or an older overlap veto. */
  veto: null | "count" | "funded_leader" | "old-rule";
  checked: boolean;
};

export type Stream = "problem" | "proven-model";
export type Provenance = "complaints" | "complaints+proven-model" | "proven-model";
export type Rating = 1 | 2 | 3 | 4 | 5;
export type Market = "US" | "DE";

/** us/complaints.jsonl line (verbatim fields). */
export type Complaint = {
  id: string; found_date: string; post_date: string;
  source: string;
  link: string; // required: no link, no quote
  quote: string; // verbatim
  engagement: string;
  niche: string; stream: string; market: string;
};

/** us/proven-models.jsonl line (verbatim fields). */
export type ProvenModel = {
  id: string; found_date: string; app: string; country: string;
  model_and_price: string; traction_evidence: string; us_status: string;
  entry_point: string; why_not_done_yet: string; lifecycle_evidence: string;
  stream: string; market: string;
};

export type ScoreKey = "frequency" | "intensity" | "willingness_to_pay" | "reachability" | "buildability";
export type Scores = Record<ScoreKey, number> & { total: number; base_total?: number; competition_bonus?: number };
export type ScoreNotes = Partial<Record<ScoreKey | "method", string>>;

/** Gate text fields present in pains.json. The 4 gates themselves are defined in lib/gates.ts. */
export type GateKey = "consumer_subscription" | "us_entry";
/** text = raw pains.json string; result is parsed from it ("not-assessed" covers "n/a" / "not assessed"). */
export type GateResult = { result: "pass" | "weak-pass" | "borderline" | "fail" | "not-assessed"; text: string };

export type QuoteRef = { quote: string; who: string; link: string };
export type Competitor = { name: string; url: string | null; price: string; price_source: string | null; loves: QuoteRef[]; hates: QuoteRef[]; loves_hates_note?: string; user_reviews?: string; funding: string };

export type PlcStage = "introduction" | "growth" | "maturity" | "decline";
export type PlcVerdict = "yes" | "maybe" | "no";
export type Plc = { stage: PlcStage; stageText?: string; evidence: string[]; verdict: PlcVerdict; trendTo?: PlcVerdict; verdictText: string; assessment: true };

/** Display verdict, derived by lib/verdict.ts:pipelineVerdict(), never read from pains.json `status`. */
export type PipelineVerdict = "winner" | "near-miss" | "killed" | "below-bar";

export type WeekOverWeek = { this_week_iso: string; this_week: number; last_week_iso: string; last_week: number; partial_week_W43?: number; two_weeks_ago_W41?: number; new_complaints_this_run?: number; note: string };

export type Idea = {
  painId: string;
  night: string;
  analyst_run: string;
  market: "US";
  niche: string;
  // From the brief (markdown), so nullable:
  name: string | null;
  /** Short display label when the brief gave no name (e.g. "Lift-logger paywalls"). */
  label: string | null;
  pitch: string | null;
  price: { text: string; estimate: true } | null;
  mvp: string | null;
  killQuestion: string | null;
  // From pains.json:
  description: string;
  who: string;
  source: Provenance | string;
  evidenceSummary: string;
  complaint_ids: string[];
  quotes: Complaint[];
  proven_models: ProvenModel[];
  distinct_people: number;
  distinct_people_note: string;
  weekly_counts: Record<string, number>;
  week_over_week: WeekOverWeek;
  recurring: boolean;
  recurring_note?: string | null;
  scores: Scores;
  score_notes: ScoreNotes;
  gates: Record<GateKey, GateResult>;
  gate_failed?: string | null;
  /** Build principle note (not a gate), from pains.json gates.simplest_way. */
  simplest_way: string | null;
  competitor_veto: boolean; // normalised: true if killed by the competitor check
  /** Competition as a demand signal (settings v2). Only from data that has it (24/25 Oct run onward); never derived. */
  competition: Competition;
  /** Built as the night's 'Fallback (below bar)' demo (pains.json or brief says so). */
  fallback: boolean;
  kill_reason: string | null;
  borderline_note: string | null;
  competitors: Competitor[];
  gap: string | null;
  plc: Plc | null;
  verdict: PipelineVerdict; // precomputed in mocks, recomputed by pipelineVerdict()
  validation?: Validation; // winners (and the simulated demo) only
  demo?: { simulatedWinner: true; banner: string };
  /** Scout nights this pain was seen on (pains.json runs_seen). */
  nights?: string[];
  /** Brief nights that pitched this pain (lib/mock/imported.ts BRIEFS), oldest first. */
  pitchedOn?: string[];
  /** Earlier names from older briefs: the pain id is reused and updated when a later night pitches it again. */
  aka?: { name: string; night: string }[];
};

/** Old Germany-market pains p-001…p-071: board rows only, no detail page. */
export type LegacyPain = {
  painId: string; night: string; market: "DE"; description: string; who: string; source: string;
  scores: Scores; verdict: PipelineVerdict; kill_reason: string | null; borderline_note: string | null; name: string | null; pitched: boolean;
};

export type TrafficSource = "meta" | "google_search" | "reddit";
export type SourceSignals = { source: TrafficSource; spendEur: number; visitors: number; priceClicks: number; checkoutStarts: number; waitlistSignups: number };
/** Hidden per-source rates the simulator ticks with. */
export type SimProfile = Record<TrafficSource, { eurPerVisitor: number; priceClickRate: number; checkoutRate: number; waitlistRate: number }>;
export type Validation = {
  landing: { slug: string; headline: string; subhead: string; bullets: string[]; priceUsdMonthly: number; primaryCta: string; secondaryCta: "Join waitlist" };
  adKit: {
    budgetEur: { min: 30; max: 50 };
    sources: TrafficSource[];
    searchIntent: boolean;
    meta: { primaryText: string[]; headlines: string[]; description: string; audience: { country: "US"; age: string; interests: string[] } };
    googleKeywords?: string[];
    redditSubs?: string[];
    utm: Record<TrafficSource, string>;
  };
  sim: SimProfile;
  results?: { startedAt: string; endedAt?: string; bySource: SourceSignals[]; simulated: true };
};

export const RULES = { passBar: 18, nearMissMin: 15, maxScore: 25, minVisitors: 100, strongPriceClickRate: 0.03, killPriceClickRate: 0.01 } as const;

export type StepStatus = "done" | "skipped" | "failed";
export type StepKey = "scout" | "analyst" | "builder" | "brief";
export type SourceKey = "google_play" | "app_store" | "reddit" | "x" | "hn" | "trustpilot" | "forums";
export type NightRun = {
  date: string; label?: string; market: "US"; niches: string[];
  steps: Record<StepKey, StepStatus>; // times of that night (until 24 Oct: 00:30 / 03:00 / 04:30 / 07:30)
  /** Step times of that night when they differ from STEP_TIMES (25 Oct on: 00:30 / 01:30 / 02:30 / 05:05). */
  times?: Record<StepKey, string>;
  scout: { complaints: number; provenModels: number; bySource: Record<SourceKey, number>; blocked: { source: string; reason: string }[] };
  analyst: { newPainIds: string[]; updatedPainIds?: string[]; survivors: number };
  builder: { winnerPainId: string | null; poc: string | null };
  briefPath: string; note?: string;
};

/** pitched.json entry (verbatim) + current status for display. */
export type Pitched = { date: string; name: string; pain_id: string; core_feature: string; user: string; winner: boolean; poc: string; laterStatus?: string };

/** Per-night brief, parsed by scripts/gen-data.py (25 Oct 2026 on). */
export type ShotStatus = "real" | "mock" | "fake" | "note" | "none";
export type DemoShot = { n: string; slug: string; caption: string; src390: string; src1280: string; pieces: { piece: string; status: ShotStatus }[] };
export type NightBrief = {
  date: string; briefPath: string;
  winnerPainId: string | null; winnerRole: "winner" | "fallback" | null;
  /** Pitched ideas, top first (the brief's Idea 1, 2, 3). */
  ideas: { painId: string; name: string; role: "winner" | "fallback" | "pitched" }[];
  /** The winner's private POC as screenshots (images synced into out/demo/<date>/ at deploy). Null = no POC this night. */
  demo: null | { title: string; label: string; private: boolean; pocPath: string; intro: string | null; rows: { piece: string; status: ShotStatus; text: string }[]; shots: DemoShot[] };
  /** The validation page is only proposed in the brief, never built or published. */
  validation: null | { status: "proposal"; heading: string; markdown: string; test: string | null; budgetEur: { min: number; max: number } | null; minVisitors: number | null; killPct: number | null; strongPct: number | null };
};
