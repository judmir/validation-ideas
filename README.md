# Validation Ideas (PoC)

Dashboard for the nightly startup-research pipeline (scout 00:30 → analyst 03:00 → builder 04:30 → brief 07:30).
Next.js 15 (App Router) + TypeScript + Tailwind v4, static export.

**Static data.** `lib/mock/*` is reshaped from real pipeline output (pains.json, us/*.jsonl, the briefs, the POC notes) by
`scripts/gen-data.py` (see "Nightly import" below); the app never reads the pipeline at build or run time. No real ads, payments, checkout or emails: "Start for $X/month" and "Join waitlist"
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
- `/demo/<date>/` the night's private POC as a captioned screenshot walkthrough (390 + 1280px); the app itself is never launched publicly.
- `/validation/<date>/` the brief's proposed validation page, shown as "Proposal, not built" (no page, ad or signup is published).
- `/architecture/` animated pipeline diagram and change history.
- `/settings/` pipeline rules, versioned in Supabase (see below).

Rules (`lib/types.ts` `RULES`, `lib/verdict.ts`): score /25, bar 18, near-miss 15–17; verdict derived from score + gates + competitor veto
(pains.json `status` is ignored). Winner = 18+, every gate passed, no competitor veto. Any other pain at 15+ is a near-miss regardless of the veto or a failed gate, tagged "Vetoed" / "Fails gate: …" (never passed, so no Demo/Validation). Killed = decline-stage PLC only; under 15 = below bar. Fake-door verdict: < 100 visitors = not enough traffic, price-click rate > 3% strong, < 1% kill, else inconclusive.
Product prices are USD; ad budgets EUR 30–50 per idea.

## Settings storage (Supabase)

`/settings/` edits the pipeline rules. The backend **already exists** (no schema ships in this repo):
- `public.pipeline_settings_versions` (id, version int unique, settings jsonb, note, created_at, created_by default `auth.uid()`): append-only; anyone can read, only admins can insert.
- `public.pipeline_settings_latest`: view of the highest version (what the nightly routines read).
- `public.settings_admins`: who may save. Not used by the page; App ideas adds Judi there after his first sign-in.

The page reads both in the browser at runtime, so a save shows up on the live site without a rebuild. Saving inserts
`{version: latest+1, settings, note}` after a diff confirmation. `config/pipeline-settings.json` is version 1 (identical to the seed)
and the fallback when the build has no Supabase env or a read fails ("Not connected", read-only).

Build env (never committed; kept in `/workspace/.vi-supabase.env`, chmod 600, sourced only for the Pages build and local test builds):
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the publishable key; frontend-safe, baked into the build).
- `NEXT_PUBLIC_SETTINGS_LOCAL=1`: dev-only "Local test mode" (fake admin session, saves in localStorage). Never set it for the Pages build.

```bash
set -a; . /workspace/.vi-supabase.env; set +a
NEXT_PUBLIC_BASE_PATH=/validation-ideas npm run build
```

Sign-in is a Supabase email magic link (no GitHub OAuth). In the Supabase dashboard, Authentication → URL Configuration, add
`https://judmir.github.io/validation-ideas/settings/` to the Redirect URLs (plus e.g. `http://localhost:4180/settings/` for local builds).
After the first sign-in, App ideas adds that user to `settings_admins`; until then a save shows "Signed in, but not an admin yet".

## Run videos (gh-pages only)

App ideas renders a narrated MP4 per scout night at `/workspace/run-videos/<YYYY-MM-DD>/scout-run-<YYYY-MM-DD>.mp4`.
The MP4s are **never committed to main** (`public/videos/` is git-ignored). At deploy time `scripts/sync-run-videos.sh` copies
each one into `out/videos/<date>.mp4` (refusing any file of 95 MB or more, since GitHub's limit is 100 MB) and writes
`out/videos/manifest.json` (`{date, src, bytes, duration_s}` per video; durations via ffprobe). So the videos live only in the
gh-pages branch. The site fetches `${basePath}/videos/manifest.json` at runtime and shows a "Watch run video" player on that
night's scout run (home timeline and /nights) and on its winning idea page (incl. a fallback winner). No manifest or no entry: no player.

Deploy (main as on origin, plus all videos) in one command; a new night's video needs no main commit:

```bash
scripts/deploy-pages.sh
```

It refuses to run unless HEAD is origin/main with a clean tree, sources `/workspace/.vi-supabase.env` in a subshell for the
build, runs `NEXT_PUBLIC_BASE_PATH=/validation-ideas npm run build`, adds `.nojekyll`, syncs the videos and pushes one new gh-pages commit.

## Nightly import (one command per night)

After the final report (~05:05, ready by 06:00), run on the box:

```bash
cd /workspace/validation-ideas && scripts/nightly-publish.sh            # today (Europe/Berlin)
cd /workspace/validation-ideas && scripts/nightly-publish.sh 2026-10-25 # a given night
```

It runs, in order:
1. `scripts/import-night.sh <date>`: checks out `main` at `origin/main` (fast-forward only), runs `scripts/gen-data.py`, type-checks,
   and commits **only** `lib/mock/{ideas,legacy,imported}.ts` as "Data: import night <date> …". `scripts/check-secrets.sh` checks the
   staged diff (and the push range) for key-like strings and refuses if anything secret-looking is in it; then it pushes `main`.
   Nothing changed → no commit. (`--no-push` commits locally only.)
2. `git checkout --detach origin/main` and `scripts/deploy-pages.sh`: build, `sync-run-videos.sh`, `sync-demo-shots.sh`, one gh-pages commit.
3. Live checks (skip with `VI_SKIP_VERIFY=1`): `/nights/` lists the date; the winner's idea page, `/demo/<date>/`, `/validation/<date>/`
   and `videos/<date>.mp4` (video/mp4) return 200 when the night has them.

What `scripts/gen-data.py` reads (from `/workspace/startup-research`, or `VI_RESEARCH_DIR`):
- `pains.json` + `us/complaints.jsonl` + `us/proven-models.jsonl` → `lib/mock/ideas.ts` (one entry per pain id) and `legacy.ts` (Germany).
  A pain's night is the first scout night it was seen (`runs_seen[0]`), so pains merged into later runs stay on their own night.
- `briefs/<date>.md` (25 Oct on) → `lib/mock/imported.ts` `BRIEFS`: the "## Idea N … : Name (p-XXX)" sections (name, pitch, price, MVP,
  kill list, quote order), the winner ("WINNER" / "Fallback (below bar)"), the "Validation page proposal" section and the winner's
  "Cheapest test this week" (budget, visitors, kill/strong thresholds). The latest brief wins: a pain pitched again on a later night keeps
  its id and is updated in place; earlier brief names stay as `aka` (p-073 was "ReelRecipe" on 22 Oct and is "Cardbox" from 25 Oct; the
  22 Oct night still lists it as ReelRecipe → "Now Cardbox", and its page says so).
- `log.md`, `us/*.jsonl`, `pitched.json` → `IMPORTED_NIGHTS` (counts by source, blocked sources, steps, new/updated pains, winner) and
  `PITCHED_IMPORTED`. Nights before 25 Oct stay hand-written in `lib/mock/nights.ts`.
- `poc/<date>.md` + `poc/<date>-shots/NN-slug-{390,1280}.png` → the demo walkthrough (captions from the file names, real/mocked chips
  matched against the note's "Real vs mocked" table, and the label, e.g. "Demo screenshots · app runs privately · checkout and household
  invite are mocked").

Demo screenshots (~15 MB a night) are handled like the run videos: **never committed to main** (`public/demo/` is git-ignored);
`scripts/sync-demo-shots.sh` copies `poc/<date>-shots/` into `out/demo/<date>/` at deploy, so they live only in gh-pages. For local dev:
`scripts/sync-demo-shots.sh /workspace/startup-research/poc public`.

Buttons: the night's big card (home and `/nights/`) and the winner's idea page (right under the title) show **▶ Watch run video**
(only when `videos/manifest.json` lists the date; it scrolls to the night's player and plays it), **Open demo** (`/demo/<date>/`) and
**Validation page** (`/validation/<date>/`). A night without a video, POC or proposal shows that pill disabled with a short reason;
nights without a brief (before 25 Oct) are unchanged.
