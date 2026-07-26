#!/usr/bin/env bash
# Production start: migrate then serve (Railway sets PORT).
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Running Alembic migrations..."
alembic upgrade head

if [ "${RUN_SEED:-}" = "1" ]; then
  echo "Seeding CMS content (RUN_SEED=1)..."
  python -m scripts.seed_cms_content
  python -m scripts.seed_program_pages
  python -m scripts.create_admin \
    --email "${ADMIN_EMAIL:-admin@safaristrives.org}" \
    --password "${ADMIN_PASSWORD:-admin123}" \
    --reset-password
fi

echo "Starting API on port ${PORT:-4000}..."
exec python -m uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-4000}"
