"""noop stub to match production alembic_version stamp

Revision ID: 20260810_0007
Revises: 20260810_0006
Create Date: 2026-08-10

Production was stamped at 20260810_0007 after that revision file was deleted.
This empty migration restores the revision id so `alembic upgrade head` can
resolve the current DB version without re-running destructive data seeds.
"""

from typing import Sequence, Union

# revision identifiers, used by Alembic.
revision: str = "20260810_0007"
down_revision: Union[str, None] = "20260810_0006"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """No schema or data changes — stamp compatibility only."""
    pass


def downgrade() -> None:
    """No schema or data changes."""
    pass
