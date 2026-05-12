#!/usr/bin/env bash
# Lint Hugo article frontmatter.
#
# Checks every hugo/content/articles/<slug>/index.md (or .md leaf) for:
#   - title:        non-empty string
#   - description:  non-empty string
#   - date:         valid ISO-8601 date (YYYY-MM-DD or RFC3339)
#   - tags:         array with at least one entry
#   - draft:        not true (warns if missing; errors if `draft: true`)
#
# Usage:
#   bin/lint-frontmatter.sh                       # lint all articles
#   bin/lint-frontmatter.sh path/to/index.md ...  # lint specific files
#
# Exit code 0 if everything passes, 1 if any check fails.
#
# Also runnable as a git pre-commit hook — see bin/install-git-hooks.sh.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Collect target files. Default: every article in the repo's hugo/content/articles/.
declare -a FILES=()
if [ "$#" -gt 0 ]; then
  FILES=("$@")
else
  while IFS= read -r f; do FILES+=("$f"); done < <(
    find "$ROOT/hugo/content/articles" -mindepth 2 -maxdepth 3 -name '*.md' \
      -not -name '_index.md' 2>/dev/null
  )
fi

if [ "${#FILES[@]}" -eq 0 ]; then
  echo "No articles to lint."
  exit 0
fi

# ─ extract_frontmatter <file>
# Echoes the YAML block between the first two `---` lines (no fences).
extract_frontmatter() {
  awk '
    /^---[[:space:]]*$/ {
      if (!opened) { opened = 1; next }
      else         { exit }
    }
    opened { print }
  ' "$1"
}

# ─ get_scalar <fm> <key>
# Echo the scalar value of `key: value` (strips surrounding quotes). Empty if absent.
get_scalar() {
  awk -v k="$2" '
    BEGIN { rx = "^" k "[[:space:]]*:[[:space:]]*" }
    $0 ~ rx {
      sub(rx, "", $0)
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", $0)
      gsub(/^"|"$/, "", $0)
      gsub(/^'\''|'\''$/, "", $0)
      print
      exit
    }
  ' <<< "$1"
}

# ─ count_tags <fm>
# Returns the number of entries in a `tags:` value, supporting both styles:
#   tags: ["a", "b"]
#   tags:
#     - a
#     - b
count_tags() {
  local fm="$1"
  local inline
  inline="$(awk '/^tags[[:space:]]*:/{ sub(/^tags[[:space:]]*:[[:space:]]*/, ""); print; exit }' <<< "$fm")"
  # Inline array form
  if [[ "$inline" =~ ^\[.*\]$ ]]; then
    local stripped="${inline#\[}"; stripped="${stripped%\]}"
    # Empty array
    [[ -z "${stripped//[[:space:]]/}" ]] && { echo 0; return; }
    # Count comma-separated, ignoring trailing commas
    awk -F',' '{
      n = 0
      for (i = 1; i <= NF; i++) {
        gsub(/[[:space:]"'\'']/, "", $i)
        if (length($i) > 0) n++
      }
      print n
    }' <<< "$stripped"
    return
  fi
  # Block list form: count `- ` lines until non-list line
  awk '
    /^tags[[:space:]]*:/ { in_block = 1; next }
    in_block {
      if ($0 ~ /^[[:space:]]*-[[:space:]]+[^[:space:]]/) { n++; next }
      if ($0 ~ /^[^[:space:]]/) { exit }
    }
    END { print n + 0 }
  ' <<< "$fm"
}

is_valid_date() {
  # Accept YYYY-MM-DD or full RFC3339 timestamps
  [[ "$1" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2}([.][0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2}))?$ ]]
}

FAIL=0
for f in "${FILES[@]}"; do
  # Only lint markdown articles
  case "$f" in
    *.md) ;;
    *)    continue ;;
  esac
  [ -f "$f" ] || continue

  # Skip _index.md and section pages
  base="$(basename "$f")"
  [ "$base" = "_index.md" ] && continue

  fm="$(extract_frontmatter "$f")"
  if [ -z "$fm" ]; then
    echo "✗ $f: no YAML frontmatter found"
    FAIL=1
    continue
  fi

  errors=()

  title="$(get_scalar "$fm" title)"
  [ -z "$title" ] && errors+=("missing or empty 'title'")

  desc="$(get_scalar "$fm" description)"
  [ -z "$desc" ] && errors+=("missing or empty 'description'")

  date_val="$(get_scalar "$fm" date)"
  if [ -z "$date_val" ]; then
    errors+=("missing 'date'")
  elif ! is_valid_date "$date_val"; then
    errors+=("invalid 'date' value: $date_val (expect YYYY-MM-DD or RFC3339)")
  fi

  tag_count="$(count_tags "$fm")"
  if [ "${tag_count:-0}" -lt 1 ]; then
    errors+=("'tags' must be a non-empty array")
  fi

  draft="$(get_scalar "$fm" draft)"
  if [ "$draft" = "true" ]; then
    errors+=("'draft: true' — commit blocked, set draft to false before committing")
  fi

  if [ "${#errors[@]}" -gt 0 ]; then
    rel="${f#$ROOT/}"
    echo "✗ $rel"
    for e in "${errors[@]}"; do echo "    • $e"; done
    FAIL=1
  fi
done

if [ "$FAIL" -ne 0 ]; then
  echo
  echo "Frontmatter lint failed. Fix the issues above (or bypass with --no-verify if you know what you're doing)."
  exit 1
fi

echo "✓ Frontmatter lint passed (${#FILES[@]} file(s))"
