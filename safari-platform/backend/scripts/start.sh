#!/usr/bin/env bash
# Production start: migrate then serve (Railway sets PORT).
# No auto-seed — CMS / program content is managed in the admin dashboard.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Running Alembic migrations..."
alembic upgrade head

echo "Starting API on port ${PORT:-4000}..."
exec python -m uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-4000}"
