from typing import List, Tuple
import numpy as np
from .openai_client import get_openai_client
from .config import get_settings


def embed_texts(texts: List[str]) -> Tuple[List[List[float]], str]:
    settings = get_settings()
    client = get_openai_client()
    # Using Embeddings API
    resp = client.embeddings.create(model=settings.EMBEDDING_MODEL, input=texts)
    vectors = [d.embedding for d in resp.data]
    return vectors, resp.model


def embed_query(text: str) -> List[float]:
    vectors, _ = embed_texts([text])
    return vectors[0]

