import os
from typing import List, Dict
import csv
import pandas as pd
from .config import get_settings


def export_to_csv(rows: List[Dict], filename: str) -> str:
    settings = get_settings()
    path = os.path.join(settings.DATA_DIR, filename)
    if not rows:
        with open(path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["empty"]) 
        return path
    fieldnames = list(rows[0].keys())
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)
    return path


def export_to_xlsx(rows: List[Dict], filename: str) -> str:
    settings = get_settings()
    path = os.path.join(settings.DATA_DIR, filename)
    df = pd.DataFrame(rows)
    df.to_excel(path, index=False)
    return path

