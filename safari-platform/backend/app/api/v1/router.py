from fastapi import APIRouter

from app.api.v1.endpoints import admin_pages, auth, pages

api_router = APIRouter()
api_router.include_router(pages.router)
api_router.include_router(auth.router)
api_router.include_router(admin_pages.router)
