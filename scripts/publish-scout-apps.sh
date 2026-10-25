#!/usr/bin/env bash
# Publish a night's standalone apps to judmir/scout-apps (GitHub Pages, gh-pages branch):
#   https://judmir.github.io/scout-apps/<date>-<slug>/demo/     static demo of the night's POC (if it has `demo:static`)
#   https://judmir.github.io/scout-apps/<date>-<slug>/landing/  validation page preview generated from the brief
#   scripts/publish-scout-apps.sh [YYYY-MM-DD] [--no-push]      (date defaults to today in Europe/Berlin)
# Convention: a POC at startup-research/poc/<slug>-<date>/ opts in with an npm script `demo:static` that honours
# DEMO_BASE_PATH and DEMO_OUT and emits a static export with no API routes, no AI calls and no keys (see README).
# The built tree is secret-scanned (scripts/check-secrets.sh --tree) before the commit; one new gh-pages commit per
# run, never forced. apps.json records demo_url/landing_url (or *_reason when missing); gen-data.py reads it.
# Env: VI_RESEARCH_DIR, SCOUT_APPS_DIR (/workspace/scout-apps), SCOUT_APPS_REPO (judmir/scout-apps), VI_SKIP_VERIFY=1.
set -euo pipefail
main() {
  local VI; VI="$(cd "$(dirname "$0")/.." && pwd)"
  local DATE="" PUSH=1
  for a in "$@"; do case "$a" in --no-push) PUSH=0 ;; *) DATE="$a" ;; esac; done
  DATE="${DATE:-$(TZ=Europe/Berlin date +%F)}"
  [[ "$DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || { echo "publish-scout-apps: date must be YYYY-MM-DD" >&2; exit 2; }
  local R="${VI_RESEARCH_DIR:-/workspace/startup-research}" SA="${SCOUT_APPS_DIR:-/workspace/scout-apps}" REPO="${SCOUT_APPS_REPO:-judmir/scout-apps}"
  local OWNER="${REPO%%/*}" NAME="${REPO#*/}"
  local SITE="https://$OWNER.github.io/$NAME" BRIEF="$R/briefs/$DATE.md"
  [ -f "$BRIEF" ] || { echo "publish-scout-apps: no brief for $DATE ($BRIEF); nothing to publish"; exit 0; }

  local win; win=$(python3 - "$BRIEF" <<'PY'
import re,sys
m=re.search(r'\*\*Winner:\s*(p-\d{3}),\s*([^(,*]+)',open(sys.argv[1]).read())
if m: n=m.group(2).strip(); print(m.group(1), re.sub(r'[^a-z0-9]+','-',n.lower()).strip('-'), n.replace(' ','_'))
PY
)
  [ -n "$win" ] || { echo "publish-scout-apps: brief $DATE names no winner; nothing to publish"; exit 0; }
  local PAIN SLUG PNAME; read -r PAIN SLUG PNAME <<< "$win"; PNAME="${PNAME//_/ }"
  local ID="$DATE-$SLUG" TMP; TMP=$(mktemp -d /tmp/scout-apps-XXXX)
  echo "publish-scout-apps: $ID ($PAIN, $PNAME)"

  [ -d "$SA/.git" ] || git clone -q "https://github.com/$REPO.git" "$SA"
  git -C "$SA" fetch -q origin
  local WT="$TMP/pages"
  if git -C "$SA" rev-parse -q --verify origin/gh-pages >/dev/null; then git -C "$SA" worktree add -q --detach "$WT" origin/gh-pages
  else git -C "$SA" worktree add -q --detach "$WT" && git -C "$WT" checkout -q --orphan "pages-$$" && git -C "$WT" rm -rqf . ; fi
  trap "git -C '$SA' worktree remove --force '$WT' >/dev/null 2>&1 || true; git -C '$SA' branch -D 'pages-$$' >/dev/null 2>&1 || true; rm -rf '$TMP'" EXIT

  # 1) Demo from the POC's demo:static script.
  local POC="" DEMO_REASON="" POC_SHA=""
  POC=$(ls -d "$R/poc/$SLUG-$DATE" "$R"/poc/*-"$DATE" 2>/dev/null | head -1 || true)
  if [ -z "$POC" ] || [ ! -f "$POC/package.json" ]; then DEMO_REASON="No POC was built this night"
  elif ! python3 -c 'import json,sys; sys.exit(0 if "demo:static" in json.load(open(sys.argv[1])).get("scripts",{}) else 1)' "$POC/package.json"; then
    DEMO_REASON="The POC has no static demo (no demo:static script)"
  else
    [ -d "$POC/node_modules" ] || (cd "$POC" && npm ci --silent >/dev/null 2>&1 || npm install --silent >/dev/null 2>&1)
    if (cd "$POC" && DEMO_BASE_PATH="/$NAME/$ID/demo" DEMO_OUT="$TMP/demo" npm run -s demo:static); then
      POC_SHA=$(git -C "$POC" rev-parse --short HEAD 2>/dev/null || echo "")
      [ -z "$(git -C "$POC" status --porcelain --untracked-files=no 2>/dev/null)" ] || POC_SHA="$POC_SHA+local"
    else DEMO_REASON="The static demo build failed"; fi
  fi
  # 2) Landing from the brief's validation page proposal.
  local LANDING_REASON=""
  python3 "$SA/tools/make-landing.py" --brief "$BRIEF" --pain "$PAIN" --name "$PNAME" --date "$DATE" --out "$TMP/landing" >/dev/null \
    || LANDING_REASON="The brief has no validation page proposal for $PAIN"

  # 3) Assemble (template/tools come from scout-apps main, so the latest template is used every night).
  mkdir -p "$WT/$ID"
  if [ -z "$DEMO_REASON" ]; then rm -rf "$WT/$ID/demo"; cp -r "$TMP/demo" "$WT/$ID/demo"
  elif [ -d "$WT/$ID/demo" ]; then echo "publish-scout-apps: keeping the earlier demo ($DEMO_REASON)" >&2; DEMO_REASON=""; fi
  if [ -z "$LANDING_REASON" ]; then rm -rf "$WT/$ID/landing"; cp -r "$TMP/landing" "$WT/$ID/landing"
  elif [ -d "$WT/$ID/landing" ]; then LANDING_REASON=""; fi
  python3 - "$WT/apps.json" "$ID" "$DATE" "$PAIN" "$PNAME" "$SITE" "$DEMO_REASON" "$LANDING_REASON" "$POC_SHA" <<'PY'
import json,os,sys,datetime
p,i,d,pain,name,site,dr,lr,poc=sys.argv[1:]
data=json.load(open(p)) if os.path.exists(p) else {"apps":[]}
old=next((a for a in data["apps"] if a["id"]==i),{})
data["apps"]=[a for a in data["apps"] if a["id"]!=i]
a={"id":i,"date":d,"painId":pain,"name":name,
   "demo_url":None if dr else f"{site}/{i}/demo/","demo_reason":dr or None,
   "landing_url":None if lr else f"{site}/{i}/landing/","landing_reason":lr or None,
   "poc_commit":poc or old.get("poc_commit"),"published_at":datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}
data["apps"].append(a); data["apps"].sort(key=lambda x:x["id"])
json.dump(data,open(p,"w"),indent=1); open(p,"a").write("\n")
print("publish-scout-apps: demo", a["demo_url"] or "— "+dr, "| landing", a["landing_url"] or "— "+lr)
PY
  python3 "$SA/tools/make-index.py" "$WT" >/dev/null

  # 4) Secret scan of the whole built tree, commit, scan the commit, push.
  "$VI/scripts/check-secrets.sh" --tree "$WT"
  git -C "$WT" add -A
  if git -C "$WT" diff --cached --quiet; then echo "publish-scout-apps: nothing changed"; else
    CHECK_REPO="$WT" "$VI/scripts/check-secrets.sh"
    git -C "$WT" -c user.name="$(git -C "$VI" config user.name)" -c user.email="$(git -C "$VI" config user.email)" \
      commit -qm "Publish $ID: ${DEMO_REASON:+no }demo${POC_SHA:+ (poc $POC_SHA)} + ${LANDING_REASON:+no }landing (validation-ideas/scripts/publish-scout-apps.sh)"
    echo "publish-scout-apps: committed $(git -C "$WT" rev-parse --short HEAD)"
    if [ $PUSH -eq 1 ]; then
      if git -C "$SA" rev-parse -q --verify origin/gh-pages >/dev/null; then CHECK_REPO="$WT" "$VI/scripts/check-secrets.sh" origin/gh-pages..HEAD; fi
      git -C "$WT" push -q origin HEAD:refs/heads/gh-pages
      git -C "$SA" fetch -q origin
      echo "publish-scout-apps: pushed gh-pages $(git -C "$SA" rev-parse --short origin/gh-pages)"
    fi
  fi
  [ $PUSH -eq 1 ] || exit 0
  gh api "repos/$REPO/pages" >/dev/null 2>&1 || { gh api -X POST "repos/$REPO/pages" -f 'source[branch]=gh-pages' -f 'source[path]=/' >/dev/null && echo "publish-scout-apps: enabled GitHub Pages"; }

  # 5) Live check: apps.json shows this run, and each URL answers 200 with the noindex page.
  [ "${VI_SKIP_VERIFY:-0}" = 1 ] && exit 0
  local stamp; stamp=$(python3 -c 'import json,sys; print(next(a["published_at"] for a in json.load(open(sys.argv[1]))["apps"] if a["id"]==sys.argv[2]))' "$WT/apps.json" "$ID")
  local ok=0
  for i in $(seq 1 30); do
    sleep 15
    curl -fsS "$SITE/apps.json?v=$RANDOM" 2>/dev/null | grep -qF "$stamp" && { ok=1; break; }
  done
  [ $ok -eq 1 ] || { echo "publish-scout-apps: $SITE/apps.json not updated after 7.5 min" >&2; exit 1; }
  local fail=0 u body
  for u in $(python3 -c 'import json,sys; a=next(a for a in json.load(open(sys.argv[1]))["apps"] if a["id"]==sys.argv[2]); print(" ".join(x for x in (a["demo_url"],a["landing_url"]) if x))' "$WT/apps.json" "$ID"); do
    body=$(curl -fsS "$u?v=$RANDOM" 2>/dev/null || true)
    if grep -q 'noindex' <<< "$body"; then echo "publish-scout-apps: live $u"; else echo "publish-scout-apps: NOT live $u" >&2; fail=1; fi
  done
  exit $fail
}
main "$@"
