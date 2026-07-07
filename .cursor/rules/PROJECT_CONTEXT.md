Project Context: Safari Strives Backend

1. The Mission

We are building the backend for Safari Strives, a Non-Profit Organization (NPO) based in Rubavu, Rwanda.

Mission: Support operating entrepreneurs through three programs — a Venture Accelerator, a Green Enterprise Lab (poultry / waste-to-value), and a physical Hub.

Target Audience: Founders with real, operating businesses; mentors and advisors; buyers and partners.

2. System Architecture

This is a Headless CMS + Application Portal.


Public API — serves dynamic content to the marketing site. The frontend team owns the UI; we own the JSON.
Admin API — lets NPO staff manage all content, media, and applications through a dashboard.
Key constraint — staff must be able to change everything (hero videos, copy, feature lists, team members) without a developer touching code. Nothing page-specific should be hardcoded.


3. Domain Model

A. Dynamic Program Pages

There are exactly 3 program pages, each following the same content shape — this is what makes a single Page + PageFeature schema viable instead of one-off tables per page.

Shared page structure:

SectionNotessluge.g. venture-accelerator, green-enterprise-lab, the-hubHero video/imageshort background clip description + hero title/subtitleIntro/eyebrow texte.g. "Interested in joining our community?"Primary CTA buttonlabel + link (e.g. "Apply Here")Contact lineoptional, e.g. "For more information, contact ___"Section titlee.g. "Fueling operating entrepreneurs"Main description / "Who is this for"rich text blockFeature listordered list of PageFeature — see belowFinal CTAclosing statement, distinct from the primary button

Feature list pattern per page (confirms PageFeature must be generic, title+body, reorderable):


Venture Accelerator → "Why Our Model Is Different" — 5 features (Founder-Led Growth, Practitioner-Led Support, Milestone-Based Support, Global Expert Network, Evidence-Informed Design)
Green Enterprise Lab → "What We Are Testing" — 4 features (Market-Ready Products, Circular Value, Cost and Production Discipline, Repeat Buyer Channels)
The Hub → "What The Space Includes" — 4 features (Founders' Lounge, Media Room, Production and Packaging Tools, Amenities)


Each feature is just a title + description, nothing more exotic — no icons, no nested children, no per-feature media in the current designs. Schema should stay minimal but allow an optional icon/image field for future flexibility.

Requirement: Page has a one-to-many relationship to PageFeature, ordered by an explicit order column (not insertion order) so staff can reorder without DB surgery.

B. Global Entities


Team & Board — Photo, Bio, LinkedIn, display order.
Press/Blog — Slug, Content (rich text), Cover Image, published date.


C. Submissions (Intake)


Accelerator Application — founder applications; status: NEW, REVIEWED, ACCEPTED.
Partner Application — mentors/advisors/buyers wanting to join.
Contact Form — general inquiries.
Notifications — every submission triggers an email to safaristrives@gmail.com.


4. Technical Stack & Rules


Framework: FastAPI (Python 3.10+)
Database: PostgreSQL
ORM: SQLAlchemy 2.0 — use Mapped, mapped_column, DeclarativeBase (typed, no legacy Column() style)
Migrations: Alembic
Media: Images/video uploaded to Cloud Storage (S3/R2); only URLs stored in Postgres, never binary blobs
Auth: JWT for the Admin Dashboard
Validation: Pydantic v2 schemas mirroring the ORM models for API I/O


5. Current Goal

Phase 2: Core CMS

Task: Design SQLAlchemy 2.0 models for Page and PageFeature that:


Support the shared page structure in §3A (hero, intro text, CTA, main description) as columns on Page.
Support a reorderable, one-to-many PageFeature list per page (title + description + order).
Stay generic enough to cover all 3 current pages without page-specific tables, while leaving room for future pages.