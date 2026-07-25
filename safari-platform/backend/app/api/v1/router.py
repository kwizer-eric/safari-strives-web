from fastapi import APIRouter

from app.api.v1.endpoints import (
    admin_blog,
    admin_cms,
    admin_pages,
    admin_people,
    admin_submissions,
    auth,
    blog,
    cms,
    media,
    pages,
    people,
    submissions,
)

api_router = APIRouter()

# Phase 1
api_router.include_router(auth.router)

# Phase 2
api_router.include_router(pages.router)
api_router.include_router(cms.router)
api_router.include_router(admin_pages.router)
api_router.include_router(admin_cms.router)

# Phase 3
api_router.include_router(people.router)
api_router.include_router(admin_people.router)
api_router.include_router(blog.router)
api_router.include_router(admin_blog.router)

# Phase 4
api_router.include_router(submissions.router)
api_router.include_router(admin_submissions.router)

# Phase 5
api_router.include_router(media.router)
