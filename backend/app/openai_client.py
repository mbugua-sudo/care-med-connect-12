import os
from typing import Optional
from openai import OpenAI
from .config import get_settings


_client: Optional[OpenAI] = None


def get_openai_client() -> OpenAI:
    global _client
    if _client is not None:
        return _client
    settings = get_settings()
    api_key = settings.OPENAI_API_KEY or os.getenv("OPENAI_API_KEY", "")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY not set. Provide it in .env or environment.")
    _client = OpenAI(api_key=api_key)
    return _client

