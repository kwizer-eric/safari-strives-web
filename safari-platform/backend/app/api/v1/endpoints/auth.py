from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.core.security import create_access_token, verify_password
from app.models.admin_user import AdminUser
from app.schemas.auth import AdminUserRead, LoginRequest, Token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> Token:
    admin = db.scalars(select(AdminUser).where(AdminUser.email == payload.email)).first()

    # Same error for "no such user" and "wrong password": don't leak which
    # emails have accounts. Also reject inactive admins here (banned staff
    # never get a token, not just blocked later).
    invalid_credentials = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password",
    )
    if admin is None or not admin.is_active:
        raise invalid_credentials
    if not verify_password(payload.password, admin.hashed_password):
        raise invalid_credentials

    access_token = create_access_token(subject=admin.email)
    return Token(access_token=access_token)


@router.get("/me", response_model=AdminUserRead)
def read_current_admin(admin: AdminUser = Depends(get_current_admin)) -> AdminUser:
    return admin
