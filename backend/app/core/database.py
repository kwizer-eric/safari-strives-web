from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # drops dead connections instead of erroring mid-request
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    """Declarative base. All ORM models inherit from this (SQLAlchemy 2.0 style)."""

    pass


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency. Yields a session and always closes it afterwards."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
