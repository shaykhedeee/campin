#!/usr/bin/env python
"""Extract text from CampIn PDF briefs when a PDF text layer exists."""

from __future__ import annotations

import argparse
from pathlib import Path
import sys


def load_reader():
    try:
        from pypdf import PdfReader  # type: ignore

        return PdfReader, "pypdf"
    except Exception:
        pass

    try:
        from PyPDF2 import PdfReader  # type: ignore

        return PdfReader, "PyPDF2"
    except Exception:
        pass

    return None, None


def extract_pdf(pdf_path: Path) -> str:
    reader_cls, reader_name = load_reader()
    if reader_cls is None:
        raise RuntimeError(
            "No PDF reader installed. Run: python -m pip install pypdf"
        )

    reader = reader_cls(str(pdf_path))
    chunks = [f"# Extracted from {pdf_path.name} using {reader_name}", ""]
    for index, page in enumerate(reader.pages, start=1):
        try:
            text = page.extract_text() or ""
        except Exception as exc:
            text = f"[page extraction error: {exc}]"
        chunks.append(f"## Page {index}")
        chunks.append(text.strip())
        chunks.append("")
    return "\n".join(chunks)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdfs", nargs="+", help="PDF file paths to extract")
    parser.add_argument("--out-dir", default="", help="Directory for .txt output")
    args = parser.parse_args()

    out_dir = Path(args.out_dir) if args.out_dir else None
    if out_dir:
        out_dir.mkdir(parents=True, exist_ok=True)

    for pdf in args.pdfs:
        pdf_path = Path(pdf)
        if not pdf_path.exists():
            print(f"Missing PDF: {pdf_path}", file=sys.stderr)
            return 2
        text = extract_pdf(pdf_path)
        if out_dir:
            out_path = out_dir / f"{pdf_path.stem}.txt"
            out_path.write_text(text, encoding="utf-8")
            print(f"Wrote {out_path}")
        else:
            print(text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

