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


# ---------- Page ----------
class PageBase(BaseModel):
    slug: str
    is_published: bool = False
    hero_title: str
    hero_subtitle: str | None = None
    hero_video_url: str | None = None
    hero_media_alt: str | None = None
    intro_text: str | None = None
    cta_label: str | None = None
    cta_link: str | None = None
    contact_email: str | None = None
    section_title: str | None = None
    main_description: str | None = None
    final_cta_text: str | None = None


class PageCreate(PageBase):
    features: list[PageFeatureCreate] = []


class PageUpdate(BaseModel):
    """All fields optional so PATCH can send only what changed
    (use response_model_exclude_unset on the endpoint)."""

    slug: str | None = None
    is_published: bool | None = None
    hero_title: str | None = None
    hero_subtitle: str | None = None
    hero_video_url: str | None = None
    hero_media_alt: str | None = None
    intro_text: str | None = None
    cta_label: str | None = None
    cta_link: str | None = None
    contact_email: str | None = None
    section_title: str | None = None
    main_description: str | None = None
    final_cta_text: str | None = None


class PageRead(PageBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
    features: list[PageFeatureRead] = []


class PageSummary(BaseModel):
    """Lightweight shape for list endpoints (no heavy body/features)."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    is_published: bool
    hero_title: str
