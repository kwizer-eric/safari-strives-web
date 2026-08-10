"""Seed the generic `cms_pages` / `cms_collections` tables with the real copy
that currently lives hardcoded in public-web's `src/data/*.ts` files (home,
about, ventures, testimonials, articles, site settings).

Unlike `pages` / `page_features` (structured columns for the 3 program
pages), these tables store a single JSON `payload` blob per slug/key, so the
admin "Page Editor" / "Collection Editor" screens can render + edit them
without a migration per content change.

Safe to re-run by default: existing rows are **skipped** so admin edits
survive redeploys. Exception: collections that already exist with an
**empty** `items` list are backfilled from seed (non-empty admin content
is left alone). Pass `--force` only when you intentionally want to
overwrite CMS content with seed defaults.

Usage:
    python -m scripts.seed_cms_content
    python -m scripts.seed_cms_content --force

NOTE (2026-07-27): Backfill logic changed to ONLY seed collections that
don't exist yet. If a collection exists — even with empty items — it is
preserved, because an empty list may be an intentional admin choice (e.g.
partners hidden for a period). Only --force will overwrite existing
collections.
"""

import argparse

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.cms import CmsCollection, CmsPage

APPLY_URL = ""
LEGACY_APPLY_URL = "/applicant/login"
CONTACT_EMAIL = "safaristrives@gmail.com"
DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=69TB3LC2P9C7A"
SOCIAL_LINKS = {
    "linkedin": "https://www.linkedin.com/company/safari-strives",
    "youtube": "https://www.youtube.com/channel/UCP1uOh3zroBYxl_5PFYKKrw",
    "instagram": "https://www.instagram.com/safaristrives/",
}
SOCIAL_PLACEHOLDER_VALUES = {"", "#"}


