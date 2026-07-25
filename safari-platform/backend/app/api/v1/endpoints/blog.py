from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.v1.deps import get_db
from app.models.blog import BlogPost
from app.schemas.blog import BlogPostRead

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("/posts", response_model=list[BlogPostRead])
def list_published_posts(db: Session = Depends(get_db)) -> list[BlogPost]:
    """Public Field Notes — drafts never leave the admin API."""
    stmt = (
        select(BlogPost)
        .where(BlogPost.status == "published")
        .order_by(BlogPost.published_at.desc().nullslast(), BlogPost.id.desc())
    )
    return list(db.scalars(stmt).all())


@router.get("/posts/{slug}", response_model=BlogPostRead)
def get_published_post(slug: str, db: Session = Depends(get_db)) -> BlogPost:
    stmt = select(BlogPost).where(
        BlogPost.slug == slug, BlogPost.status == "published"
    )
    post = db.scalars(stmt).first()
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blog post '{slug}' not found",
        )
    return post
