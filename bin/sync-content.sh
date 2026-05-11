#!/usr/bin/env bash
# Sync Obsidian vault → hugo/content/.
# The vault is the source of truth; hugo/content/ is a working copy that
# gets committed (so CI builds from the same content without needing the vault).
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
