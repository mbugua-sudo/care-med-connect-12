import os
from functools import lru_cache
from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    # OpenAI
    OPENAI_API_KEY: str = Field(default="", env="OPENAI_API_KEY")

    # Models
    EMBEDDING_MODEL: str = Field(default=os.getenv("EMBEDDING_MODEL", "text-embedding-3-large"))
    FAST_MODEL: str = Field(default=os.getenv("FAST_MODEL", "gpt-5-mini"))
    DEEP_MODEL: str = Field(default=os.getenv("DEEP_MODEL", "gpt-5"))
    DEEP_MODEL_ALT: str = Field(default=os.getenv("DEEP_MODEL_ALT", "o1-pro"))
    FORMATTER_MODEL: str = Field(default=os.getenv("FORMATTER_MODEL", "gpt-5-chat-latest"))
    OCR_MODEL: str = Field(default=os.getenv("OCR_MODEL", "gpt-image-1"))
    IMAGE_MODEL: str = Field(default=os.getenv("IMAGE_MODEL", "dall-e-3"))
    TTS_MODEL: str = Field(default=os.getenv("TTS_MODEL", "tts-1-hd"))
    MODERATION_MODEL: str = Field(default=os.getenv("MODERATION_MODEL", "omni-moderation-latest"))

    # Retrieval
    CHUNK_SIZE: int = Field(default=int(os.getenv("CHUNK_SIZE", 1200)))
    CHUNK_OVERLAP: int = Field(default=int(os.getenv("CHUNK_OVERLAP", 150)))
    TOP_K: int = Field(default=int(os.getenv("TOP_K", 5)))

    # Paths
    DATA_DIR: str = Field(default=os.getenv("DATA_DIR", "./backend/data"))
    UPLOAD_DIR: str = Field(default=os.getenv("UPLOAD_DIR", "./backend/data/uploads"))
    TEXT_DIR: str = Field(default=os.getenv("TEXT_DIR", "./backend/data/texts"))
    IMAGE_OUT_DIR: str = Field(default=os.getenv("IMAGE_OUT_DIR", "./backend/data/generated_images"))
    TTS_OUT_DIR: str = Field(default=os.getenv("TTS_OUT_DIR", "./backend/data/tts"))
    INDEX_DIR: str = Field(default=os.getenv("INDEX_DIR", "./backend/data/index"))
    SQLITE_PATH: str = Field(default=os.getenv("SQLITE_PATH", "./backend/data/app.db"))

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    settings = Settings()
    # Ensure directories exist
    for path in [
        settings.DATA_DIR,
        settings.UPLOAD_DIR,
        settings.TEXT_DIR,
        settings.IMAGE_OUT_DIR,
        settings.TTS_OUT_DIR,
        settings.INDEX_DIR,
    ]:
        os.makedirs(path, exist_ok=True)
    return settings

