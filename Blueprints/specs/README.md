# Specs Index

Layer 0 (SLOPS) specs. A spec defines what a piece of the operating system should do and its boundaries — one layer above a runnable prompt and below a locked decision. Specs here are OS-level (reusable doctrine and system design), not app implementation.

## Layer note

These are company/OS specs. App-implementation and product specs for Corvus live in `slops-saloon/corvus/Blueprints/specs/`, not here.

## Specs

| File | Defines |
|---|---|
| `slops-os-dbs-routing-and-skill-creation.spec.md` | The DBS folder/routing model and how SLOPS-authored skills are created. |
| `slops-os-markdown.spec.md` | The Markdown operating package: how SLOPS context/markdown files are authored and normalized. |
| `design-md.spec.md` | The canonical `design.md` structure and the `design-md-author` workflow. |
| `app-strategy.spec.md` | App/distribution strategy scope and constraints. |
| `ux-ui-execution.spec.md` | UX/UI execution standards (spec layer only — no components, no design system, no app code). |

## Related

- Decisions that lock these specs: `Direction/decisions/`
- Research behind them: `References/patterns/`
- Runnable handoffs that implement them: `Blueprints/prompts/`
