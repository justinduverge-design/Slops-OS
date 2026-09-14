# Wrapper install state — 2026-09-14

Authoritative answer is the tool, not this file:

```bash
node Blueprints/tools/skill-link/check-skill-deps.mjs
```

**ready 8 · needs-install 1 · undeclared 0 · unreadable 0**

## The one that is not installed, and should not be

`slops-voiceover` — voicebox is a Tauri **desktop app** whose recorded install is a Windows `.msi`
on a different machine. Permanent `NEEDS-INSTALL` here is an accurate statement about this Mac, not
a gap to close. Detect-only is the design.

## What was installed, and how

**Everything Python runs on a pinned interpreter in an isolated `uv` venv.** System Python (3.9.6)
is untouched, and each tool's dependency tree is sealed off from every other's.

| Tool | Version | Command |
|---|---|---|
| uv | 0.12.13 | `brew install uv` |
| CPython | 3.12.14 | `uv python install 3.12` |
| pandoc | 3.11 | `brew install pandoc` |
| ffmpeg | 9.0.1 | `brew install ffmpeg` |
| cairo / pango / pkgconf | — | `brew install cairo pango pkgconf` (pycairo builds against these) |
| markitdown | 0.1.7 | `uv tool install --python 3.12 'markitdown[pdf,docx,pptx,xlsx,outlook]'` |
| manim | 0.21.0 | `uv tool install --python 3.12 manim` |
| headroom | 0.37.0 | `uv tool install --python 3.12 headroom-ai` |
| playwright-core | 1.49.1 | `npm --prefix slops-saloon/omen install --save-dev playwright-core@1.49.1` |
| remotion | 4.0.487 | `npm --prefix …/Brand/promos/omen-coming-soon install` |
| open-agreements | pinned `02b3113ffe39` | cloned to `References/legal-templates/open-agreements`, detached HEAD |
| taste-skill | pinned `ccbc15639c97` | `npx skills add … --skill <name>` ×4 |

## Constraint decisions carried into the installs

- **markitdown has NO Azure.** Installed with format extras, never `[all]`. Verified:
  `ModuleNotFoundError: No module named 'azure'`. The ban is structural, not prose.
- **headroom is library/CLI only.** `headroom proxy` and `headroom mcp install` were deliberately
  **not** run — the proxy is a cloud-LLM path facts-of-record #17 forecloses.
- **playwright-core with `--save-dev`.** It is in `omen/package.json` now, so the vendoring claim
  that was false for months is finally true. An unsaved install would have recreated the bug.
- **open-agreements pinned to a commit**, not a branch. Apache-2.0 `NOTICE` must propagate into any
  generated document.
- **Remotion renders locally.** Remotion Lambda is not used and is out of scope.

## Proven working, not merely resolvable on PATH

`READY` means found. These were run:

- **markitdown** — converted HTML with a table to Markdown, headings and table intact.
- **pandoc** — produced a real `Microsoft Word 2007+` DOCX (10,443 bytes).
- **manim** — rendered `Proof.mp4` (10,044 bytes) with brass `#C4933B` text.
- **remotion** — `npx remotion compositions` lists **10 real compositions**; rendered 60 frames of
  `OmenHypeVertical` to a 400 KB **1080×1920 h264 + aac** MP4.
- **headroom** — `headroom, version 0.37.0`.

## Two traps this install hit, recorded so the next machine does not

1. **`uv` silently resolved markitdown to `0.0.1a1`** — a two-year-old alpha — because without
   `--python` it inherited system Python 3.9, and rather than failing on the `>=3.10` floor it
   **backtracked to an ancient version that satisfied it.** It printed only `warning: does not have
   an extra named 'xlsx'`, which reads like a typo, not like a silent two-year downgrade. Always
   pass `--python`; treat a resolver that succeeds against an unmet floor as a red flag.
2. **manim needs system libraries pip cannot supply.** `pycairo` builds from source and wants
   `cairo`, `pango` and `pkgconf` present first. A pip-only install line for manim is misleading.
   **LaTeX is still NOT installed** — `Tex`/`MathTex` scenes will fail until a TeX distribution is
   added (`brew install --cask basictex` is the ~100 MB option versus MacTeX's multi-GB). For a
   skill whose job is *math* explainers that is a real limit, not a footnote.
