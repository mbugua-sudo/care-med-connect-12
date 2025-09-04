import os
import json
from typing import List, Dict, Any, Tuple
import numpy as np
import faiss
from .config import get_settings


def _paths():
    settings = get_settings()
    index_path = os.path.join(settings.INDEX_DIR, "faiss.index")
    meta_path = os.path.join(settings.INDEX_DIR, "meta.json")
    return index_path, meta_path


def save_index(index: faiss.Index, id_to_chunk_id: List[int], embedding_model: str) -> Tuple[str, str]:
    index_path, meta_path = _paths()
    faiss.write_index(index, index_path)
    meta = {"id_to_chunk_id": id_to_chunk_id, "embedding_model": embedding_model}
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(meta, f)
    return index_path, meta_path


def load_index() -> Tuple[faiss.Index, List[int], str]:
    index_path, meta_path = _paths()
    if not os.path.exists(index_path) or not os.path.exists(meta_path):
        raise FileNotFoundError("Index or metadata not found. Build the index first.")
    index = faiss.read_index(index_path)
    with open(meta_path, "r", encoding="utf-8") as f:
        meta = json.load(f)
    return index, meta["id_to_chunk_id"], meta.get("embedding_model", "")


def search(index: faiss.Index, query_vec: np.ndarray, top_k: int) -> List[Tuple[int, float]]:
    if query_vec.ndim == 1:
        query_vec = query_vec.reshape(1, -1)
    distances, indices = index.search(query_vec.astype("float32"), top_k)
    results: List[Tuple[int, float]] = []
    for idx, dist in zip(indices[0], distances[0]):
        if idx == -1:
            continue
        results.append((int(idx), float(dist)))
    return results

