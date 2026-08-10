#!/usr/bin/env bash
# Production start: migrate, seed (if needed), then serve (Railway sets PORT).
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Running Alembic migrations..."
alembic upgrade head

echo "Seeding CMS content (if not already seeded)..."
python -m scripts.seed_cms_content || true

echo "Starting API on port ${PORT:-4000}..."
exec python -m uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-4000}"
