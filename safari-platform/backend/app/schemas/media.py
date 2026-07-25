from pydantic import BaseModel, Field


class MediaUploadResponse(BaseModel):
    """Public URL the frontend/CMS can store on content fields."""

    key: str = Field(description="Object key inside the bucket")
    url: str = Field(description="HTTPS URL to the uploaded file")
    content_type: str
    size_bytes: int
