from datetime import datetime

from pydantic import BaseModel, ConfigDict


# ---------- PageFeature ----------
class PageFeatureBase(BaseModel):
    title: str
    description: str
    display_order: int = 0
    icon: str | None = None
    image_url: str | None = None


class PageFeatureCreate(PageFeatureBase):
    pass


class PageFeatureRead(PageFeatureBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# ---------- PageSection ----------
class PageSectionBase(BaseModel):
    eyebrow: str | None = None
    title: str | None = None
    body: str | None = None
    display_order: int = 0


class PageSectionCreate(PageSectionBase):
    pass


class PageSectionRead(PageSectionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# ---------- Page ----------
class PageBase(BaseModel):
    slug: str
    is_published: bool = False

    # Hero
    hero_eyebrow: str | None = None
    hero_title: str
    hero_subhead: str | None = None
    hero_body: str | None = None
    hero_video_url: str | None = None
    hero_media_alt: str | None = None
    hero_media_caption: str | None = None
    hero_cta_label: str | None = None
    hero_cta_link: str | None = None
    contact_email: str | None = None

    # Intro
    intro_eyebrow: str | None = None
    intro_title: str | None = None
    intro_body: str | None = None

    # Feature grid heading
    features_eyebrow: str | None = None
    features_title: str | None = None

    # Closer
    closer_eyebrow: str | None = None
    closer_title: str
    closer_body: str | None = None
    closer_primary_cta_label: str | None = None
    closer_primary_cta_link: str | None = None
    closer_secondary_cta_label: str | None = None
    closer_secondary_cta_link: str | None = None


class PageCreate(PageBase):
    features: list[PageFeatureCreate] = []
    sections: list[PageSectionCreate] = []


class PageUpdate(BaseModel):
    """All fields optional so PATCH can send only what changed
    (use response_model_exclude_unset on the endpoint)."""

    slug: str | None = None
    is_published: bool | None = None

    hero_eyebrow: str | None = None
    hero_title: str | None = None
    hero_subhead: str | None = None
    hero_body: str | None = None
    hero_video_url: str | None = None
    hero_media_alt: str | None = None
    hero_media_caption: str | None = None
    hero_cta_label: str | None = None
    hero_cta_link: str | None = None
    contact_email: str | None = None

    intro_eyebrow: str | None = None
    intro_title: str | None = None
    intro_body: str | None = None

    features_eyebrow: str | None = None
    features_title: str | None = None

    closer_eyebrow: str | None = None
    closer_title: str | None = None
    closer_body: str | None = None
    closer_primary_cta_label: str | None = None
    closer_primary_cta_link: str | None = None
    closer_secondary_cta_label: str | None = None
    closer_secondary_cta_link: str | None = None


class PageReplace(PageBase):
    """Full replace payload for PUT: top-level fields plus the complete
    features/sections lists (existing children are deleted and recreated)."""

    features: list[PageFeatureCreate] = []
    sections: list[PageSectionCreate] = []


class PageRead(PageBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
    features: list[PageFeatureRead] = []
    sections: list[PageSectionRead] = []


class PageSummary(BaseModel):
    """Lightweight shape for list endpoints (no heavy body/features)."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    is_published: bool
    hero_title: str
