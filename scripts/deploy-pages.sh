#!/usr/bin/env bash
# Build the GitHub Pages site from origin/main, add the run videos, and push one new gh-pages commit.
# No main commit is needed to publish a new night's video: drop it in /workspace/run-videos/<date>/ and run this.
#   scripts/deploy-pages.sh
# Env: /workspace/.vi-supabase.env (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) is sourced in a
# subshell for the build only; values are never printed. NEXT_PUBLIC_SETTINGS_LOCAL is always unset here.
set -euo pipefail
cd "$(dirname "$0")/.."
ENV_FILE="${VI_ENV_FILE:-/workspace/.vi-supabase.env}"
git fetch -q origin
[ -z "$(git status --porcelain --untracked-files=no)" ] || { echo "deploy: working tree has changes; commit or stash first" >&2; exit 1; }
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ] || { echo "deploy: HEAD is not origin/main; check out main at origin/main first" >&2; exit 1; }
SHA=$(git rev-parse --short HEAD)
(
  [ -f "$ENV_FILE" ] && { set -a; . "$ENV_FILE"; set +a; } || echo "deploy: no $ENV_FILE, Settings will show 'Not connected'" >&2
  unset NEXT_PUBLIC_SETTINGS_LOCAL
  NEXT_PUBLIC_BASE_PATH=/validation-ideas npm run build >/tmp/vi-pages-build.log 2>&1
) || { echo "deploy: build failed, see /tmp/vi-pages-build.log" >&2; exit 1; }
touch out/.nojekyll
scripts/sync-run-videos.sh
n=$( (grep -o '"date"' out/videos/manifest.json || true) | wc -l)
WT=$(mktemp -d /tmp/ghp-XXXX)
git worktree add -q --detach "$WT" origin/gh-pages
trap 'git worktree remove --force "$WT" >/dev/null 2>&1 || true' EXIT
find "$WT" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -a out/. "$WT"/
cd "$WT"
git add -A
if git diff --cached --quiet; then echo "deploy: nothing changed"; exit 0; fi
git commit -qm "Deploy $SHA ($n run video(s))"
git push -q origin HEAD:gh-pages
echo "deploy: gh-pages $(git rev-parse --short HEAD) = main $SHA + $n run video(s)"
