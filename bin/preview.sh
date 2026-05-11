#!/usr/bin/env bash
# Local merge preview — mirrors what .github/workflows/hugo-deploy.yml does.
# Syncs vault → hugo/content/, builds the Hugo blog, drops Hugo's home
# placeholder, overlays the static lander on top, and serves on :8000.
#
# Usage:
#   bin/preview.sh                  # sync + build + serve
#   bin/preview.sh build            # sync + build, no serve
#   bin/preview.sh --no-sync        # skip the vault sync (use whatever's
#                                     in hugo/content/ already)
#   bin/preview.sh build --no-sync  # combine

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/dist-preview"
PORT="${PORT:-8000}"

cd "$ROOT"

# Parse flags
SYNC=true
SERVE=true
for arg in "$@"; do
  case "$arg" in
    --no-sync)  SYNC=false ;;
    build)      SERVE=false ;;
  esac
done

if $SYNC; then
  if [ -f bin/sync-content.sh ]; then
    bin/sync-content.sh || {
      echo "⚠ Vault sync failed — using existing hugo/content/." >&2
    }
  fi
fi

echo "▸ Building Hugo blog → $OUT"
rm -rf "$OUT"
( cd hugo && hugo --minify --gc --destination "$OUT" )

echo "▸ Dropping Hugo's home placeholder (lander owns /)"
rm -f "$OUT/index.html"

echo "▸ Overlaying static lander files"
LANDER_FILES=(
  index.html style.css ai-workflow.html ai-workflow.css
  projects.json humans.txt llms.txt robots.txt sitemap.xml CNAME
)
for f in "${LANDER_FILES[@]}"; do
  [ -e "$f" ] && cp "$f" "$OUT/$f"
done
for d in web assets .well-known; do
  [ -d "$d" ] && cp -r "$d" "$OUT/"
done

echo "▸ Built. Tree (top level):"
find "$OUT" -maxdepth 2 -type f | sort | head -20 | sed 's|.*/dist-preview/|  /|'

if ! $SERVE; then
  echo "✓ Built at $OUT (build-only mode)"
  exit 0
fi

echo
echo "▸ Serving on http://localhost:$PORT — Ctrl+C to stop"
echo "  • Home (lander):  http://localhost:$PORT/"
echo "  • Articles:       http://localhost:$PORT/articles/"
echo "  • Tags:           http://localhost:$PORT/tags/"
echo "  • RSS:            http://localhost:$PORT/index.xml"
echo
cd "$OUT" && python3 -m http.server "$PORT"
