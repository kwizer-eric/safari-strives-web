"""Outbound notification email for new submissions.

Why BackgroundTasks + smtplib: the public form should return 201 quickly.
We queue the email after the DB write so a slow SMTP server never blocks the
applicant. When SMTP is not configured (local dev), we log instead of failing
the submission — form data is already safely in Postgres.
"""

from __future__ import annotations

import logging
import smtplib
from email.message import EmailMessage

from app.core.config import settings

logger = logging.getLogger(__name__)


def send_notification_email(subject: str, body: str) -> None:
    """Send (or log) a staff notification. Safe to call from BackgroundTasks."""
    to_addr = settings.NOTIFY_EMAIL.strip()
    if not to_addr:
        logger.info("NOTIFY_EMAIL unset — skipping email: %s", subject)
        return

    if not settings.SMTP_HOST.strip():
        logger.info(
            "SMTP_HOST unset — would email %s | %s\n%s",
            to_addr,
            subject,
            body,
        )
        return

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = settings.SMTP_FROM or to_addr
    message["To"] = to_addr
    message.set_content(body)

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=20) as smtp:
            if settings.SMTP_USE_TLS:
                smtp.starttls()
            if settings.SMTP_USER:
                smtp.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            smtp.send_message(message)
        logger.info("Notification email sent to %s (%s)", to_addr, subject)
    except Exception:
        # Never crash the request worker over email — data is already saved.
        logger.exception("Failed to send notification email: %s", subject)
