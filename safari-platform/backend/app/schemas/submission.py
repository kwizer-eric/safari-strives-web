from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class AcceleratorApplicationCreate(BaseModel):
    founder_name: str = Field(min_length=1, max_length=200)
    business_name: str | None = Field(default=None, max_length=200)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=50)
    business_description: str | None = None


class AcceleratorApplicationRead(AcceleratorApplicationCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    status: str
    created_at: datetime


class AcceleratorApplicationStatusUpdate(BaseModel):
    status: str = Field(min_length=1, max_length=50)


class PartnerApplicationCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    role: str | None = Field(default=None, max_length=50)
    expertise: str | None = Field(default=None, max_length=300)
    message: str | None = None


class PartnerApplicationRead(PartnerApplicationCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    status: str
    created_at: datetime


class PartnerApplicationStatusUpdate(BaseModel):
    status: str = Field(min_length=1, max_length=50)


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    subject: str | None = Field(default=None, max_length=255)
    message: str = Field(min_length=1)


class ContactMessageRead(ContactMessageCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


class NewsletterSubscriberCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr


class NewsletterSubscriberRead(NewsletterSubscriberCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
