# Upstream vetting — `slops-markitdown` / microsoft/markitdown

**Vetted 2026-09-14 · Verdict: ADOPT — but NOT with the install command this skill shipped.**

## The upstream

| | |
|---|---|
| Licence | **MIT** |
| Stars / forks / open issues | 183,979 / 13,543 / 652 |
| Created / last push | 2024-11-13 / **2026-09-14** (same day as this vetting) |
| Maintainer | Microsoft, `microsoft/markitdown` |
| `requires-python` | **>= 3.10** |

Converts PDF/PPTX/DOCX/XLSX/HTML/audio/images/EPUB to Markdown. Widely used, actively maintained,
from a maintainer with a real support obligation. No concerns on provenance.

## Against our constraints — and the finding

**This skill's own prescribed install command violates this skill's own stated boundary.**

The Preconditions read `pip install 'markitdown[all]'`, and the Scope says the wrapper *"enforces: no
Azure CU calls, no Azure Document Intelligence calls."* But `[all]` is defined upstream as:

```
all = [ python-pptx, mammoth, pandas, openpyxl, xlrd, lxml, pdfminer.six, pdfplumber,
        olefile, pydub, SpeechRecognition, youtube-transcript-api,
        azure-ai-documentintelligence, azure-ai-contentunderstanding, azure-identity ]
```

So the command installs **exactly the three Azure SDKs the skill forbids**, plus
`youtube-transcript-api` and `SpeechRecognition` — the latter defaulting to Google's
speech API in its most common usage.

Installing an SDK is not calling it, and nothing here phones home unconfigured. But
facts-of-record #17 says *"no third-party SDK"*, and a wrapper that bans a capability in prose while
installing it in its own command is relying on nobody ever setting the env var. **That is the same
shape as the `slops-mobile-smoke` vendoring claim: the file asserts a control it does not implement.**

### The fix — install the format extras, not `[all]`

```bash
pip install 'markitdown[pdf,docx,pptx,xlsx,outlook]'
```

Covers every format the skill actually claims, and makes the Azure ban structural rather than
aspirational — the SDK is not on disk to be enabled. Add `audio-transcription` only with an explicit
decision, since `SpeechRecognition`'s default recognizer is a cloud service.

`requests` remains a base dependency (used for fetching remote URIs). The skill already restricts to
`convert_local` by default, which is the right control and should stay.

## Does it earn its place?

**Yes.** Best-in-class at a job we genuinely have (research ingest), MIT, maintained by Microsoft,
and once the extras are narrowed it is fully local. Nothing else covers this format range.

## Blocked on a toolchain decision, not on the package

`requires-python >= 3.10`. This Mac's `python3` is **3.9.6** (the macOS system Python). There is no
Homebrew Python and no `pipx`/`uv` on PATH. So the install cannot proceed until a Python is chosen.

**This is a decision that outlives markitdown** — `slops-headroom` and `slops-explainer-cut`
(manim, `>= 3.11`) need the same thing, and a Python floor is a standing platform choice, not a
per-package one. `uv` would be the lightest way to get there without touching system Python.

Recommend deciding the interpreter once, for all three, rather than three times.

## What we would change

**Upstream:** nothing. The `[all]` extra doing what it says on the tin is not a defect; misreading
it was ours.

**Local deltas:** the narrowed install above; pin `upstream:` to a release rather than `@latest`;
keep `convert_local` as the default and keep the ban, now backed by absence rather than by prose.
