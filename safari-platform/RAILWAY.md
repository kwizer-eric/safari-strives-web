# Deploy Safari Strives to Railway

Three Railway services: **PostgreSQL**, **backend** (FastAPI), **frontend** (Next.js).

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  PostgreSQL │────▶│   Backend    │◀────│    Frontend     │
│  (plugin)   │     │  FastAPI     │     │    Next.js      │
└─────────────┘     └──────────────┘     └─────────────────┘
                           ▲                      │
                           └──── API_URL / NEXT_PUBLIC_API_URL
```

## 1. Create Railway project

1. Go to [railway.app](https://railway.app) → **New Project**
2. **Add PostgreSQL** (Database plugin)

## 2. Backend service

1. **New Service** → **GitHub Repo** → select this repository
2. **Settings → Root Directory:** `safari-platform/backend`
3. **Settings → Config-as-code path:** `/safari-platform/backend/railway.toml`
4. **Settings → Networking → Generate Domain** (e.g. `https://safari-api.up.railway.app`)

### Backend variables

| Variable | Value |
|----------|--------|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (reference from Postgres service) |
| `ENVIRONMENT` | `production` |
| `SECRET_KEY` | Generate: `python -c "import secrets; print(secrets.token_urlsafe(48))"` |
| `CORS_ORIGINS` | `https://YOUR-FRONTEND.up.railway.app` (set after frontend deploy) |

Railway auto-runs `bash scripts/start.sh` which:
- Runs `alembic upgrade head`
- Starts uvicorn on `$PORT`

**No auto-seed on deploy.** Content is added through the admin dashboard. For a brand-new empty DB, create an admin once with **your own** email and password (do not commit them):

```bash
railway run --service backend python -m scripts.create_admin \
  --email YOUR_EMAIL --password YOUR_PASSWORD
```

Optional local/dev seed scripts (`seed_cms_content`, `seed_program_pages`) still exist for demos — they are **not** run in production.

### Verify backend

```bash
curl https://YOUR-BACKEND.up.railway.app/api/v1/health
# {"status":"ok","database":"connected"}
```

## 3. Frontend service

1. **New Service** → same GitHub repo
2. **Settings → Root Directory:** `safari-platform/frontend`
3. **Settings → Config-as-code path** (important): `/safari-platform/frontend/railway.toml`
   - Railway does **not** auto-find `railway.toml` inside Root Directory
4. **Settings → Deploy → Custom Start Command** (if detection still fails): `npm run start`
5. **Settings → Networking → Generate Domain**

### Frontend variables (set **before** first build)

| Variable | Value |
|----------|--------|
| `API_URL` | `https://YOUR-BACKEND.up.railway.app/api/v1` (server-side / SSR; readable at runtime) |
| `NEXT_PUBLIC_API_URL` | Same URL (browser / admin client; baked at **build** time) |
| `NODE_VERSION` | `20` |

> Set **both** to the same backend `/api/v1` URL. `API_URL` is preferred for server CMS fetches so SSR does not silently fall back to `localhost:4000`. Redeploy after changing `NEXT_PUBLIC_*`.

### Verify frontend

Open `https://YOUR-FRONTEND.up.railway.app`

If `/admin/login` works but `/` looks empty, set `API_URL` / `NEXT_PUBLIC_API_URL` and publish CMS content — the public site stays up with a brand shell even when CMS is empty.

## 4. Link CORS (after frontend URL is known)

Update backend `CORS_ORIGINS` to your frontend URL and redeploy backend.

## 5. Admin login

- URL: `https://YOUR-FRONTEND.up.railway.app/admin/login`
- Credentials from the admin account you created with `create_admin` (never documented in the repo)

## Local vs Railway

| | Local | Railway |
|---|--------|---------|
| Database | Postgres on `:5432` | Postgres plugin |
| Backend | `:4000` | Public HTTPS URL |
| Frontend | `:3000` | Public HTTPS URL |
| Docker | Not required | Not required |

## Optional: Railway CLI

```bash
npm i -g @railway/cli
railway login
railway link

# Run one-off commands against production DB
railway run --service backend alembic upgrade head
railway run --service backend python -m scripts.create_admin \
  --email YOUR_EMAIL --password YOUR_PASSWORD

# One-time CMS seed (insert-only; do NOT put this in start.sh)
railway run --service backend python -m scripts.seed_cms_content
railway run --service backend python -m scripts.seed_program_pages
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `database: unreachable` | Check `DATABASE_URL` reference to Postgres service |
| Railpack: cannot detect start command | Root Directory must be `safari-platform/frontend`, Config path `/safari-platform/frontend/railway.toml`, and `package.json` must have a `"start"` script (push latest code) |
| `prerender-error` / `fetch failed` / `ECONNREFUSED` on build | App uses `force-dynamic` so CMS pages are not prerendered at build time; push latest frontend and redeploy. Also set `API_URL` + `NEXT_PUBLIC_API_URL` to the live backend URL |
| `/` thin/empty but `/admin/login` works | Public routes soft-fail: missing CMS uses defaults + empty sections (site stays **200**). Set `API_URL` + `NEXT_PUBLIC_API_URL`, then publish/seed content to fill sections. |
| Empty articles/testimonials/team in DB | Site still loads. Re-run `railway run --service backend python -m scripts.seed_cms_content` to backfill empty `items` (use `--force` only to overwrite admin edits). |
| Frontend 404 on API calls | Rebuild frontend with correct `API_URL` / `NEXT_PUBLIC_API_URL` |
| CORS errors | Set `CORS_ORIGINS` to exact frontend URL (no trailing slash) |
| App crashes on boot in prod | Set `SECRET_KEY` and `ENVIRONMENT=production` |
| Empty homepage | Add content in admin (`/admin/home`, etc.). Create an admin with `create_admin` if you have none. |

## Custom domains

1. Add custom domain in Railway **Networking** for frontend
2. Update backend `CORS_ORIGINS` to include custom domain
3. Rebuild frontend if API URL changes
