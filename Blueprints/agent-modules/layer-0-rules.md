# Layer 0 — SLOPS OS root

**Path:** active Git root (`git rev-parse --show-toplevel`)

**In scope:**

- Cross-cutting doctrine (skills, agents, tools, prompts, RBAC, naming)
- Reusable patterns that apply to multiple layers
- Founder-context, OS-level operating rules
- The DBS folder system itself

**Route elsewhere:**

- Slops Saloon division strategy, content + marketing, future product slots → L1 (`slops-saloon/`)
- Fantasy football app code, deploy, tests, source → L2 (`slops-saloon/corvus/`)

**Do not** change app code, deploy posture, secrets, infrastructure, or package files from L0.
**Treat `Archive/`, `_imported/`, and old project copies as non-authoritative** unless Justin says otherwise.
