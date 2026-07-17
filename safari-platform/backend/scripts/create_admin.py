"""CLI to provision the first (or any) AdminUser.

There is no public signup endpoint on purpose: staff accounts are created
out-of-band by whoever has shell/DB access, not self-service over HTTP.

Usage:
    python -m scripts.create_admin --email admin@safaristrives.org --password 'change-me' [--role admin]
"""

import argparse
import sys

from sqlalchemy import select

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.admin_user import AdminUser


def create_admin(email: str, password: str, role: str) -> None:
    db = SessionLocal()
    try:
        existing = db.scalars(select(AdminUser).where(AdminUser.email == email)).first()
        if existing is not None:
            print(f"AdminUser with email '{email}' already exists (id={existing.id}).")
            sys.exit(1)

        admin = AdminUser(
            email=email,
            hashed_password=hash_password(password),
            role=role,
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        print(f"Created AdminUser id={admin.id} email={admin.email} role={admin.role}")
    finally:
        db.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Create an AdminUser.")
    parser.add_argument("--email", required=True)
    parser.add_argument("--password", required=True)
    parser.add_argument("--role", default="admin")
    args = parser.parse_args()

    create_admin(email=args.email, password=args.password, role=args.role)


if __name__ == "__main__":
    main()
