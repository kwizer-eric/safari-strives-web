"""Shared FastAPI dependencies for the v1 API.

get_db is re-exported here so routers import dependencies from a single place.
Admin/JWT dependencies (get_current_admin) will be added in the auth phase.
"""

from app.core.database import get_db

__all__ = ["get_db"]
