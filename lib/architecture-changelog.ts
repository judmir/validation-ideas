// Change history of the pipeline architecture. Each entry points at the node/edge ids in
// lib/architecture.ts that it touched, so the /architecture page can highlight them.

export type ChangeType = "added" | "changed" | "removed" | "paused" | "proposed";
export type ChangeStatus = "live" | "proposed" | "awaiting-ok";

export interface ChangeEntry {
  id: string;
  /** ISO date. */
  date: string;
  /** Version label ("v1") or a short tag for side changes made between versions. */
  version: string;
  title: string;
  /** Plain-English description. */
  description: string;
  /** Node and edge ids from lib/architecture.ts. */
  affected: string[];
  type: ChangeType;
  /** Per-id type where one entry does several kinds of change (e.g. a pause inside a "changed" entry). */
  typeById?: Record<string, ChangeType>;
  status: ChangeStatus;
  commit?: string;
  /** For the "diff from previous version" view. */
  before?: string[];
  after?: string[];
}

/** Oldest first. */
export const CHANGELOG: ChangeEntry[] = [
  {
    id: "v1",
    date: "2026-10-20",
    version: "v1",
    title: "Two scout streams, complaints first",
    description:
      "The scout runs two streams: real user complaints first (the main signal), then proven subscription models people already pay for. Every idea must carry its provenance, a source link and quote, or it doesn't count.",
    affected: ["us-scout", "us-analyst", "analyst"],
    type: "added",
    status: "live",
    after: ["Stream 1: user complaints (primary)", "Stream 2: proven subscription models", "Provenance required on every idea"],
  },
  {
    id: "v2",
    date: "2026-10-22",
    version: "v2",
    title: "US only; German scout paused",
    description:
      "The pipeline focuses on one market. The German scout is paused, the US scout moves to 00:30, and the analyst scores only US entries: 18 out of 25 to win, and overlap with an existing app vetoes the idea. The separate two-market blocks are gone.",
    affected: ["us-scout", "de-scout", "de-analyst", "analyst"],
    type: "changed",
    typeById: { "de-scout": "paused", "de-analyst": "paused" },
    status: "live",
    before: ["Two markets: US and Germany", "German scout running nightly", "Results split into two-market blocks"],
    after: ["US only; German scout paused", "US scout at 00:30", "US entries scored: bar 18/25, overlap veto", "Two-market blocks removed"],
  },
  {
    id: "validation-page",
    date: "2026-10-22",
    version: "Validation page",
    title: "Two-button validation page",
    description:
      "Proposal: after the builder, each winner gets a landing page with two calls to action: a priced “Start for $X/month” fake-door checkout and a “Join waitlist” link. It tracks three signals: price clicks, checkout starts and waitlist sign-ups.",
    affected: ["landing", "builder-landing"],
    type: "proposed",
    status: "proposed",
    before: ["The builder's POC ends at the morning brief"],
    after: ["Builder → validation page", "Two CTAs: priced fake door + waitlist", "Signals: price clicks, checkout starts, waitlist sign-ups"],
  },
  {
    id: "meta-ads",
    date: "2026-10-22",
    version: "Meta ads",
    title: "Meta ads budget and thresholds",
    description:
      "Proposal: send paid traffic from Meta ads to the validation page, €30–50 per idea, with no automated organic posting. Read the result after at least 100 visitors: over 3% price clicks is strong, under 1% is a kill. The report feeds back into the morning brief.",
    affected: ["meta", "report", "landing-meta", "meta-report", "report-brief"],
    type: "proposed",
    status: "proposed",
    before: ["No traffic source for validation"],
    after: ["€30–50 per idea, no organic posting", "≥100 visitors; >3% price clicks strong, <1% kill", "Report → morning brief"],
  },
  {
    id: "hosting",
    date: "2026-10-22",
    version: "Hosting",
    title: "Demo hosting via cloudflared on the Mac",
    description:
      "POC demos are served through a cloudflared tunnel on Judi's Mac, because the box blocks port 7844, which cloudflared needs. The validation page will use the same route until there's a Cloudflare token and domain for Wrangler.",
    affected: ["builder", "landing"],
    type: "changed",
    status: "live",
    before: ["Tunnel run from the box (blocked: port 7844)"],
    after: ["Demos via cloudflared tunnel on the Mac", "Later: Cloudflare/Wrangler once token + domain exist"],
  },
  {
    id: "v3",
    date: "2026-10-24",
    version: "v3",
    title: "Near-miss and Below bar labels",
    description:
      "Clearer labels. Anything scoring 15–17, or killed only by the overlap veto or a failed gate, is a Near-miss; under 15 is Below bar. Near-misses carry a tag taken straight from the data: “Vetoed” or “Fails gate: <gate>”. A declining market is still a kill.",
    affected: ["analyst", "brief"],
    type: "changed",
    status: "live",
    commit: "9fdea42",
    before: ["Vetoed or gate-failed entries scoring 15+ were shown as killed"],
    after: ["15–17, or killed only by veto/gate → Near-miss", "Tags from data: Vetoed / Fails gate: <gate>", "Under 15 → Below bar; declining market still a kill"],
  },
  {
    id: "settings",
    date: "2026-10-24",
    version: "v4",
    title: "Settings page: pipeline rules editable",
    description:
      "The pipeline's rules (scouting, scoring, winner pick incl. the 'always build one demo' fallback, POC build, proposed validation, schedule) now live as versioned settings in Supabase. The Settings page shows the latest version to everyone; an admin signs in with an email link and saves a new version after reviewing a diff. Nothing is overwritten.",
    affected: ["builder"],
    type: "changed",
    status: "live",
    commit: "a40ef00",
    before: ["Rules hard-coded in the routine prompts"],
    after: ["Rules in Supabase pipeline_settings_versions (append-only)", "Edited on /settings by an admin, with a diff and history"],
  },
];

export const LATEST = CHANGELOG[CHANGELOG.length - 1];

/** Highlight kind per affected id for one entry. */
export function highlightsFor(e: ChangeEntry): Record<string, ChangeType> {
  return Object.fromEntries(e.affected.map((id) => [id, e.typeById?.[id] ?? e.type]));
}
