# Deploy Safari Strives to Railway

Three Railway services: **PostgreSQL**, **backend** (FastAPI), **frontend** (Next.js).

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  PostgreSQL │────▶│   Backend    │◀────│    Frontend     │
│  (plugin)   │     │  FastAPI     │     │    Next.js      │
└─────────────┘     └──────────────┘     └─────────────────┘
                           ▲                      │
                           └──── NEXT_PUBLIC_API_URL
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
| `RUN_SEED` | `1` (first deploy only — seeds CMS + admin, then **remove**) |
| `ADMIN_EMAIL` | `admin@safaristrives.org` |
| `ADMIN_PASSWORD` | Strong password for production admin |

Railway auto-runs `bash scripts/start.sh` which:
- Runs `alembic upgrade head`
- Seeds if `RUN_SEED=1`
- Starts uvicorn on `$PORT`

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
| `NEXT_PUBLIC_API_URL` | `https://YOUR-BACKEND.up.railway.app/api/v1` |
| `NODE_VERSION` | `20` |

> `NEXT_PUBLIC_*` vars are baked in at **build time**. Redeploy frontend after changing them.

### Verify frontend

Open `https://YOUR-FRONTEND.up.railway.app`

## 4. Link CORS (after frontend URL is known)

Update backend `CORS_ORIGINS` to your frontend URL and redeploy backend.

## 5. Admin login

- URL: `https://YOUR-FRONTEND.up.railway.app/admin/login`
- Email/password from `ADMIN_EMAIL` / `ADMIN_PASSWORD` (or seed defaults if you used those)

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
railway run --service backend python -m scripts.seed_cms_content
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `database: unreachable` | Check `DATABASE_URL` reference to Postgres service |
| Railpack: cannot detect start command | Root Directory must be `safari-platform/frontend`, Config path `/safari-platform/frontend/railway.toml`, and `package.json` must have a `"start"` script (push latest code) |
| Frontend 404 on API calls | Rebuild frontend with correct `NEXT_PUBLIC_API_URL` |
| CORS errors | Set `CORS_ORIGINS` to exact frontend URL (no trailing slash) |
| App crashes on boot in prod | Set `SECRET_KEY` and `ENVIRONMENT=production` |
| Empty homepage | Run seeds once with `RUN_SEED=1` or use `railway run` seed commands |

## Custom domains

1. Add custom domain in Railway **Networking** for frontend
2. Update backend `CORS_ORIGINS` to include custom domain
3. Rebuild frontend if API URL changes
