#!/usr/bin/env bash
# One-time migration: copy current hugo/content/ into the Obsidian vault.
# After this, vault is the source of truth and you write there.
# Safe to re-run — refuses to overwrite if vault already has articles.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# shellcheck disable=SC1091
. "$SCRIPT_DIR/lib/vault.sh"

VAULT="$(resolve_vault)"

if [ -z "$VAULT" ]; then
  echo "✗ Could not resolve vault path. Set BLOG_VAULT in your shell or .env." >&2
  exit 1
fi

SRC="$ROOT/hugo/content"

if [ ! -d "$SRC" ]; then
  echo "✗ No content to migrate at $SRC" >&2
  exit 1
fi

if [ -d "$VAULT/articles" ] && [ -n "$(ls -A "$VAULT/articles" 2>/dev/null)" ]; then
  echo "⚠ Vault already has articles at $VAULT/articles"
  echo "  Refusing to overwrite. If you really want to re-migrate:"
  echo "    rm -rf $VAULT/articles $VAULT/tags"
  exit 1
fi

echo "▸ Migrating $SRC → $VAULT"
mkdir -p "$VAULT"

for item in articles tags; do
  if [ -d "$SRC/$item" ]; then
    echo "  copying $item/"
    cp -R "$SRC/$item" "$VAULT/"
  fi
done

# Top-level _index.md gets copied too if present
[ -f "$SRC/_index.md" ] && cp "$SRC/_index.md" "$VAULT/"

echo "✓ Migrated. Vault now at: $VAULT"
echo
echo "Next:"
echo "  1. Open Obsidian → Open folder as vault → $VAULT"
echo "  2. Recommended settings in OBSIDIAN-SETUP.md"
echo "  3. From now on, write in Obsidian. Before deploy:"
echo "     bin/sync-content.sh && git add hugo/content && git commit && git push"
