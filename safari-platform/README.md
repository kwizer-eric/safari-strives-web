# Safari Platform

The platform is split into two independent workspaces:

```
safari-platform/
  frontend/              Next.js app (public-web) + shared packages
  backend/               FastAPI API
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

| Segment          | Path        | URL                               |
| ---------------- | ----------- | -------------------------------- |
| Marketing site   | `/`         | http://localhost:3000            |
| Admin            | `/admin`    | http://localhost:3000/admin      |
| Applicant        | `/applicant`| http://localhost:3000/applicant  |
| Mentor           | `/mentor`   | http://localhost:3000/mentor     |
| Partner          | `/partner`  | http://localhost:3000/partner    |

`npm run dev` starts the single `public-web` Next.js app on **http://localhost:3000**. The admin/applicant/mentor/partner portals are ordinary nested route segments inside that same app — no separate ports, no proxying.

## Backend

Requires **PostgreSQL** installed locally.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .\.venv\Scripts\Activate.ps1
pip install -r requirement.txt
cp .env.example .env
alembic upgrade head
python -m scripts.seed_cms_content
python -m scripts.seed_program_pages
python -m scripts.create_admin --email YOUR_EMAIL --password YOUR_PASSWORD
npm run dev
```

API: http://localhost:4000/api/v1

See [backend/README.md](./backend/README.md) for full backend docs.

## Deploy

- **Railway** (Postgres + backend + frontend): see [RAILWAY.md](./RAILWAY.md)
- **Vercel + Docker**: see [DEPLOY.md](./DEPLOY.md)

## Run everything (optional)

From `safari-platform/`:

```bash
npm run dev:frontend   # the public-web Next.js app
npm run dev:backend    # FastAPI only
```
