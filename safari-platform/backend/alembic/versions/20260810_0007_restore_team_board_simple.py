"""restore team and board members - simplified

Revision ID: 20260810_0007
Revises: 20260810_0006
Create Date: 2026-08-10

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "20260810_0007"
down_revision: Union[str, None] = "20260810_0006"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Restore team and board members - clear and re-insert."""
    # Clear existing team/board data and re-seed
    op.execute("DELETE FROM team_members;")
    op.execute("DELETE FROM board_members;")
    
    # Insert team members
    op.execute("""
        INSERT INTO team_members (name, title, bio, display_order, is_active, created_at)
        VALUES ('Kwizer Eric', 'Founder & Executive Director', 'Leading Safari Strives mission to support entrepreneurs in Rwanda', 1, true, NOW())
    """)
    
    # Insert board members
    op.execute("""
        INSERT INTO board_members (name, title, bio, display_order, is_active, created_at)
        VALUES 
            ('Kwizer Eric', 'Founder & Executive Director', 'Leading Safari Strives mission to support entrepreneurs in Rwanda', 1, true, NOW()),
            ('Jane Doe', 'Board Chair', 'Strategic oversight and governance', 2, true, NOW()),
            ('John Smith', 'Treasurer', 'Financial management and planning', 3, true, NOW())
    """)


def downgrade() -> None:
    """Remove restored members."""
    op.execute("DELETE FROM team_members WHERE name = 'Kwizer Eric';")
    op.execute("DELETE FROM board_members WHERE name IN ('Kwizer Eric', 'Jane Doe', 'John Smith');")
