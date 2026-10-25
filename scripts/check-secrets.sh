#!/usr/bin/env bash
# Refuse a commit/push that carries anything secret-looking. Checks the staged files (default) or a commit range.
#   scripts/check-secrets.sh                 # staged changes (run after `git add`, before `git commit`)
#   scripts/check-secrets.sh origin/main..HEAD   # commits about to be pushed
#   scripts/check-secrets.sh --tree DIR          # every file under DIR (built output, e.g. a static demo's out/)
#   CHECK_REPO=/path/to/other/repo scripts/check-secrets.sh [range]   # same checks in another repo (e.g. scout-apps)
# Prints only file names and the matching pattern name, never the matched value.
set -euo pipefail
SELF="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")"
TREE=""
if [ "${1:-}" = "--tree" ]; then TREE="$(cd "${2:?--tree needs a directory}" && pwd)"; shift 2; fi
cd "${CHECK_REPO:-$(dirname "$0")/..}"
# This script's own pattern list is the only path excluded from the content scan (its file name is still checked).
EX=':(exclude)scripts/check-secrets.sh'
if [ $# -gt 0 ]; then files=$(git diff --name-only "$1"); diff=$(git diff "$1" -- . "$EX"); else files=$(git diff --cached --name-only); diff=$(git diff --cached -- . "$EX"); fi
bad=0
while IFS= read -r f; do
  [ -n "$f" ] || continue
  case "$(basename "$f")" in
    .env|.env.*|*.pem|*.key|*.p12|id_rsa*|id_ed25519*|*credentials*|*.vi-supabase.env) echo "check-secrets: REFUSED file $f (secret-like name)" >&2; bad=1 ;;
  esac
done <<< "$files"
added=$(printf '%s\n' "$diff" | grep -E '^\+' | grep -vE '^\+\+\+ ' || true)
declare -A P=(
  [private_key]='-----BEGIN [A-Z ]*PRIVATE KEY'
  [aws_key]='AKIA[0-9A-Z]{16}'
  [github_token]='(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}'
  [openai_anthropic_key]='sk-(ant-)?[A-Za-z0-9_-]{20,}'
  [slack_token]='xox[abprs]-[A-Za-z0-9-]{10,}'
  [google_key]='AIza[0-9A-Za-z_-]{35}'
  [jwt]='eyJ[A-Za-z0-9_-]{15,}\.eyJ[A-Za-z0-9_-]{15,}\.'
  [service_role]='service_role'
  [key_assignment]='(API_KEY|SECRET|TOKEN|PASSWORD|ANON_KEY|SERVICE_KEY)[A-Z_]*[[:space:]]*[:=][[:space:]]*["'"'"']?[A-Za-z0-9_/+.-]{12,}'
  [password_assignment]='[Pp]assword[[:space:]]*[:=][[:space:]]*["'"'"'][^"'"'"']{4,}'
)
if [ -n "$TREE" ]; then
  # Built output: also refuse any mention of the AI provider or key headers (the static demo must not know about them).
  P[anthropic]='sk-ant|ANTHROPIC|anthropic\.com|x-api-key|OPENAI_API|XAI_API'
  while IFS= read -r f; do
    case "$(basename "$f")" in .env|.env.*|*.pem|*.key|*.p12|id_rsa*|id_ed25519*|*credentials*) echo "check-secrets: REFUSED file ${f#$TREE/} (secret-like name)" >&2; bad=1 ;; esac
  done < <(find "$TREE" -type f -not -path '*/.git/*')
  for name in "${!P[@]}"; do
    hits=$(grep -rElI --exclude-dir=.git -- "${P[$name]}" "$TREE" | grep -vxF "$SELF" || true)
    if [ -n "$hits" ]; then echo "check-secrets: REFUSED, pattern '$name' in: $(sed "s|^$TREE/||" <<< "$hits" | tr '\n' ' ')" >&2; bad=1; fi
  done
  [ $bad -eq 0 ] && echo "check-secrets: OK (tree ${TREE}: $(find "$TREE" -type f -not -path '*/.git/*' | wc -l) file(s), no secret-looking content)"
  exit $bad
fi
for name in "${!P[@]}"; do
  if grep -Eq -- "${P[$name]}" <<< "$added"; then echo "check-secrets: REFUSED, added lines match pattern '$name'" >&2; bad=1; fi
done
[ $bad -eq 0 ] && echo "check-secrets: OK ($(printf '%s\n' "$files" | grep -c . || true) file(s), no secret-looking content)"
exit $bad
