#!/usr/bin/env python
"""
Clear all seed data from the database while keeping the schema intact.
This deletes mock data from CMS pages, collections, pages, and ventures.
Does NOT delete the admin user.
"""

from sqlalchemy import text
from app.core.database import SessionLocal
from app.models.cms import CmsPage, CmsCollection
from app.models.page import Page

def clear_seed_data():
    db = SessionLocal()
    try:
        # Delete CMS Pages (home, about, ventures, field-notes)
        pages_to_delete = [
            "home",
            "about", 
            "ventures",
            "field-notes"
        ]
        for slug in pages_to_delete:
            page = db.query(CmsPage).filter(CmsPage.slug == slug).first()
            if page:
                db.delete(page)
                print(f"Deleted CMS page: {slug}")
        
        # Delete CMS Collections (site, testimonials, ventures)
        collections_to_delete = [
            "site",
            "testimonials",
            "ventures"
        ]
        for key in collections_to_delete:
            collection = db.query(CmsCollection).filter(CmsCollection.key == key).first()
            if collection:
                db.delete(collection)
                print(f"Deleted CMS collection: {key}")
        
        # Delete program pages (our-model, green-enterprise-lab, the-hub)
        program_slugs = [
            "our-model",
            "green-enterprise-lab",
            "the-hub"
        ]
        for slug in program_slugs:
            page = db.query(Page).filter(Page.slug == slug).first()
            if page:
                db.delete(page)
                print(f"Deleted program page: {slug}")
        
        db.commit()
        print("\n✓ All seed data cleared successfully!")
        print("✓ Database schema preserved")
        print("✓ Admin user preserved")
        
    except Exception as e:
        db.rollback()
        print(f"Error clearing seed data: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    clear_seed_data()

