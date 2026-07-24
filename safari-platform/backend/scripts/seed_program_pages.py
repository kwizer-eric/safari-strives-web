"""Seed the 3 program pages with their real copy (was hardcoded in
public-web's src/data/programs-content.ts before that file gets deleted).

This is the one place we deviate from "no seed data": without it, wiring
the frontend to the API would make these pages render empty. Safe to
re-run — pages are upserted by slug instead of duplicated.

Usage:
    python -m scripts.seed_program_pages
"""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.page import Page, PageFeature, PageSection

# Mirrors @safari/shared's APP_URLS.applicantLogin — public-web now serves all
# portals from one origin via path-based zone rewrites, not separate ports.
APPLY_URL = "/applicant/login"
CONTACT_EMAIL = "safaristrives@gmail.com"


def _paragraphs(*parts: str) -> str:
    """Multi-paragraph body fields are stored as paragraphs joined by a
    blank line; the frontend mapper splits back on "\\n\\n"."""
    return "\n\n".join(parts)


PAGES: list[dict] = [
    {
        "slug": "our-model",
        "is_published": True,
        "hero_eyebrow": "The Accelerator Program",
        "hero_title": "Interested in joining our community?",
        "hero_video_url": "",
        "hero_media_alt": "Founders working with a mentor during an accelerator session",
        "hero_media_caption": "Short clips of founders, products in the making, mentor conversations, and hub tools in use.",
        "hero_cta_label": "Apply Here",
        "hero_cta_link": APPLY_URL,
        "contact_email": CONTACT_EMAIL,
        "intro_eyebrow": "Fueling operating entrepreneurs",
        "intro_title": "Who is this for",
        "intro_body": _paragraphs(
            "The Venture Accelerator is for operating entrepreneurs with real customers and a clear willingness to do the work. We do not just hand over capital — we want founders ready to build stronger systems around the business they already have."
        ),
        "features_eyebrow": "Our approach",
        "features_title": "Why our model is different",
        "closer_eyebrow": "Join the cohort",
        "closer_title": "Apply to the Venture Accelerator",
        "closer_body": "Safari Strives also welcomes mentors, advisors, buyers, and partners who can help entrepreneurs scale.",
        "closer_primary_cta_label": "Apply Here",
        "closer_primary_cta_link": APPLY_URL,
        "closer_secondary_cta_label": "Become a mentor or partner",
        "closer_secondary_cta_link": f"mailto:{CONTACT_EMAIL}",
        "features": [
            {
                "title": "Founder-led growth",
                "description": "Founders stay in charge of their business. Safari Strives adds structure, mentorship, and tools around it.",
                "display_order": 0,
            },
            {
                "title": "Practitioner-led support",
                "description": "For three years, we have operated our own enterprises — managing cash flow, inventory, production, and costs. We have tested what we build.",
                "display_order": 1,
            },
            {
                "title": "Milestone-based support",
                "description": "Support is connected to progress. Each founder must show action, evidence, and discipline before receiving deeper support. Safari Strives provides milestone-based grants, not loans, so capital strengthens the business instead of burdening it.",
                "display_order": 2,
            },
            {
                "title": "Global expert network",
                "description": "Founders receive guidance from operators, professors, accountants, designers, market-access partners, technical advisors, and business mentors.",
                "display_order": 3,
            },
            {
                "title": "Evidence-informed design",
                "description": "Safari Strives is informed by the Global Accelerator Learning Initiative's research on high-performing accelerators: strong selection, structured mentorship, network access, and measurable enterprise progress. Our model localizes those principles in Rubavu, supporting operating businesses with practical tools, accountability, and proof-building rooted in the market they serve.",
                "display_order": 4,
            },
        ],
        "sections": [],
    },
    {
        "slug": "green-enterprise-lab",
        "is_published": True,
        "hero_eyebrow": "Green Enterprise Lab",
        "hero_title": "Commercializing practical solutions for local enterprise, food systems, and waste-to-value growth.",
        "hero_video_url": "",
        "hero_media_alt": "Poultry operations at the Green Enterprise Lab",
        "hero_media_caption": "Short clips of poultry production, egg collection, packaging, recordkeeping, feed tracking, manure collection, product testing, and local distribution.",
        "intro_eyebrow": "About the lab",
        "intro_title": "A demonstration platform and a cash-flow engine",
        "intro_body": _paragraphs(
            "The Green Enterprise Lab begins with a practical question: what happens when a community does not only train entrepreneurs, but also builds real enterprises that entrepreneurs can learn from?",
            "The lab serves two roles. First, it is Safari Strives' demonstration platform, where founders can learn from real operating systems. Second, it is a cash-flow engine designed to help support the hub, the Venture Accelerator, and daily operations.",
        ),
        "features_eyebrow": "In the field",
        "features_title": "What we are testing",
        "closer_eyebrow": "In closing",
        "closer_title": "We are building businesses that teach by doing.",
        "closer_primary_cta_label": "Partner with the lab",
        "closer_primary_cta_link": f"mailto:{CONTACT_EMAIL}",
        "features": [
            {
                "title": "Market-ready products",
                "description": "Packaging eggs, improving presentation, and using buyer-facing photos, videos, labels, and product information so local products look easier to recognize, trust, and purchase.",
                "display_order": 0,
            },
            {
                "title": "Circular value",
                "description": "Transforming poultry manure into organic fertilizer instead of leaving it as a raw input, with clearer quality, packaging, and practical use for farmers and local buyers.",
                "display_order": 1,
            },
            {
                "title": "Cost and production discipline",
                "description": "Using feed-processing equipment, production records, and monthly tracking to reduce costs, control inputs, and understand feed, yield, labor, output, waste, and cash flow.",
                "display_order": 2,
            },
            {
                "title": "Repeat buyer channels",
                "description": "Moving from one-off sales to stronger relationships with shops, institutions, restaurants, distributors, and other buyers who need reliable supply.",
                "display_order": 3,
            },
        ],
        "sections": [
            {
                "eyebrow": "Why it matters",
                "title": "Why green enterprise matters",
                "body": _paragraphs(
                    "In many local markets, small producers sell raw outputs with little differentiation. Eggs go out loose, with no packaging or brand behind them. Manure has value and gets used, but rarely as a processed, graded product. Buyers have few reasons to trust one supplier over another.",
                    "The Green Enterprise Lab is built to close that gap. We package our eggs. We process manure into organic fertilizer instead of leaving it raw. We built our own feed-processing equipment rather than buying feed at market price.",
                ),
                "display_order": 0,
            },
        ],
    },
    {
        "slug": "the-hub",
        "is_published": True,
        "hero_eyebrow": "The Hub",
        "hero_title": "A hub built for enterprise growth.",
        "hero_body": "The Safari Strives Hub gives entrepreneurs the space, tools, media support, and professional environment they need to build businesses people can trust.",
        "hero_video_url": "",
        "hero_media_alt": "Founders working inside the Safari Strives hub",
        "hero_media_caption": "Short clips of the hub, computers, founders working, media room setup, product filming, packaging, tools, meetings, and mentor sessions.",
        "intro_eyebrow": "Main description",
        "intro_title": "Part office, part intervention",
        "intro_body": _paragraphs(
            "The hub is not just our office. It is part of the intervention. Entrepreneurs cannot compete seriously without reliable internet, records, tools, product photos, packaging support, and a professional place to meet buyers, mentors, and partners. Safari Strives brings those missing pieces into one place."
        ),
        "features_eyebrow": "Inside the hub",
        "features_title": "What the space includes",
        "closer_eyebrow": "Why the hub",
        "closer_title": "The next generation of scalable Rwandan enterprises needs more than advice.",
        "closer_body": "It needs space, tools, visibility, and structure.",
        "closer_primary_cta_label": "Visit the hub",
        "closer_primary_cta_link": f"mailto:{CONTACT_EMAIL}",
        "closer_secondary_cta_label": "Apply to the Accelerator",
        "closer_secondary_cta_link": APPLY_URL,
        "features": [
            {
                "title": "Founders' lounge",
                "description": "A professional place for founders to work, meet, think, and exchange ideas. The Hub includes reliable internet, meeting and study spaces, desktop computers, whiteboards, projectors, and administrative support.",
                "display_order": 0,
            },
            {
                "title": "Media room",
                "description": "A dedicated room for product photos, short videos, founder interviews, social media content, buyer-facing clips, and professional storytelling.",
                "display_order": 1,
            },
            {
                "title": "Production and packaging tools",
                "description": "Tools for printing, labeling, sealing, weighing, cutting, tailoring, heat press, sublimation, and product preparation — the practical equipment founders cannot easily buy alone.",
                "display_order": 2,
            },
            {
                "title": "Amenities",
                "description": "Clean bathrooms, showers, parking, and kitchen amenities that help founders work with focus, comfort, and dignity.",
                "display_order": 3,
            },
        ],
        "sections": [],
    },
]


def _upsert_page(db: Session, data: dict) -> Page:
    features = data.pop("features")
    sections = data.pop("sections")

    page = db.scalars(select(Page).where(Page.slug == data["slug"])).first()
    if page is None:
        page = Page(**data)
        db.add(page)
    else:
        for field, value in data.items():
            setattr(page, field, value)

    page.features = [PageFeature(**f) for f in features]
    page.sections = [PageSection(**s) for s in sections]
    return page


def seed() -> None:
    db = SessionLocal()
    try:
        for data in PAGES:
            page = _upsert_page(db, dict(data))
            db.commit()
            db.refresh(page)
            print(f"Seeded page '{page.slug}' (id={page.id})")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
