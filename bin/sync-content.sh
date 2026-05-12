#!/usr/bin/env bash
# Sync Obsidian vault → hugo/content/.
#
# ╔═══════════════════════════════════════════════════════════════════════╗
# ║ DEPRECATED escape hatch as of the Level 2 vault sync migration.       ║
# ║ The vault is now consumed as a Hugo module (see hugo/hugo.toml +      ║
# ║ docs/MIGRATION-LEVEL2.md). bin/preview.sh and CI no longer call this  ║
# ║ script. Keep it around for emergencies (e.g. Go unavailable on a      ║
# ║ machine, or one-off content audits).                                  ║
# ╚═══════════════════════════════════════════════════════════════════════╝
#
# The vault is the source of truth; hugo/content/ is a working copy that
# would get committed if you used this flow.
#
# Usage:
#   bin/sync-content.sh           # sync once
#   BLOG_VAULT=/path ./bin/...    # override vault location

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# shellcheck disable=SC1091
. "$SCRIPT_DIR/lib/vault.sh"

VAULT="$(ensure_vault)" || exit 1
TARGET="$ROOT/hugo/content"

echo "▸ Syncing vault → Hugo content"
echo "  from: $VAULT"
echo "  to:   $TARGET"

mkdir -p "$TARGET"

if command -v rsync >/dev/null 2>&1; then
  # rsync is on Mac/Linux by default. May or may not be in Git Bash.
  rsync -a --delete \
    --exclude='.obsidian/' \
    --exclude='.obsidian-mobile/' \
    --exclude='.trash/' \
    --exclude='.DS_Store' \
    --exclude='Thumbs.db' \
    --exclude='*.tmp' \
    --exclude='.git/' \
    --exclude='_meta/' \
    --exclude='_drafts/' \
    "$VAULT/" "$TARGET/"
else
  # Fallback: clean target, copy everything. Less safe (no exclude),
  # so we manually purge known noise after.
  echo "  (rsync not found — using cp fallback. Install rsync for safer syncs.)"
  rm -rf "$TARGET"
  mkdir -p "$TARGET"
  # Copy everything except dotfiles, _meta/, _drafts/ at top level
  ( cd "$VAULT" && find . -mindepth 1 -maxdepth 1 \
    -not -name '.*' \
    -not -name '_meta' \
    -not -name '_drafts' \
    -exec cp -R {} "$TARGET/" \; )
  # Purge anything that snuck in
  find "$TARGET" \( -name '.DS_Store' -o -name 'Thumbs.db' -o -name '*.tmp' \) -delete 2>/dev/null || true
fi

echo "✓ Synced. Articles count: $(find "$TARGET/articles" -name index.md -mindepth 2 -maxdepth 2 2>/dev/null | wc -l | tr -d ' ')"

# ── WebP conversion ─────────────────────────────────────────────────────────
# Obsidian saves pasted screenshots as PNG inside the page bundle. They are
# routinely 500KB-2MB each; cwebp shrinks them ~10x with imperceptible quality
# loss. Convert in-place, then rewrite Markdown image references so the
# rendered <img src> points at the .webp file. Originals are deleted from the
# Hugo content tree only (the vault is untouched — the rsync above is one-way).
#
# Opt out with NO_WEBP=1. Soft-skips if cwebp is not installed.

if [ "${NO_WEBP:-0}" = "1" ]; then
  echo "▸ Skipping WebP conversion (NO_WEBP=1)"
elif ! command -v cwebp >/dev/null 2>&1; then
  echo "⚠ cwebp not installed — skipping WebP conversion."
  echo "  Install: brew install webp  (macOS) | pacman -S libwebp (Arch) | apt install webp (Debian)"
else
  echo "▸ Converting PNG/JPG → WebP in $TARGET/articles"

  ARTICLES="$TARGET/articles"
  converted=0
  saved_bytes=0

  # Portable byte size of a file (BSD vs GNU stat).
  filesize() {
    if stat -f%z "$1" >/dev/null 2>&1; then stat -f%z "$1"
    else stat -c%s "$1"
    fi
  }

  # cwebp quality. 82 is a good default for screenshots — visually lossless
  # for UI shots, decent size win on photos. Override via WEBP_QUALITY.
  Q="${WEBP_QUALITY:-82}"

  while IFS= read -r -d '' src; do
    case "$src" in
      *.png|*.PNG|*.jpg|*.JPG|*.jpeg|*.JPEG) ;;
      *) continue ;;
    esac
    dst="${src%.*}.webp"
    # Skip if a .webp already exists and is newer than the source.
    if [ -f "$dst" ] && [ "$dst" -nt "$src" ]; then
      rm -f "$src"
      continue
    fi
    before="$(filesize "$src")"
    if cwebp -quiet -q "$Q" "$src" -o "$dst" 2>/dev/null; then
      after="$(filesize "$dst")"
      saved_bytes=$(( saved_bytes + before - after ))
      converted=$(( converted + 1 ))
      rm -f "$src"
    else
      echo "  ⚠ cwebp failed on ${src#$ARTICLES/} — keeping original"
      rm -f "$dst" 2>/dev/null || true
    fi
  done < <(find "$ARTICLES" -type f \
      \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0 2>/dev/null)

  if [ "$converted" -gt 0 ]; then
    # Rewrite Markdown image refs (.png/.jpg/.jpeg → .webp). Conservative:
    # only touches the file extension when preceded by a normal filename char
    # so we don't mangle URLs that happen to mention .png as a literal.
    # Matches both `![alt](foo.png)` and `<img src="foo.png">` flavours.
    find "$ARTICLES" -type f -name '*.md' -print0 | while IFS= read -r -d '' md; do
      # In-place sed, BSD-compatible (no `-i ''` shenanigans across platforms).
      tmp="$md.tmp"
      sed -E 's/([A-Za-z0-9_\-])\.(png|PNG|jpe?g|JPE?G)([)"'"'"'[:space:]>])/\1.webp\3/g' "$md" > "$tmp" && mv "$tmp" "$md"
    done
    if [ "$saved_bytes" -gt 0 ]; then
      mb=$(awk -v b="$saved_bytes" 'BEGIN { printf "%.1f", b / 1024 / 1024 }')
      echo "✓ Converted $converted image(s) — saved ${mb} MB"
    else
      echo "✓ Converted $converted image(s)"
    fi
  else
    echo "  (no PNG/JPG found to convert)"
  fi
fi
