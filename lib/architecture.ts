// Architecture of the nightly pipeline, as data. The /architecture page draws this by hand in SVG,
// so adding or moving a node is a data change, not a diagram change.

export type NodeStatus = "active" | "paused" | "proposed";

export interface Pos { x: number; y: number }

export interface ArchNode {
  id: string;
  title: string;
  /** Short time shown inside the node ("00:30", "Sun 09:00"). */
  time?: string;
  /** Full schedule line for the detail panel. */
  schedule: string;
  status: NodeStatus;
  /** Extra status note, e.g. "since 22 Oct". */
  statusNote?: string;
  /** First night (ISO date) this piece existed. Older versions draw it as "not yet". */
  since: string;
  summary: string;
  details: string[];
  outputs?: string[];
  /** Centre positions: desktop (landscape) and mobile (portrait) layouts. */
  desk: Pos;
  mob: Pos;
}

export type EdgeKind = "run" | "filing" | "paused" | "proposed";
export type Side = "top" | "right" | "bottom" | "left";
/** Which side of each node an edge leaves/enters, plus a shift along that side (SVG units). */
export interface Anchor { from: Side; to: Side; fromShift?: number; toShift?: number }

export interface ArchEdge {
  id: string;
  from: string;
  to: string;
  kind: EdgeKind;
  /** Optional anchors per layout; otherwise the side is picked from the direction. */
  desk?: Anchor;
  mob?: Anchor;
}

export const STATUS_LABEL: Record<NodeStatus, string> = { active: "Active", paused: "Paused", proposed: "Proposed" };

/** Layout canvases (SVG user units) and node size per layout. */
export const LAYOUT = {
  desk: { w: 1080, h: 412, nodeW: 156, nodeH: 62 },
  mob: { w: 340, h: 718, nodeW: 146, nodeH: 58 },
} as const;

