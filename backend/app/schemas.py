from typing import List, Optional, Any, Dict
from pydantic import BaseModel


class UploadResponse(BaseModel):
    document_id: int
    filename: str
    filetype: str
    text_path: Optional[str]
    ocr_used: bool = False


class BuildIndexRequest(BaseModel):
    rebuild: bool = False


class BuildIndexResponse(BaseModel):
    num_documents: int
    num_chunks: int
    embedding_model: str
    index_path: str


class QueryRequest(BaseModel):
    question: str
    deep: bool = False
    k: Optional[int] = None
    voice: bool = False
    generate_image: bool = False


class RetrievedChunk(BaseModel):
    chunk_id: int
    doc_id: int
    score: float
    content_preview: str
    filename: str


class AnswerData(BaseModel):
    answer: str
    citations: List[RetrievedChunk]
    model: str
    moderation_flagged: bool = False
    image_path: Optional[str] = None
    tts_audio_path: Optional[str] = None


class QueryResponse(BaseModel):
    data: AnswerData


class ExportRequest(BaseModel):
    format: str = "csv"
    limit: int = 100


class ExportResponse(BaseModel):
    path: str

