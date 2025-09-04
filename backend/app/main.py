import os
import shutil
from typing import List
from fastapi import FastAPI, UploadFile, File, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from .config import get_settings
from .schemas import UploadResponse, BuildIndexRequest, BuildIndexResponse, QueryRequest, QueryResponse, RetrievedChunk, AnswerData, ExportRequest, ExportResponse
from .db import insert_document, update_document_text_path, list_documents, insert_chunks, get_all_chunks, get_chunk_by_id, insert_query, insert_query_citations, list_queries
from .parsers import parse_pdf_to_text, parse_docx_to_text, parse_xlsx_to_text, parse_txt_to_text, ocr_image_to_text
from .chunking import split_text_into_chunks
from .embedding import embed_texts, embed_query
from .index_store import save_index, load_index, search, get_index_metadata
from .moderation import moderate_text
from .reasoning import answer_question
from .images_tts import generate_image_from_prompt, synthesize_speech
from .exporter import export_to_csv, export_to_xlsx
import numpy as np
import faiss


app = FastAPI(title="Document Research & Q&A API")
settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/documents")
def documents():
    return {"documents": list_documents()}


@app.get("/index-info")
def index_info():
    return get_index_metadata()


@app.get("/queries")
def queries(limit: int = 100):
    return {"queries": list_queries(limit=limit)}


@app.post("/upload", response_model=UploadResponse)
async def upload(file: UploadFile = File(...)):
    filename = file.filename
    ext = os.path.splitext(filename)[1].lower()
    filetype = ext.strip(".")
    # Save uploaded file
    save_path = os.path.join(settings.UPLOAD_DIR, filename)
    with open(save_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    text = ""
    ocr_used = False
    try:
        if ext == ".pdf":
            text = parse_pdf_to_text(save_path)
        elif ext == ".docx":
            text = parse_docx_to_text(save_path)
        elif ext == ".xlsx":
            text = parse_xlsx_to_text(save_path)
        elif ext in [".txt", ".md"]:
            text = parse_txt_to_text(save_path)
        elif ext in [".png", ".jpg", ".jpeg", ".gif"]:
            text = ocr_image_to_text(save_path)
            ocr_used = True
        else:
            return JSONResponse(status_code=400, content={"error": f"Unsupported file type: {ext}"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Parsing failed: {str(e)}"})

    doc_id = insert_document(filename=filename, filetype=filetype, file_path=save_path, text_path=None, ocr_used=ocr_used)
    # Save parsed text
    text_path = os.path.join(settings.TEXT_DIR, f"doc_{doc_id}.txt")
    with open(text_path, "w", encoding="utf-8") as f:
        f.write(text)
    update_document_text_path(doc_id, text_path)

    return UploadResponse(document_id=doc_id, filename=filename, filetype=filetype, text_path=text_path, ocr_used=ocr_used)


@app.post("/build-index", response_model=BuildIndexResponse)
def build_index(req: BuildIndexRequest):
    docs = list_documents()
    all_chunks: List[str] = []
    chunk_map: List[int] = []  # faiss vector id -> chunk row id
    # Split all documents into chunks and store in DB if not already stored
    for d in docs:
        if not d["text_path"] or not os.path.exists(d["text_path"]):
            continue
        with open(d["text_path"], "r", encoding="utf-8", errors="ignore") as f:
            text = f.read()
        chunks = split_text_into_chunks(text)
        chunk_ids = insert_chunks(d["id"], chunks)
        for cid, content in zip(chunk_ids, chunks):
            all_chunks.append(content)
            chunk_map.append(cid)

    if not all_chunks:
        raise JSONResponse(status_code=400, content={"error": "No chunks to index. Upload documents first."})

    vectors, used_model = embed_texts(all_chunks)
    vecs_np = np.array(vectors).astype("float32")
    dim = vecs_np.shape[1]
    index = faiss.IndexFlatIP(dim)
    # Normalize for cosine similarity via inner product
    faiss.normalize_L2(vecs_np)
    index.add(vecs_np)
    index_path, meta_path = save_index(index, chunk_map, used_model)

    return BuildIndexResponse(
        num_documents=len(docs),
        num_chunks=len(all_chunks),
        embedding_model=used_model,
        index_path=index_path,
    )


@app.post("/query", response_model=QueryResponse)
def query(req: QueryRequest):
    # Moderation
    flagged, _details = moderate_text(req.question)
    if flagged:
        # still proceed but mark flagged
        pass

    # Load index
    try:
        index, id_to_chunk_id, embedding_model = load_index()
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": f"Index not available: {str(e)}"})

    top_k = req.k or settings.TOP_K
    qvec = np.array(embed_query(req.question), dtype="float32")
    faiss.normalize_L2(qvec.reshape(1, -1))
    results = search(index, qvec, top_k)

    retrieved = []
    for internal_id, score in results:
        chunk_id = id_to_chunk_id[internal_id]
        chunk = get_chunk_by_id(chunk_id)
        if not chunk:
            continue
        retrieved.append({"id": chunk["id"], "doc_id": chunk["doc_id"], "content": chunk["content"], "filename": chunk["filename"], "score": float(score)})

    answer = answer_question(req.question, retrieved, req.deep)

    image_path = None
    if req.generate_image:
        image_prompt = f"Create a clear diagram illustrating: {req.question}."
        image_path = generate_image_from_prompt(image_prompt)

    tts_audio_path = None
    if req.voice:
        tts_audio_path = synthesize_speech(answer)

    query_id = insert_query(req.question, req.deep, settings.DEEP_MODEL if req.deep else settings.FAST_MODEL, answer, image_path, tts_audio_path)
    insert_query_citations(query_id, [{"chunk_id": r["id"], "score": r["score"]} for r in retrieved])

    citations = [
        RetrievedChunk(chunk_id=r["id"], doc_id=r["doc_id"], score=float(r["score"]), content_preview=r["content"][:200], filename=r["filename"]) for r in retrieved
    ]

    return QueryResponse(
        data=AnswerData(
            answer=answer,
            citations=citations,
            model=settings.DEEP_MODEL if req.deep else settings.FAST_MODEL,
            moderation_flagged=bool(flagged),
            image_path=image_path,
            tts_audio_path=tts_audio_path,
        )
    )


@app.post("/export", response_model=ExportResponse)
def export(req: ExportRequest):
    rows = list_queries(limit=req.limit)
    if req.format.lower() == "csv":
        path = export_to_csv(rows, "queries_export.csv")
    elif req.format.lower() in ["xlsx", "xls"]:
        path = export_to_xlsx(rows, "queries_export.xlsx")
    else:
        return JSONResponse(status_code=400, content={"error": "Unsupported export format"})
    return ExportResponse(path=path)


@app.get("/download")
def download(path: str = Query(...)):
    # Simple static file serving for generated files
    if not os.path.exists(path):
        return JSONResponse(status_code=404, content={"error": "File not found"})
    return FileResponse(path)

