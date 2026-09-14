# Upstream vetting — `slops-explainer-cut` / Manim Community

**Vetted 2026-09-14 · Verdict: ADOPT, but do not install on the workstation yet — the render host
question has to be answered first, and it is shared with `slops-animation-render`.**

## The upstream

| | |
|---|---|
| Licence | **MIT** (`LICENSE` + `LICENSE.community`) |
| Stars / forks / issues | 40,835 / 3,111 / 500 |
| Created / last push | 2020-05-19 / **2026-09-14** |
| Repo | `ManimCommunity/manim` (manimce — the community fork, correctly named in `upstream:`) |
| `requires-python` | **>= 3.11** |

The community fork is the right one to depend on — 3Blue1Brown's original `manim` is a personal
project with no stability contract. Our `upstream:` already says `manimce`. Good.

The second upstream, `HarleyCoops/Math-To-Manim`, is cited as **concepts only** and nothing is
vendored from it. That is provenance, not a dependency, and needs no probe.

## Against our constraints

**facts-of-record #17. PASS, and it is not close.** Manim renders mathematical animations from
Python source to MP4, entirely offline. No SDK, no telemetry, no account, no network at runtime.
The inputs are our own numbers.

**No cloud/paid fallbacks. PASS.** MIT, free, self-hosted.

**One thing to watch that is a product rule, not a licence one.** This skill's whole purpose is to
*show the work* behind an Omen call. Fact #16 says confidence is expressed as a **band, never a
percentage**, and fact #7 says mock data is always labelled. A "show your work" video is the single
easiest place to put a precise-looking number on screen that the product deliberately refuses to
show. The skill's Brand Lock should name that explicitly.

## Does it earn its place?

**Yes, for the job.** Nothing else does mathematical animation at this quality, and the skill has a
real recurring use in `K4` (Omen of the Week content, "After Week 1" in the marketing lane).

**But it is not urgent, and the install is the heaviest in the catalogue.** manim needs a system
LaTeX distribution and ffmpeg beyond the pip install — the largest footprint of any wrapper here —
and `K4` is gated behind Phase 4 and Week 1.

## The blocker is shared, and that is the useful finding

`requires-python >= 3.11`. This Mac has **3.9.6**. `slops-markitdown` needs **>= 3.10** and
`slops-headroom` is Python too.

**Three wrappers are blocked on one unmade decision: which Python this machine uses.** That is a
standing platform choice, not three package choices, and it should be decided once. `uv` is the
lightest path and would cover all three without touching system Python.

**And the second shared question:** this skill says *"Codex renders MP4 on KVM1"*, exactly as
`slops-animation-render` says renders happen on KVM1. If both render there, neither needs a
workstation install and both `NEEDS-INSTALL` results are **noise** — the checker is answering for
the wrong machine and cannot know it. The honest resolution is to record the render host per skill
so a future reader knows whether a local miss matters.

## What we would change

**Upstream:** nothing.

**Local deltas:**

1. Pin a manim version rather than tracking the runtime loosely, and record the **system**
   prerequisites (LaTeX, ffmpeg) alongside the pip line — a pip-only install command is misleading
   for this package.
2. State the render host explicitly. If it is KVM1, say a local miss is expected and fine.
3. Add the confidence-band and mock-label rules to the Brand Lock, per fact #16 and #7.
4. `status:` is unstated in the frontmatter (the checker reports `[L0 · unstated]`). Set it.
