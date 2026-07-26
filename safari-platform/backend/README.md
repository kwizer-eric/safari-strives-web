# Safari Strives Backend

Headless CMS API for the Safari Strives marketing site and admin dashboard.

## Stack

- FastAPI + Uvicorn
- PostgreSQL + SQLAlchemy 2.0 + Alembic
- Pydantic v2

## Quick start

Requires **PostgreSQL** running locally (no Docker).

```bash
cd safari-platform/backend

# 1. Virtualenv + dependencies
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirement.txt

# 2. Environment
cp .env.example .env
# Edit DATABASE_URL if your Postgres user/password differ

# 3. Create database (once — adjust user/password to match .env)
sudo -u postgres psql -c "CREATE DATABASE safari_strives;" 2>/dev/null || true

# 4. Migrations + seed
alembic upgrade head
python -m scripts.seed_cms_content
python -m scripts.seed_program_pages
python -m scripts.create_admin --email YOUR_EMAIL --password YOUR_PASSWORD

# 5. Run API
uvicorn app.main:app --reload --host 0.0.0.0 --port 4000
```

Or use `npm run dev` from `backend/` (same as step 5).

Create your own admin credentials with `create_admin` — do not commit real passwords.

Then start the frontend:

```bash
cd ../frontend && npm run dev
```

| Service  | URL |
|----------|-----|
| API      | http://localhost:4000/api/v1 |
| Docs     | http://localhost:4000/docs |
| Postgres | `localhost:5432` / `safari_strives` |

- API base URL: `http://localhost:4000/api/v1`
- Interactive docs: `http://localhost:4000/docs`
- Health check: `GET /api/v1/health` (returns `database: connected` when Postgres is reachable)

## Database connection

| Setting  | Value            |
|----------|------------------|
| Host     | `localhost`      |
| Port     | `5432`           |
| Database | `safari_strives` |
| User     | `postgres`       |
| Password | `postgres`       |

```bash
PGPASSWORD=postgres psql -h localhost -p 5432 -U postgres -d safari_strives
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
  python -m scripts.create_admin --email YOUR_EMAIL --password YOUR_PASSWORD
```

Full deploy guide: [../DEPLOY.md](../DEPLOY.md).

## Next up

- Admin JWT auth (`POST /api/v1/auth/login`)
- Admin CRUD for pages and features (`/api/v1/admin/pages`)
