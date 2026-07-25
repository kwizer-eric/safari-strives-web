from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PersonBase(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    title: str | None = Field(default=None, max_length=200)
    bio: str | None = None
    photo_url: str | None = Field(default=None, max_length=500)
    linkedin_url: str | None = Field(default=None, max_length=500)
    display_order: int = 0
    is_active: bool = True


class TeamMemberCreate(PersonBase):
    pass


class TeamMemberUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=200)
    title: str | None = Field(default=None, max_length=200)
    bio: str | None = None
    photo_url: str | None = Field(default=None, max_length=500)
    linkedin_url: str | None = Field(default=None, max_length=500)
    display_order: int | None = None
    is_active: bool | None = None


class TeamMemberRead(PersonBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


class BoardMemberCreate(PersonBase):
    pass


class BoardMemberUpdate(TeamMemberUpdate):
    pass


class BoardMemberRead(PersonBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
