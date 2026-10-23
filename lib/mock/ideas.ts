// Original mock ideas (fictional). Scores, sub-scores, pitches, rationales, signals, ad copy, budgets and the two seeded
// test results come from the original mock. Every other field is new mock text in the same spirit, or null.
import type { GateKey, GateResult, Idea, SimProfile, SourceSignals, TrafficSource, Validation } from "../types";

const g = (result: GateResult["result"], text: string): GateResult => ({ result, text });
const gates = (sub: GateResult, simple: GateResult, entry: GateResult): Record<GateKey, GateResult> => ({ subscription: sub, simplest_way: simple, market_entry: entry });
const na = g("not-assessed", "not assessed (runner-up)");
const utm = (slug: string): Record<TrafficSource, string> => ({
  meta: `?utm_source=facebook&utm_medium=paid_social&utm_campaign=${slug}`,
  google_search: `?utm_source=google&utm_medium=cpc&utm_campaign=${slug}`,
  reddit: `?utm_source=reddit&utm_medium=paid_social&utm_campaign=${slug}`,
});
/** Map the original sim profile (cpm, ctr, signupRate) onto per-source fake-door rates. */
const sim = (cpm: number, ctr: number, signupRate: number, priceClickRate: number): SimProfile => {
  const eurPerVisitor = +(cpm / 1000 / ctr).toFixed(2);
  return {
    meta: { eurPerVisitor, priceClickRate, checkoutRate: 0.35, waitlistRate: signupRate },
    google_search: { eurPerVisitor: +(eurPerVisitor * 1.6).toFixed(2), priceClickRate: priceClickRate * 1.4, checkoutRate: 0.4, waitlistRate: signupRate * 0.8 },
    reddit: { eurPerVisitor: +(eurPerVisitor * 1.2).toFixed(2), priceClickRate: priceClickRate * 0.8, checkoutRate: 0.3, waitlistRate: signupRate * 1.1 },
  };
};
const metaOnly = (r: Omit<SourceSignals, "source">): SourceSignals[] => [{ source: "meta", ...r }, { source: "google_search", spendEur: 0, visitors: 0, priceClicks: 0, checkoutStarts: 0, waitlistSignups: 0 }, { source: "reddit", spendEur: 0, visitors: 0, priceClicks: 0, checkoutStarts: 0, waitlistSignups: 0 }];

function kit(o: {
  slug: string; headline: string; subhead: string; bullets: string[]; price: string; cta: string;
  primaryText: string; adCta: string; description: string; audience: Validation["adKit"]["meta"]["audience"]; dailyEur: number; days: number;
  searchIntent: boolean; googleKeywords?: string[]; redditSubs?: string[]; sim: SimProfile; results?: Validation["results"];
}): Validation {
  return {
    landing: { slug: o.slug, headline: o.headline, subhead: o.subhead, bullets: o.bullets, price: o.price, primaryCta: o.cta, secondaryCta: "Join waitlist" },
    adKit: {
      budget: { dailyEur: o.dailyEur, days: o.days }, sources: ["meta", "google_search", "reddit"], searchIntent: o.searchIntent,
      meta: { primaryText: [o.primaryText], headlines: [o.headline], cta: o.adCta, description: o.description, audience: o.audience },
      googleKeywords: o.googleKeywords, redditSubs: o.redditSubs, utm: utm(o.slug),
    },
    sim: o.sim,
    results: o.results,
  };
}

type Base = Pick<Idea, "id" | "night" | "rank" | "market" | "niche" | "name" | "pitch" | "rationale" | "signals" | "scores">;
/** Runner-up: original fields + light mock gates; brief-only fields stay null. */
function runner(b: Base, x: Partial<Idea> & Pick<Idea, "source" | "evidenceSummary">): Idea {
  return {
    ...b, who: null, gates: gates(na, na, na), competitor_veto: false, kill_reason: null, borderline_note: null, competitors: [], gap: null,
    price: null, mvp: null, killQuestion: null, plc: null, weekly_counts: null, week_over_week: null, recurring: false, verdict: "below-bar", ...x,
  };
}

