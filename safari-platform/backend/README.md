# Safari Strives Backend

Headless CMS API for the Safari Strives marketing site and admin dashboard.

## Stack

- FastAPI + Uvicorn
- PostgreSQL + SQLAlchemy 2.0 + Alembic
- Pydantic v2

## Quick start (Docker — recommended)

Fresh database + API image in one command:

```bash
cd safari-platform/backend
./scripts/docker-reset.sh
```

This will:
1. Stop and delete the old Postgres volume (`docker compose down -v`)
2. Rebuild the `safari-strives-api:latest` image
3. Start Postgres + API (migrations run automatically on boot)
4. Seed CMS content, program pages, and an admin user

Default admin: `admin@safaristrives.org` / `admin123`

Then start the frontend:

```bash
cd ../frontend && npm run dev
```

| Service  | URL |
|----------|-----|
| API      | http://localhost:4000/api/v1 |
| Docs     | http://localhost:4000/docs |
| Postgres | `localhost:5433` (postgres/postgres/safari_strives) |

## Quick start (local Python)

```bash
cd safari-platform/backend

# 1. Virtualenv + dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirement.txt

# 2. Environment
cp .env.example .env
# Edit .env if needed (defaults target Docker Postgres on port 5433)

# 3. Database (Docker)
docker compose up -d db

# 4. Migrations
alembic upgrade head

# 5. Run API
uvicorn app.main:app --reload --host 0.0.0.0 --port 4000
```

- API base URL: `http://localhost:4000/api/v1`
- Interactive docs: `http://localhost:4000/docs`
- Health check: `GET /api/v1/health` (returns `database: connected` when Postgres is reachable)

## Database connection (Docker)

| Setting  | Value            |
|----------|------------------|
| Host     | `localhost`      |
| Port     | `5433`           |
| Database | `safari_strives` |
| User     | `postgres`       |
| Password | `postgres`       |

```bash
# Connect with psql
PGPASSWORD=postgres psql -h localhost -p 5433 -U postgres -d safari_strives

# Or via Docker
docker exec -it safari-strives-db psql -U postgres -d safari_strives
```

## Public endpoints (Phase 2)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Liveness probe |
| GET | `/api/v1/pages` | List published pages (summary) |
| GET | `/api/v1/pages/{slug}` | Full published page + features |

Unpublished or missing pages return `404`.

### Example page slug

- `venture-accelerator`
- `green-enterprise-lab`
- `the-hub`

(Content is entered via admin CRUD once auth is wired; DB starts empty.)

### Example response shape (`GET /api/v1/pages/{slug}`)

```json
{
  "id": 1,
  "slug": "venture-accelerator",
  "is_published": true,
  "hero_title": "Venture Accelerator",
  "hero_subtitle": null,
  "hero_media_url": null,
  "hero_media_alt": null,
  "intro_text": null,
  "cta_label": null,
  "cta_link": null,
  "contact_line": null,
  "section_title": null,
  "main_description": null,
  "final_cta": null,
  "created_at": "2026-07-05T12:00:00",
  "updated_at": "2026-07-05T12:00:00",
  "features": [
    {
      "id": 1,
      "title": "Founder-Led Growth",
      "description": "...",
      "order": 0,
      "icon": null,
      "image_url": null
    }
  ]
}
```

Rich text fields (`main_description`, `final_cta`, feature `description`) are **Markdown**; the frontend renders them.

## Frontend integration

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

CORS allows `http://localhost:3000` by default (`CORS_ORIGINS` in `.env`).

## Production (Docker)

```bash
cp .env.example .env
# Set SECRET_KEY, CORS_ORIGINS (Vercel URL), and a strong POSTGRES_PASSWORD

docker compose -f docker-compose.prod.yml up -d --build
curl http://localhost:4000/api/v1/health
```

Create a staff user:

```bash
docker compose -f docker-compose.prod.yml exec api \
  python -m scripts.create_admin --email admin@example.com --password 'change-me'
```

Full deploy guide: [../DEPLOY.md](../DEPLOY.md).

## Next up

- Admin JWT auth (`POST /api/v1/auth/login`)
- Admin CRUD for pages and features (`/api/v1/admin/pages`)
