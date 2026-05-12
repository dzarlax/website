#!/usr/bin/env bash
# Local merge preview — mirrors what .github/workflows/deploy.yml does.
# Builds the Hugo blog (vault content loaded as a Hugo module, replaced with
# the local vault path so you read straight from your working copy), drops
# Hugo's home placeholder, overlays the static lander on top, and serves on
# :8000.
#
# Usage:
#   bin/preview.sh                  # build + serve
#   bin/preview.sh build            # build only, no serve
#
# Requires: hugo (extended) + go (1.22+) + $BLOG_VAULT pointing at the vault
# working copy. Falls back gracefully if Go is absent — see error message.
#
# Historical sync-based flow (bin/sync-content.sh) still works as an escape
# hatch — see docs/MIGRATION-LEVEL2.md.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="$ROOT/dist-preview"
PORT="${PORT:-8000}"

# shellcheck disable=SC1091
. "$SCRIPT_DIR/lib/vault.sh"

cd "$ROOT"

SERVE=true
for arg in "$@"; do
  case "$arg" in
    build) SERVE=false ;;
    --no-sync)
      echo "(--no-sync is a no-op now — vault is loaded as a Hugo module, not rsync'd)" >&2
      ;;
  esac
done

VAULT="$(ensure_vault)" || {
  echo "✗ \$BLOG_VAULT not set or vault not found. See OPERATIONS.md → bootstrap." >&2
  exit 1
}

if ! command -v go >/dev/null 2>&1; then
  cat >&2 <<EOF
✗ go is not installed but Hugo modules require it.
  Install: brew install go  (macOS)  |  https://go.dev/dl/
  Then re-run bin/preview.sh.
EOF
  exit 1
fi

if ! command -v hugo >/dev/null 2>&1; then
  echo "✗ hugo not installed. brew install hugo (extended)." >&2
  exit 1
fi

# Point the import at the local vault so we never touch the remote during dev.
# Hugo reads this env var on every command — no `hugo mod` shenanigans needed.
export HUGO_MODULE_REPLACEMENTS="github.com/dzarlax/blog-content -> $VAULT"

echo "▸ Hugo module replacement: github.com/dzarlax/blog-content → $VAULT"

echo "▸ Building Hugo blog → $OUT"
rm -rf "$OUT"
( cd hugo && hugo --minify --gc --destination "$OUT" )

echo "▸ Dropping Hugo's home placeholder (lander owns /)"
rm -f "$OUT/index.html"

echo "▸ Overlaying static lander files"
LANDER_FILES=(
  index.html style.css
  projects.json humans.txt llms.txt robots.txt sitemap.xml CNAME
  og-default.png
)
for f in "${LANDER_FILES[@]}"; do
  [ -e "$f" ] && cp "$f" "$OUT/$f"
done
for d in web assets .well-known; do
  [ -d "$d" ] && cp -r "$d" "$OUT/"
done

echo "▸ Resolving design-system release tag"
# Mirror the CI bake step so local previews match prod (no runtime CDN).
# Prefer gh CLI (authenticated, no anonymous rate-limit); fall back to curl.
if command -v gh >/dev/null 2>&1; then
  DS_TAG="$(gh api repos/dzarlax/design-system/releases/latest --jq '.tag_name' 2>/dev/null || true)"
else
  DS_TAG="$(curl -fsSL https://api.github.com/repos/dzarlax/design-system/releases/latest 2>/dev/null \
    | sed -nE 's/.*"tag_name"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/p' | head -1)"
fi
if [ -z "${DS_TAG:-}" ] || [ "$DS_TAG" = "null" ]; then
  echo "  ⚠ Could not resolve DS release tag, falling back to @main"
  DS_TAG="main"
fi
echo "  Using design-system tag: $DS_TAG"

echo "▸ Baking design-system bundle into $OUT/assets/ds/"
mkdir -p "$OUT/assets/ds"
for f in dzarlax.css dzarlax.js; do
  curl -fsSL \
    "https://github.com/dzarlax/design-system/releases/download/${DS_TAG}/${f}" \
    -o "$OUT/assets/ds/${f}"
  echo "  Baked $OUT/assets/ds/${f} ($(wc -c < "$OUT/assets/ds/${f}" | tr -d ' ') bytes)"
done

echo "▸ Rewriting CDN refs in HTML → same-origin /assets/ds/"
# BSD sed (macOS) needs an empty -i arg; use '#' as s delimiter so '|' is free
# for alternation inside the regex (matches both jsdelivr and statically forms).
find "$OUT" -type f -name '*.html' -print0 | xargs -0 sed -i '' -E \
  -e "s#https?://cdn\.(jsdelivr\.net/gh|statically\.io/gh)/dzarlax/design-system[@/][^\"']*dzarlax\.css#/assets/ds/dzarlax.css?v=${DS_TAG}#g" \
  -e "s#https?://cdn\.(jsdelivr\.net/gh|statically\.io/gh)/dzarlax/design-system[@/][^\"']*dzarlax\.js#/assets/ds/dzarlax.js?v=${DS_TAG}#g"

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
