import { TARGET_CPS, TARGET_SIGNUP_RATE, type FinishedResult, type Idea } from "./data";

export function metrics(r: { spend: number; impressions: number; clicks: number; signups: number }) {
  const ctr = r.impressions ? r.clicks / r.impressions : 0;
  const signupRate = r.clicks ? r.signups / r.clicks : 0;
  const cps = r.signups ? r.spend / r.signups : Infinity;
  const cpc = r.clicks ? r.spend / r.clicks : 0;
  return { ctr, signupRate, cps, cpc };
}

export function verdict(idea: Idea, r: FinishedResult) {
  const m = metrics(r);
  const winner = m.cps <= TARGET_CPS && m.signupRate >= TARGET_SIGNUP_RATE;
  const cpsTxt = isFinite(m.cps) ? `€${m.cps.toFixed(2)}` : "n/a";
  const recommendation = winner
    ? `${idea.name} beat both targets (cost per signup ${cpsTxt} vs €${TARGET_CPS} target; signup rate ${(m.signupRate * 100).toFixed(1)}%). Recommend investing more: build the MVP behind the waitlist, email the ${r.signups} signups for 5 discovery calls, and run a second 14-day test at 2× budget to confirm the CPS holds at scale.`
    : `${idea.name} missed the targets (cost per signup ${cpsTxt} vs €${TARGET_CPS} target; signup rate ${(m.signupRate * 100).toFixed(1)}% vs ${(TARGET_SIGNUP_RATE * 100).toFixed(0)}%). Recommend not investing further in this form. Optionally try one cheap pivot of the landing-page angle (≤ €50), otherwise archive it and move budget to the next scout run's top pick.`;
  const confidence = r.clicks > 300 ? "High" : r.clicks > 120 ? "Medium" : "Low";
  return { winner, recommendation, confidence, ...m };
}