export const IDEAS: Idea[] = [
  // ── 23 Oct: freelancer back-office ─────────────────────────────────────────
  {
    id: "invoice-chaser", night: "2026-10-23", rank: 1, market: "DACH + NL", niche: "Freelancer back-office",
    name: "InvoiceChaser", pitch: "Polite, escalating payment reminders for freelancers — set it once, get paid on time.",
    who: "Solo freelancers and two-person studios (design, dev, copy) who invoice 5–20 clients a month and hate chasing late payers",
    source: "complaints+proven-model",
    evidenceSummary: "84 'client won't pay' threads in 30 days on r/freelance; accounting suites prove people pay for reminders, but only as a bundle.",
    signals: [
      { label: "84 'client won't pay' threads in 30 days", source: "Reddit r/freelance" },
      { label: "'invoice reminder' search volume +22% YoY", source: "Keyword tool" },
      { label: "3 PH launches in adjacent space, none focused", source: "Product Hunt" },
    ],
    rationale: "Late payment is the #1 recurring complaint in freelancer communities (84 threads in 30 days). Existing tools bundle reminders into heavy accounting suites; a focused, email-first tool can be built in ~2 weeks and priced at €9/mo.",
    scores: { demand: 91, competition: 72, buildEffort: 88, monetization: 84, total: 86 },
    gates: gates(g("pass", "pass (freelancers already pay monthly for invoicing suites)"), g("pass", "pass (connect inbox, pick invoices, reminders run)"), g("pass", "pass (r/freelance, freelancer newsletters, Meta ads; Stripe billing in EUR)")),
    competitor_veto: false, kill_reason: null, borderline_note: null,
    competitors: [
      { name: "Big accounting suite (mock)", price: "€15–30/month, reminders only on higher tiers", loves: [{ quote: "Does everything my accountant needs.", who: "mock review" }], hates: [{ quote: "I pay for a whole suite just to send one reminder email.", who: "mock review" }], funding: "Public company (mock)" },
      { name: "Free invoice template apps (mock)", price: "Free", loves: [{ quote: "Quick to make a PDF.", who: "mock review" }], hates: [{ quote: "No follow-ups at all, I still chase by hand.", who: "mock review" }], funding: "Ad-funded (mock)" },
    ],
    gap: "A reminders-only tool that sits on top of whatever invoicing you already use: escalating tone, no accounting features.",
    price: { text: "€9/month", estimate: true },
    mvp: "Connect Gmail or Outlook, mark sent invoices, choose a tone ladder (friendly → firm → final). Reminders go out on day 3, 10 and 21 and stop when the client replies or pays.",
    killQuestion: "Freelancers refusing to give inbox access, or accounting suites dropping reminders into their free tier.",
    plc: { stage: "growth", verdict: "yes", assessment: true, verdictText: "yes (assessment): the freelancer tool market is still growing and reminders are a clear, narrow wedge.", evidence: ["Freelancer numbers in DACH still rising (mock)", "New invoicing launches on Product Hunt every month", "Prices stable at €10–30/month"] },
    weekly_counts: { "2026-W40": 14, "2026-W41": 19, "2026-W42": 23, "2026-W43": 28 },
    week_over_week: { this_week_iso: "2026-W43", this_week: 28, last_week_iso: "2026-W42", last_week: 23, note: "Mock: 'late payment' threads per week in r/freelance." },
    recurring: true, verdict: "winner",
    validation: kit({
      slug: "invoice-chaser", headline: "Stop chasing invoices. Get paid on time.", subhead: "Polite, escalating payment reminders for freelancers — set it once, get paid on time.",
      bullets: ["Works with the invoices you already send", "Friendly → firm → final reminders", "Stops the moment a client pays"], price: "€9/month", cta: "Start for €9/month",
      primaryText: "Freelancers lose hours every month nudging clients. InvoiceChaser sends friendly, escalating reminders automatically — so you don't have to. Join the early-access list.",
      adCta: "Sign Up", description: "Reminders on autopilot. €9/month.",
      audience: { location: "DE, AT, CH, NL", age: "24–45", interests: ["Freelancing", "Upwork", "Small business", "Graphic design"] }, dailyEur: 20, days: 7,
      searchIntent: true, googleKeywords: ["invoice reminder", "payment reminder email freelancer", "client won't pay invoice"], redditSubs: ["r/freelance", "r/smallbusiness"],
      sim: sim(7.2, 0.021, 0.13, 0.032),
    }),
  },
  runner(
    { id: "meeting-cost-badge", night: "2026-10-23", rank: 2, market: "EU", niche: "Freelancer back-office", name: "MeetingCost Badge", pitch: "A calendar add-on that shows the live € cost of every meeting based on attendees.", rationale: "Viral potential on LinkedIn, but willingness to pay is unclear — most buyers are managers, not individual users.", signals: [{ label: "Viral LinkedIn post (12k reactions) on meeting cost", source: "LinkedIn" }, { label: "2 free Chrome extensions with weak reviews", source: "Chrome Web Store" }], scores: { demand: 68, competition: 64, buildEffort: 82, monetization: 70, total: 71 } },
    { source: "complaints", evidenceSummary: "One viral LinkedIn post (12k reactions) and two weak free extensions.", gates: gates(g("weak-pass", "weak pass (managers might pay, users won't)"), g("pass", "pass (install, badge appears)"), na), borderline_note: "Near-miss at 71: loud and easy to build, but unclear who pays." },
  ),
  runner(
    { id: "lease-clause-check", night: "2026-10-23", rank: 3, market: "DE", niche: "Freelancer back-office", name: "LeaseClause Check", pitch: "Upload a rental contract, get flagged clauses that are likely invalid under German tenancy law.", rationale: "Clear demand, but legal liability and need for expert review push build effort and risk up.", signals: [{ label: "Frequent 'is this clause legal?' questions", source: "r/germany" }, { label: "Tenant associations charge €80+/yr for checks", source: "Mieterverein" }], scores: { demand: 77, competition: 55, buildEffort: 38, monetization: 61, total: 58 } },
    { source: "complaints+proven-model", evidenceSummary: "Recurring 'is this clause legal?' questions; tenant associations prove people pay €80+/yr." },
  ),

  // ── 22 Oct: creator economy + small e-commerce ─────────────────────────────
  {
    id: "restock-radar", night: "2026-10-22", rank: 1, market: "DE, UK, NL", niche: "E-commerce ops",
    name: "RestockRadar", pitch: "Back-in-stock alerts with waitlist analytics for small Shopify stores.",
    who: "Small Shopify merchants (< 100 orders a month) who sell out of bestsellers and guess reorder quantities",
    source: "complaints+proven-model",
    evidenceSummary: "41 merchant threads asking for a cheap alternative; the top 3 restock apps prove demand but average 3.9★ with 'too expensive' reviews.",
    signals: [
      { label: "Top 3 restock apps avg 3.9★ with 'too expensive' reviews", source: "Shopify App Store" },
      { label: "41 merchant threads asking for cheap alternative", source: "Shopify Community" },
    ],
    rationale: "Merchants complain that existing apps are pricey for <100 orders/mo. A €5/mo tier with demand forecasting from waitlist size is a clear wedge.",
    scores: { demand: 80, competition: 58, buildEffort: 85, monetization: 81, total: 79 },
    gates: gates(g("pass", "pass (merchants already pay monthly for Shopify apps)"), g("pass", "pass (install app, button appears on sold-out products)"), g("pass", "pass (Shopify App Store search, merchant forums)")),
    competitor_veto: false, kill_reason: null, borderline_note: null,
    competitors: [
      { name: "Established restock app (mock)", price: "€19–49/month", loves: [{ quote: "Alerts work reliably.", who: "mock 4★ review" }], hates: [{ quote: "Way too expensive for a store my size.", who: "mock 2★ review" }], funding: "Bootstrapped (mock)" },
    ],
    gap: "A €5 tier for tiny stores, plus a reorder suggestion from the waitlist size.",
    price: { text: "€5/month", estimate: true },
    mvp: "Shopify app: 'Notify me' button on sold-out variants, email when back, and one dashboard card: 'X people waiting, reorder ~Y units'.",
    killQuestion: "Shopify shipping native back-in-stock alerts, or tiny stores not installing paid apps at all.",
    plc: { stage: "maturity", verdict: "maybe", assessment: true, verdictText: "maybe (assessment): a mature app category, but the low-end price tier is underserved.", evidence: ["Restock apps on the Shopify App Store for years (mock)", "Prices flat at €19–49/month", "Reviews skew 'too expensive'"] },
    weekly_counts: { "2026-W40": 9, "2026-W41": 8, "2026-W42": 11, "2026-W43": 13 },
    week_over_week: { this_week_iso: "2026-W43", this_week: 13, last_week_iso: "2026-W42", last_week: 11, note: "Mock: 'cheap restock app' threads per week in Shopify Community." },
    recurring: true, verdict: "winner",
    validation: kit({
      slug: "restock-radar", headline: "Sold out? Turn it into a waitlist.", subhead: "Back-in-stock alerts with waitlist analytics for small Shopify stores.",
      bullets: ["'Notify me' on every sold-out variant", "See how many people are waiting", "Know how much to reorder"], price: "€5/month", cta: "Start for €5/month",
      primaryText: "RestockRadar captures back-in-stock signups and tells you exactly how much to reorder. Built for small Shopify stores, from €5/mo. Get early access.",
      adCta: "Learn More", description: "Back-in-stock alerts from €5/month.",
      audience: { location: "DE, UK, NL", age: "25–50", interests: ["Shopify", "E-commerce", "Online retail", "Dropshipping"] }, dailyEur: 15, days: 7,
      searchIntent: true, googleKeywords: ["shopify back in stock app", "cheap restock alert shopify"], redditSubs: ["r/shopify", "r/ecommerce"],
      sim: sim(8.5, 0.016, 0.07, 0.022),
    }),
  },
  runner(
    { id: "thumbnail-ab", night: "2026-10-22", rank: 2, market: "Global", niche: "Creator tools", name: "Thumbnail A/B", pitch: "Rotate YouTube thumbnails automatically and pick the winner by CTR.", rationale: "YouTube now ships native thumbnail testing; competition score dropped sharply.", signals: [{ label: "YouTube 'Test & Compare' rollout", source: "YouTube blog" }], scores: { demand: 74, competition: 41, buildEffort: 70, monetization: 72, total: 66 } },
    { source: "proven-model", evidenceSummary: "Creators pay for thumbnail testing, but YouTube now ships it natively.", competitor_veto: true, kill_reason: "Competitor veto: YouTube's native 'Test & Compare' does the core job for free.", gates: gates(g("pass", "pass (creators pay for growth tools)"), g("pass", "pass (upload 3 thumbnails, done)"), na) },
  ),
  runner(
    { id: "podcast-clipper", night: "2026-10-22", rank: 3, market: "Global", niche: "Creator tools", name: "Podcast Clipper", pitch: "Auto-cut the 3 most quotable moments from each episode into vertical clips.", rationale: "Crowded space with well-funded incumbents; hard to differentiate.", signals: [{ label: "8+ funded competitors", source: "Crunchbase" }], scores: { demand: 70, competition: 30, buildEffort: 45, monetization: 60, total: 52 } },
    { source: "proven-model", evidenceSummary: "8+ funded clip tools prove the market and crowd it.", competitor_veto: true, kill_reason: "Competitor veto: 8+ funded clip tools already own this." },
  ),

  // ── 20 Oct: local services ─────────────────────────────────────────────────
  {
    id: "salon-noshow", night: "2026-10-20", rank: 1, market: "DE (cities > 100k)", niche: "Local services",
    name: "NoShow Guard", pitch: "SMS confirmations + deposit links that cut no-shows for small salons.",
    who: "Owners of 1–3 chair hair and beauty salons who book by WhatsApp or paper and lose ~€600 a month to no-shows",
    source: "complaints+proven-model",
    evidenceSummary: "'No-show' comes up in 19% of salon-owner posts; booking suites prove deposits work but start at €39/month.",
    signals: [
      { label: "'no-show' mentioned in 19% of salon owner posts", source: "Facebook groups (manual sample)" },
      { label: "Booking suites start at €39/mo", source: "Pricing pages" },
    ],
    rationale: "No-shows cost a typical 2-chair salon ~€600/month. Deposit links are a proven fix but booking suites are overkill for small shops.",
    scores: { demand: 86, competition: 66, buildEffort: 79, monetization: 85, total: 82 },
    gates: gates(g("pass", "pass (salons pay monthly for booking and POS tools)"), g("pass", "pass (type the client's number, they confirm or pay a deposit)"), g("borderline", "borderline pass (salon owners reachable via Facebook groups; SMS costs per country)")),
    competitor_veto: false, kill_reason: null, borderline_note: null,
    competitors: [
      { name: "Full booking suite (mock)", price: "from €39/month", loves: [{ quote: "Deposits stopped our no-shows.", who: "mock salon owner" }], hates: [{ quote: "I don't want to move my whole calendar for this.", who: "mock salon owner" }], funding: "VC-funded (mock)" },
    ],
    gap: "Deposits and confirmations without switching booking systems.",
    price: { text: "€19/month incl. 200 SMS", estimate: true },
    mvp: "Web app: enter name, phone, time. The client gets an SMS with 'confirm' and an optional €10 deposit link. Unconfirmed bookings flag red the day before.",
    killQuestion: "Clients refusing deposits at small salons, or SMS costs eating the margin at €19/month.",
    plc: { stage: "growth", verdict: "yes", assessment: true, verdictText: "yes (assessment): small salons are only now moving off paper; deposits are becoming normal.", evidence: ["Booking tools growing among small salons (mock)", "Deposit links normal in big cities", "Price points €39+ leave room below"] },
    weekly_counts: { "2026-W40": 6, "2026-W41": 7, "2026-W42": 7, "2026-W43": 9 },
    week_over_week: { this_week_iso: "2026-W43", this_week: 9, last_week_iso: "2026-W42", last_week: 7, note: "Mock: no-show posts per week in salon-owner groups." },
    recurring: true, verdict: "winner",
    validation: kit({
      slug: "noshow-guard", headline: "Fewer no-shows. More full chairs.", subhead: "SMS confirmations + deposit links that cut no-shows for small salons.",
      bullets: ["Clients confirm by SMS", "Optional deposit link", "No booking system switch"], price: "€19/month", cta: "Start for €19/month",
      primaryText: "NoShow Guard texts clients to confirm and collects a small deposit — no booking system switch needed. Salons save ~€600/month. Try it free.",
      adCta: "Get Offer", description: "Cut no-shows. €19/month.",
      audience: { location: "Germany (cities > 100k)", age: "28–55", interests: ["Hair salon", "Beauty salon", "Barbershop", "Small business owners"] }, dailyEur: 25, days: 7,
      searchIntent: false, redditSubs: ["r/hairstylist"],
      sim: sim(6.4, 0.024, 0.15, 0.035),
    }),
  },
  runner(
    { id: "menu-translate", night: "2026-10-20", rank: 2, market: "EU tourist areas", niche: "Local services", name: "MenuLingo", pitch: "QR menus that auto-translate into the guest's phone language.", rationale: "Nice-to-have; restaurants are price-sensitive and many QR menu tools add translation for free.", signals: [{ label: "Tourist-area restaurant reviews mention language barrier", source: "Google Maps" }], scores: { demand: 61, competition: 52, buildEffort: 80, monetization: 58, total: 63 } },
    { source: "complaints", evidenceSummary: "Tourist-area reviews mention the language barrier; QR menu tools add translation for free.", borderline_note: "Near-miss at 63: easy to build, but a nice-to-have that competitors give away." },
  ),
  runner(
    { id: "handyman-quotes", night: "2026-10-20", rank: 3, market: "DACH", niche: "Local services", name: "QuoteSnap", pitch: "Tradespeople photograph a job and get a ready-to-send quote in 2 minutes.", rationale: "Strong pain, but accuracy of auto-pricing is a hard problem for a PoC.", signals: [{ label: "Trade forums: 'quoting eats my evenings'", source: "Handwerker forum" }], scores: { demand: 72, competition: 60, buildEffort: 48, monetization: 63, total: 60 } },
    { source: "complaints", evidenceSummary: "Trade forums: 'quoting eats my evenings'.", borderline_note: "Near-miss at 60: strong pain, but auto-pricing accuracy is too hard for a 2-week build." },
  ),

  // ── 15 Oct: remote teams + HR ──────────────────────────────────────────────
  {
    id: "standup-async", night: "2026-10-15", rank: 1, market: "EU + UK", niche: "Remote teams & HR",
    name: "StandupBot Lite", pitch: "Async daily standups in Slack with a weekly digest for managers — €2/user.",
    who: "Remote teams of 5–30 people on Slack whose managers want standups without a daily call",
    source: "complaints+proven-model",
    evidenceSummary: "'Cheaper Geekbot alternative' threads on r/remotework; Slack app reviews cite price as the #1 churn reason.",
    signals: [
      { label: "'cheaper Geekbot alternative' threads", source: "r/remotework" },
      { label: "Slack app reviews cite price as #1 churn reason", source: "Slack Marketplace" },
    ],
    rationale: "Small remote teams want async standups but balk at €4–6/user pricing of incumbents. A lean price point plus digest is a clear wedge.",
    scores: { demand: 85, competition: 70, buildEffort: 90, monetization: 79, total: 84 },
    gates: gates(g("pass", "pass (teams already pay per user for standup bots)"), g("pass", "pass (add to Slack, pick a channel, done)"), g("pass", "pass (Slack Marketplace, r/remotework, Meta ads)")),
    competitor_veto: false, kill_reason: null, borderline_note: null,
    competitors: [
      { name: "Incumbent standup bot (mock)", price: "€4–6/user/month", loves: [{ quote: "Saved us the daily call.", who: "mock Slack review" }], hates: [{ quote: "Too pricey once the team grew past 10.", who: "mock Slack review" }], funding: "Bootstrapped (mock)" },
    ],
    gap: "Same async standup at €2/user plus a manager digest.",
    price: { text: "€2/user/month", estimate: true },
    mvp: "Slack bot: 3 questions at 9:00 in each timezone, answers posted to a channel, and a Friday digest DM to the manager.",
    killQuestion: "Slack bundling async standups into its own workflows, or incumbents matching €2/user.",
    plc: { stage: "maturity", verdict: "maybe", assessment: true, verdictText: "maybe (assessment): a mature category where a price wedge can still work for small teams.", evidence: ["Standup bots on the Slack Marketplace for years (mock)", "Incumbents priced €4–6/user", "Reviews cite price as #1 churn reason"] },
    weekly_counts: { "2026-W40": 5, "2026-W41": 8, "2026-W42": 10, "2026-W43": 9 },
    week_over_week: { this_week_iso: "2026-W43", this_week: 9, last_week_iso: "2026-W42", last_week: 10, note: "Mock: 'standup bot alternative' threads per week." },
    recurring: true, verdict: "winner",
    validation: kit({
      slug: "standup-lite", headline: "Async standups for €2/user.", subhead: "Async daily standups in Slack with a weekly digest for managers.",
      bullets: ["3 questions in Slack, every timezone", "Weekly digest for managers", "€2/user, no minimum"], price: "€2/user/month", cta: "Start for €2/user/month",
      primaryText: "Skip the 9:30 call. StandupBot Lite collects updates in Slack and sends managers a weekly digest. Join 200+ teams on the waitlist.",
      adCta: "Sign Up", description: "Async standups in Slack. €2/user.",
      audience: { location: "EU + UK", age: "25–45", interests: ["Remote work", "Slack", "Engineering management", "Startups"] }, dailyEur: 20, days: 7,
      searchIntent: true, googleKeywords: ["geekbot alternative", "async standup slack"], redditSubs: ["r/remotework", "r/EngineeringManagers"],
      sim: sim(7.0, 0.022, 0.14, 0.04),
      // Original seeded result: €140 spend, 452 clicks → visitors, 61 signups → waitlist. Price clicks and checkouts are new mock values.
      results: { startedAt: "2026-10-15", endedAt: "2026-10-22", simulated: true, bySource: metaOnly({ spendEur: 140, visitors: 452, priceClicks: 19, checkoutStarts: 7, waitlistSignups: 61 }) },
    }),
  },
  runner(
    { id: "ooo-planner", night: "2026-10-15", rank: 2, market: "EU", niche: "Remote teams & HR", name: "OOO Planner", pitch: "Shared vacation calendar that warns when too many people are out at once.", rationale: "Useful, but HRIS tools increasingly include it.", signals: [{ label: "HR managers asking for lightweight PTO tracker", source: "r/humanresources" }], scores: { demand: 66, competition: 58, buildEffort: 84, monetization: 62, total: 69 } },
    { source: "complaints", evidenceSummary: "HR managers ask for a lightweight PTO tracker; HRIS tools increasingly include one.", borderline_note: "Near-miss at 69: useful, but HR systems are absorbing it." },
  ),
  runner(
    { id: "onboarding-checklist", night: "2026-10-15", rank: 3, market: "EU", niche: "Remote teams & HR", name: "Onboard Kit", pitch: "Templated new-hire checklists with auto-reminders for buddies and IT.", rationale: "Notion templates cover most of this for free.", signals: [{ label: "Popular free Notion templates", source: "Notion gallery" }], scores: { demand: 58, competition: 45, buildEffort: 76, monetization: 50, total: 55 } },
    { source: "proven-model", evidenceSummary: "Popular free Notion templates already cover onboarding checklists." },
  ),

  // ── 10 Oct: personal finance ───────────────────────────────────────────────
  {
    id: "sub-tracker", night: "2026-10-10", rank: 1, market: "DE", niche: "Personal finance",
    name: "SubSnitch", pitch: "Forward your receipts, get a monthly list of subscriptions you forgot about.",
    who: "21–40-year-olds in Germany with 5+ app and streaming subscriptions who lose track of renewals",
    source: "complaints+proven-model",
    evidenceSummary: "Huge engagement on 'subscriptions I forgot' content, but neobanks now ship free subscription detection.",
    signals: [
      { label: "'subscriptions I forgot' TikTok trend", source: "TikTok" },
      { label: "Neobanks ship free subscription detection", source: "Bank release notes" },
    ],
    rationale: "Very high engagement on 'forgotten subscription' content, but strong free competitors (banking apps) may cap willingness to sign up.",
    scores: { demand: 83, competition: 49, buildEffort: 81, monetization: 66, total: 77 },
    gates: gates(g("weak-pass", "weak pass (people like the idea, few pay for it)"), g("pass", "pass (forward a receipt, list updates)"), g("pass", "pass (TikTok, Meta ads)")),
    competitor_veto: false, kill_reason: "Killed by its validation test (10–17 Oct): 139 visitors, 1 price click (0.7%), 6 waitlist signups from €105. Free banking-app detection caps willingness to pay.", borderline_note: null,
    competitors: [
      { name: "Neobank subscription view (mock)", price: "Free with the account", loves: [{ quote: "It found two subscriptions I forgot.", who: "mock app review" }], hates: [{ quote: "Only sees cards from this bank.", who: "mock app review" }], funding: "VC-funded bank (mock)" },
    ],
    gap: "Works across all banks via receipts, but the free bank view covers most people.",
    price: { text: "€2.99/month", estimate: true },
    mvp: "Forwarding address; the app parses receipts and shows one monthly list with renewal dates and cancel links.",
    killQuestion: "Free banking-app detection good enough for most people (the test confirmed it: 6 signups from €105).",
    plc: { stage: "maturity", verdict: "no", assessment: true, verdictText: "no (assessment): banks give it away; a paid tracker fights a free default.", evidence: ["Neobanks ship free detection (mock)", "Many free trackers", "High interest, low conversion"] },
    weekly_counts: { "2026-W39": 30, "2026-W40": 26, "2026-W41": 21, "2026-W42": 17 },
    week_over_week: { this_week_iso: "2026-W42", this_week: 17, last_week_iso: "2026-W41", last_week: 21, note: "Mock: 'forgot subscription' posts per week." },
    recurring: true, verdict: "winner",
    validation: kit({
      slug: "subsnitch", headline: "You're paying for subscriptions you forgot.", subhead: "Forward your receipts, get a monthly list of subscriptions you forgot about.",
      bullets: ["Works with every bank", "Monthly list with renewal dates", "Cancel links included"], price: "€2.99/month", cta: "Start for €2.99/month",
      primaryText: "Forward your receipts to SubSnitch and get a monthly list of every subscription — and how to cancel it. Free early access.",
      adCta: "Sign Up", description: "Find forgotten subscriptions.",
      audience: { location: "Germany", age: "21–40", interests: ["Personal finance", "Budgeting", "Saving money", "Netflix"] }, dailyEur: 15, days: 7,
      searchIntent: true, googleKeywords: ["abo übersicht app", "forgotten subscriptions"], redditSubs: ["r/Finanzen"],
      sim: sim(9.1, 0.012, 0.045, 0.006),
      // Original seeded result: €105 spend, 139 clicks → visitors, 6 signups → waitlist.
      results: { startedAt: "2026-10-10", endedAt: "2026-10-17", simulated: true, bySource: metaOnly({ spendEur: 105, visitors: 139, priceClicks: 1, checkoutStarts: 0, waitlistSignups: 6 }) },
    }),
  },
  runner(
    { id: "split-rent", night: "2026-10-10", rank: 2, market: "DE", niche: "Personal finance", name: "FairSplit", pitch: "Split rent and bills in shared flats by room size and usage.", rationale: "Splitwise dominates; room-size angle is niche.", signals: [{ label: "WG forums discuss fair splitting", source: "WG-Gesucht forum" }], scores: { demand: 69, competition: 50, buildEffort: 78, monetization: 48, total: 64 } },
    { source: "complaints", evidenceSummary: "Shared-flat forums discuss fair splitting; Splitwise dominates.", borderline_note: "Near-miss at 64: the room-size angle is real but niche next to Splitwise." },
  ),
  runner(
    { id: "tax-receipts", night: "2026-10-10", rank: 3, market: "DE", niche: "Personal finance", name: "ReceiptBox", pitch: "Snap receipts year-round, export a tax-ready folder in March.", rationale: "Tax apps bundle receipt capture; low differentiation.", signals: [{ label: "Tax-season spike in receipt app searches", source: "Keyword tool" }], scores: { demand: 64, competition: 42, buildEffort: 70, monetization: 55, total: 57 } },
    { source: "proven-model", evidenceSummary: "Tax apps already bundle receipt capture." },
  ),
];
