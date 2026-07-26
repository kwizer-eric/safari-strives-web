from fastapi import APIRouter, Depends, File, Form, UploadFile, status

from app.api.v1.deps import get_current_admin
from app.models.admin_user import AdminUser
from app.schemas.media import MediaUploadResponse
from app.services.storage import upload_bytes

router = APIRouter(
    prefix="/admin/media",
    tags=["admin-media"],
)


@router.post(
    "/upload",
    response_model=MediaUploadResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_media(
    file: UploadFile = File(...),
    folder: str = Form(default="uploads"),
    _admin: AdminUser = Depends(get_current_admin),
) -> MediaUploadResponse:
    """Admin-only upload to Cloudflare R2 / S3.

    Why async def: reading the multipart body is I/O. The S3 put itself is
    sync boto3 inside the service (fine for MVP file sizes).
    """
    data = await file.read()
    content_type = file.content_type or "application/octet-stream"
    uploaded = upload_bytes(
        data=data,
        content_type=content_type,
        filename=file.filename,
        folder=folder,
    )
    return MediaUploadResponse(
        key=uploaded.key,
        url=uploaded.url,
        content_type=uploaded.content_type,
        size_bytes=uploaded.size_bytes,
    )
