#!/usr/bin/env bash
# Copy each night's POC demo screenshots into the static export, after `npm run build`:
#   /workspace/startup-research/poc/<date>-shots/*.png  ->  out/demo/<date>/*.png
# ~15 MB a night, so like the run videos they never go into main (public/demo/ is git-ignored): they live only in gh-pages.
# The walkthrough itself (captions, order, real vs mocked) is data in lib/mock/imported.ts (scripts/gen-data.py).
# Usage: scripts/sync-demo-shots.sh [POC_DIR] [OUT_DIR]   (defaults: /workspace/startup-research/poc, out)
#   Local dev: scripts/sync-demo-shots.sh /workspace/startup-research/poc public
set -euo pipefail
SRC="${1:-${VI_POC_DIR:-/workspace/startup-research/poc}}"
OUT="${2:-out}"
LIMIT=$((95 * 1024 * 1024))
[ -d "$OUT" ] || { echo "sync-demo-shots: $OUT not found (run the build first)" >&2; exit 1; }
nights=0; files=0; refused=0
for dir in "$SRC"/*-shots/; do
  [ -d "$dir" ] || continue
  date="$(basename "$dir" -shots)"
  [[ "$date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || continue
  mkdir -p "$OUT/demo/$date"
  n=0
  for f in "$dir"*.png "$dir"*.jpg "$dir"*.webp; do
    [ -f "$f" ] || continue
    if [ "$(stat -c %s "$f")" -ge "$LIMIT" ]; then echo "sync-demo-shots: REFUSED $f (95 MB or more)" >&2; refused=1; continue; fi
    cp "$f" "$OUT/demo/$date/"
    n=$((n + 1))
  done
  echo "sync-demo-shots: $date ($n screenshot(s), $(du -sh "$OUT/demo/$date" | cut -f1))"
  nights=$((nights + 1)); files=$((files + n))
done
echo "sync-demo-shots: $files screenshot(s) from $nights night(s) -> $OUT/demo/"
exit $refused
