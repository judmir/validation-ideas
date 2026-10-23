# Validation Ideas (PoC)

Dashboard for the nightly startup-research pipeline (scout 00:30 → analyst 03:00 → builder 04:30 → brief 07:30).
Next.js 15 (App Router) + TypeScript + Tailwind v4, static export.

**100% mock data.** `lib/mock/*` is reshaped from real pipeline output (pains.json, us/*.jsonl, the briefs) but the app never
reads the pipeline at build or run time. No real ads, payments, checkout or emails: "Start for $X/month" and "Join waitlist"
are previews, the ad kit is copy-and-paste, and validation results are simulated. State lives in localStorage (`vi:*` keys);
use "Reset demo" in the footer to clear it.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → ./out  (NEXT_PUBLIC_BASE_PATH=/validation-ideas for GitHub Pages)
npm start            # serves ./out on http://localhost:4180
```

Routes:
- `/` Ideas board: last-night card, stats, ideas **By night** (timeline, default) or **By outcome** (winner / near-miss / killed / below bar). Old Germany pains p-001–p-071 sit behind a filter.
- `/idea/[painId]/` tabs `#evidence | #validate | #report` (`#scout` → `#evidence`, `#page` → Validate's landing preview). Validate/Report are for winners only; DinnerList (p-072) is a clearly labelled simulated winner.
- `/nights/` night runs, week-over-week cluster growth, pitched ideas.

Rules (`lib/types.ts` `RULES`, `lib/verdict.ts`): score /25, bar 18, near-miss 15–17; verdict derived from score + gates + competitor veto
(pains.json `status` is ignored). Fake-door verdict: < 100 visitors = not enough traffic, price-click rate > 3% strong, < 1% kill, else inconclusive.
Product prices are USD; ad budgets EUR 30–50 per idea.
