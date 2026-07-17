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

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1   # Windows
pip install -r requirement.txt
docker compose up -d db
alembic upgrade head
npm run dev
```

API: http://localhost:4000/api/v1

See [backend/README.md](./backend/README.md) for full backend docs.

## Run everything (optional)

From `safari-platform/`:

```bash
npm run dev:frontend   # the public-web Next.js app
npm run dev:backend    # FastAPI only
```