export const NODES: ArchNode[] = [
  {
    id: "us-scout",
    title: "US scout",
    time: "00:30",
    schedule: "Nightly 00:30 Berlin",
    status: "active",
    since: "2026-10-19",
    summary: "Scouts the US market in two streams: user complaints first, then proven US subscription models.",
    details: [
      "Stream 1 (primary): real user complaints, each with provenance (source link + quote).",
      "Stream 2: proven US subscription models people already pay for.",
      "US-only since 22 Oct; moved to 00:30 so the analyst has fresh data at 03:00.",
    ],
    outputs: ["us/complaints.jsonl", "us/proven-models.jsonl"],
    desk: { x: 95, y: 95 },
    mob: { x: 82, y: 40 },
  },
  {
    id: "de-scout",
    title: "German scout",
    schedule: "Was nightly; paused since 22 Oct",
    status: "paused",
    statusNote: "since 22 Oct",
    since: "2026-10-19",
    summary: "Scouted the German market. Paused when the pipeline went US-only on 22 Oct.",
    details: ["Kept in the diagram, greyed out, so it can be switched back on.", "Its old pains still show under Nights → Old Germany pains."],
    desk: { x: 95, y: 235 },
    mob: { x: 258, y: 40 },
  },
  {
    id: "analyst",
    title: "Analyst",
    time: "03:00",
    schedule: "Nightly 03:00",
    status: "active",
    since: "2026-10-19",
    summary: "Clusters complaints into pains, scores the US entries out of 25 and labels each one.",
    details: [
      "Writes pains.json. Scores US entries out of 25; the bar is 18.",
      "Veto: overlap with an existing app kills the idea.",
      "Gates: buildable in 2 weeks · consumer subscription · product-life-cycle fit (a declining market is a kill).",
      "Winner: 18+ and passes every gate.",
      "Near-miss: 15–17, or killed only by the veto or a gate (tagged “Vetoed” or “Fails gate: …”).",
      "Below bar: under 15.",
    ],
    outputs: ["pains.json"],
    desk: { x: 315, y: 165 },
    mob: { x: 82, y: 150 },
  },
  {
    id: "builder",
    title: "Builder",
    time: "04:30",
    schedule: "Nightly 04:30",
    status: "active",
    since: "2026-10-19",
    summary: "Builds at most one pre-approved, private POC per night.",
    details: [
      "Only for a winner that is already approved.",
      "Private only: no public launch, no sign-ups, no payments, no emails.",
      "Demos are shown through a cloudflared tunnel on Judi's Mac (the box blocks port 7844).",
    ],
    desk: { x: 535, y: 165 },
    mob: { x: 82, y: 285 },
  },
  {
    id: "brief",
    title: "Morning brief",
    time: "07:30",
    schedule: "Daily 07:30",
    status: "active",
    since: "2026-10-19",
    summary: "The night's results, sent to Judi every morning.",
    details: ["Winner (if any), near-misses with their tags, and what the builder made.", "Will include validation results once the proposed loop is approved."],
    desk: { x: 755, y: 95 },
    mob: { x: 82, y: 560 },
  },
  {
    id: "weekly",
    title: "Sunday weekly",
    time: "Sun 09:00",
    schedule: "Sundays 09:00",
    status: "active",
    since: "2026-10-19",
    summary: "A weekly roll-up of the briefs: trends, near-misses worth a second look, cluster growth.",
    details: ["Reads the week's briefs and pains; no new scouting."],
    desk: { x: 980, y: 95 },
    mob: { x: 82, y: 675 },
  },
  {
    id: "gbrain",
    title: "GBrain filing",
    time: "after runs",
    schedule: "After the analyst and builder",
    status: "active",
    since: "2026-10-19",
    summary: "Files decisions, projects and app ideas into Judi's brain library.",
    details: ["Shelves in judmir/brain: decisions, projects, app-ideas."],
    outputs: ["decisions/", "projects/", "app-ideas/"],
    desk: { x: 315, y: 345 },
    mob: { x: 258, y: 218 },
  },
  {
    id: "landing",
    title: "Validation page",
    schedule: "Per winner, once approved",
    status: "proposed",
    since: "2026-10-22",
    summary: "A landing page with two calls to action to test real demand.",
    details: [
      "“Start for $X/month”: a priced fake-door checkout.",
      "“Join waitlist”: a plain waitlist link.",
      "Tracks three signals: price clicks, checkout starts, waitlist sign-ups.",
      "Hosting: cloudflared tunnel on Judi's Mac for now; Cloudflare/Wrangler later, once there is a token and a domain.",
    ],
    desk: { x: 535, y: 345 },
    mob: { x: 258, y: 365 },
  },
  {
    id: "meta",
    title: "Meta ads",
    schedule: "Per validation page",
    status: "proposed",
    since: "2026-10-22",
    summary: "A small paid test per idea. No automated organic posting.",
    details: [
      "Budget: €30–50 per idea.",
      "Needs at least 100 visitors before reading the result.",
      "Price clicks above 3% = strong. Below 1% = kill.",
    ],
    desk: { x: 755, y: 345 },
    mob: { x: 258, y: 460 },
  },
  {
    id: "report",
    title: "Report",
    schedule: "When an ad test ends",
    status: "proposed",
    since: "2026-10-22",
    summary: "Turns the validation signals into a verdict and feeds it back into the morning brief.",
    details: ["Strong / weak / kill, using the Meta ads thresholds."],
    desk: { x: 980, y: 345 },
    mob: { x: 258, y: 560 },
  },
];

/** Edges listed in run order. */
export const EDGES: ArchEdge[] = [
  { id: "us-analyst", from: "us-scout", to: "analyst", kind: "run", desk: { from: "right", to: "left", toShift: -10 }, mob: { from: "bottom", to: "top" } },
  { id: "de-analyst", from: "de-scout", to: "analyst", kind: "paused", desk: { from: "right", to: "left", toShift: 10 }, mob: { from: "bottom", to: "right", toShift: -12 } },
  { id: "analyst-builder", from: "analyst", to: "builder", kind: "run", mob: { from: "bottom", to: "top" } },
  { id: "analyst-gbrain", from: "analyst", to: "gbrain", kind: "filing", desk: { from: "bottom", to: "top" }, mob: { from: "right", to: "top", fromShift: 12 } },
  { id: "builder-brief", from: "builder", to: "brief", kind: "run", mob: { from: "bottom", to: "top" } },
  { id: "builder-gbrain", from: "builder", to: "gbrain", kind: "filing", desk: { from: "bottom", to: "right", fromShift: -40 }, mob: { from: "right", to: "bottom", fromShift: -12 } },
  { id: "builder-landing", from: "builder", to: "landing", kind: "proposed", desk: { from: "bottom", to: "top", fromShift: 20, toShift: 20 }, mob: { from: "right", to: "left", fromShift: 12 } },
  { id: "landing-meta", from: "landing", to: "meta", kind: "proposed", mob: { from: "bottom", to: "top" } },
  { id: "meta-report", from: "meta", to: "report", kind: "proposed", mob: { from: "bottom", to: "top" } },
  { id: "report-brief", from: "report", to: "brief", kind: "proposed", desk: { from: "top", to: "bottom", toShift: 30 }, mob: { from: "left", to: "right" } },
  { id: "brief-weekly", from: "brief", to: "weekly", kind: "run", desk: { from: "right", to: "left" }, mob: { from: "bottom", to: "top" } },
];

