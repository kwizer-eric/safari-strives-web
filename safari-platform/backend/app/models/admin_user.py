from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class AdminUser(Base):
    """Staff account for the admin dashboard.

    Only the bcrypt hash is stored (never plain text). is_active lets us disable
    an account without deleting it, so a banned user cannot obtain a JWT.
    """

    __tablename__ = "admin_users"

    id: Mapped[int] = mapped_column(primary_key=True)

    # Login identity: unique + indexed so email lookups stay fast at scale.
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))

    # Plain string role (e.g. "admin"); enough for now, easy to extend later.
    role: Mapped[str] = mapped_column(String(50), default="admin", server_default="admin")
    is_active: Mapped[bool] = mapped_column(
        Boolean, default=True, server_default="true"
    )

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
