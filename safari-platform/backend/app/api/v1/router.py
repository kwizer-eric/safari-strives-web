from fastapi import APIRouter

from app.api.v1.endpoints import pages

api_router = APIRouter()
api_router.include_router(pages.router)

# Admin/auth routers get registered here in the auth phase, e.g.:
# api_router.include_router(auth.router)
# api_router.include_router(admin_pages.router)
