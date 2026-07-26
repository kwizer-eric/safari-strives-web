from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text

from app.api.v1.router import api_router
from app.core.config import assert_secure_settings, settings
from app.core.database import engine

assert_secure_settings()

# Hide interactive docs in production so the full API map is not public.
_docs = None if settings.is_production else "/docs"
_redoc = None if settings.is_production else "/redoc"
_openapi = None if settings.is_production else "/openapi.json"

app = FastAPI(
    title=settings.PROJECT_NAME,
    docs_url=_docs,
    redoc_url=_redoc,
    openapi_url=_openapi,
)

# CORS: only the configured frontend origins may call the API from the browser.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/api/v1/health", tags=["health"], response_model=None)
def health():
    """Readiness probe: API is up and Postgres accepts connections.

    Why we omit exception text: raw DB errors can leak hostnames/credentials
    shapes to anyone hitting the health URL.
    """
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
    except Exception:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={
                "status": "error",
                "database": "unreachable",
            },
        )
    return {"status": "ok", "database": "connected"}
