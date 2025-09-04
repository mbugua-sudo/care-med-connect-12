import os
import sqlite3
from contextlib import contextmanager
from typing import List, Dict, Any, Iterable, Optional
from datetime import datetime
from .config import get_settings


def _ensure_schema(conn: sqlite3.Connection) -> None:
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            filetype TEXT NOT NULL,
            file_path TEXT NOT NULL,
            text_path TEXT,
            ocr_used INTEGER DEFAULT 0,
            created_at TEXT NOT NULL
        );
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS chunks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            doc_id INTEGER NOT NULL,
            chunk_index INTEGER NOT NULL,
            content TEXT NOT NULL,
            FOREIGN KEY(doc_id) REFERENCES documents(id)
        );
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS queries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            is_deep INTEGER NOT NULL,
            model TEXT NOT NULL,
            answer TEXT NOT NULL,
            image_path TEXT,
            tts_audio_path TEXT,
            created_at TEXT NOT NULL
        );
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS query_citations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            query_id INTEGER NOT NULL,
            chunk_id INTEGER NOT NULL,
            score REAL NOT NULL,
            FOREIGN KEY(query_id) REFERENCES queries(id),
            FOREIGN KEY(chunk_id) REFERENCES chunks(id)
        );
        """
    )
    conn.commit()


@contextmanager
def get_conn():
    settings = get_settings()
    os.makedirs(os.path.dirname(settings.SQLITE_PATH), exist_ok=True)
    conn = sqlite3.connect(settings.SQLITE_PATH)
    try:
        _ensure_schema(conn)
        yield conn
    finally:
        conn.close()


def insert_document(filename: str, filetype: str, file_path: str, text_path: Optional[str], ocr_used: bool) -> int:
    with get_conn() as conn:
        cur = conn.execute(
            "INSERT INTO documents(filename, filetype, file_path, text_path, ocr_used, created_at) VALUES (?,?,?,?,?,?)",
            [filename, filetype, file_path, text_path, 1 if ocr_used else 0, datetime.utcnow().isoformat()],
        )
        conn.commit()
        return cur.lastrowid


def update_document_text_path(doc_id: int, text_path: str) -> None:
    with get_conn() as conn:
        conn.execute("UPDATE documents SET text_path=? WHERE id=?", [text_path, doc_id])
        conn.commit()


def list_documents() -> List[Dict[str, Any]]:
    with get_conn() as conn:
        cur = conn.execute("SELECT id, filename, filetype, file_path, text_path, ocr_used, created_at FROM documents ORDER BY id DESC")
        rows = cur.fetchall()
        return [
            {
                "id": r[0],
                "filename": r[1],
                "filetype": r[2],
                "file_path": r[3],
                "text_path": r[4],
                "ocr_used": bool(r[5]),
                "created_at": r[6],
            }
            for r in rows
        ]


def insert_chunks(doc_id: int, chunks: List[str]) -> List[int]:
    with get_conn() as conn:
        ids: List[int] = []
        for idx, content in enumerate(chunks):
            cur = conn.execute(
                "INSERT INTO chunks(doc_id, chunk_index, content) VALUES (?,?,?)",
                [doc_id, idx, content],
            )
            ids.append(cur.lastrowid)
        conn.commit()
        return ids


def get_all_chunks() -> List[Dict[str, Any]]:
    with get_conn() as conn:
        cur = conn.execute(
            "SELECT c.id, c.doc_id, c.chunk_index, c.content, d.filename FROM chunks c JOIN documents d ON d.id = c.doc_id ORDER BY c.id ASC"
        )
        rows = cur.fetchall()
        return [
            {
                "id": r[0],
                "doc_id": r[1],
                "chunk_index": r[2],
                "content": r[3],
                "filename": r[4],
            }
            for r in rows
        ]


def get_chunk_by_id(chunk_id: int) -> Optional[Dict[str, Any]]:
    with get_conn() as conn:
        cur = conn.execute(
            "SELECT c.id, c.doc_id, c.chunk_index, c.content, d.filename FROM chunks c JOIN documents d ON d.id = c.doc_id WHERE c.id=?",
            [chunk_id],
        )
        r = cur.fetchone()
        if not r:
            return None
        return {
            "id": r[0],
            "doc_id": r[1],
            "chunk_index": r[2],
            "content": r[3],
            "filename": r[4],
        }


def insert_query(question: str, is_deep: bool, model: str, answer: str, image_path: Optional[str], tts_audio_path: Optional[str]) -> int:
    with get_conn() as conn:
        cur = conn.execute(
            "INSERT INTO queries(question, is_deep, model, answer, image_path, tts_audio_path, created_at) VALUES (?,?,?,?,?,?,?)",
            [question, 1 if is_deep else 0, model, answer, image_path, tts_audio_path, datetime.utcnow().isoformat()],
        )
        conn.commit()
        return cur.lastrowid


def insert_query_citations(query_id: int, citations: Iterable[Dict[str, Any]]) -> None:
    with get_conn() as conn:
        for c in citations:
            conn.execute(
                "INSERT INTO query_citations(query_id, chunk_id, score) VALUES (?,?,?)",
                [query_id, c["chunk_id"], c["score"]],
            )
        conn.commit()


def list_queries(limit: int = 100) -> List[Dict[str, Any]]:
    with get_conn() as conn:
        cur = conn.execute(
            "SELECT id, question, is_deep, model, answer, image_path, tts_audio_path, created_at FROM queries ORDER BY id DESC LIMIT ?",
            [limit],
        )
        rows = cur.fetchall()
        return [
            {
                "id": r[0],
                "question": r[1],
                "is_deep": bool(r[2]),
                "model": r[3],
                "answer": r[4],
                "image_path": r[5],
                "tts_audio_path": r[6],
                "created_at": r[7],
            }
            for r in rows
        ]


def list_query_citations(query_id: int) -> List[Dict[str, Any]]:
    with get_conn() as conn:
        cur = conn.execute(
            "SELECT qc.chunk_id, qc.score, d.filename FROM query_citations qc JOIN chunks c ON qc.chunk_id = c.id JOIN documents d ON d.id = c.doc_id WHERE qc.query_id=? ORDER BY qc.score DESC",
            [query_id],
        )
        rows = cur.fetchall()
        return [
            {"chunk_id": r[0], "score": r[1], "filename": r[2]} for r in rows
        ]

