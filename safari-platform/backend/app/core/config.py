from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    # Application
    PROJECT_NAME: str = "Safari Strives API"
    API_V1_PREFIX: str = "/api/v1"
    # development | production — production refuses a default SECRET_KEY and hides docs
    ENVIRONMENT: str = "development"

    # Database. Example: postgresql+psycopg2://user:pass@localhost:5432/safari_strives
    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5433/safari_strives"

    # Security — must be a long random string in production (never the default below).
    SECRET_KEY: str = "change-me-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480
    ALGORITHM: str = "HS256"

    # CORS: comma-separated origins the frontend runs on
    CORS_ORIGINS: str = "http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    """Cached so we build Settings (and read .env) only once per process."""
    return Settings()


settings = get_settings()


def assert_secure_settings(cfg: Settings = settings) -> None:
    """Fail fast in production if secrets are still placeholders."""
    if not cfg.is_production:
        return
    if cfg.SECRET_KEY in {"", "change-me-in-production"}:
        raise RuntimeError(
            "SECRET_KEY must be set to a strong random value when ENVIRONMENT=production"
        )
    if not cfg.cors_origins_list:
        raise RuntimeError(
            "CORS_ORIGINS must list at least one frontend origin in production"
        )
