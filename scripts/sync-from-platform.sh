#!/usr/bin/env bash
# Re-sync vendored libs from credebl/platform.
#
# Usage:
#   ./scripts/sync-from-platform.sh <git-sha-or-branch> [lib ...]
#
# Examples:
#   ./scripts/sync-from-platform.sh a41b799                      # all libs
#   ./scripts/sync-from-platform.sh a41b799 logger common        # just two libs
#
# NOTE: after syncing libs/logger, libs/common, or libs/prisma-service you must
# re-apply the divergences documented in VENDORED.md:
#   - libs/logger: OTEL_LOGGER injection (see VENDORED.md)
#   - libs/common: SignerOption local type alias in
#     src/interfaces/oid4vp-verification.ts (trimmed schema prunes the enum)
#   - libs/prisma-service: trimmed schema.prisma is NOT re-copied (script skips it)
set -euo pipefail

SHA="${1:?usage: sync-from-platform.sh <git-sha-or-branch> [lib ...]}"
shift || true
LIBS=("${@:-common config context enum logger prisma-service}")

PLATFORM_DIR="${PLATFORM_DIR:-../platform}"

if [[ ! -d "$PLATFORM_DIR/.git" ]]; then
  echo "ERROR: platform repo not found at '$PLATFORM_DIR' (set PLATFORM_DIR)" >&2
  exit 1
fi

for lib in "${LIBS[@]}"; do
  src="libs/$lib"
  echo "==> Syncing $src @ $SHA"
  if [[ "$lib" == "prisma-service" ]]; then
    # Only sync src/; prisma/schema.prisma in this repo is deliberately trimmed.
    (cd "$PLATFORM_DIR" && git archive "$SHA" "$src/src" | tar -x -C /tmp/cw-sync-$$)
    rsync -a --delete "/tmp/cw-sync-$$/$src/src/" "$src/src/"
    rm -rf "/tmp/cw-sync-$$"
  else
    (cd "$PLATFORM_DIR" && git archive "$SHA" "$src" | tar -x -C /tmp/cw-sync-$$)
    rsync -a --delete \
      --exclude='node_modules' --exclude='package.json' --exclude='*.spec.ts' --exclude='__fixtures__' \
      "/tmp/cw-sync-$$/$src/" "$src/"
    rm -rf "/tmp/cw-sync-$$"
  fi
  echo "    done"
done

echo
echo "Remember: re-apply divergences from VENDORED.md if you synced logger/common/prisma-service."
