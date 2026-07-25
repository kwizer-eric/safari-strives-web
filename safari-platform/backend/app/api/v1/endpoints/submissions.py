from fastapi import APIRouter, BackgroundTasks, Depends, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_db
from app.models.submission import (
    AcceleratorApplication,
    ContactMessage,
    PartnerApplication,
)
from app.schemas.submission import (
    AcceleratorApplicationCreate,
    AcceleratorApplicationRead,
    ContactMessageCreate,
    ContactMessageRead,
    PartnerApplicationCreate,
    PartnerApplicationRead,
)
from app.services.email import send_notification_email

router = APIRouter(prefix="/submissions", tags=["submissions"])


@router.post(
    "/accelerator",
    response_model=AcceleratorApplicationRead,
    status_code=status.HTTP_201_CREATED,
)
def submit_accelerator(
    payload: AcceleratorApplicationCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> AcceleratorApplication:
    """Public accelerator application. Email is queued after the DB commit."""
    application = AcceleratorApplication(**payload.model_dump())
    db.add(application)
    db.commit()
    db.refresh(application)

    background_tasks.add_task(
        send_notification_email,
        subject=f"[Accelerator] {application.founder_name}",
        body=(
            f"New accelerator application #{application.id}\n"
            f"Founder: {application.founder_name}\n"
            f"Business: {application.business_name or '—'}\n"
            f"Email: {application.email}\n"
            f"Phone: {application.phone or '—'}\n\n"
            f"{application.business_description or ''}"
        ),
    )
    return application


@router.post(
    "/partner",
    response_model=PartnerApplicationRead,
    status_code=status.HTTP_201_CREATED,
)
def submit_partner(
    payload: PartnerApplicationCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> PartnerApplication:
    application = PartnerApplication(**payload.model_dump())
    db.add(application)
    db.commit()
    db.refresh(application)

    background_tasks.add_task(
        send_notification_email,
        subject=f"[Partner] {application.name}",
        body=(
            f"New partner application #{application.id}\n"
            f"Name: {application.name}\n"
            f"Email: {application.email}\n"
            f"Role: {application.role or '—'}\n"
            f"Expertise: {application.expertise or '—'}\n\n"
            f"{application.message or ''}"
        ),
    )
    return application


@router.post(
    "/contact",
    response_model=ContactMessageRead,
    status_code=status.HTTP_201_CREATED,
)
def submit_contact(
    payload: ContactMessageCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> ContactMessage:
    message = ContactMessage(**payload.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)

    background_tasks.add_task(
        send_notification_email,
        subject=f"[Contact] {message.subject or message.name}",
        body=(
            f"New contact message #{message.id}\n"
            f"Name: {message.name}\n"
            f"Email: {message.email}\n"
            f"Subject: {message.subject or '—'}\n\n"
            f"{message.message}"
        ),
    )
    return message
