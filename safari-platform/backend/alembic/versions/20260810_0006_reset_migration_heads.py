"""reset alembic migration state

Revision ID: 20260810_0006
Revises: 20260810_0005
Create Date: 2026-08-10

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "20260810_0006"
down_revision: Union[str, None] = "20260810_0005"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """This migration exists only to reset the alembic_version table.
    
    The database was left in an inconsistent state referencing migration
    20260810_0007 which was deleted. This migration chains after 20260810_0005
    and simply completes, allowing the system to move forward.
    """
    pass


def downgrade() -> None:
    """Downgrade stub."""
    pass
