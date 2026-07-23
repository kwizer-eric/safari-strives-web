from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CmsPageBase(BaseModel):
    slug: str
    title: str
    is_published: bool = False
    payload: dict = Field(default_factory=dict)
    notes: str | None = None


class CmsPageCreate(CmsPageBase):
    pass


class CmsPageUpdate(BaseModel):
    slug: str | None = None
    title: str | None = None
    is_published: bool | None = None
    payload: dict | None = None
    notes: str | None = None


class CmsPageRead(CmsPageBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


class CmsCollectionBase(BaseModel):
    key: str
    label: str
    is_published: bool = False
    payload: dict = Field(default_factory=dict)
    notes: str | None = None


class CmsCollectionCreate(CmsCollectionBase):
    pass


class CmsCollectionUpdate(BaseModel):
    key: str | None = None
    label: str | None = None
    is_published: bool | None = None
    payload: dict | None = None
    notes: str | None = None


class CmsCollectionRead(CmsCollectionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
