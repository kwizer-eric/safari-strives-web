"""add cms pages and collections tables

Revision ID: 20260721_0004
Revises: 20260713_0003
Create Date: 2026-07-21 10:08:00.000000
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "20260721_0004"
down_revision = "20260713_0003"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "cms_pages",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("slug", sa.String(length=120), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("is_published", sa.Boolean(), server_default="false", nullable=False),
        sa.Column("payload", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_cms_pages_slug"), "cms_pages", ["slug"], unique=True)

    op.create_table(
        "cms_collections",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("key", sa.String(length=120), nullable=False),
        sa.Column("label", sa.String(length=255), nullable=False),
        sa.Column("is_published", sa.Boolean(), server_default="false", nullable=False),
        sa.Column("payload", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_cms_collections_key"), "cms_collections", ["key"], unique=True
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_cms_collections_key"), table_name="cms_collections")
    op.drop_table("cms_collections")
    op.drop_index(op.f("ix_cms_pages_slug"), table_name="cms_pages")
    op.drop_table("cms_pages")