CMS_PAGES: list[dict] = [
    {
        "slug": "home",
        "title": "Homepage",
        "is_published": True,
        "payload": {
            "hero": {
                "headline": "Supporting Entrepreneurs in Africa's Secondary Cities",
                "body": (
                    "Safari Strives equips local entrepreneurs with tools, funding, "
                    "space, and support to grow businesses, create jobs, and seize "
                    "new opportunities."
                ),
                "image": "",
                "imageAlt": "Group of people in a community",
                "heroVideo": "https://res.cloudinary.com/efzpryhb/video/upload/v1785062087/Opener_bxjmis.mp4",
            },
            "opening": {
                "title": "One business at a time.",
                "body": (
                    "In secondary cities like Rubavu, entrepreneurs are already "
                    "working, selling, hiring, and taking risks. Safari Strives "
                    "provides the space, tools, media capacity, and operator led "
                    "support that help local businesses scale."
                ),
            },
            "explore": {
                "title": "What we offer",
                "pillars": [
                    {
                        "id": "accelerator",
                        "title": "Venture Accelerator",
                        "description": (
                            "A four-month support cycle that helps operating MSMEs "
                            "become organized, visible, differentiated, and ready "
                            "for growth. Capacity first. Capital last, as a grant."
                        ),
                        "image": "https://images.unsplash.com/photo-1634936016780-65f6a77ebdd4?w=800&q=80",
                        "imageAlt": "Group of people standing in front of a building",
                        "href": "/our-model",
                    },
                    {
                        "id": "lab",
                        "title": "Generative Enterprise Lab",
                        "description": (
                            "Our own poultry and waste-to-value business. It funds "
                            "the program and serves as a demo enterprise."
                        ),
                        "image": "https://images.unsplash.com/photo-1580918577344-fe0a66733a2a?w=800&q=80",
                        "imageAlt": "Group of people in red and brown dress",
                        "href": "/green-enterprise-lab",
                    },
                    {
                        "id": "hub",
                        "title": "The Hub",
                        "description": (
                            "Workspace, internet, production tools, packaging, and a "
                            "media studio in one place. The equipment a founder "
                            "could not buy alone, and an environment where founders "
                            "meet buyers, mentors, and each other in person."
                        ),
                        "image": "https://images.unsplash.com/photo-1675434301763-594b4d0c5819?w=800&q=80",
                        "imageAlt": "Group of people sitting at desks in an office",
                        "href": "/the-hub",
                    },
                ],
            },
            "inMotion": {
                "eyebrow": "In Motion",
                "title": "Proof That Model to Market Support Works",
                "cards": [
                    {
                        "id": "yale",
                        "label": "$45,000 Yale funding",
                        "image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
                        "imageAlt": "University campus moment representing Yale support",
                    },
                    {
                        "id": "tsai-city",
                        "label": "Tsai CITY Summer Fellowship",
                        "image": "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800&q=80",
                        "imageAlt": "Woman smiling outdoors during a fellowship moment",
                    },
                    {
                        "id": "ncc",
                        "label": "$17,500 North Central College funding",
                        "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
                        "imageAlt": "Students collaborating on a funded project",
                    },
                    {
                        "id": "hub",
                        "label": "The Hub buildout",
                        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
                        "imageAlt": "Modern workspace hub under construction and use",
                    },
                    {
                        "id": "cohort",
                        "label": "First official cohort: four ventures, July to October 2026",
                        "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
                        "imageAlt": "Founders collaborating as a venture cohort",
                    },
                    {
                        "id": "gel",
                        "label": "4,000+ birds in current production",
                        "image": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
                        "imageAlt": "Poultry production at the Generative Enterprise Lab",
                    },
                    {
                        "id": "mentors",
                        "label": "Mentors, tools, and records",
                        "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
                        "imageAlt": "Mentors and founders working with tools and records",
                    },
                ],
            },
            "featuredInsights": {"title": "Featured Insights"},
            "finalCta": {
                "line1": "Talent is not missing. Infrastructure is",
                "line2": "Safari Strives. Build the conditions. Scale the work.",
            },
        },
    },
    {
        "slug": "about",
        "title": "About Page",
        "is_published": True,
        "payload": {
            "hero": {
                "eyebrow": "About Safari Strives",
                "headline": {"line1": "Why Safari Strives", "line2": "Exists"},
                "watchVideoLabel": "Watch video",
                "subhead": (
                    "Safari Strives fosters economic independence in Rwanda "
                    "through sustainable enterprises, job creation, and "
                    "zero-interest microloans for women."
                ),
                "image": "",
                "imageAlt": "Safari Strives about hero",
                "heroVideo": "https://res.cloudinary.com/efzpryhb/video/upload/v1785074288/videoplayback_1_en7ryt.webm",
                "videoId": "njiqUJcuVc4",
                "videoStart": 0,
                "legalNote": (
                    "Safari Strives Inc. is a registered not-for-profit corporation "
                    "in the State of Illinois, EIN 39-4883848, and a 501(c)(3) "
                    "public charity recognized by the IRS."
                ),
            },
            "mission": {
                "label": "Our Journey",
                "paragraphs": [
                    (
                        "Safari Strives began with a question: How do people move "
                        "from survival into sustainable growth?"
                    ),
                    (
                        "For four years, we tested different approaches on the "
                        "ground in Gisenyi, from livestock and cash transfers to "
                        "in-kind financing and direct support. Some created "
                        "short-term gains, but none solved the underlying business "
                        "constraints."
                    ),
                    (
                        "Then we realized something simple: people were already "
                        "working and selling."
                    ),
                    (
                        "What was missing were the systems, tools, capital, and "
                        "market access that help businesses grow. That insight "
                        "shaped Safari Strives today: building the infrastructure "
                        "that helps local businesses grow revenue, create jobs, "
                        "and move beyond survival."
                    ),
                ],
                "practitionerLed": {
                    "label": "Practitioner-Led",
                    "body": (
                        "We operate in the same community and face many of the same "
                        "risks as the entrepreneurs we support. That firsthand "
                        "experience shapes practical support grounded in real "
                        "decisions, real constraints, and what it actually takes to "
                        "grow a business here."
                    ),
                },
                "locations": [
                    {"label": "Head office", "region": "Rwanda", "place": "Rubavu, Rwanda"},
                    {
                        "label": "Corporate Headquarters",
                        "region": "United States",
                        "place": "Crestwood, Illinois",
                    },
                ],
            },
            "team": {
                "eyebrow": "Team",
                "title": "Our Team",
                "intro": (
                    "Meet the dedicated individuals who make Safari Strives' "
                    "mission possible. Our team combines local expertise with "
                    "global vision to create sustainable change in communities."
                ),
            },
            "board": {
                "eyebrow": "Board",
                "title": "Our Board",
                "intro": (
                    "Safari Strives is governed by a board that provides "
                    "oversight, accountability, and strategic direction for our "
                    "work in Rwanda and the United States."
                ),
            },
            "partners": {
                "eyebrow": "Partners",
                "title": "Institutions that believe in the work.",
                "intro": (
                    "Safari Strives is supported by local institutions, academic "
                    "partners, and international collaborators who share our "
                    "conviction that communities deserve reliable pathways to "
                    "economic independence."
                ),
            },
            "closer": {
                "title": "Become a partner",
                "body": (
                    "We welcome partners with expertise, networks, market access, "
                    "and growth capital to help us reach more founders and expand "
                    "the Generative Enterprise Lab in Rubavu."
                ),
                "primaryCta": {
                    "label": "Partner with Safari Strives",
                    "href": f"mailto:{CONTACT_EMAIL}",
                },
            },
        },
    },
    {
        "slug": "ventures",
        "title": "Ventures Page",
        "is_published": True,
        "payload": {
            "eyebrow": "Meet the ventures",
            "headline": "Entrepreneurs building beyond survival.",
            "heroVideo": "",
            "heroImage": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80",
            "heroImageAlt": "People collaborating at computers in an office",
            "mission": {
                "eyebrow": "Our mission",
                "body": (
                    "Our mission is to help promising ventures escape the "
                    "commodity trap. When a business looks like every other "
                    "business, customers only compare prices. Safari Strives "
                    "helps entrepreneurs make their value visible."
                ),
                "ctaLabel": "Apply Here",
                "ctaHref": APPLY_URL,
            },
        },
    },
    {
        "slug": "field-notes",
        "title": "Field Notes Page",
        "is_published": True,
        "payload": {
            "eyebrow": "Field Notes",
            "headline": "Stories from the ground.",
            "subhead": (
                "Dispatches from Rubavu — on ventures, the hub, the lab, and the "
                "work of making local enterprise visible."
            ),
            "heroImage": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&q=80",
            "heroImageAlt": "Notebook and pen on a desk",
        },
    },
]


