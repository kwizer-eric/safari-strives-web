"""create pages and page_features tables

Revision ID: 20260705_0001
Revises:
Create Date: 2026-07-05

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "20260705_0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "pages",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("slug", sa.String(length=120), nullable=False),
        sa.Column("is_published", sa.Boolean(), server_default="false", nullable=False),
        sa.Column("hero_title", sa.String(length=200), nullable=False),
        sa.Column("hero_subtitle", sa.String(length=400), nullable=True),
        sa.Column("hero_media_url", sa.String(length=500), nullable=True),
        sa.Column("hero_media_alt", sa.String(length=200), nullable=True),
        sa.Column("intro_text", sa.Text(), nullable=True),
        sa.Column("cta_label", sa.String(length=120), nullable=True),
        sa.Column("cta_link", sa.String(length=500), nullable=True),
        sa.Column("contact_line", sa.String(length=300), nullable=True),
        sa.Column("section_title", sa.String(length=200), nullable=True),
        sa.Column("main_description", sa.Text(), nullable=True),
        sa.Column("final_cta", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_pages_slug"), "pages", ["slug"], unique=True)

    op.create_table(
        "page_features",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("page_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("order", sa.Integer(), server_default="0", nullable=False),
        sa.Column("icon", sa.String(length=100), nullable=True),
        sa.Column("image_url", sa.String(length=500), nullable=True),
        sa.ForeignKeyConstraint(["page_id"], ["pages.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_page_features_page_id"), "page_features", ["page_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_page_features_page_id"), table_name="page_features")
    op.drop_table("page_features")
    op.drop_index(op.f("ix_pages_slug"), table_name="pages")
    op.drop_table("pages")
