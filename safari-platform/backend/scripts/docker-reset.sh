#!/usr/bin/env bash
# Tear down Docker stack, delete DB volume, rebuild API image, migrate, and seed.
#
# Usage (from backend/):
#   ./scripts/docker-reset.sh
#
# Requires Docker access (sudo if your user is not in the `docker` group).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ADMIN_EMAIL="${ADMIN_EMAIL:-admin@safaristrives.org}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-admin123}"

compose() {
  if docker info >/dev/null 2>&1; then
    docker compose "$@"
  else
    sudo docker compose "$@"
  fi
}

echo "==> Stopping local API on :4000 if running..."
if command -v lsof >/dev/null 2>&1; then
  lsof -ti :4000 | xargs -r kill 2>/dev/null || true
fi

echo "==> Stopping containers and removing volumes (fresh database)..."
compose down -v --remove-orphans

echo "==> Rebuilding API image..."
compose build --no-cache api

echo "==> Starting database + API..."
compose up -d

echo "==> Waiting for API health..."
for i in $(seq 1 60); do
  if curl -sf http://localhost:4000/api/v1/health | grep -q '"database":"connected"'; then
    echo "API + database are healthy."
    break
  fi
  if [ "$i" -eq 60 ]; then
    echo "Timed out waiting for http://localhost:4000/api/v1/health"
    compose logs api --tail 50
    exit 1
  fi
  sleep 2
done

echo "==> Seeding CMS content..."
compose exec -T api python -m scripts.seed_cms_content

echo "==> Seeding program pages..."
compose exec -T api python -m scripts.seed_program_pages

echo "==> Creating admin user (${ADMIN_EMAIL})..."
compose exec -T api python -m scripts.create_admin \
  --email "$ADMIN_EMAIL" \
  --password "$ADMIN_PASSWORD" \
  --reset-password

echo ""
echo "Done."
echo "  API:      http://localhost:4000/api/v1/health"
echo "  Docs:     http://localhost:4000/docs"
echo "  Admin:    http://localhost:3000/admin/login"
echo "  Email:    $ADMIN_EMAIL"
echo "  Password: $ADMIN_PASSWORD"
echo ""
echo "Start frontend (Node 20+):"
echo "  cd ../frontend && npm run dev"
