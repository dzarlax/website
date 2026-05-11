#!/usr/bin/env bash
# Create a new article skeleton directly in the Obsidian vault.
# The folder + index.md appear in your vault; opening Obsidian will see it
# in the sidebar immediately. Run sync-content.sh before deploy to copy.
#
# Usage:
#   bin/new-article.sh "How to actually use Cursor"
#   bin/new-article.sh                          # prompts for title

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# shellcheck disable=SC1091
. "$SCRIPT_DIR/lib/vault.sh"

VAULT="$(ensure_vault)" || exit 1

TITLE="${1:-}"
if [ -z "$TITLE" ]; then
  printf "Article title: "
  read -r TITLE
fi

if [ -z "$TITLE" ]; then
  echo "✗ Title is required." >&2
  exit 1
fi

# Slugify: lowercase, alnum + dashes only, collapse repeats, trim edges.
slugify() {
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/[^a-z0-9]/-/g' \
    | sed 's/--*/-/g' \
    | sed 's/^-//;s/-$//'
}

SLUG="$(slugify "$TITLE")"
DIR="$VAULT/articles/$SLUG"
FILE="$DIR/index.md"

if [ -e "$FILE" ]; then
  echo "✗ Article already exists: $FILE" >&2
  exit 1
fi

mkdir -p "$DIR"

TODAY="$(date +%Y-%m-%d)"

cat > "$FILE" <<EOF
---
title: "$TITLE"
description: ""
date: $TODAY
lastmod: $TODAY
draft: true
tags: []           # pick 1-3 from $VAULT/tags/, or create new tag dirs there
cover: ""          # cover.png in this folder for OG/Twitter preview
toc: false         # true for long articles with H2+ structure
---

<!-- Opening: one paragraph that earns the read. State the claim or question. -->

## Why this matters

<!-- Stakes. Who should care and why. -->

## The argument

<!-- Body. Concrete examples > abstractions. -->

## What to do with this

<!-- Takeaway / decision frame / next step. -->
EOF

echo "✓ Created $FILE"
echo
echo "Next steps:"
echo "  1. Open Obsidian — the new note appears in articles/$SLUG/"
echo "  2. Write content. Drop screenshots into the same folder."
echo "  3. When ready: set 'draft: false' in frontmatter."
echo "  4. cd $(cd "$SCRIPT_DIR/.." && pwd) && bin/sync-content.sh"
echo "  5. git add . && git commit -m 'Publish: $TITLE' && git push"

# Try to open the file in the default Markdown editor (typically Obsidian if
# you've set it that way, otherwise the OS default).
case "$(uname -s)" in
  Darwin)              open "$FILE" 2>/dev/null || true ;;
  MINGW*|MSYS*|CYGWIN*) start "" "$FILE" 2>/dev/null || true ;;
  Linux)               xdg-open "$FILE" 2>/dev/null || true ;;
esac
