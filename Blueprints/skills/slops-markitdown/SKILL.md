---
name: slops-markitdown
description: Convert PDF/PPTX/DOCX/XLSX/HTML/audio/images/EPUB → Markdown for LLM consumption. Wraps microsoft/markitdown. Local-only by default; Azure CU and Doc Intelligence forbidden by sovereignty rule.
status: active
skill_type: wrapper
layer: 0
default_agent: Claude (plans), Codex (runs conversion)
trigger: "convert to markdown | extract from PDF | extract from PPTX | extract from DOCX | markitdown this"
upstream: microsoft/markitdown (MIT, Microsoft; requires-python >=3.10). Vetted 2026-09-14 — see notes/prior-use-review.md
requires:
  - name: markitdown
    python-module: markitdown
    install: pip install 'markitdown[pdf,docx,pptx,xlsx,outlook]'
    note: NOT [all] — that extra installs azure-ai-documentintelligence, azure-ai-contentunderstanding and azure-identity, which this skill forbids. Needs Python 3.10+; this machine's python3 is 3.9.6.
version: 0.1.0
owner: Justin
---

# Slops Markitdown

## When to Use
Ingesting a PDF/PPTX/DOCX/XLSX/image/audio file into the build loop or research stream. Replaces ad-hoc copy-paste from Office formats.

## Scope
Wrap markitdown's **format extras** (`[pdf,docx,pptx,xlsx,outlook]`) for local-only conversion — never `[all]`, which ships the Azure SDKs banned below. Output goes to `References/research/<source>.md` by default. The wrapper enforces: no Azure CU calls, no Azure Document Intelligence calls, no `llm_client` paid-API passes unless explicitly approved.

## Preconditions
- Justin runs: `pip install 'markitdown[pdf,docx,pptx,xlsx,outlook]'` (install boundary).
- **Corrected 2026-09-14. This read `pip install 'markitdown[all]'`, which installs the exact
  things this skill forbids.** Upstream defines `all` to include `azure-ai-documentintelligence`,
  `azure-ai-contentunderstanding` and `azure-identity` — plus `youtube-transcript-api` and
  `SpeechRecognition`, whose default recognizer is a cloud service. The Scope section below bans
  Azure CU and Doc Intelligence while the install command put both SDKs on disk. The narrowed
  extras cover every format this skill claims and make the ban **structural rather than
  aspirational**: the SDK is not present to be enabled. Only add `audio-transcription` by an
  explicit decision.
- **Python floor: >= 3.10.** This workstation's `python3` is 3.9.6, so the install is blocked on a
  toolchain decision shared with `slops-headroom` and `slops-explainer-cut` (manim, >= 3.11).
  Decide the interpreter once for all three.
- Detect: `python3 -c "import markitdown"`; if missing, stop with install command.
- Codex creates `References/research/` if missing (`mkdir -p References/research`) before the first conversion.

## Required Inputs
- File path (local).
- Target output path (default: `References/research/<basename>.md`).

## Outputs
- Markdown file at the target path.

## Does NOT
- Call Azure CU, Doc Intelligence, OpenAI, or any other paid API (sovereignty).
- Convert untrusted remote URIs without explicit approval (`convert_local` only by default — per microsoft's security note).
- Replace `docx`/`pptx`/`pdf` Anthropic skills for AUTHORING — markitdown is for INGEST only.

## Replaces / Complements
- Net-new. Complements `pre-build-research` (which now has a structured ingest path).
- Lower-leverage than `slops-graphify` but covers a much wider input format range.

## Verification
- Smoke test: convert one PDF + one PPTX + one DOCX from `References/`; confirm headings, tables, and lists survive.
- Audit signal: no outbound network during the conversion.

## Changelog
- 0.1.0 — initial proposal (2026-06-11), approved by Justin.
- 0.1.1 — promoted to active 2026-06-12 (commit 8f537bc).
