from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class BlogPostBase(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    slug: str = Field(min_length=1, max_length=255)
    excerpt: str | None = Field(default=None, max_length=500)
    content: str | None = None
    cover_image_url: str | None = Field(default=None, max_length=500)
    status: str = Field(default="draft", pattern="^(draft|published)$")


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    slug: str | None = Field(default=None, min_length=1, max_length=255)
    excerpt: str | None = Field(default=None, max_length=500)
    content: str | None = None
    cover_image_url: str | None = Field(default=None, max_length=500)
    status: str | None = Field(default=None, pattern="^(draft|published)$")


class BlogPostRead(BlogPostBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    published_at: datetime | None
    created_at: datetime
