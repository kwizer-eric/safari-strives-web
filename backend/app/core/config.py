from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    # Application
    PROJECT_NAME: str = "Safari Strives API"
    API_V1_PREFIX: str = "/api/v1"

    # Database. Example: postgresql+psycopg2://user:pass@localhost:5432/safari_strives
    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5433/safari_strives"

    # Security (used from Phase 1 admin auth onward)
    SECRET_KEY: str = "change-me-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALGORITHM: str = "HS256"

    # CORS: comma-separated origins the frontend runs on
    CORS_ORIGINS: str = "http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Cached so we build Settings (and read .env) only once per process."""
    return Settings()


settings = get_settings()
