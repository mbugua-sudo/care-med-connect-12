from typing import List
from .config import get_settings


def split_text_into_chunks(text: str) -> List[str]:
    settings = get_settings()
    size = settings.CHUNK_SIZE
    overlap = settings.CHUNK_OVERLAP
    chunks: List[str] = []
    start = 0
    n = len(text)
    while start < n:
        end = min(start + size, n)
        chunk = text[start:end]
        chunks.append(chunk)
        if end == n:
            break
        start = end - overlap
        if start < 0:
            start = 0
    return chunks

