#!/usr/bin/env bash
# Import one scout night from /workspace/startup-research into the app data and push it to main.
#   scripts/import-night.sh [YYYY-MM-DD] [--no-push]     (date defaults to today in Europe/Berlin)
# Steps: check out main at origin/main (fast-forward only) → scripts/gen-data.py → type-check →
# commit ONLY lib/mock/{ideas,legacy,imported}.ts ("Data: import night <date> …") → secret check → push main.
# Nothing changed → no commit. Never amends, never force-pushes. Screenshots and videos are not committed
# (they are synced into the export at deploy by sync-demo-shots.sh / sync-run-videos.sh).
set -euo pipefail
main() {
  cd "$(dirname "$0")/.."
  local DATE="" PUSH=1
  for a in "$@"; do case "$a" in --no-push) PUSH=0 ;; *) DATE="$a" ;; esac; done
  DATE="${DATE:-$(TZ=Europe/Berlin date +%F)}"
  [[ "$DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || { echo "import-night: date must be YYYY-MM-DD, got '$DATE'" >&2; exit 2; }
  local R="${VI_RESEARCH_DIR:-/workspace/startup-research}"
  [ -f "$R/pains.json" ] || { echo "import-night: $R/pains.json not found" >&2; exit 1; }
  [ -f "$R/briefs/$DATE.md" ] || echo "import-night: note: no briefs/$DATE.md yet (night imported without pitched ideas)" >&2
  local DATA=(lib/mock/ideas.ts lib/mock/legacy.ts lib/mock/imported.ts)

  [ -z "$(git status --porcelain --untracked-files=no)" ] || { echo "import-night: working tree has changes; commit or stash first" >&2; exit 1; }
  git fetch -q origin
  git checkout -q main
  git merge -q --ff-only origin/main || { echo "import-night: local main has diverged from origin/main; fix that by hand" >&2; exit 1; }

  python3 scripts/gen-data.py --night "$DATE" > /tmp/vi-import-$DATE.log
  grep '^night ' /tmp/vi-import-$DATE.log || true
  grep -q "\"date\": \"$DATE\"" lib/mock/imported.ts || echo "import-night: WARNING $DATE is not in lib/mock/imported.ts (no log.md section or brief yet?)" >&2
  npx tsc --noEmit >/tmp/vi-import-tsc.log 2>&1 || { git checkout -q -- "${DATA[@]}"; echo "import-night: type check failed (see /tmp/vi-import-tsc.log); data reverted" >&2; exit 1; }

  if git diff --quiet -- "${DATA[@]}"; then echo "import-night: $DATE already imported, data unchanged"; exit 0; fi
  git add -- "${DATA[@]}"
  local extra; extra=$(git diff --cached --name-only | grep -vxF -e "${DATA[0]}" -e "${DATA[1]}" -e "${DATA[2]}" || true)
  [ -z "$extra" ] || { git reset -q; echo "import-night: unexpected staged files: $extra" >&2; exit 1; }
  scripts/check-secrets.sh || { git reset -q -- "${DATA[@]}"; git checkout -q -- "${DATA[@]}"; echo "import-night: refused, data reverted" >&2; exit 1; }
  git commit -qm "Data: import night $DATE from startup-research (scripts/import-night.sh)"
  echo "import-night: committed $(git rev-parse --short HEAD) ($(git diff --shortstat HEAD~1 HEAD | sed 's/^ //'))"
  if [ $PUSH -eq 1 ]; then
    scripts/check-secrets.sh origin/main..HEAD
    git push -q origin main
    echo "import-night: pushed main $(git rev-parse --short HEAD)"
  fi
}
main "$@"
