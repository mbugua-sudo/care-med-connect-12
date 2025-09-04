from typing import Tuple
from .openai_client import get_openai_client
from .config import get_settings


def moderate_text(text: str) -> Tuple[bool, dict]:
    settings = get_settings()
    client = get_openai_client()
    resp = client.moderations.create(model=settings.MODERATION_MODEL, input=text)
    flagged = False
    details = {}
    if resp and resp.results:
        flagged = bool(resp.results[0].flagged)
        details = resp.results[0].category_scores or {}
    return flagged, details

