"""align page columns and add cms/global/submission tables

Revision ID: 20260705_0002
Revises: 20260705_0001
Create Date: 2026-07-05

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "20260705_0002"
down_revision: Union[str, None] = "20260705_0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # --- Align existing Page / PageFeature column names to the proposal ---
    op.alter_column("pages", "hero_media_url", new_column_name="hero_video_url")
    op.alter_column("pages", "contact_line", new_column_name="contact_email")
    op.alter_column("pages", "final_cta", new_column_name="final_cta_text")
    op.alter_column("page_features", "order", new_column_name="display_order")

    # --- Global entities ---
    op.create_table(
        "admin_users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=50), server_default="admin", nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default="true", nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_admin_users_email"), "admin_users", ["email"], unique=True)

    op.create_table(
        "team_members",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=True),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("photo_url", sa.String(length=500), nullable=True),
        sa.Column("linkedin_url", sa.String(length=500), nullable=True),
        sa.Column("display_order", sa.Integer(), server_default="0", nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default="true", nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "board_members",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=True),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("photo_url", sa.String(length=500), nullable=True),
        sa.Column("linkedin_url", sa.String(length=500), nullable=True),
        sa.Column("display_order", sa.Integer(), server_default="0", nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default="true", nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "blog_posts",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("slug", sa.String(length=255), nullable=False),
        sa.Column("excerpt", sa.String(length=500), nullable=True),
        sa.Column("content", sa.Text(), nullable=True),
        sa.Column("cover_image_url", sa.String(length=500), nullable=True),
        sa.Column("status", sa.String(length=50), server_default="draft", nullable=False),
        sa.Column("published_at", sa.DateTime(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_blog_posts_slug"), "blog_posts", ["slug"], unique=True)

    # --- Submissions ---
    op.create_table(
        "accelerator_applications",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("founder_name", sa.String(length=200), nullable=False),
        sa.Column("business_name", sa.String(length=200), nullable=True),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=50), nullable=True),
        sa.Column("business_description", sa.Text(), nullable=True),
        sa.Column("status", sa.String(length=50), server_default="NEW", nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "partner_applications",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=50), nullable=True),
        sa.Column("expertise", sa.String(length=300), nullable=True),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column("status", sa.String(length=50), server_default="NEW", nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "contact_messages",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("subject", sa.String(length=255), nullable=True),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("contact_messages")
    op.drop_table("partner_applications")
    op.drop_table("accelerator_applications")

    op.drop_index(op.f("ix_blog_posts_slug"), table_name="blog_posts")
    op.drop_table("blog_posts")

    op.drop_table("board_members")
    op.drop_table("team_members")

    op.drop_index(op.f("ix_admin_users_email"), table_name="admin_users")
    op.drop_table("admin_users")

    # Revert the Page / PageFeature column renames.
    op.alter_column("page_features", "display_order", new_column_name="order")
    op.alter_column("pages", "final_cta_text", new_column_name="final_cta")
    op.alter_column("pages", "contact_email", new_column_name="contact_line")
    op.alter_column("pages", "hero_video_url", new_column_name="hero_media_url")
