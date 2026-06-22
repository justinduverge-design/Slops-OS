# Prompts Index

Layer 0 (SLOPS) prompts. A prompt is a runnable task — usually a Claude→Codex handoff — that implements a spec or decision. These are OS-level prompts; Corvus app/product prompts live in `slops-saloon/corvus/Blueprints/prompts/`.

## Reusable templates (`_templates/`)

Patterns intended to fire more than once. Edit carefully — the rest of the system relies on their stability.

| File | Use |
|---|---|
| `_templates/Claude_prompt_format.md` | Standard structure for prompts aimed at Claude (planning, review, doctrine). |
| `_templates/Codex_prompt_format.md` | Standard structure for prompts aimed at Codex (file edits, code, terminal). |
| `_templates/simple_prompt_system_claude.md` | Lightweight Claude prompt pattern. |
| `_templates/simple_prompt_system_codex.md` | Lightweight Codex prompt pattern. |
| `_templates/codex-pull-next-backend.md` | Generic "pull topmost open Backend / Codex Phase item from `current_sprint.md`" prompt. Use from Phase 1.3+ onward. |
| `_templates/claude-code-pull-next-frontend.md` | Generic "pull topmost open Frontend / Claude Phase item from `current_sprint.md`" prompt, with cross-stack dependency checks. |
| `dbs-style_new_chat.md` | Boot prompt for starting a fresh chat with DBS context loaded. |

## Claude→Codex handoffs (OS projects)

| File | Implements |
|---|---|
| `slops-os-dbs-claude-codex-handoff.md` | The DBS routing/skill-creation spec. |
| `slops-os-markdown-claude-codex-handoff.md` | The Markdown operating package. |
| `design-md-claude-codex-handoff.md` | The `design.md` template/authoring work. |
| `app-strategy-claude-codex-handoff.md` | The app-strategy direction. |

## Codex operational prompts

| File | Task |
|---|---|
| `codex-doc-cleanup-archive.md` | Doc cleanup and archiving. |
| `codex-git-slops-initial-commit.md` | Initial git commit for the SLOPS tree. |
| `codex-post-deploy-context-update.md` | Update context files after a deploy. |
| `codex_trade_analyzer_embed.md` | Embed the trade-analyzer work. |

## Capability sessions

| File | Task |
|---|---|
| `skills-acquisition-distribution-session.md` | Acquire approved capabilities, normalize canonical skills, distribute to Claude and Codex, then audit usage evidence, procedures, and gaps. |
| `claude-skills-playbooks-acquisition-session.md` | Superseded 2026-06-11 acquisition record; do not reuse for current paths or distribution. |

## Migration phase prompts (historical run records)

These record past DBS-migration runs. Keep for history; do not re-run blindly.

| File | Phase |
|---|---|
| `phase-1-codex-nomenclature-rename.md` | Phase 1 — nomenclature rename. |
| `phase-1b-codex-title-case-cleanup.md` | Phase 1b — title-case cleanup. |
| `phases-2-4-claude-index-tools-skills.md` | Phases 2–4 — indexes, tools, skills. |
| `phase-5/phase-5a-product-division.md` | Phase 5a — product division split. |

## Subfolders

- `_templates/` — reusable templates (fire more than once). See table above.
- `_pending/` — one-shot prompts queued to fire next. Removed once fired.
- `_old-prompts-for-analysis/` — archived prompts kept for reference, not active.

## Related

- Specs these prompts implement: `Blueprints/specs/`
- Skill routing: `Blueprints/skills/SKILL_ROUTING.md`
