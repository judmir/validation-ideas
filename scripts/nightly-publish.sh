#!/usr/bin/env bash
# One command per night: publish the standalone apps, import the night, sync run video + demo screenshots, build,
# deploy, verify live.
#   scripts/nightly-publish.sh [YYYY-MM-DD]      (date defaults to today in Europe/Berlin)
# = scripts/publish-scout-apps.sh <date>  (static demo via the POC's `demo:static` + landing from the brief →
#     judmir/scout-apps gh-pages, apps.json; checks those URLs live)
#   → scripts/import-night.sh <date>  (gen-data reads apps.json; commits only the data files to main and pushes)
#   → git checkout --detach origin/main → scripts/deploy-pages.sh (build with the Supabase env in a subshell,
#     sync-run-videos.sh, sync-demo-shots.sh, one new gh-pages commit) → curl checks on the live site.
# Set VI_SKIP_VERIFY=1 to skip the live checks.
set -euo pipefail
main() {
  cd "$(dirname "$0")/.."
  local DATE="${1:-$(TZ=Europe/Berlin date +%F)}"
  scripts/publish-scout-apps.sh "$DATE"
  scripts/import-night.sh "$DATE"
  git fetch -q origin
  git checkout -q --detach origin/main
  scripts/deploy-pages.sh
  [ "${VI_SKIP_VERIFY:-0}" = 1 ] && exit 0
  local SITE="${VI_SITE:-https://judmir.github.io/validation-ideas}"
  # What this night should have: winner page, demo, validation proposal, video (from the data + the export).
  local want; want=$(python3 - "$DATE" <<'PY'
import json,re,sys
d=sys.argv[1]; s=open('lib/mock/imported.ts').read()
b=json.loads(re.search(r'BRIEFS: NightBrief\[\] = (\[.*?\n\]);',s,re.S).group(1))
x=next((y for y in b if y['date']==d),None)
a=(x or {}).get('apps') or {}
print(x['winnerPainId'] if x and x['winnerPainId'] else '-', int(bool(x and x['demo'])), int(bool(x and x['validation'])), a.get('demo_url') or '-', a.get('landing_url') or '-')
PY
)
  read -r WIN DEMO VAL DEMO_URL LANDING_URL <<< "$want"
  local VID=0; grep -q "\"date\":\"$DATE\"" out/videos/manifest.json 2>/dev/null && VID=1
  echo "nightly-publish: waiting for Pages ($SITE)…"
  local ok=0
  for i in $(seq 1 20); do
    sleep 15
    curl -fsS -o /tmp/vi-live-nights.html "$SITE/nights/?v=$RANDOM" 2>/dev/null || continue
    # Wait for this deploy, not an older cached one: the date and (when published) the standalone links must be there.
    grep -q "$DATE" /tmp/vi-live-nights.html || continue
    [ "$DEMO_URL" = "-" ] || grep -qF "href=\"$DEMO_URL\"" /tmp/vi-live-nights.html || continue
    [ "$LANDING_URL" = "-" ] || grep -qF "href=\"$LANDING_URL\"" /tmp/vi-live-nights.html || continue
    ok=1; break
  done
  [ $ok -eq 1 ] || { echo "nightly-publish: /nights/ does not list $DATE after 5 min" >&2; exit 1; }
  echo "nightly-publish: /nights/ lists $DATE"
  local fail=0 code
  check() { code=$(curl -s -o /dev/null -w '%{http_code} %{content_type}' "$SITE$1"); echo "nightly-publish: $1 → $code"; [[ "$code" == 200* ]] || fail=1; }
  [ "$WIN" != "-" ] && check "/idea/$WIN/"
  [ "$DEMO" = 1 ] && check "/demo/$DATE/"
  [ "$VAL" = 1 ] && check "/validation/$DATE/"
  if [ $VID = 1 ]; then check "/videos/$DATE.mp4"; [[ "$code" == *video/mp4* ]] || fail=1; fi
  # Standalone apps: the buttons must point at them, and they must answer.
  local u
  for u in "$DEMO_URL" "$LANDING_URL"; do
    [ "$u" != "-" ] || continue
    grep -qF "href=\"$u\"" /tmp/vi-live-nights.html && echo "nightly-publish: /nights/ links $u" || { echo "nightly-publish: /nights/ does not link $u" >&2; fail=1; }
    code=$(curl -s -o /dev/null -w '%{http_code}' "$u"); echo "nightly-publish: $u → $code"; [ "$code" = 200 ] || fail=1
  done
  [ $fail -eq 0 ] && echo "nightly-publish: $DATE is live" || { echo "nightly-publish: some checks failed" >&2; exit 1; }
}
main "$@"
