from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.v1.deps import get_db
from app.models.people import BoardMember, TeamMember
from app.schemas.people import BoardMemberRead, TeamMemberRead

router = APIRouter(prefix="/people", tags=["people"])


@router.get("/team", response_model=list[TeamMemberRead])
def list_active_team(db: Session = Depends(get_db)) -> list[TeamMember]:
    """Public team list — inactive members stay hidden (soft delete)."""
    stmt = (
        select(TeamMember)
        .where(TeamMember.is_active.is_(True))
        .order_by(TeamMember.display_order, TeamMember.id)
    )
    return list(db.scalars(stmt).all())


@router.get("/board", response_model=list[BoardMemberRead])
def list_active_board(db: Session = Depends(get_db)) -> list[BoardMember]:
    stmt = (
        select(BoardMember)
        .where(BoardMember.is_active.is_(True))
        .order_by(BoardMember.display_order, BoardMember.id)
    )
    return list(db.scalars(stmt).all())
