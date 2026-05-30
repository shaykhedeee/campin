# CampIn PDF Extraction Helper

The local PDF briefs are large and may be image-based. This helper tries common Python PDF libraries and exports text when available.

Install one optional reader if needed:

```powershell
python -m pip install -r tools/pdf-extract/requirements.txt
```

Extract text:

```powershell
python tools/pdf-extract/extract_pdf_text.py "Docs/Campin breif.pdf" --out-dir artifacts/pdf-text
```

If the PDF has no embedded text, use an OCR tool later and place the extracted text in `artifacts/pdf-text/`.
