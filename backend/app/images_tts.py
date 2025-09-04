import os
from typing import Optional
from .openai_client import get_openai_client
from .config import get_settings


def generate_image_from_prompt(prompt: str) -> Optional[str]:
    settings = get_settings()
    client = get_openai_client()
    resp = client.images.generate(model=settings.IMAGE_MODEL, prompt=prompt, size="1024x1024")
    if not resp.data:
        return None
    b64 = resp.data[0].b64_json
    if not b64:
        return None
    import base64
    img_bytes = base64.b64decode(b64)
    out_path = os.path.join(settings.IMAGE_OUT_DIR, "image_1.png")
    with open(out_path, "wb") as f:
        f.write(img_bytes)
    return out_path


def synthesize_speech(text: str) -> Optional[str]:
    settings = get_settings()
    client = get_openai_client()
    # TTS to mp3 file
    speech = client.audio.speech.create(model=settings.TTS_MODEL, voice="alloy", input=text, format="mp3")
    out_path = os.path.join(settings.TTS_OUT_DIR, "answer.mp3")
    with open(out_path, "wb") as f:
        f.write(speech.read())
    return out_path