CMS_COLLECTIONS: list[dict] = [
    {
        "key": "site",
        "label": "Site Settings",
        "is_published": True,
        "payload": {
            "name": "Safari Strives",
            "logo": "/logo/logo.png",
            "logoWhite": "/logo/logowhite.png",
            "tagline": {"line1": "Every Person,", "line2": "Every Opportunity"},
            "description": "A nonprofit enterprise hub.",
            "email": CONTACT_EMAIL,
            "donateHref": DONATE_URL,
            "applyUrl": APPLY_URL,
            "locations": ["Rubavu, Rwanda", "Crestwood, Illinois"],
            "social": SOCIAL_LINKS,
            "navLinks": [
                {"label": "Ventures", "href": "/ventures"},
                {"label": "Our Model", "href": "/our-model"},
                {"label": "Blog", "href": "/field-notes"},
                {"label": "About", "href": "/about"},
            ],
            "ourModelLinks": [
                {
                    "title": "Venture Accelerator",
                    "description": "Model-to-market support for founders in Rubavu",
                    "href": "/our-model",
                },
                {
                    "title": "Generative Enterprise Lab",
                    "description": "Hands-on enterprise building on the ground",
                    "href": "/green-enterprise-lab",
                },
                {
                    "title": "The Hub",
                    "description": "Shared workspace and community for local businesses",
                    "href": "/the-hub",
                },
            ],
            "footerColumns": {
                "programs": {
                    "title": "Programs",
                    "links": [
                        {"label": "Accelerator", "href": "/our-model"},
                        {"label": "Generative Enterprise Lab", "href": "/green-enterprise-lab"},
                        {"label": "The Hub", "href": "/the-hub"},
                    ],
                },
                "about": {
                    "title": "About",
                    "links": [
                        {"label": "Team", "href": "/about#team"},
                        {"label": "Board", "href": "/about#board"},
                        {"label": "Partners", "href": "/about#partners"},
                    ],
                },
                "resources": {
                    "title": "Resources",
                    "links": [
                        {"label": "Field Notes", "href": "/field-notes"},
                        {"label": "Ventures", "href": "/ventures"},
                    ],
                },
            },
        },
    },
    {
        "key": "board",
        "label": "About Board",
        "is_published": True,
        "payload": {"items": []},
    },
    {
        "key": "team",
        "label": "About Team",
        "is_published": True,
        "payload": {"items": []},
    },
    {
        "key": "partners",
        "label": "About Partners",
        "is_published": True,
        "payload": {"items": []},
    },
    {
        "key": "testimonials",
        "label": "Testimonials",
        "is_published": True,
        "payload": {
            "items": [
                {
                    "id": "1",
                    "role": "Founder, Isano Naturals",
                    "quote": (
                        "Safari Strives has given me the tools to become "
                        "financially independent. I am proud to support my "
                        "family!"
                    ),
                    "name": "Umubyeyi",
                },
                {
                    "id": "2",
                    "role": "CEO, Kigali Tech Solutions",
                    "quote": (
                        "The hub has been transformative for our business. We've "
                        "tripled our revenue in just one year!"
                    ),
                    "name": "Jean-Paul Kamali",
                },
                {
                    "id": "3",
                    "role": "Former CIA Economist",
                    "quote": (
                        "Safari Strives has given me the tools to become "
                        "financially independent. I am proud to support my "
                        "family!"
                    ),
                    "name": "Fatima El-Sayed",
                },
                {
                    "id": "4",
                    "role": "CEO, Lagos Agro Processing",
                    "quote": (
                        "Safari Strives has opened doors for me that I never "
                        "thought possible. I am now pursuing my education with "
                        "confidence!"
                    ),
                    "name": "Chinonso Okafor",
                },
                {
                    "id": "5",
                    "role": "Program Director, Tsai CITY",
                    "quote": (
                        "The programs offered by Safari Strives have made a "
                        "significant difference in our community. We are stronger "
                        "together!"
                    ),
                    "name": "Rajesh Kumar",
                },
                {
                    "id": "6",
                    "role": "Founder, Green Harvest Co.",
                    "quote": (
                        "The hub gave us equipment and space we could never have "
                        "afforded alone. That changed everything for our "
                        "business."
                    ),
                    "name": "Sukanya Chai",
                },
                {
                    "id": "7",
                    "role": "Venture Mentor, Yale SOM",
                    "quote": (
                        "Safari Strives helped me start my own business, and now "
                        "I can support my family and contribute to my community."
                    ),
                    "name": "Ana Pereira",
                },
                {
                    "id": "8",
                    "role": "Cohort Lead, First Safari Cohort",
                    "quote": (
                        "Thanks to Safari Strives, my family received the support "
                        "we desperately needed. We are forever grateful!"
                    ),
                    "name": "Samuel Mwangi",
                },
                {
                    "id": "9",
                    "role": "Board Member, North Central College LEV",
                    "quote": (
                        "The support from Safari Strives has changed my life. I "
                        "now have the resources to pursue my education and "
                        "achieve my dreams."
                    ),
                    "name": "Jessica Smith",
                },
            ]
        },
    },
    {
        "key": "ventures",
        "label": "Ventures",
        "is_published": True,
        "payload": {"items": []},
    },
    {
        "key": "articles",
        "label": "Field Notes Articles",
        "is_published": True,
        "payload": {"items": []},
    },
]


