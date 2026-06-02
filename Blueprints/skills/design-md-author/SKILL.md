---
name: design-md-author
description: Create, critique, normalize, and improve lightweight design.md files for Slops OS projects. Use when Justin asks to create a design.md, convert brand/UI direction into a design contract, improve AI-generated UI consistency, or prepare Claude/Codex to build brand-consistent interfaces. Do not use for full design systems, production code changes, or agent role files.
---

# Design.md Authoring

## Purpose

Use this skill to create and improve lightweight `design.md` files for Slops OS projects.

A `design.md` file is a reusable visual contract. It gives Claude, Codex, Gemini, Cursor, Stitch, or local models enough design context to generate brand-consistent UI without needing to re-read every brand, UX, or Figma reference.

This skill creates or edits the design guidance file. It does not build the UI itself.

The goal is to reduce generic AI-generated interfaces while preserving MVP simplicity.

## When to Use

Use this skill when Justin asks to:

- Create a new `design.md`.
- Edit an existing `design.md`.
- Convert brand direction into a design contract.
- Convert UI/UX research into reusable design rules.
- Improve consistency across Claude, Codex, Gemini, or local UI generations.
- Define semantic design tokens.
- Add visual guardrails for a project.
- Create negative constraints for AI-generated UI.
- Add framework mapping for Tailwind, shadcn/ui, CSS variables, or component libraries.
- Create a Codex-ready prompt to place or update a `design.md` file.

## Do Not Use

Do not use this skill to:

- Build production UI code.
- Modify app components directly.
- Create full design systems unless Justin explicitly asks.
- Create Figma files.
- Extract proprietary brand systems from third-party products.
- Add licensed font files.
- Configure CI/CD design linting.
- Add Google `design.md` CLI automation.
- Add Stitch, Banani, or Figma syncing workflows.
- Create agent role files.
- Assign RBAC authority to agents.
- Replace feature specs, product specs, or implementation handoffs.

For reusable agent roles, use the appropriate Slops OS agent-authoring workflow.

For runnable implementation prompts, use `Blueprints/prompts`.

## Canonical Location

Reusable Slops OS design authoring skill:

```text
Blueprints/skills/design-md-author/SKILL.md