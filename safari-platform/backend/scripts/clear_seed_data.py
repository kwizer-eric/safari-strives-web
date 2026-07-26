#!/usr/bin/env python
"""
Clear all seed/mock data from the database while keeping the schema intact.
This deletes seed data from CMS pages, collections, and program pages.
Does NOT delete the admin user or any user-created data.

Usage (from backend directory):
    python -m scripts.clear_seed_data
"""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.cms import CmsCollection, CmsPage
from app.models.page import Page


def clear_seed_data() -> None:
    """Delete all seed/mock data from the database."""
    db = SessionLocal()
    try:
        # Delete CMS Pages (seed data: home, about, ventures, field-notes)
        cms_pages_to_delete = ["home", "about", "ventures", "field-notes"]
        deleted_count = 0
        for slug in cms_pages_to_delete:
            page = db.scalars(select(CmsPage).where(CmsPage.slug == slug)).first()
            if page:
                db.delete(page)
                deleted_count += 1
                print(f"  ✓ Deleted CMS page: '{slug}'")

        # Delete CMS Collections (seed data: site, testimonials, ventures)
        cms_collections_to_delete = ["site", "testimonials", "ventures"]
        for key in cms_collections_to_delete:
            collection = db.scalars(
                select(CmsCollection).where(CmsCollection.key == key)
            ).first()
            if collection:
                db.delete(collection)
                deleted_count += 1
                print(f"  ✓ Deleted CMS collection: '{key}'")

        # Delete Program Pages (seed data: our-model, green-enterprise-lab, the-hub)
        program_slugs = ["our-model", "green-enterprise-lab", "the-hub"]
        for slug in program_slugs:
            page = db.scalars(select(Page).where(Page.slug == slug)).first()
            if page:
                db.delete(page)
                deleted_count += 1
                print(f"  ✓ Deleted program page: '{slug}'")

        db.commit()
        print(f"\n✓ Successfully deleted {deleted_count} seed data records")
        print("✓ Database schema preserved")
        print("✓ Admin user and all custom data preserved")

    except Exception as e:
        db.rollback()
        print(f"\n✗ Error clearing seed data: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    clear_seed_data()

