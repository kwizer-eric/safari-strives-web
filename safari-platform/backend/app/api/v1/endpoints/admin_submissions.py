from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.models.submission import (
    AcceleratorApplication,
    ContactMessage,
    PartnerApplication,
)
from app.schemas.submission import (
    AcceleratorApplicationRead,
    AcceleratorApplicationStatusUpdate,
    ContactMessageRead,
    PartnerApplicationRead,
    PartnerApplicationStatusUpdate,
)

router = APIRouter(
    prefix="/admin/submissions",
    tags=["admin-submissions"],
    dependencies=[Depends(get_current_admin)],
)


@router.get("/accelerator", response_model=list[AcceleratorApplicationRead])
def list_accelerator(db: Session = Depends(get_db)) -> list[AcceleratorApplication]:
    stmt = select(AcceleratorApplication).order_by(
        AcceleratorApplication.created_at.desc()
    )
    return list(db.scalars(stmt).all())


@router.patch(
    "/accelerator/{application_id}",
    response_model=AcceleratorApplicationRead,
)
def update_accelerator_status(
    application_id: int,
    payload: AcceleratorApplicationStatusUpdate,
    db: Session = Depends(get_db),
) -> AcceleratorApplication:
    application = db.get(AcceleratorApplication, application_id)
    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Accelerator application {application_id} not found",
        )
    application.status = payload.status
    db.commit()
    db.refresh(application)
    return application


@router.get("/partner", response_model=list[PartnerApplicationRead])
def list_partner(db: Session = Depends(get_db)) -> list[PartnerApplication]:
    stmt = select(PartnerApplication).order_by(PartnerApplication.created_at.desc())
    return list(db.scalars(stmt).all())


@router.patch(
    "/partner/{application_id}",
    response_model=PartnerApplicationRead,
)
def update_partner_status(
    application_id: int,
    payload: PartnerApplicationStatusUpdate,
    db: Session = Depends(get_db),
) -> PartnerApplication:
    application = db.get(PartnerApplication, application_id)
    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Partner application {application_id} not found",
        )
    application.status = payload.status
    db.commit()
    db.refresh(application)
    return application


@router.get("/contact", response_model=list[ContactMessageRead])
def list_contact(db: Session = Depends(get_db)) -> list[ContactMessage]:
    stmt = select(ContactMessage).order_by(ContactMessage.created_at.desc())
    return list(db.scalars(stmt).all())
