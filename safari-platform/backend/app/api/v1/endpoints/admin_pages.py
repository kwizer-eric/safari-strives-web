from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.models.page import Page, PageFeature, PageSection
from app.schemas.page import PageCreate, PageRead, PageReplace, PageSummary, PageUpdate

router = APIRouter(
    prefix="/admin/pages",
    tags=["admin-pages"],
    dependencies=[Depends(get_current_admin)],
)


def _get_page_or_404(page_id: int, db: Session) -> Page:
    page = db.get(Page, page_id)
    if page is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Page {page_id} not found"
        )
    return page


@router.post("", response_model=PageRead, status_code=status.HTTP_201_CREATED)
def create_page(payload: PageCreate, db: Session = Depends(get_db)) -> Page:
    data = payload.model_dump(exclude={"features", "sections"})
    page = Page(**data)
    page.features = [PageFeature(**f.model_dump()) for f in payload.features]
    page.sections = [PageSection(**s.model_dump()) for s in payload.sections]

    db.add(page)
    db.commit()
    db.refresh(page)
    return page


@router.get("", response_model=list[PageSummary])
def list_all_pages(db: Session = Depends(get_db)) -> list[Page]:
    """Admin list: every page regardless of publish state."""
    stmt = select(Page).order_by(Page.slug)
    return list(db.scalars(stmt).all())


@router.get("/{page_id}", response_model=PageRead)
def get_page(page_id: int, db: Session = Depends(get_db)) -> Page:
    return _get_page_or_404(page_id, db)


@router.put("/{page_id}", response_model=PageRead)
def replace_page(page_id: int, payload: PageReplace, db: Session = Depends(get_db)) -> Page:
    """Full replace: top-level fields overwritten, features/sections deleted
    and recreated wholesale. Simplest approach that stays correct when the
    incoming lists reorder, add, or remove items versus what's stored."""
    page = _get_page_or_404(page_id, db)

    data = payload.model_dump(exclude={"features", "sections"})
    for field, value in data.items():
        setattr(page, field, value)

    page.features = [PageFeature(**f.model_dump()) for f in payload.features]
    page.sections = [PageSection(**s.model_dump()) for s in payload.sections]

    db.commit()
    db.refresh(page)
    return page


@router.patch("/{page_id}", response_model=PageRead, response_model_exclude_unset=True)
def update_page(page_id: int, payload: PageUpdate, db: Session = Depends(get_db)) -> Page:
    """Partial update of top-level fields only; features/sections are managed
    via the PUT replace endpoint, not PATCH."""
    page = _get_page_or_404(page_id, db)

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(page, field, value)

    db.commit()
    db.refresh(page)
    return page


@router.delete("/{page_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_page(page_id: int, db: Session = Depends(get_db)) -> None:
    page = _get_page_or_404(page_id, db)
    db.delete(page)
    db.commit()
