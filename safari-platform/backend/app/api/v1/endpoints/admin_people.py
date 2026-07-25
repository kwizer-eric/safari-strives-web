from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.models.people import BoardMember, TeamMember
from app.schemas.people import (
    BoardMemberCreate,
    BoardMemberRead,
    BoardMemberUpdate,
    TeamMemberCreate,
    TeamMemberRead,
    TeamMemberUpdate,
)

router = APIRouter(
    prefix="/admin/people",
    tags=["admin-people"],
    dependencies=[Depends(get_current_admin)],
)


def _get_team_or_404(member_id: int, db: Session) -> TeamMember:
    member = db.get(TeamMember, member_id)
    if member is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Team member {member_id} not found",
        )
    return member


def _get_board_or_404(member_id: int, db: Session) -> BoardMember:
    member = db.get(BoardMember, member_id)
    if member is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Board member {member_id} not found",
        )
    return member


@router.get("/team", response_model=list[TeamMemberRead])
def list_team(db: Session = Depends(get_db)) -> list[TeamMember]:
    stmt = select(TeamMember).order_by(TeamMember.display_order, TeamMember.id)
    return list(db.scalars(stmt).all())


@router.post("/team", response_model=TeamMemberRead, status_code=status.HTTP_201_CREATED)
def create_team_member(
    payload: TeamMemberCreate, db: Session = Depends(get_db)
) -> TeamMember:
    member = TeamMember(**payload.model_dump())
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


@router.get("/team/{member_id}", response_model=TeamMemberRead)
def get_team_member(member_id: int, db: Session = Depends(get_db)) -> TeamMember:
    return _get_team_or_404(member_id, db)


@router.patch("/team/{member_id}", response_model=TeamMemberRead)
def update_team_member(
    member_id: int, payload: TeamMemberUpdate, db: Session = Depends(get_db)
) -> TeamMember:
    member = _get_team_or_404(member_id, db)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(member, field, value)
    db.commit()
    db.refresh(member)
    return member


@router.delete("/team/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team_member(member_id: int, db: Session = Depends(get_db)) -> None:
    member = _get_team_or_404(member_id, db)
    db.delete(member)
    db.commit()


@router.get("/board", response_model=list[BoardMemberRead])
def list_board(db: Session = Depends(get_db)) -> list[BoardMember]:
    stmt = select(BoardMember).order_by(BoardMember.display_order, BoardMember.id)
    return list(db.scalars(stmt).all())


@router.post(
    "/board", response_model=BoardMemberRead, status_code=status.HTTP_201_CREATED
)
def create_board_member(
    payload: BoardMemberCreate, db: Session = Depends(get_db)
) -> BoardMember:
    member = BoardMember(**payload.model_dump())
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


@router.get("/board/{member_id}", response_model=BoardMemberRead)
def get_board_member(member_id: int, db: Session = Depends(get_db)) -> BoardMember:
    return _get_board_or_404(member_id, db)


@router.patch("/board/{member_id}", response_model=BoardMemberRead)
def update_board_member(
    member_id: int, payload: BoardMemberUpdate, db: Session = Depends(get_db)
) -> BoardMember:
    member = _get_board_or_404(member_id, db)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(member, field, value)
    db.commit()
    db.refresh(member)
    return member


@router.delete("/board/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_board_member(member_id: int, db: Session = Depends(get_db)) -> None:
    member = _get_board_or_404(member_id, db)
    db.delete(member)
    db.commit()
