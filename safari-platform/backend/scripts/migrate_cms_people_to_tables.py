"""Copy CMS board/team people JSON into SQL team_members / board_members.

Source of truth for production content has lived under CMS keys
`team-members` / `board-members` while admin + people APIs expect the SQL
tables. Alembic seed migrations left dummy Kwizer/Jane/John rows in SQL.

Run once against production (do NOT put in start.sh):

    railway run --service backend python -m scripts.migrate_cms_people_to_tables

Idempotent: if CMS source items are non-empty, replaces that table's rows.
If source is empty, skips that table (does not wipe SQL).
"""

from __future__ import annotations

from typing import Any

from sqlalchemy import delete, func, select

from app.core.database import SessionLocal
from app.models.cms import CmsCollection
from app.models.people import BoardMember, TeamMember

TEAM_PREFERRED_KEYS = ("team-members", "team")
BOARD_PREFERRED_KEYS = ("board-members", "board")


def _items_from_collection(collection: CmsCollection | None) -> list[dict[str, Any]]:
    if collection is None:
        return []
    payload = collection.payload if isinstance(collection.payload, dict) else {}
    items = payload.get("items")
    if not isinstance(items, list):
        return []
    return [item for item in items if isinstance(item, dict)]


def _load_items(db, preferred_keys: tuple[str, ...]) -> tuple[str | None, list[dict[str, Any]]]:
    for key in preferred_keys:
        collection = db.scalars(
            select(CmsCollection).where(CmsCollection.key == key)
        ).first()
        items = _items_from_collection(collection)
        if items:
            return key, items
    return None, []


def _mapped_fields(item: dict[str, Any], display_order: int) -> dict[str, Any]:
    name = str(item.get("name") or "").strip()
    title = str(item.get("role") or item.get("title") or "").strip() or None
    bio = str(item.get("bio") or "").strip()
    location = str(item.get("location") or "").strip()
    if location:
        bio = f"{bio}\nLocation: {location}".strip() if bio else f"Location: {location}"
    photo = str(item.get("image") or item.get("photo_url") or "").strip() or None
    linkedin = (
        str(item.get("linkedin") or item.get("linkedin_url") or "").strip() or None
    )
    if photo and len(photo) > 500:
        photo = photo[:500]
    if linkedin and len(linkedin) > 500:
        linkedin = linkedin[:500]
    return {
        "name": name or "Untitled",
        "title": title,
        "bio": bio or None,
        "photo_url": photo,
        "linkedin_url": linkedin,
        "display_order": display_order,
        "is_active": True,
    }


def _sync_table(
    db,
    *,
    label: str,
    preferred_keys: tuple[str, ...],
    model: type[TeamMember] | type[BoardMember],
) -> None:
    before = db.scalar(select(func.count()).select_from(model)) or 0
    source_key, items = _load_items(db, preferred_keys)
    if not items:
        print(
            f"Skip {label}: no CMS items under {preferred_keys} "
            f"(SQL rows untouched, count={before})"
        )
        return

    db.execute(delete(model))
    for index, item in enumerate(items):
        db.add(model(**_mapped_fields(item, index)))
    db.commit()
    after = db.scalar(select(func.count()).select_from(model)) or 0
    print(
        f"Synced {label} from cms_collections.key='{source_key}': "
        f"{before} → {after} rows ({len(items)} CMS items)"
    )


def migrate() -> None:
    db = SessionLocal()
    try:
        _sync_table(
            db,
            label="team_members",
            preferred_keys=TEAM_PREFERRED_KEYS,
            model=TeamMember,
        )
        _sync_table(
            db,
            label="board_members",
            preferred_keys=BOARD_PREFERRED_KEYS,
            model=BoardMember,
        )
    finally:
        db.close()


if __name__ == "__main__":
    migrate()
