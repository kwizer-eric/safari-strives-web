from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.v1.deps import get_db
from app.models.cms import CmsCollection, CmsPage
from app.schemas.cms import CmsCollectionRead, CmsPageRead

router = APIRouter(prefix="/cms", tags=["cms"])


@router.get("/pages", response_model=list[CmsPageRead])
def list_published_pages(db: Session = Depends(get_db)) -> list[CmsPage]:
    stmt = select(CmsPage).where(CmsPage.is_published.is_(True)).order_by(CmsPage.slug)
    return list(db.scalars(stmt).all())


@router.get("/pages/{slug}", response_model=CmsPageRead)
def get_published_page(slug: str, db: Session = Depends(get_db)) -> CmsPage:
    stmt = select(CmsPage).where(CmsPage.slug == slug, CmsPage.is_published.is_(True))
    page = db.scalars(stmt).first()
    if page is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"CMS page '{slug}' not found",
        )
    return page


@router.get("/collections", response_model=list[CmsCollectionRead])
def list_published_collections(db: Session = Depends(get_db)) -> list[CmsCollection]:
    stmt = select(CmsCollection).where(CmsCollection.is_published.is_(True)).order_by(
        CmsCollection.key
    )
    return list(db.scalars(stmt).all())


@router.get("/collections/{key}", response_model=CmsCollectionRead)
def get_published_collection(key: str, db: Session = Depends(get_db)) -> CmsCollection:
    stmt = select(CmsCollection).where(
        CmsCollection.key == key, CmsCollection.is_published.is_(True)
    )
    collection = db.scalars(stmt).first()
    if collection is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"CMS collection '{key}' not found",
        )
    return collection
