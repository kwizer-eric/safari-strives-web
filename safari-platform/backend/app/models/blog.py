from __future__ import annotations

from datetime import datetime

from sqlalchemy import String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class BlogPost(Base):
    """Press / Field Notes article.

    content is Markdown (frontend renders it). status is a plain string
    ("draft"/"published"); published_at is nullable until the post goes live.
    """

    __tablename__ = "blog_posts"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255))

    # Public URL key: unique + indexed for fast lookups by slug.
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)

    excerpt: Mapped[str | None] = mapped_column(String(500), nullable=True)
    content: Mapped[str | None] = mapped_column(Text, nullable=True)
    cover_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    status: Mapped[str] = mapped_column(
        String(50), default="draft", server_default="draft"
    )
    published_at: Mapped[datetime | None] = mapped_column(nullable=True)

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
