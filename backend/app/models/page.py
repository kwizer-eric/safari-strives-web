from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Page(Base):
    """A dynamic program page (venture-accelerator, green-enterprise-lab, the-hub).

    All 3 current pages share this shape, so we keep one table instead of
    page-specific tables. Text/rich fields hold Markdown; the frontend renders it.
    Media fields store URLs only (never binary blobs).
    """

    __tablename__ = "pages"

    id: Mapped[int] = mapped_column(primary_key=True)

    # Public identity: frontend fetches by slug, so it is unique + indexed.
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    is_published: Mapped[bool] = mapped_column(
        Boolean, default=False, server_default="false"
    )

    # Hero section (video OR image, URL only)
    hero_title: Mapped[str] = mapped_column(String(200))
    hero_subtitle: Mapped[str | None] = mapped_column(String(400), nullable=True)
    hero_video_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    hero_media_alt: Mapped[str | None] = mapped_column(String(200), nullable=True)

    # Intro / eyebrow text
    intro_text: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Primary CTA button
    cta_label: Mapped[str | None] = mapped_column(String(120), nullable=True)
    cta_link: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # Optional contact line / email
    contact_email: Mapped[str | None] = mapped_column(String(300), nullable=True)

    # Main body: section title + "who is this for" description (Markdown)
    section_title: Mapped[str | None] = mapped_column(String(200), nullable=True)
    main_description: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Closing statement, distinct from the primary CTA button
    final_cta_text: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), onupdate=func.now()
    )

    # Ordered by the explicit display_order column so staff can reorder freely.
    features: Mapped[list["PageFeature"]] = relationship(
        back_populates="page",
        cascade="all, delete-orphan",
        order_by="PageFeature.display_order",
    )


class PageFeature(Base):
    """A single feature-list item under a Page (title + description).

    Kept generic: no icons/children/media are required by current designs, but
    optional icon/image_url are reserved for future flexibility.
    """

    __tablename__ = "page_features"

    id: Mapped[int] = mapped_column(primary_key=True)
    page_id: Mapped[int] = mapped_column(
        ForeignKey("pages.id", ondelete="CASCADE"), index=True
    )

    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text)

    # Explicit ordering: staff reorder without relying on insertion order.
    display_order: Mapped[int] = mapped_column(Integer, default=0, server_default="0")

    # Reserved for future use; unused in current designs.
    icon: Mapped[str | None] = mapped_column(String(100), nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    page: Mapped["Page"] = relationship(back_populates="features")
