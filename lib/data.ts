export type SubScores = { demand: number; competition: number; buildEffort: number; monetization: number };
export type Signal = { label: string; source: string; url: string };

export type AdSetup = {
  headline: string;
  primaryText: string;
  cta: string;
  audience: { location: string; age: string; interests: string[] };
  budget: { daily: number; days: number };
};

/** Hidden "truth" used by the simulator so each idea behaves differently. */
export type SimProfile = { cpm: number; ctr: number; signupRate: number };

export type FinishedResult = {
  spend: number;
  impressions: number;
  clicks: number;
  signups: number;
  daily: { day: number; spend: number; signups: number; clicks: number }[];
  finishedAt: string;
};

export type Idea = {
  id: string;
  name: string;
  pitch: string;
  score: number;
  subScores: SubScores;
  rationale: string;
  signals: Signal[];
  demoUrl?: string;
  validationUrl?: string;
  ad?: AdSetup;
  sim?: SimProfile;
  seededResult?: FinishedResult;
};

export type ScoutRun = { id: string; date: string; summary: string; notes: string[]; ideas: Idea[] };

/** Target thresholds the bot uses for the verdict. */
export const TARGET_CPS = 4; // EUR per signup
export const TARGET_SIGNUP_RATE = 0.08; // signups / clicks

function series(days: number, spend: number, clicks: number, signups: number, wobble: number[]) {
  const w = wobble.slice(0, days);
  const sum = w.reduce((a, b) => a + b, 0);
  let s = 0, c = 0, g = 0;
  return w.map((x, i) => {
    const last = i === days - 1;
    const ds = last ? +(spend - s).toFixed(2) : +((spend * x) / sum).toFixed(2);
    const dc = last ? clicks - c : Math.round((clicks * x) / sum);
    const dg = last ? signups - g : Math.round((signups * x) / sum);
    s += ds; c += dc; g += dg;
    return { day: i + 1, spend: ds, clicks: dc, signups: dg };
  });
}