def _upsert_page(db: Session, data: dict, *, force: bool) -> CmsPage | None:
    page = db.scalars(
        select(CmsPage).where(CmsPage.slug == data["slug"])
    ).first()
    if page is None:
        page = CmsPage(**data)
        db.add(page)
        return page
    if force:
        for field, value in data.items():
            setattr(page, field, value)
        return page

    # Keep admin edits, but backfill empty hero media from seed.
    existing = page.payload if isinstance(page.payload, dict) else {}
    seed_payload = data.get("payload") if isinstance(data.get("payload"), dict) else {}
    if not existing or not seed_payload:
        print(f"Skip cms_page '{data['slug']}' (already exists — admin edits kept)")
        return None

    merged = dict(existing)
    changed = False

    # Flat media fields (ventures page)
    for key in ("heroVideo", "heroImage"):
        seed_val = seed_payload.get(key)
        if isinstance(seed_val, str) and seed_val.strip():
            cur = merged.get(key)
            if not (isinstance(cur, str) and cur.strip()):
                merged[key] = seed_val
                changed = True

    # Nested home/about hero media
    seed_hero = seed_payload.get("hero")
    existing_hero = merged.get("hero")
    if isinstance(seed_hero, dict):
        hero = dict(existing_hero) if isinstance(existing_hero, dict) else {}
        for key in ("heroVideo", "image"):
            seed_val = seed_hero.get(key)
            if isinstance(seed_val, str) and seed_val.strip():
                cur = hero.get(key)
                if not (isinstance(cur, str) and cur.strip()):
                    hero[key] = seed_val
                    changed = True
        if hero:
            merged["hero"] = hero

    # Replace only the legacy About mission copy. Future admin edits with any
    # other label are preserved.
    if data["slug"] == "about":
        # Old seed skipped the first 15s of the Watch video popup.
        existing_hero_dict = (
            dict(merged["hero"]) if isinstance(merged.get("hero"), dict) else None
        )
        if existing_hero_dict is not None and existing_hero_dict.get("videoStart") == 15:
            existing_hero_dict["videoStart"] = 0
            merged["hero"] = existing_hero_dict
            changed = True
        existing_mission = merged.get("mission")
        seed_mission = seed_payload.get("mission")
        if (
            isinstance(existing_mission, dict)
            and existing_mission.get("label") == "Case study"
            and isinstance(seed_mission, dict)
        ):
            merged["mission"] = seed_mission
            changed = True

        existing_board = merged.get("board")
        seed_board = seed_payload.get("board")
        if (
            isinstance(existing_board, dict)
            and existing_board.get("title") == "Board of Directors"
            and isinstance(seed_board, dict)
        ):
            merged["board"] = seed_board
            changed = True

        if isinstance(existing_mission, dict) and isinstance(seed_mission, dict):
            mission = dict(existing_mission)
            mission_changed = False

            paragraphs = mission.get("paragraphs")
            seed_paragraphs = seed_mission.get("paragraphs")
            if isinstance(paragraphs, list) and isinstance(seed_paragraphs, list):
                new_paragraphs = list(paragraphs)
                legacy_breaks = {
                    0: (
                        "Safari Strives began with a question:\n"
                        "How do people move from survival into sustainable growth?",
                        seed_paragraphs[0] if len(seed_paragraphs) > 0 else None,
                    ),
                    2: (
                        "Then we realized something simple:\n"
                        "people were already working and selling.",
                        seed_paragraphs[2] if len(seed_paragraphs) > 2 else None,
                    ),
                }
                for idx, (legacy, replacement) in legacy_breaks.items():
                    if (
                        idx < len(new_paragraphs)
                        and isinstance(replacement, str)
                        and new_paragraphs[idx] == legacy
                    ):
                        new_paragraphs[idx] = replacement
                        mission_changed = True
                if mission_changed:
                    mission["paragraphs"] = new_paragraphs

            practitioner = mission.get("practitionerLed")
            seed_practitioner = seed_mission.get("practitionerLed")
            if (
                isinstance(practitioner, dict)
                and isinstance(seed_practitioner, dict)
                and isinstance(practitioner.get("body"), str)
                and practitioner["body"].startswith(
                    "Safari Strives builds the conditions"
                )
            ):
                mission["practitionerLed"] = seed_practitioner
                mission_changed = True

            if mission_changed:
                merged["mission"] = mission
                changed = True

    if not changed:
        print(f"Skip cms_page '{data['slug']}' (already exists — admin edits kept)")
        return None

    print(f"Backfill cms_page '{data['slug']}' empty hero media from seed")
    page.payload = merged
    return page


