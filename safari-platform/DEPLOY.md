# Deploy Safari Strives

## Frontend only (recommended first)

Portals run in **demo mode** — you do **not** need the API live to ship the marketing site + UI.

### Option A — Vercel Dashboard

1. Push this repo to GitHub (if not already)
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo
3. Settings:
   - **Root Directory:** `safari-platform/frontend/public-web`
   - Framework: Next.js (from `vercel.json`)
4. Env vars: leave empty for now (optional later: `NEXT_PUBLIC_API_URL`)
5. Deploy

### Option B — CLI

```bash
cd safari-platform/frontend/public-web
npx vercel
```

Follow the prompts (link GitHub / log in). For production:

```bash
npx vercel --prod
```

You should get a URL like `https://….vercel.app`.

---

## Backend later

When you're ready for the real API + Postgres, use the sections below.

### Docker

From `safari-platform/backend`:

```bash
cp .env.example .env
```

Edit `.env`:

```env
SECRET_KEY=<openssl rand -hex 32>
CORS_ORIGINS=https://YOUR_VERCEL_URL
DATABASE_URL=postgresql+psycopg2://postgres:STRONG_PASSWORD@db:5432/safari_strives
POSTGRES_PASSWORD=STRONG_PASSWORD
```

```bash
docker compose -f docker-compose.prod.yml up -d --build
curl http://localhost:4000/api/v1/health
```

Create an admin user:

```bash
docker compose -f docker-compose.prod.yml exec api \
  python -m scripts.create_admin --email YOUR_EMAIL --password YOUR_PASSWORD
```

### Railway / Render / Fly

Use the same `Dockerfile`. Set `DATABASE_URL`, `SECRET_KEY`, `CORS_ORIGINS`, `PORT`.

## Wire frontend ↔ API (after both exist)

1. Note the public API URL  
2. Set `NEXT_PUBLIC_API_URL=https://YOUR_API/api/v1` on Vercel → redeploy  
3. Set `CORS_ORIGINS` on the API to the Vercel URL → restart  