export const RUNS: ScoutRun[] = [
  {
    id: "2026-10-23",
    date: "2026-10-23",
    summary: "Strong week for vertical micro-SaaS. Freelancer back-office pain dominates Reddit and IndieHackers chatter.",
    notes: ["Scanned 412 posts across r/freelance, r/smallbusiness, IndieHackers, Product Hunt", "Filtered 37 candidates, deep-scored 3", "Bias check: excluded ideas requiring regulated data (health, payments)"],
    ideas: [
      {
        id: "invoice-chaser",
        name: "InvoiceChaser",
        pitch: "Polite, escalating payment reminders for freelancers — set it once, get paid on time.",
        score: 86,
        subScores: { demand: 91, competition: 72, buildEffort: 88, monetization: 84 },
        rationale: "Late payment is the #1 recurring complaint in freelancer communities (84 threads in 30 days). Existing tools bundle reminders into heavy accounting suites; a focused, email-first tool can be built in ~2 weeks and priced at €9/mo.",
        signals: [
          { label: "84 'client won't pay' threads in 30 days", source: "Reddit r/freelance", url: "https://reddit.example.com/r/freelance/late-payments" },
          { label: "'invoice reminder' search volume +22% YoY", source: "Keyword tool", url: "https://trends.example.com/invoice-reminder" },
          { label: "3 PH launches in adjacent space, none focused", source: "Product Hunt", url: "https://producthunt.example.com/topics/invoicing" },
        ],
        demoUrl: "https://demo.example.com/invoice-chaser",
        validationUrl: "https://landing.example.com/invoice-chaser",
        ad: {
          headline: "Stop chasing invoices. Get paid on time.",
          primaryText: "Freelancers lose hours every month nudging clients. InvoiceChaser sends friendly, escalating reminders automatically — so you don't have to. Join the early-access list.",
          cta: "Sign Up",
          audience: { location: "DE, AT, CH, NL", age: "24–45", interests: ["Freelancing", "Upwork", "Small business", "Graphic design"] },
          budget: { daily: 20, days: 7 },
        },
        sim: { cpm: 7.2, ctr: 0.021, signupRate: 0.13 },
      },
      {
        id: "meeting-cost-badge",
        name: "MeetingCost Badge",
        pitch: "A calendar add-on that shows the live € cost of every meeting based on attendees.",
        score: 71,
        subScores: { demand: 68, competition: 64, buildEffort: 82, monetization: 70 },
        rationale: "Viral potential on LinkedIn, but willingness to pay is unclear — most buyers are managers, not individual users.",
        signals: [
          { label: "Viral LinkedIn post (12k reactions) on meeting cost", source: "LinkedIn", url: "https://linkedin.example.com/posts/meeting-cost" },
          { label: "2 free Chrome extensions with weak reviews", source: "Chrome Web Store", url: "https://chrome.example.com/meeting-cost" },
        ],
      },
      {
        id: "lease-clause-check",
        name: "LeaseClause Check",
        pitch: "Upload a rental contract, get flagged clauses that are likely invalid under German tenancy law.",
        score: 58,
        subScores: { demand: 77, competition: 55, buildEffort: 38, monetization: 61 },
        rationale: "Clear demand, but legal liability and need for expert review push build effort and risk up.",
        signals: [
          { label: "Frequent 'is this clause legal?' questions", source: "r/germany", url: "https://reddit.example.com/r/germany/lease" },
          { label: "Tenant associations charge €80+/yr for checks", source: "Mieterverein", url: "https://mieterverein.example.com" },
        ],
      },
    ],
  },
  {
    id: "2026-10-22",
    date: "2026-10-22",
    summary: "Creator-economy tooling and small e-commerce ops. One standout with very low build effort.",
    notes: ["Scanned 365 posts and 48 Product Hunt launches", "Shopify app store reviews weighted higher this run"],
    ideas: [
      {
        id: "restock-radar",
        name: "RestockRadar",
        pitch: "Back-in-stock alerts with waitlist analytics for small Shopify stores.",
        score: 79,
        subScores: { demand: 80, competition: 58, buildEffort: 85, monetization: 81 },
        rationale: "Merchants complain that existing apps are pricey for <100 orders/mo. A €5/mo tier with demand forecasting from waitlist size is a clear wedge.",
        signals: [
          { label: "Top 3 restock apps avg 3.9★ with 'too expensive' reviews", source: "Shopify App Store", url: "https://apps.example.com/restock" },
          { label: "41 merchant threads asking for cheap alternative", source: "Shopify Community", url: "https://community.example.com/restock" },
        ],
        demoUrl: "https://demo.example.com/restock-radar",
        validationUrl: "https://landing.example.com/restock-radar",
        ad: {
          headline: "Sold out? Turn it into a waitlist.",
          primaryText: "RestockRadar captures back-in-stock signups and tells you exactly how much to reorder. Built for small Shopify stores, from €5/mo. Get early access.",
          cta: "Learn More",
          audience: { location: "DE, UK, NL", age: "25–50", interests: ["Shopify", "E-commerce", "Online retail", "Dropshipping"] },
          budget: { daily: 15, days: 7 },
        },
        sim: { cpm: 8.5, ctr: 0.016, signupRate: 0.07 },
      },
      {
        id: "thumbnail-ab",
        name: "Thumbnail A/B",
        pitch: "Rotate YouTube thumbnails automatically and pick the winner by CTR.",
        score: 66,
        subScores: { demand: 74, competition: 41, buildEffort: 70, monetization: 72 },
        rationale: "YouTube now ships native thumbnail testing; competition score dropped sharply.",
        signals: [{ label: "YouTube 'Test & Compare' rollout", source: "YouTube blog", url: "https://blog.example.com/test-compare" }],
      },
      {
        id: "podcast-clipper",
        name: "Podcast Clipper",
        pitch: "Auto-cut the 3 most quotable moments from each episode into vertical clips.",
        score: 52,
        subScores: { demand: 70, competition: 30, buildEffort: 45, monetization: 60 },
        rationale: "Crowded space with well-funded incumbents; hard to differentiate.",
        signals: [{ label: "8+ funded competitors", source: "Crunchbase", url: "https://crunchbase.example.com/clips" }],
      },
    ],
  },
  {
    id: "2026-10-20",
    date: "2026-10-20",
    summary: "Local-services run: appointment-heavy businesses still run on WhatsApp and paper.",
    notes: ["Scanned 298 posts, 12 Google Maps review clusters", "Focused on DACH region"],
    ideas: [
      {
        id: "salon-noshow",
        name: "NoShow Guard",
        pitch: "SMS confirmations + deposit links that cut no-shows for small salons.",
        score: 82,
        subScores: { demand: 86, competition: 66, buildEffort: 79, monetization: 85 },
        rationale: "No-shows cost a typical 2-chair salon ~€600/month. Deposit links are a proven fix but booking suites are overkill for small shops.",
        signals: [
          { label: "'no-show' mentioned in 19% of salon owner posts", source: "Facebook groups (manual sample)", url: "https://groups.example.com/salon-owners" },
          { label: "Booking suites start at €39/mo", source: "Pricing pages", url: "https://pricing.example.com/booking" },
        ],
        demoUrl: "https://demo.example.com/noshow-guard",
        validationUrl: "https://landing.example.com/noshow-guard",
        ad: {
          headline: "Fewer no-shows. More full chairs.",
          primaryText: "NoShow Guard texts clients to confirm and collects a small deposit — no booking system switch needed. Salons save ~€600/month. Try it free.",
          cta: "Get Offer",
          audience: { location: "Germany (cities > 100k)", age: "28–55", interests: ["Hair salon", "Beauty salon", "Barbershop", "Small business owners"] },
          budget: { daily: 25, days: 7 },
        },
        sim: { cpm: 6.4, ctr: 0.024, signupRate: 0.15 },
      },
      {
        id: "menu-translate",
        name: "MenuLingo",
        pitch: "QR menus that auto-translate into the guest's phone language.",
        score: 63,
        subScores: { demand: 61, competition: 52, buildEffort: 80, monetization: 58 },
        rationale: "Nice-to-have; restaurants are price-sensitive and many QR menu tools add translation for free.",
        signals: [{ label: "Tourist-area restaurant reviews mention language barrier", source: "Google Maps", url: "https://maps.example.com/reviews" }],
      },
      {
        id: "handyman-quotes",
        name: "QuoteSnap",
        pitch: "Tradespeople photograph a job and get a ready-to-send quote in 2 minutes.",
        score: 60,
        subScores: { demand: 72, competition: 60, buildEffort: 48, monetization: 63 },
        rationale: "Strong pain, but accuracy of auto-pricing is a hard problem for a PoC.",
        signals: [{ label: "Trade forums: 'quoting eats my evenings'", source: "Handwerker forum", url: "https://forum.example.com/quotes" }],
      },
    ],
  },
  {
    id: "2026-10-15",
    date: "2026-10-15",
    summary: "Remote-team and HR micro-tools. Clear winner on demand + simplicity.",
    notes: ["Scanned 351 posts", "Validation for the top pick completed 2026-10-22 → see Report"],
    ideas: [
      {
        id: "standup-async",
        name: "StandupBot Lite",
        pitch: "Async daily standups in Slack with a weekly digest for managers — €2/user.",
        score: 84,
        subScores: { demand: 85, competition: 70, buildEffort: 90, monetization: 79 },
        rationale: "Small remote teams want async standups but balk at €4–6/user pricing of incumbents. A lean price point plus digest is a clear wedge.",
        signals: [
          { label: "'cheaper Geekbot alternative' threads", source: "r/remotework", url: "https://reddit.example.com/r/remotework/standups" },
          { label: "Slack app reviews cite price as #1 churn reason", source: "Slack Marketplace", url: "https://slack.example.com/apps/standup" },
        ],
        demoUrl: "https://demo.example.com/standup-lite",
        validationUrl: "https://landing.example.com/standup-lite",
        ad: {
          headline: "Async standups for €2/user.",
          primaryText: "Skip the 9:30 call. StandupBot Lite collects updates in Slack and sends managers a weekly digest. Join 200+ teams on the waitlist.",
          cta: "Sign Up",
          audience: { location: "EU + UK", age: "25–45", interests: ["Remote work", "Slack", "Engineering management", "Startups"] },
          budget: { daily: 20, days: 7 },
        },
        sim: { cpm: 7.0, ctr: 0.022, signupRate: 0.14 },
        seededResult: {
          spend: 140, impressions: 19850, clicks: 452, signups: 61,
          daily: series(7, 140, 452, 61, [0.8, 1.0, 1.1, 1.0, 1.2, 1.3, 1.25]),
          finishedAt: "2026-10-22",
        },
      },
      {
        id: "ooo-planner",
        name: "OOO Planner",
        pitch: "Shared vacation calendar that warns when too many people are out at once.",
        score: 69,
        subScores: { demand: 66, competition: 58, buildEffort: 84, monetization: 62 },
        rationale: "Useful, but HRIS tools increasingly include it.",
        signals: [{ label: "HR managers asking for lightweight PTO tracker", source: "r/humanresources", url: "https://reddit.example.com/r/humanresources" }],
      },
      {
        id: "onboarding-checklist",
        name: "Onboard Kit",
        pitch: "Templated new-hire checklists with auto-reminders for buddies and IT.",
        score: 55,
        subScores: { demand: 58, competition: 45, buildEffort: 76, monetization: 50 },
        rationale: "Notion templates cover most of this for free.",
        signals: [{ label: "Popular free Notion templates", source: "Notion gallery", url: "https://notion.example.com/templates/onboarding" }],
      },
    ],
  },
  {
    id: "2026-10-10",
    date: "2026-10-10",
    summary: "Personal finance helpers. High interest, but conversion risk flagged early.",
    notes: ["Scanned 280 posts", "Validation for the top pick completed 2026-10-17 → see Report"],
    ideas: [
      {
        id: "sub-tracker",
        name: "SubSnitch",
        pitch: "Forward your receipts, get a monthly list of subscriptions you forgot about.",
        score: 77,
        subScores: { demand: 83, competition: 49, buildEffort: 81, monetization: 66 },
        rationale: "Very high engagement on 'forgotten subscription' content, but strong free competitors (banking apps) may cap willingness to sign up.",
        signals: [
          { label: "'subscriptions I forgot' TikTok trend", source: "TikTok", url: "https://tiktok.example.com/tag/subscriptions" },
          { label: "Neobanks ship free subscription detection", source: "Bank release notes", url: "https://bank.example.com/changelog" },
        ],
        demoUrl: "https://demo.example.com/subsnitch",
        validationUrl: "https://landing.example.com/subsnitch",
        ad: {
          headline: "You're paying for subscriptions you forgot.",
          primaryText: "Forward your receipts to SubSnitch and get a monthly list of every subscription — and how to cancel it. Free early access.",
          cta: "Sign Up",
          audience: { location: "Germany", age: "21–40", interests: ["Personal finance", "Budgeting", "Saving money", "Netflix"] },
          budget: { daily: 15, days: 7 },
        },
        sim: { cpm: 9.1, ctr: 0.012, signupRate: 0.045 },
        seededResult: {
          spend: 105, impressions: 11540, clicks: 139, signups: 6,
          daily: series(7, 105, 139, 6, [1.2, 1.1, 1.0, 0.9, 1.0, 0.9, 0.9]),
          finishedAt: "2026-10-17",
        },
      },
      {
        id: "split-rent",
        name: "FairSplit",
        pitch: "Split rent and bills in shared flats by room size and usage.",
        score: 64,
        subScores: { demand: 69, competition: 50, buildEffort: 78, monetization: 48 },
        rationale: "Splitwise dominates; room-size angle is niche.",
        signals: [{ label: "WG forums discuss fair splitting", source: "WG-Gesucht forum", url: "https://wg.example.com/forum" }],
      },
      {
        id: "tax-receipts",
        name: "ReceiptBox",
        pitch: "Snap receipts year-round, export a tax-ready folder in March.",
        score: 57,
        subScores: { demand: 64, competition: 42, buildEffort: 70, monetization: 55 },
        rationale: "Tax apps bundle receipt capture; low differentiation.",
        signals: [{ label: "Tax-season spike in receipt app searches", source: "Keyword tool", url: "https://trends.example.com/receipts" }],
      },
    ],
  },
];

// Ensure ideas are sorted by score within each run.
RUNS.forEach((r) => r.ideas.sort((a, b) => b.score - a.score));

export const ALL_IDEAS = RUNS.flatMap((r) => r.ideas.map((idea, idx) => ({ idea, run: r, rank: idx + 1 })));
export const isTopPick = (id: string) => ALL_IDEAS.some((x) => x.idea.id === id && x.rank === 1);
export function findIdea(id: string) {
  return ALL_IDEAS.find((x) => x.idea.id === id);
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
export const eur = (n: number) => "€" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/** Whole-euro label for compact UI ("€2 of €140"). */
export const eur0 = (n: number) => "€" + Math.round(n).toLocaleString("en-US");
export const shortDate = (iso: string) => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
export const int =(n: number) => Math.round(n).toLocaleString("en-US");
export const pct = (n: number) => (n * 100).toFixed(2) + "%";
