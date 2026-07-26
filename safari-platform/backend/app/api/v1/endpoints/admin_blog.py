from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.models.blog import BlogPost
from app.schemas.blog import BlogPostCreate, BlogPostRead, BlogPostUpdate

router = APIRouter(
    prefix="/admin/blog",
    tags=["admin-blog"],
    dependencies=[Depends(get_current_admin)],
)


def _get_post_or_404(post_id: int, db: Session) -> BlogPost:
    post = db.get(BlogPost, post_id)
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blog post {post_id} not found",
        )
    return post


def _apply_publish_timestamp(post: BlogPost) -> None:
    """Stamp published_at the first time a post goes live."""
    if post.status == "published" and post.published_at is None:
        post.published_at = datetime.now(timezone.utc)
    if post.status == "draft":
        # Keep published_at history if they unpublish; frontend filters on status.
        pass


@router.get("/posts", response_model=list[BlogPostRead])
def list_posts(db: Session = Depends(get_db)) -> list[BlogPost]:
    stmt = select(BlogPost).order_by(BlogPost.created_at.desc(), BlogPost.id.desc())
    return list(db.scalars(stmt).all())


@router.post("/posts", response_model=BlogPostRead, status_code=status.HTTP_201_CREATED)
def create_post(payload: BlogPostCreate, db: Session = Depends(get_db)) -> BlogPost:
    post = BlogPost(**payload.model_dump())
    _apply_publish_timestamp(post)
    db.add(post)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Blog slug '{payload.slug}' already exists",
        ) from None
    db.refresh(post)
    return post


@router.get("/posts/{post_id}", response_model=BlogPostRead)
def get_post(post_id: int, db: Session = Depends(get_db)) -> BlogPost:
    return _get_post_or_404(post_id, db)


@router.patch("/posts/{post_id}", response_model=BlogPostRead)
def update_post(
    post_id: int, payload: BlogPostUpdate, db: Session = Depends(get_db)
) -> BlogPost:
    post = _get_post_or_404(post_id, db)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(post, field, value)
    _apply_publish_timestamp(post)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Blog slug already exists",
        ) from None
    db.refresh(post)
    return post


@router.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db)) -> None:
    post = _get_post_or_404(post_id, db)
    db.delete(post)
    db.commit()
