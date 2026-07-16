# Safari Platform

The platform is split into two independent workspaces:

```
safari-platform/
  frontend/              Next.js apps + shared packages
  backend/               FastAPI API
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

| App              | Path        | URL (single origin)              |
| ---------------- | ----------- | -------------------------------- |
| public-web       | `/`         | http://localhost:3000            |
| admin-dashboard  | `/admin`    | http://localhost:3000/admin      |
| applicant-portal | `/applicant`| http://localhost:3000/applicant  |
| mentor-portal    | `/mentor`   | http://localhost:3000/mentor     |
| partner-portal   | `/partner`  | http://localhost:3000/partner    |

`npm run dev` starts all apps; open **http://localhost:3000** only. Portal apps run on internal ports and are proxied via path prefixes.

Individual apps (internal dev servers):

```bash
npm run dev:public
npm run dev:admin
npm run dev:applicant
npm run dev:mentor
npm run dev:partner
```

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
npm run dev:frontend   # all Next.js apps
npm run dev:backend    # FastAPI only
```
