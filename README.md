# Validation Ideas (PoC)

Dashboard for a nightly idea scout (scout 00:30 → analyst 03:00 → builder 04:30 → brief 07:30).
Next.js 15 (App Router) + TypeScript + Tailwind v4, static export.

**100% fictional mock data.** `lib/mock/*` holds the original mock set (InvoiceChaser, RestockRadar, NoShow Guard,
StandupBot Lite, SubSnitch and their runner-ups across 5 scout runs). No real ads, payments, checkout or emails:
"Start for €X/month" and "Join waitlist" are previews, the ad kit is copy-and-paste, and validation results are simulated.
State lives in localStorage (`vi:*` keys); use "Reset demo" in the footer to clear it.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → ./out  (NEXT_PUBLIC_BASE_PATH=/validation-ideas for GitHub Pages)
npm start            # serves ./out on http://localhost:4180
```

Routes:
- `/` Ideas board: last-night card, stats, ideas **By night** (timeline, default) or **By outcome** (winner / near-miss / killed / below bar).
- `/idea/[id]/` tabs `#evidence | #validate | #report` (`#scout` → `#evidence`, `#page` → Validate's landing preview). Validate/Report exist only for each run's top pick.
- `/nights/` scout runs, top picks and their tests, week-over-week signal growth.

Rules (`lib/types.ts` `RULES`, `lib/verdict.ts`): score /100, bar 75, near-miss 60–74; verdict derived from score + gates + competitor veto,
and a finished test with a "Kill" result kills the idea. Fake-door verdict: < 100 visitors = not enough traffic, price-click rate > 3% strong,
< 1% kill, else inconclusive. Prices and ad budgets are EUR.
