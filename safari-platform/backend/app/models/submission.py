from __future__ import annotations

from datetime import datetime

from sqlalchemy import String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class AcceleratorApplication(Base):
    """A founder's application to the Venture Accelerator.

    status tracks the review workflow (NEW -> REVIEWED -> ACCEPTED) as a plain
    string default of "NEW".
    """

    __tablename__ = "accelerator_applications"

    id: Mapped[int] = mapped_column(primary_key=True)
    founder_name: Mapped[str] = mapped_column(String(200))
    business_name: Mapped[str | None] = mapped_column(String(200), nullable=True)
    email: Mapped[str] = mapped_column(String(255))
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    business_description: Mapped[str | None] = mapped_column(Text, nullable=True)

    status: Mapped[str] = mapped_column(String(50), default="NEW", server_default="NEW")
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())


class PartnerApplication(Base):
    """A mentor / advisor / buyer wanting to partner with Safari Strives."""

    __tablename__ = "partner_applications"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    email: Mapped[str] = mapped_column(String(255))

    # role is free text for now: "mentor" | "advisor" | "buyer".
    role: Mapped[str | None] = mapped_column(String(50), nullable=True)
    expertise: Mapped[str | None] = mapped_column(String(300), nullable=True)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)

    status: Mapped[str] = mapped_column(String(50), default="NEW", server_default="NEW")
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())


class ContactMessage(Base):
    """A general inquiry from the public contact form."""

    __tablename__ = "contact_messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    email: Mapped[str] = mapped_column(String(255))
    subject: Mapped[str | None] = mapped_column(String(255), nullable=True)
    message: Mapped[str] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())


class NewsletterSubscriber(Base):
    """Homepage newsletter signup — name + email only.

    Email is unique so the same person cannot flood the list; re-submitting
    updates their name instead of creating a duplicate row.
    """

    __tablename__ = "newsletter_subscribers"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
