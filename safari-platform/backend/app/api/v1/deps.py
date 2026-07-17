"""Shared FastAPI dependencies for the v1 API."""

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.admin_user import AdminUser

# tokenUrl is only used to populate Swagger's "Authorize" login form.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_current_admin(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> AdminUser:
    """Decodes the bearer JWT and loads the AdminUser it belongs to.

    Checking is_active here (not just at login) means disabling an account
    immediately revokes access, even if the staff member still holds a
    previously-issued, unexpired token.
    """
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    email = decode_access_token(token)
    if email is None:
        raise credentials_error

    admin = db.scalars(select(AdminUser).where(AdminUser.email == email)).first()
    if admin is None or not admin.is_active:
        raise credentials_error

    return admin


__all__ = ["get_db", "get_current_admin"]
