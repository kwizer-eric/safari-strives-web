# Safari Strives Backend

Headless CMS API for the Safari Strives marketing site and admin dashboard.

## Stack

- FastAPI + Uvicorn
- PostgreSQL + SQLAlchemy 2.0 + Alembic
- Pydantic v2

## Quick start

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
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- API base URL: `http://localhost:8000/api/v1`
- Interactive docs: `http://localhost:8000/docs`
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
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

CORS allows `http://localhost:3000` by default (`CORS_ORIGINS` in `.env`).

## Next up

- Admin JWT auth (`POST /api/v1/auth/login`)
- Admin CRUD for pages and features (`/api/v1/admin/pages`)
