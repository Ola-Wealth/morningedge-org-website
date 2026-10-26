#!/usr/bin/env bash
# Push the booking environment variables from .env.local up to Vercel.
#
#   1. npx vercel login      (one time, opens a browser)
#   2. npx vercel link       (one time, pick the morningedge-org-website project)
#   3. bash scripts/push-env-to-vercel.sh
#
# Safe to re-run: each variable is removed and re-added, so values are
# replaced rather than duplicated. Nothing is printed except the key names.

set -u

cd "$(dirname "$0")/.." || exit 1

ENV_FILE=".env.local"
[ -f "$ENV_FILE" ] || { echo "No $ENV_FILE here. Run this from the project."; exit 1; }

# Server-side only. NEXT_PUBLIC_* is deliberately excluded: those are baked
# into the browser bundle and must never hold a secret.
KEYS=(
  RESEND_API_KEY
  EMAIL_FROM
  ZOOM_MEETING_URL
  GOOGLE_SHEET_WEBHOOK_URL
  BOOKINGS_SHEET_WEBHOOK_URL
)

TARGETS=(production preview development)

for key in "${KEYS[@]}"; do
  # Take the first match, strip the key, trim quotes and any stray CR.
  value="$(grep -m1 -E "^${key}=" "$ENV_FILE" | cut -d= -f2- | tr -d '\r' | sed -E 's/^"(.*)"$/\1/')"

  if [ -z "${value}" ]; then
    echo "SKIP  ${key}  (not set in ${ENV_FILE})"
    continue
  fi

  for target in "${TARGETS[@]}"; do
    npx --yes vercel@latest env rm "$key" "$target" --yes >/dev/null 2>&1
    printf '%s' "$value" | npx --yes vercel@latest env add "$key" "$target" >/dev/null 2>&1 \
      && echo "SET   ${key}  ->  ${target}" \
      || echo "FAIL  ${key}  ->  ${target}"
  done
done

echo
echo "Done. Redeploy for the new values to take effect:"
echo "  npx vercel --prod"
