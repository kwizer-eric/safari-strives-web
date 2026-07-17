from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Page(Base):
    """A dynamic program page (venture-accelerator, green-enterprise-lab, the-hub).

    All 3 current pages share this shape, so we keep one table instead of
    page-specific tables. Fields are flattened by section (hero_*, intro_*,
    features_*, closer_*) rather than nested JSON, so admin CRUD and
    validation stay simple column-by-column. Multi-paragraph body fields
    store paragraphs joined by a blank line ("\\n\\n"); the frontend mapper
    splits on that to rebuild the paragraph list. Media fields store URLs
    only (never binary blobs).
    """

    __tablename__ = "pages"

    id: Mapped[int] = mapped_column(primary_key=True)

    # Public identity: frontend fetches by slug, so it is unique + indexed.
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    is_published: Mapped[bool] = mapped_column(
        Boolean, default=False, server_default="false"
    )

    # Hero section
    hero_eyebrow: Mapped[str | None] = mapped_column(String(200), nullable=True)
    hero_title: Mapped[str] = mapped_column(String(300))
    hero_subhead: Mapped[str | None] = mapped_column(String(400), nullable=True)
    hero_body: Mapped[str | None] = mapped_column(Text, nullable=True)
    hero_video_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    hero_media_alt: Mapped[str | None] = mapped_column(String(300), nullable=True)
    hero_media_caption: Mapped[str | None] = mapped_column(Text, nullable=True)
    hero_cta_label: Mapped[str | None] = mapped_column(String(120), nullable=True)
    hero_cta_link: Mapped[str | None] = mapped_column(String(500), nullable=True)
    contact_email: Mapped[str | None] = mapped_column(String(300), nullable=True)

    # Intro section
    intro_eyebrow: Mapped[str | None] = mapped_column(String(200), nullable=True)
    intro_title: Mapped[str | None] = mapped_column(String(300), nullable=True)
    intro_body: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Feature grid heading (the items themselves live in PageFeature)
    features_eyebrow: Mapped[str | None] = mapped_column(String(200), nullable=True)
    features_title: Mapped[str | None] = mapped_column(String(300), nullable=True)

    # Closing statement, with its own primary + optional secondary CTA
    closer_eyebrow: Mapped[str | None] = mapped_column(String(200), nullable=True)
    closer_title: Mapped[str] = mapped_column(String(300))
    closer_body: Mapped[str | None] = mapped_column(Text, nullable=True)
    closer_primary_cta_label: Mapped[str | None] = mapped_column(String(120), nullable=True)
    closer_primary_cta_link: Mapped[str | None] = mapped_column(String(500), nullable=True)
    closer_secondary_cta_label: Mapped[str | None] = mapped_column(String(120), nullable=True)
    closer_secondary_cta_link: Mapped[str | None] = mapped_column(String(500), nullable=True)

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
    sections: Mapped[list["PageSection"]] = relationship(
        back_populates="page",
        cascade="all, delete-orphan",
        order_by="PageSection.display_order",
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


class PageSection(Base):
    """A generic repeatable content block under a Page (eyebrow/title/body).

    Used today only by the Green Enterprise Lab's "Why green enterprise
    matters" block, but modeled as a list from day one so any future page can
    add more of these blocks without another migration.
    """

    __tablename__ = "page_sections"

    id: Mapped[int] = mapped_column(primary_key=True)
    page_id: Mapped[int] = mapped_column(
        ForeignKey("pages.id", ondelete="CASCADE"), index=True
    )

    eyebrow: Mapped[str | None] = mapped_column(String(200), nullable=True)
    title: Mapped[str | None] = mapped_column(String(300), nullable=True)
    body: Mapped[str | None] = mapped_column(Text, nullable=True)

    display_order: Mapped[int] = mapped_column(Integer, default=0, server_default="0")

    page: Mapped["Page"] = relationship(back_populates="sections")
