from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.v1.deps import get_db
from app.models.cms import CmsCollection, CmsPage
from app.schemas.cms import (
    CmsCollectionCreate,
    CmsCollectionRead,
    CmsCollectionUpdate,
    CmsPageCreate,
    CmsPageRead,
    CmsPageUpdate,
)

# Auth intentionally disabled while the CMS UI is being built out.
# Re-add `dependencies=[Depends(get_current_admin)]` before production.
router = APIRouter(prefix="/admin/cms", tags=["admin-cms"])


def _get_page_or_404(page_id: int, db: Session) -> CmsPage:
    page = db.get(CmsPage, page_id)
    if page is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"CMS page {page_id} not found",
        )
    return page


def _get_collection_or_404(collection_id: int, db: Session) -> CmsCollection:
    collection = db.get(CmsCollection, collection_id)
    if collection is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"CMS collection {collection_id} not found",
        )
    return collection


@router.get("/pages", response_model=list[CmsPageRead])
def list_pages(db: Session = Depends(get_db)) -> list[CmsPage]:
    stmt = select(CmsPage).order_by(CmsPage.slug)
    return list(db.scalars(stmt).all())


@router.post("/pages", response_model=CmsPageRead, status_code=status.HTTP_201_CREATED)
def create_page(payload: CmsPageCreate, db: Session = Depends(get_db)) -> CmsPage:
    page = CmsPage(**payload.model_dump())
    db.add(page)
    db.commit()
    db.refresh(page)
    return page


@router.get("/pages/{page_id}", response_model=CmsPageRead)
def get_page(page_id: int, db: Session = Depends(get_db)) -> CmsPage:
    return _get_page_or_404(page_id, db)


@router.patch("/pages/{page_id}", response_model=CmsPageRead)
def update_page(
    page_id: int, payload: CmsPageUpdate, db: Session = Depends(get_db)
) -> CmsPage:
    page = _get_page_or_404(page_id, db)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(page, field, value)
    db.commit()
    db.refresh(page)
    return page


@router.delete("/pages/{page_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_page(page_id: int, db: Session = Depends(get_db)) -> None:
    page = _get_page_or_404(page_id, db)
    db.delete(page)
    db.commit()


@router.get("/collections", response_model=list[CmsCollectionRead])
def list_collections(db: Session = Depends(get_db)) -> list[CmsCollection]:
    stmt = select(CmsCollection).order_by(CmsCollection.key)
    return list(db.scalars(stmt).all())


@router.post(
    "/collections", response_model=CmsCollectionRead, status_code=status.HTTP_201_CREATED
)
def create_collection(
    payload: CmsCollectionCreate, db: Session = Depends(get_db)
) -> CmsCollection:
    collection = CmsCollection(**payload.model_dump())
    db.add(collection)
    db.commit()
    db.refresh(collection)
    return collection


@router.get("/collections/{collection_id}", response_model=CmsCollectionRead)
def get_collection(collection_id: int, db: Session = Depends(get_db)) -> CmsCollection:
    return _get_collection_or_404(collection_id, db)


@router.patch("/collections/{collection_id}", response_model=CmsCollectionRead)
def update_collection(
    collection_id: int, payload: CmsCollectionUpdate, db: Session = Depends(get_db)
) -> CmsCollection:
    collection = _get_collection_or_404(collection_id, db)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(collection, field, value)
    db.commit()
    db.refresh(collection)
    return collection


@router.delete("/collections/{collection_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_collection(collection_id: int, db: Session = Depends(get_db)) -> None:
    collection = _get_collection_or_404(collection_id, db)
    db.delete(collection)
    db.commit()
