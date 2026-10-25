// Change history of the pipeline architecture. Each entry points at the node/edge ids in
// lib/architecture.ts that it touched, so the /architecture page can highlight them.

export type ChangeType = "added" | "changed" | "removed" | "paused" | "proposed";
/** building = shipped in code, waiting on its first real output (e.g. the first run video). */
export type ChangeStatus = "live" | "proposed" | "awaiting-ok" | "building";

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
  {
    id: "settings-v2",
    date: "2026-10-24",
    version: "Settings v2",
    title: "Always one demo per night + competition as demand signal (settings v2)",
    description:
      "Two rule changes, saved as settings version 2. The builder now always builds one demo per night: if nothing clears the bar it takes the best unique idea with real evidence and labels it “Fallback (below bar)”. And competition became a demand signal: 1–3 strong US competitors proves demand and adds +1 when the idea names a wedge; the veto applies only at 4+ competitors or when a funded leader already solves it well. Older vetoes are shown as “Vetoed (old rule)”.",
    affected: ["analyst", "builder"],
    typeById: { analyst: "changed", builder: "changed" },
    type: "changed",
    status: "live",
    before: ["Any strong overlap with an existing app → veto", "No demo on a night without a winner"],
    after: ["1–3 strong US competitors = demand signal (+1 with a wedge)", "Veto only at 4+ or a funded leader solving it well", "Always one demo per night: “Fallback (below bar)”"],
  },
  {
    id: "run-video",
    date: "2026-10-24",
    version: "Run video",
    title: "Run video per night",
    description:
      "Each scout night can get a short narrated video (2–4 minutes) made by App ideas. The player appears on that night's scout run and on its winning idea page, including a fallback winner. Videos are published with the site to gh-pages only, never committed to main; a night without a video shows nothing. First video deployed for the 2026-10-25 night.",
    affected: ["report"],
    type: "added",
    status: "live",
    before: ["Night results only as text: the brief and the Ideas board"],
    after: ["Narrated MP4 per night, listed in videos/manifest.json", "'Watch run video' on the night and its winner page"],
  },
  {
    id: "run-video-setting",
    date: "2026-10-24",
    version: "Settings v3",
    title: "Run video ON/OFF setting + nightly run-video step (07:00)",
    description:
      "Settings version 3 adds report.run_video: a switch for the nightly narrated run video (on by default), with voiceover, subtitles and a ready-by time (07:30). A new run-video step runs around 07:00, after the demo build and before the morning brief; when the switch is off the step skips. It writes the MP4 and pings dev to deploy it.",
    affected: ["report", "run-video", "builder-runvideo", "runvideo-brief"],
    typeById: { report: "changed", "run-video": "added", "builder-runvideo": "added", "runvideo-brief": "added" },
    type: "added",
    status: "live",
    before: ["No video step in the night", "No setting to turn run videos off"],
    after: ["Run video step ~07:00 (reads settings.report.run_video)", "Settings → Report / Run video: on/off, voiceover, subtitles, ready by 07:30"],
  },
  {
    id: "chain-0600",
    date: "2026-10-25",
    version: "Settings v4",
    title: "Chain moved earlier; run video is now the last step of the final report; all ready by 06:00",
    description:
      "The whole night runs earlier: US scout ~00:30, analyst ~01:30, builder ~02:30 with the POC due by 05:00 (was 07:20), and the final report at ~05:05. The run video is no longer a separate step: it is the last step of the final report, written as .mp4.tmp, checked with ffprobe and renamed to .mp4, then dev is pinged to deploy. Everything is ready by 06:00 (was 07:30). Settings version 4 holds the new ready-by times.",
    affected: ["analyst", "builder", "brief", "run-video"],
    typeById: { analyst: "changed", builder: "changed", brief: "changed", "run-video": "removed" },
    type: "changed",
    status: "live",
    before: ["Analyst 03:00, builder 04:30, POC ready by 07:20", "Separate run-video step ~07:00", "Morning brief 07:30"],
    after: ["Analyst ~01:30, builder ~02:30, POC due by 05:00", "Final report + run video ~05:05 (video last: .mp4.tmp → ffprobe → .mp4 → ping dev)", "Everything ready by 06:00"],
  },
  {
    id: "nightly-import",
    date: "2026-10-25",
    version: "App",
    title: "Nightly import + Watch video / Open demo / Validation page buttons",
    description:
      "After the final report, dev runs one command (scripts/nightly-publish.sh) that imports the night from startup-research (pains, brief, POC note), commits only the data files to main, syncs the run video and the POC screenshots into the site and deploys. The night's big card and the winner's page now carry three buttons: ▶ Watch run video, Open demo (the private POC as a screenshot walkthrough; the app itself is never launched publicly) and Validation page (shown as 'Proposal, not built' until the validation loop is approved). First night: 25 Oct, Cardbox.",
    affected: ["brief", "builder-brief", "landing"],
    typeById: { brief: "changed", "builder-brief": "changed", landing: "changed" },
    type: "added",
    status: "live",
    before: ["Nights copied into the app by hand (last: 24 Oct)", "Run video only as a player under the night", "No way to see the POC or the proposed validation page in the app"],
    after: ["scripts/nightly-publish.sh <date>: import → commit data → sync video + screenshots → deploy → live checks", "▶ Watch run video · Open demo · Validation page on the night's big card and under the winner's title", "Demo = captioned 390/1280 screenshots; validation = 'Proposal, not built'"],
  },
];

export const LATEST = CHANGELOG[CHANGELOG.length - 1];

/** Highlight kind per affected id for one entry. */
export function highlightsFor(e: ChangeEntry): Record<string, ChangeType> {
  return Object.fromEntries(e.affected.map((id) => [id, e.typeById?.[id] ?? e.type]));
}
