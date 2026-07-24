"""Container entrypoint: migrate DB, then start uvicorn."""

from __future__ import annotations

import os
import subprocess
import sys


def main() -> None:
    print("Running database migrations...", flush=True)
    subprocess.run(["alembic", "upgrade", "head"], check=True)

    port = os.environ.get("PORT", "4000")
    print(f"Starting API on 0.0.0.0:{port}", flush=True)
    os.execvp(
        "uvicorn",
        [
            "uvicorn",
            "app.main:app",
            "--host",
            "0.0.0.0",
            "--port",
            port,
        ],
    )


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as exc:
        sys.exit(exc.returncode)
