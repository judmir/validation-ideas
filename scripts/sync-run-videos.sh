#!/usr/bin/env bash
# Copy narrated run videos into the static export, after `npm run build`:
#   /workspace/run-videos/<date>/scout-run-<date>.mp4  ->  out/videos/<date>.mp4
# and write out/videos/manifest.json (dates, sizes, durations if ffprobe exists).
# The MP4s never go into main: they only live in the gh-pages branch (see README).
# Usage: scripts/sync-run-videos.sh [SRC_DIR] [OUT_DIR]   (defaults: /workspace/run-videos, out)
set -euo pipefail
SRC="${1:-${RUN_VIDEOS_DIR:-/workspace/run-videos}}"
OUT="${2:-out}"
LIMIT=$((95 * 1024 * 1024))   # GitHub rejects files of 100 MB; refuse anything 95 MB or more.

[ -d "$OUT" ] || { echo "sync-run-videos: $OUT not found (run the build first)" >&2; exit 1; }
mkdir -p "$OUT/videos"
entries=()
refused=0
if [ -d "$SRC" ]; then
  for dir in "$SRC"/*/; do
    [ -d "$dir" ] || continue
    date="$(basename "$dir")"
    [[ "$date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || continue
    f="$dir/scout-run-$date.mp4"
    [ -f "$f" ] || continue
    bytes=$(stat -c %s "$f")
    if [ "$bytes" -ge "$LIMIT" ]; then
      echo "sync-run-videos: REFUSED $f ($((bytes / 1024 / 1024)) MB, limit is under 95 MB)" >&2
      refused=1
      continue
    fi
    dur=null
    if command -v ffprobe >/dev/null 2>&1; then
      d=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$f" 2>/dev/null || true)
      # No readable duration = unfinished or broken render (e.g. no moov atom yet): skip it, don't publish.
      if ! [[ "$d" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
        echo "sync-run-videos: SKIPPED $f (ffprobe can't read it; render unfinished or broken)" >&2
        continue
      fi
      dur=$(printf '%.1f' "$d")
    fi
    cp "$f" "$OUT/videos/$date.mp4"
    entries+=("{\"date\":\"$date\",\"src\":\"$date.mp4\",\"bytes\":$bytes,\"duration_s\":$dur}")
    echo "sync-run-videos: $date ($((bytes / 1024)) KB, ${dur}s)"
  done
fi
{
  printf '{"generated":"%s","videos":[' "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  (IFS=,; printf '%s' "${entries[*]:-}")
  printf ']}\n'
} > "$OUT/videos/manifest.json"
echo "sync-run-videos: manifest with ${#entries[@]} video(s) -> $OUT/videos/manifest.json"
exit $refused