export interface NightStep {
  time: string;
  node: string;
  title: string;
  /** Shorter title for the phone timeline. */
  short: string;
  caption: string;
  /** Edges that carry data during this step. */
  edges: string[];
}

/** One night, step by step. */
export const NIGHT_STEPS: NightStep[] = [
  { time: "00:30", node: "us-scout", title: "US scout", short: "Scout", caption: "Collects US complaints, then proven subscription models, and hands both files to the analyst.", edges: ["us-analyst"] },
  { time: "03:00", node: "analyst", title: "Analyst", short: "Analyst", caption: "Scores each US entry out of 25 (bar 18), applies the veto and gates, and files to GBrain.", edges: ["analyst-builder", "analyst-gbrain"] },
  { time: "04:30", node: "builder", title: "Builder", short: "Builder", caption: "Builds at most one private POC. The proposed loop would hand it to a validation page and ads.", edges: ["builder-brief", "builder-gbrain", "builder-landing", "landing-meta", "meta-report"] },
  { time: "07:30", node: "brief", title: "Morning brief", short: "Brief", caption: "Judi gets the brief. On Sundays it rolls up into the weekly.", edges: ["report-brief", "brief-weekly"] },
];

export const nodeById = (id: string) => NODES.find((n) => n.id === id);
export const edgeById = (id: string) => EDGES.find((e) => e.id === id);

/** Cubic path between two nodes for a layout, using the edge's anchors or the dominant direction. */
export function edgePath(e: ArchEdge, layout: "desk" | "mob"): string {
  const a = nodeById(e.from)!, b = nodeById(e.to)!;
  const { nodeW, nodeH } = LAYOUT[layout];
  const pa = a[layout], pb = b[layout];
  const dx = pb.x - pa.x, dy = pb.y - pa.y;
  const auto: Anchor = Math.abs(dx) >= Math.abs(dy)
    ? { from: dx > 0 ? "right" : "left", to: dx > 0 ? "left" : "right" }
    : { from: dy > 0 ? "bottom" : "top", to: dy > 0 ? "top" : "bottom" };
  const an = e[layout] ?? auto;
  const pt = (p: Pos, side: Side, shift = 0): [number, number] => {
    if (side === "left") return [p.x - nodeW / 2, p.y + shift];
    if (side === "right") return [p.x + nodeW / 2, p.y + shift];
    if (side === "top") return [p.x + shift, p.y - nodeH / 2];
    return [p.x + shift, p.y + nodeH / 2];
  };
  const dir: Record<Side, [number, number]> = { left: [-1, 0], right: [1, 0], top: [0, -1], bottom: [0, 1] };
  const [x1, y1] = pt(pa, an.from, an.fromShift);
  const [x2, y2] = pt(pb, an.to, an.toShift);
  const k = Math.max(18, Math.hypot(x2 - x1, y2 - y1) * 0.4);
  const [ax, ay] = dir[an.from], [bx, by] = dir[an.to];
  const f = (n: number) => Math.round(n * 10) / 10;
  return `M${f(x1)},${f(y1)} C${f(x1 + ax * k)},${f(y1 + ay * k)} ${f(x2 + bx * k)},${f(y2 + by * k)} ${f(x2)},${f(y2)}`;
}
