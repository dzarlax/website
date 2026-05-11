#!/usr/bin/env bash
# Create a new tag (taxonomy term) in the vault.
#
# Usage:
#   bin/new-tag.sh "home-assistant" "Home Assistant"
#   bin/new-tag.sh                     # prompts

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# shellcheck disable=SC1091
. "$SCRIPT_DIR/lib/vault.sh"

VAULT="$(ensure_vault)" || exit 1

SLUG="${1:-}"
LABEL="${2:-}"

if [ -z "$SLUG" ]; then
  printf "Tag slug (lowercase, dashes): "
  read -r SLUG
fi
if [ -z "$LABEL" ]; then
  printf "Display label (free text): "
  read -r LABEL
fi

if [ -z "$SLUG" ] || [ -z "$LABEL" ]; then
  echo "✗ Both slug and label are required." >&2
  exit 1
fi

DIR="$VAULT/tags/$SLUG"
FILE="$DIR/_index.md"

if [ -e "$FILE" ]; then
  echo "✗ Tag already exists: $FILE" >&2
  exit 1
fi

mkdir -p "$DIR"
cat > "$FILE" <<EOF
---
title: "$LABEL"
description: ""
---
EOF

echo "✓ Created tag: $SLUG → $LABEL"
echo "  File: $FILE"
echo "  Reference in any article frontmatter: tags: [\"$SLUG\"]"
