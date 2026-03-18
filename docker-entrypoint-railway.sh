#!/bin/bash
# Railway entrypoint: fix volume permissions and drop to non-root user
# The volume may be root-owned on first mount, so we fix ownership
# before starting the app as the node user.
# claude-code refuses --dangerously-skip-permissions when running as root.

set -e

# Resolve volume path from env var (Railway sets RAILWAY_VOLUME_MOUNT_PATH
# to wherever the volume is attached — default /data, but may be /workspace/extra
# or any other path configured in the Railway dashboard).
VOLUME_PATH="${RAILWAY_VOLUME_MOUNT_PATH:-/data}"

# Create required subdirectories (safe to run on every start)
mkdir -p "${VOLUME_PATH}/store" "${VOLUME_PATH}/groups" "${VOLUME_PATH}/data"

# Fix ownership so the node user can write (runs as root before gosu drop)
chown -R node:node "${VOLUME_PATH}" 2>/dev/null || true

# Drop to node user and exec the CMD
exec gosu node "$@"
