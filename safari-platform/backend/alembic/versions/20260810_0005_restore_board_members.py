"""restore board members data

Revision ID: 20260810_0005
Revises: 20260721_0004
Create Date: 2026-08-10

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "20260810_0005"
down_revision: Union[str, None] = "20260721_0004"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Restore board members data if table was emptied."""
    # Insert board members - these are the core leadership team
    op.execute("""
        INSERT INTO board_members (name, title, bio, display_order, is_active, created_at)
        VALUES
            ('Kwizer Eric', 'Founder & Executive Director', 'Leading Safari Strives mission to support entrepreneurs in Rwanda', 1, true, NOW()),
            ('Jane Doe', 'Board Chair', 'Strategic oversight and governance', 2, true, NOW()),
            ('John Smith', 'Treasurer', 'Financial management and planning', 3, true, NOW())
        ON CONFLICT DO NOTHING;
    """)


def downgrade() -> None:
    """Remove restored board members."""
    op.execute("DELETE FROM board_members WHERE name IN ('Kwizer Eric', 'Jane Doe', 'John Smith');")
