from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.v1.deps import get_db
from app.models.page import Page
from app.schemas.page import PageRead, PageSummary

router = APIRouter(prefix="/pages", tags=["pages"])


@router.get("", response_model=list[PageSummary])
def list_published_pages(db: Session = Depends(get_db)) -> list[Page]:
    """Public list of published pages (lightweight summaries)."""
    stmt = select(Page).where(Page.is_published.is_(True)).order_by(Page.slug)
    return list(db.scalars(stmt).all())


@router.get("/{slug}", response_model=PageRead)
def get_published_page(slug: str, db: Session = Depends(get_db)) -> Page:
    """Public fetch of a single published page by slug, with its features.

    Unpublished/missing pages return 404 so drafts never leak to the site.
    """
    stmt = select(Page).where(Page.slug == slug, Page.is_published.is_(True))
    page = db.scalars(stmt).first()
    if page is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Page '{slug}' not found",
        )
    return page
