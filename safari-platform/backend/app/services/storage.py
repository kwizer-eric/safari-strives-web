"""Cloudflare R2 / S3-compatible object storage.

Why a thin service: routers should not know boto3 details. R2 speaks the S3
API, so one client works for both. Uploads are admin-only — public users never
talk to the bucket directly (avoids open write abuse).
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass

from fastapi import HTTPException, status

from app.core.config import settings

# Keep uploads small and predictable until we add virus scanning / CDN rules.
ALLOWED_CONTENT_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "application/pdf": ".pdf",
}
MAX_UPLOAD_BYTES = 25 * 1024 * 1024  # 25 MB


@dataclass
class UploadedObject:
    key: str
    url: str
    content_type: str
    size_bytes: int


def storage_configured() -> bool:
    return bool(
        settings.S3_BUCKET
        and settings.S3_ACCESS_KEY_ID
        and settings.S3_SECRET_ACCESS_KEY
        and settings.S3_ENDPOINT_URL
        and settings.S3_PUBLIC_BASE_URL
    )


def upload_bytes(
    *,
    data: bytes,
    content_type: str,
    filename: str | None = None,
    folder: str = "uploads",
) -> UploadedObject:
    if not storage_configured():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "Object storage is not configured. Set S3_BUCKET, "
                "S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_ENDPOINT_URL, "
                "and S3_PUBLIC_BASE_URL."
            ),
        )

    if content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=(
                f"Unsupported content type '{content_type}'. "
                f"Allowed: {', '.join(sorted(ALLOWED_CONTENT_TYPES))}."
            ),
        )

    if len(data) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty file uploads are not allowed.",
        )
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds {MAX_UPLOAD_BYTES // (1024 * 1024)} MB limit.",
        )

    ext = ALLOWED_CONTENT_TYPES[content_type]
    # Prefer our safe extension over the client filename (path traversal risk).
    safe_folder = folder.strip("/").replace("..", "") or "uploads"
    key = f"{safe_folder}/{uuid.uuid4().hex}{ext}"

    try:
        import boto3
        from botocore.client import Config
    except ImportError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="boto3 is not installed. Run: pip install boto3",
        ) from exc

    client = boto3.client(
        "s3",
        endpoint_url=settings.S3_ENDPOINT_URL,
        aws_access_key_id=settings.S3_ACCESS_KEY_ID,
        aws_secret_access_key=settings.S3_SECRET_ACCESS_KEY,
        region_name=settings.S3_REGION,
        config=Config(signature_version="s3v4"),
    )

    try:
        client.put_object(
            Bucket=settings.S3_BUCKET,
            Key=key,
            Body=data,
            ContentType=content_type,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Failed to upload file to object storage.",
        ) from exc

    public_base = settings.S3_PUBLIC_BASE_URL.rstrip("/")
    return UploadedObject(
        key=key,
        url=f"{public_base}/{key}",
        content_type=content_type,
        size_bytes=len(data),
    )
