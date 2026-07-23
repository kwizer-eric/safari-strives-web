from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class CmsPage(Base):
    """Single public page payload (JSON), keyed by slug.

    The payload stores structured URL-based media/content blocks for one page.
    """

    __tablename__ = "cms_pages"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    is_published: Mapped[bool] = mapped_column(
        Boolean, default=False, server_default="false"
    )
    payload: Mapped[dict] = mapped_column(JSONB)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), onupdate=func.now()
    )


class CmsCollection(Base):
    """Named dataset payload used across public pages.

    Examples: site settings, ventures list, articles, testimonials.
    """

    __tablename__ = "cms_collections"

    id: Mapped[int] = mapped_column(primary_key=True)
    key: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    label: Mapped[str] = mapped_column(String(255))
    is_published: Mapped[bool] = mapped_column(
        Boolean, default=False, server_default="false"
    )
    payload: Mapped[dict] = mapped_column(JSONB)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), onupdate=func.now()
    )
