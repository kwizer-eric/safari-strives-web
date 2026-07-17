"""redesign pages columns to match program-page content shape, add page_sections

Revision ID: 20260713_0003
Revises: 20260705_0002
Create Date: 2026-07-13

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "20260713_0003"
down_revision: Union[str, None] = "20260705_0002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # --- Rename existing columns to their new section-scoped names ---
    op.alter_column("pages", "hero_subtitle", new_column_name="hero_subhead")
    op.alter_column("pages", "cta_label", new_column_name="hero_cta_label")
    op.alter_column("pages", "cta_link", new_column_name="hero_cta_link")
    op.alter_column("pages", "intro_text", new_column_name="intro_body")
    op.alter_column("pages", "section_title", new_column_name="features_title")
    op.alter_column("pages", "final_cta_text", new_column_name="closer_body")

    # Widen columns that now hold longer headline copy.
    op.alter_column("pages", "hero_title", type_=sa.String(length=300))
    op.alter_column("pages", "hero_media_alt", type_=sa.String(length=300))

    # `main_description` had no clear owner (redundant with intro_body); dropped.
    op.drop_column("pages", "main_description")

    # --- New section-scoped columns ---
    op.add_column("pages", sa.Column("hero_eyebrow", sa.String(length=200), nullable=True))
    op.add_column("pages", sa.Column("hero_body", sa.Text(), nullable=True))
    op.add_column("pages", sa.Column("hero_media_caption", sa.Text(), nullable=True))

    op.add_column("pages", sa.Column("intro_eyebrow", sa.String(length=200), nullable=True))
    op.add_column("pages", sa.Column("intro_title", sa.String(length=300), nullable=True))

    op.add_column("pages", sa.Column("features_eyebrow", sa.String(length=200), nullable=True))

    op.add_column("pages", sa.Column("closer_eyebrow", sa.String(length=200), nullable=True))
    # No production rows exist yet; backfill with '' so the new NOT NULL column is safe to add.
    op.add_column(
        "pages",
        sa.Column("closer_title", sa.String(length=300), server_default="", nullable=False),
    )
    op.add_column(
        "pages", sa.Column("closer_primary_cta_label", sa.String(length=120), nullable=True)
    )
    op.add_column(
        "pages", sa.Column("closer_primary_cta_link", sa.String(length=500), nullable=True)
    )
    op.add_column(
        "pages", sa.Column("closer_secondary_cta_label", sa.String(length=120), nullable=True)
    )
    op.add_column(
        "pages", sa.Column("closer_secondary_cta_link", sa.String(length=500), nullable=True)
    )

    # --- New PageSection table (generic repeatable eyebrow/title/body block) ---
    op.create_table(
        "page_sections",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("page_id", sa.Integer(), nullable=False),
        sa.Column("eyebrow", sa.String(length=200), nullable=True),
        sa.Column("title", sa.String(length=300), nullable=True),
        sa.Column("body", sa.Text(), nullable=True),
        sa.Column("display_order", sa.Integer(), server_default="0", nullable=False),
        sa.ForeignKeyConstraint(["page_id"], ["pages.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_page_sections_page_id"), "page_sections", ["page_id"], unique=False
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_page_sections_page_id"), table_name="page_sections")
    op.drop_table("page_sections")

    op.drop_column("pages", "closer_secondary_cta_link")
    op.drop_column("pages", "closer_secondary_cta_label")
    op.drop_column("pages", "closer_primary_cta_link")
    op.drop_column("pages", "closer_primary_cta_label")
    op.drop_column("pages", "closer_title")
    op.drop_column("pages", "closer_eyebrow")

    op.drop_column("pages", "features_eyebrow")

    op.drop_column("pages", "intro_title")
    op.drop_column("pages", "intro_eyebrow")

    op.drop_column("pages", "hero_media_caption")
    op.drop_column("pages", "hero_body")
    op.drop_column("pages", "hero_eyebrow")

    op.add_column("pages", sa.Column("main_description", sa.Text(), nullable=True))

    op.alter_column("pages", "hero_media_alt", type_=sa.String(length=200))
    op.alter_column("pages", "hero_title", type_=sa.String(length=200))

    op.alter_column("pages", "closer_body", new_column_name="final_cta_text")
    op.alter_column("pages", "features_title", new_column_name="section_title")
    op.alter_column("pages", "intro_body", new_column_name="intro_text")
    op.alter_column("pages", "hero_cta_link", new_column_name="cta_link")
    op.alter_column("pages", "hero_cta_label", new_column_name="cta_label")
    op.alter_column("pages", "hero_subhead", new_column_name="hero_subtitle")
