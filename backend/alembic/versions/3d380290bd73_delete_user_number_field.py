"""delete user number field

Revision ID: 3d380290bd73
Revises: 50c0a9409b72
Create Date: 2025-10-05 15:31:38.784279

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3d380290bd73'
down_revision: Union[str, Sequence[str], None] = '50c0a9409b72'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    op.add_column(
        "users",
        sa.Column("number", sa.String(length=255), nullable=True)
    )