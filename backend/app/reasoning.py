from typing import List, Dict
from .openai_client import get_openai_client
from .config import get_settings


SYSTEM_PROMPT = (
    "You are a helpful research assistant. Answer clearly and concisely. "
    "Cite sources by filename and chunk id when relevant. If uncertain, say so."
)


def build_context_prompt(chunks: List[Dict]) -> str:
    lines = ["Relevant context chunks:"]
    for ch in chunks:
        lines.append(f"[chunk_id={ch['id']}; file={ch['filename']}]\n{ch['content']}")
        lines.append("\n---\n")
    return "\n".join(lines)


def answer_question(question: str, retrieved_chunks: List[Dict], deep: bool) -> str:
    settings = get_settings()
    model = settings.DEEP_MODEL if deep else settings.FAST_MODEL
    client = get_openai_client()
    context = build_context_prompt(retrieved_chunks)
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"Question: {question}\n\n{context}"},
    ]
    resp = client.chat.completions.create(model=model, messages=messages, temperature=0.2)
    return resp.choices[0].message.content.strip()

