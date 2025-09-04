import base64
from typing import Optional
from .openai_client import get_openai_client
from .config import get_settings


def _encode_image(path: str) -> str:
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def extract_text_from_image(image_path: str) -> str:
    settings = get_settings()
    client = get_openai_client()
    b64 = _encode_image(image_path)
    messages = [
        {
            "role": "user",
            "content": [
                {"type": "input_text", "text": "Perform OCR and return only plain text."},
                {"type": "input_image", "image": b64},
            ],
        }
    ]
    resp = client.chat.completions.create(model=settings.OCR_MODEL, messages=messages)
    return resp.choices[0].message.content.strip()

