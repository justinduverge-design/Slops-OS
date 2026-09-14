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
| TinyTeX (LaTeX) | TeX Live 2026 | `sh install-bin-unix.sh --no-path` + `tlmgr install …` (see below) |
| Chromium / WebKit | 131.0.6778.33 / 18.2 | `npx playwright-core@1.49.1 install chromium webkit` |

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

## LaTeX — TinyTeX, not BasicTeX

`brew install --cask basictex` **fails without a terminal password**: the cask runs
`/usr/sbin/installer` under `sudo`. **TinyTeX** (`rstudio/tinytex`, Posit) is the no-root
equivalent — the same TeX Live, unpacked into `~/Library/TinyTeX`.

The installer was read before running rather than piped from curl to sh: it downloads a release
tarball from `rstudio/tinytex-releases`, extracts it, and runs `tlmgr`. Its only `sudo` is for PATH
setup via `/etc/paths.d`, which `--no-path` skips; binaries were linked into `~/.local/bin` with
`tlmgr option sys_bin ~/.local/bin && tlmgr path add` instead.

manim's TeX packages: `standalone preview doublestroke ms setspace rsfs relsize ragged2e
fundus-calligra microtype wasysym physics dvisvgm jknapltx wasy cm-super babel-english
gnu-freefont mathastext everysel`.

`tlmgr` printed an error during `fmtutil-sys`, so the only thing that settled it was rendering
real math: a `MathTex` scene renders (20,049 bytes). **A tool that errors and works is still
working; a tool that succeeds and does not is the dangerous one.**

## Render host — corrected

Both `slops-explainer-cut` and `slops-animation-render` said renders happen **on KVM1**. `AGENT.md`
§ Infrastructure Boundary: **KVM1 is the live app hosting lane** — `omen_api` and `omen_cron`
serving `https://slopssaloon.com`. It is the production API host, not a render farm, and a
multi-minute CPU-saturating render there risks the live service.

Both skills now say renders run locally, which is proved for both pipelines. The instruction
survived because the tools had never been installed, so it was never tested against what KVM1 is.

## Two traps this install hit, recorded so the next machine does not

1. **`uv` silently resolved markitdown to `0.0.1a1`** — a two-year-old alpha — because without
   `--python` it inherited system Python 3.9, and rather than failing on the `>=3.10` floor it
   **backtracked to an ancient version that satisfied it.** It printed only `warning: does not have
   an extra named 'xlsx'`, which reads like a typo, not like a silent two-year downgrade. Always
   pass `--python`; treat a resolver that succeeds against an unmet floor as a red flag.
2. **manim needs system libraries pip cannot supply.** `pycairo` builds from source and wants
   `cairo`, `pango` and `pkgconf` present first. A pip-only install line for manim is misleading.
   **Fixed structurally, not just noted:** `cairo`, `pango`, `pkgconf`, `latex`, `dvisvgm` and
   `ffmpeg` are now declared probes in `slops-explainer-cut`, so the checker names the missing
   cause before an opaque build error does.

## Both traps are now caught by the tool, not by a note

A note in a file is a control only if someone reads it. Both traps are now structural:

- **`min_version` in `requires:`.** `markitdown >= 0.1.0`, `manim >= 0.19.0`, `headroom >= 0.30.0`.
  A silently-backtracked install reports **NEEDS-INSTALL**, not READY. Tested by declaring an
  impossible floor: *"found 0.1.7 — BELOW the required 99.0.0."*
- **System libraries are declared dependencies**, not prose in a note, so `pkg-config`/`latex`
  absence is reported by name.
