import type { NightRun, StepKey } from "../types";

/** Fixed nightly schedule. */
export const STEP_TIMES: Record<StepKey, string> = { scout: "00:30", analyst: "03:00", builder: "04:30", brief: "07:30" };
export const STEP_ORDER: StepKey[] = ["scout", "analyst", "builder", "brief"];

const done = { scout: "done", analyst: "done", builder: "done", brief: "done" } as const;

/** The original 5 mock scout runs (summary + notes verbatim); per-source splits are mock values that add up to the scanned totals. */
export const NIGHTS: NightRun[] = [
  {
    date: "2026-10-23", label: "Scout run", niches: ["Freelancer back-office", "vertical micro-SaaS"],
    summary: "Strong week for vertical micro-SaaS. Freelancer back-office pain dominates Reddit and IndieHackers chatter.",
    notes: ["Scanned 412 posts across r/freelance, r/smallbusiness, IndieHackers, Product Hunt", "Filtered 37 candidates, deep-scored 3", "Bias check: excluded ideas requiring regulated data (health, payments)"],
    steps: done,
    scout: { scanned: 412, candidates: 37, deepScored: 3, bySource: [{ label: "r/freelance", n: 168 }, { label: "r/smallbusiness", n: 97 }, { label: "IndieHackers", n: 91 }, { label: "Product Hunt", n: 56 }], blocked: [] },
    builder: { winnerId: "invoice-chaser" },
  },
  {
    date: "2026-10-22", label: "Scout run", niches: ["Creator tools", "E-commerce ops"],
    summary: "Creator-economy tooling and small e-commerce ops. One standout with very low build effort.",
    notes: ["Scanned 365 posts and 48 Product Hunt launches", "Shopify app store reviews weighted higher this run"],
    steps: done,
    scout: { scanned: 413, candidates: 29, deepScored: 3, bySource: [{ label: "Shopify App Store", n: 142 }, { label: "Shopify Community", n: 121 }, { label: "Reddit", n: 102 }, { label: "Product Hunt", n: 48 }], blocked: [] },
    builder: { winnerId: "restock-radar" },
  },
  {
    date: "2026-10-20", label: "Scout run", niches: ["Local services"],
    summary: "Local-services run: appointment-heavy businesses still run on WhatsApp and paper.",
    notes: ["Scanned 298 posts, 12 Google Maps review clusters", "Focused on DACH region"],
    steps: done,
    scout: { scanned: 310, candidates: 24, deepScored: 3, bySource: [{ label: "Facebook groups", n: 161 }, { label: "Handwerker forum", n: 79 }, { label: "Reddit", n: 58 }, { label: "Google Maps clusters", n: 12 }], blocked: [] },
    builder: { winnerId: "salon-noshow" },
  },
  {
    date: "2026-10-15", label: "Scout run", niches: ["Remote teams & HR"],
    summary: "Remote-team and HR micro-tools. Clear winner on demand + simplicity.",
    notes: ["Scanned 351 posts", "Validation for the top pick completed 2026-10-22 → see Report"],
    steps: done,
    scout: { scanned: 351, candidates: 31, deepScored: 3, bySource: [{ label: "r/remotework", n: 139 }, { label: "Slack Marketplace", n: 88 }, { label: "r/humanresources", n: 76 }, { label: "Notion gallery", n: 48 }], blocked: [] },
    builder: { winnerId: "standup-async" },
  },
  {
    date: "2026-10-10", label: "Scout run", niches: ["Personal finance"],
    summary: "Personal finance helpers. High interest, but conversion risk flagged early.",
    notes: ["Scanned 280 posts", "Validation for the top pick completed 2026-10-17 → see Report"],
    steps: done,
    scout: { scanned: 280, candidates: 22, deepScored: 3, bySource: [{ label: "TikTok", n: 104 }, { label: "WG-Gesucht forum", n: 71 }, { label: "Reddit", n: 63 }, { label: "Bank release notes", n: 42 }], blocked: [] },
    builder: { winnerId: "sub-tracker" },
  },
];
