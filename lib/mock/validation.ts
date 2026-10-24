import type { Validation } from "../types";

/**
 * Simulated validation kit for DinnerList (p-072). DinnerList was actually vetoed by the competitor
 * check; it stands in as a demo winner so the Validate and Report tabs have something to show.
 * Nothing here is live: no ads, payments, checkout or emails.
 */
export const DINNERLIST_VALIDATION: Validation = {
  landing: {
    slug: "dinnerlist",
    headline: "Pick 5 dinners. Get one grocery list.",
    subhead: "The simple weeknight planner Mealime used to be. Works with any store, no ads, no AI chat.",
    bullets: ["40 tested weeknight dinners", "One combined, aisle-sorted list", "Share with your partner or copy to Instacart"],
    priceUsdMonthly: 3.99,
    primaryCta: "Start for $3.99/month",
    secondaryCta: "Join waitlist",
  },
  adKit: {
    budgetEur: { min: 30, max: 50 },
    sources: ["meta", "google_search", "reddit"],
    searchIntent: true,
    meta: {
      primaryText: [
        "Mealime is gone. DinnerList brings back the simple part: tap 5 dinners, get one combined grocery list for any store.",
        "Tired at 5:30 and still no plan for dinner? Pick this week's dinners in a minute and the shopping list writes itself.",
      ],
      headlines: ["The simple Mealime, back", "5 dinners, 1 grocery list"],
      description: "Any store. No ads. $3.99/month.",
      audience: { country: "US", age: "25–54", interests: ["Meal planning", "Mealime", "Grocery shopping", "Cooking", "Working parents"] },
    },
    googleKeywords: ["mealime alternative", "mealime replacement", "meal planner grocery list app", "weekly dinner planner app"],
    redditSubs: ["r/mealime", "r/EatCheapAndHealthy", "r/mealprep"],
    utm: {
      meta: "?utm_source=facebook&utm_medium=paid_social&utm_campaign=p-072-dinnerlist",
      google_search: "?utm_source=google&utm_medium=cpc&utm_campaign=p-072-dinnerlist",
      reddit: "?utm_source=reddit&utm_medium=paid_social&utm_campaign=p-072-dinnerlist",
    },
  },
  sim: {
    meta: { eurPerVisitor: 0.21, priceClickRate: 0.026, checkoutRate: 0.35, waitlistRate: 0.045 },
    google_search: { eurPerVisitor: 0.38, priceClickRate: 0.041, checkoutRate: 0.4, waitlistRate: 0.03 },
    reddit: { eurPerVisitor: 0.3, priceClickRate: 0.02, checkoutRate: 0.3, waitlistRate: 0.06 },
  },
  results: {
    startedAt: "2026-10-24",
    endedAt: "2026-10-27",
    simulated: true,
    bySource: [
      { source: "meta", spendEur: 32, visitors: 151, priceClicks: 4, checkoutStarts: 1, waitlistSignups: 7 },
      { source: "google_search", spendEur: 14, visitors: 37, priceClicks: 1, checkoutStarts: 0, waitlistSignups: 1 },
      { source: "reddit", spendEur: 0, visitors: 0, priceClicks: 0, checkoutStarts: 0, waitlistSignups: 0 },
    ],
  },
};
