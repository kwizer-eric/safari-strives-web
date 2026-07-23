from fastapi import APIRouter

from app.api.v1.endpoints import admin_cms, admin_pages, auth, cms, pages

api_router = APIRouter()
api_router.include_router(pages.router)
api_router.include_router(cms.router)
api_router.include_router(auth.router)
api_router.include_router(admin_pages.router)
api_router.include_router(admin_cms.router)
