from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.database import engine

app = FastAPI(title=settings.PROJECT_NAME)

# CORS: only the configured frontend origins may call the API from the browser.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/api/v1/health", tags=["health"])
def health() -> dict[str, str]:
    """Readiness probe: API is up and Postgres accepts connections."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={"status": "error", "database": "unreachable", "error": str(exc)},
        ) from exc
    return {"status": "ok", "database": "connected"}