def _upsert_collection(
    db: Session, data: dict, *, force: bool
) -> CmsCollection | None:
    collection = db.scalars(
        select(CmsCollection).where(CmsCollection.key == data["key"])
    ).first()
    if collection is None:
        collection = CmsCollection(**data)
        db.add(collection)
        return collection
    if force:
        for field, value in data.items():
            setattr(collection, field, value)
        return collection

    # CHANGED (2026-07-27): Do NOT backfill empty collections.
    # If a collection exists with empty items, it is preserved — because
    # an empty list may be an intentional admin choice (e.g., partners hidden,
    # awaiting team member edits, etc).
    # Only seed collections that don't exist yet. Use --force to overwrite.
    
    # Special case: clear legacy Apply URL (single-value migration, safe to always do)
    existing_payload = collection.payload if isinstance(collection.payload, dict) else {}
    seed_payload = data.get("payload") if isinstance(data.get("payload"), dict) else {}

    if data["key"] == "site":
        updated_payload = dict(existing_payload)
        site_changed = False

        if existing_payload.get("applyUrl") == LEGACY_APPLY_URL:
            updated_payload["applyUrl"] = ""
            site_changed = True
            print(
                "Backfill cms_collection 'site' "
                "(legacy applicant login → disabled Apply CTA)"
            )

        seed_social = (
            seed_payload.get("social")
            if isinstance(seed_payload.get("social"), dict)
            else {}
        )
        existing_social = (
            existing_payload.get("social")
            if isinstance(existing_payload.get("social"), dict)
            else {}
        )
        merged_social = dict(existing_social)
        social_changed = False

        for key, seed_val in seed_social.items():
            if not isinstance(seed_val, str) or not seed_val.strip():
                continue
            cur = merged_social.get(key)
            if not isinstance(cur, str) or cur.strip() in SOCIAL_PLACEHOLDER_VALUES:
                merged_social[key] = seed_val
                social_changed = True

        legacy_facebook = merged_social.get("facebook")
        if isinstance(legacy_facebook, str) and legacy_facebook.strip() in SOCIAL_PLACEHOLDER_VALUES:
            merged_social.pop("facebook", None)
            social_changed = True
            if (
                "youtube" not in merged_social
                and isinstance(seed_social.get("youtube"), str)
                and seed_social["youtube"].strip()
            ):
                merged_social["youtube"] = seed_social["youtube"]
        existing_social = (
            existing_payload.get("social")
            if isinstance(existing_payload.get("social"), dict)
            else {}
        )
        merged_social = dict(existing_social)
        social_changed = False

        for key, seed_val in seed_social.items():
            if not isinstance(seed_val, str) or not seed_val.strip():
                continue
            cur = merged_social.get(key)
            if not isinstance(cur, str) or cur.strip() in SOCIAL_PLACEHOLDER_VALUES:
                merged_social[key] = seed_val
                social_changed = True

        legacy_facebook = merged_social.get("facebook")
        if isinstance(legacy_facebook, str) and legacy_facebook.strip() in SOCIAL_PLACEHOLDER_VALUES:
            merged_social.pop("facebook", None)
            social_changed = True
            if (
                "youtube" not in merged_social
                and isinstance(seed_social.get("youtube"), str)
                and seed_social["youtube"].strip()
            ):
                merged_social["youtube"] = seed_social["youtube"]

        if social_changed:
            updated_payload["social"] = merged_social
            site_changed = True
            print(
                "Backfill cms_collection 'site' "
                "(placeholder/legacy social links → seed URLs)"
            )

        if site_changed:
            collection.payload = updated_payload
            return collection

    print(
        f"Skip cms_collection '{data['key']}' "
        "(already exists — admin edits kept)"
    )
    return None


def seed(*, force: bool = False) -> None:
    db = SessionLocal()
    try:
        for data in CMS_PAGES:
            page = _upsert_page(db, dict(data), force=force)
            db.commit()
            if page is not None:
                db.refresh(page)
                print(f"Seeded cms_page '{page.slug}' (id={page.id})")

        for data in CMS_COLLECTIONS:
            collection = _upsert_collection(db, dict(data), force=force)
            db.commit()
            if collection is not None:
                db.refresh(collection)
                print(f"Seeded cms_collection '{collection.key}' (id={collection.id})")
    finally:
        db.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Seed CMS pages and collections.")
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing CMS rows (destroys admin edits).",
    )
    args = parser.parse_args()
    seed(force=args.force)

