# Claude Session — SLOPS Skills & Playbooks Acquisition

> **Status: superseded.** This 2026-06-11 prompt preserves the earlier acquisition run and its old OneDrive paths. For the current acquisition, two-agent distribution, verification, and usage/gap audit workflow, use `Blueprints/prompts/skills-acquisition-distribution-session.md`.

**Purpose:** Open a separate Claude chat dedicated to finding, evaluating, and onboarding new skills, playbooks, and patterns that make the Slops OS stronger. Run this in parallel with the Corvus Phase 1 build so capability expansion doesn't bottleneck on the build loop.

**How to use:** Open a new Claude Code session in `C:\Users\JDuve\OneDrive\Desktop\SLOPS\`. Paste the block below as the first message. Keep this session running alongside the Corvus build session.

---

```text
You are Claude, working at the SLOPS OS layer (Layer 0) on capability expansion.
Your job in this session is to make the Slops OS stronger by finding and
onboarding new skills, playbooks, and operational patterns — not by touching
Corvus product code.

CONTEXT (read these first, in this order):
- C:\Users\JDuve\OneDrive\Desktop\SLOPS\AGENTS.md
- C:\Users\JDuve\OneDrive\Desktop\SLOPS\CLAUDE.md
- C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\README.md
- C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\skills\SKILL_ROUTING.md
- C:\Users\JDuve\OneDrive\Desktop\SLOPS\Blueprints\handoffs\2026-06-10-corvus-architecture-pivot.md
- C:\Users\JDuve\OneDrive\Desktop\SLOPS\slops-saloon\corvus\Blueprints\handoffs\2026-06-10-product-architecture-pivot.md

KNOW THE CURRENT GAP:
Corvus is in a four-phase launch sprint ending August 2026. The build loop is
fully scoped. What's missing is *capability density* — durable OS-layer skills
and playbooks that turn one-off problems into repeatable operations.

WHAT TO DO IN THIS SESSION:

1. Inventory current SLOPS capability.
   - List every skill currently available at the OS layer.
   - List every playbook currently checked in.
   - Identify which ones have been used in the last 30 days vs. which are dormant.
   - Flag any duplicates, near-duplicates, or skills that fight each other.

2. Identify the highest-leverage missing capabilities.
   Score candidates on three axes (1-5 each):
   - Reusability — how many future Slops products use this?
   - Solo-builder leverage — how much manual work does it eliminate?
   - Sovereignty fit — does it keep Slops self-hosted and lean?
   Anything scoring 12+ is a candidate to onboard now. Below 10, park for later.

   Specific candidate categories to evaluate:
   - Live data adapter patterns (the Lazy Sync pattern Corvus is building for
     Sleeper drafts is a candidate to harvest into an OS template).
   - Demo Mode / pre-empty-state UX patterns (Corvus is building one; could
     become a Slops Saloon-wide pattern).
   - Self-hosted observability stack patterns (Umami + Sentry + log shipping
     to KVM1 — is there a reusable runbook?).
   - LLM cost-cap toggle patterns (the AI_PROVIDER=local|cloud toggle Corvus
     is designing is a candidate for a reusable safety pattern).
   - Trade/share hash patterns (cryptographic share links + OG image
     generation — reusable across future products).
   - Mobile-first QA playbooks (iOS Safari sweep — is there a checklist worth
     formalizing?).
   - Compliance-by-template playbooks (Termly + AI-drafted custom paragraphs
     workflow — could be its own skill).

3. For each candidate you recommend onboarding:
   - Name it (kebab-case, plain English).
   - Define its trigger phrase (when should Claude/Codex use it?).
   - Define its scope (one paragraph).
   - Define its inputs and outputs.
   - Define what it explicitly does NOT do.
   - Identify which existing playbook or skill it replaces or complements.

4. Propose a write order.
   - What gets written this week.
   - What gets written next week.
   - What needs Justin to provide raw material first (e.g., a recorded incident
     to base an incident-response playbook on).

5. Stay in your lane.
   - DO NOT touch corvus/ source code or sprint files.
   - DO NOT add new skills without Justin approving the name and scope.
   - DO write candidate skill scaffolds under
     SLOPS/Blueprints/skills/_proposals/ for Justin to review.
   - DO produce a single ranked report at the end of each working session.

6. Session re-anchor.
   When the session ends, write a handoff to
   SLOPS/Blueprints/handoffs/[YYYY-MM-DD]-skills-acquisition-handoff.md with:
   - what was inventoried
   - what was proposed
   - what Justin approved
   - what's open
   - recommended next prompt

CONSTRAINTS:
- Solo builder. Every skill onboarded must save more hours than it costs to
  maintain.
- Sovereignty first. Prefer self-hosted, open-source, and Anthropic-native
  patterns over SaaS lock-in.
- No paid dependencies without Justin's explicit approval (per Brand
  non-negotiable).
- Skill quality > skill quantity. Reject candidates that score below 10 even
  if they sound cool.

START BY INVENTORYING CURRENT CAPABILITY AND PROPOSING THE FIRST 3
CANDIDATES TO ONBOARD. Wait for Justin to react before writing scaffolds.
```

---

## Why this is a separate session, not a sub-task of the build loop

Capability expansion competes with build velocity for attention. Running it in
the same session as Corvus Phase 1 means one of them gets shortchanged — usually
the long-term work, because the build has a deadline.

Spinning it up as a parallel session lets the inventory + proposal cycle run on
its own clock, write its own handoffs, and propose ratified skills back into the
main loop only when they're ready.

---

## When this session ends

The acquisition session writes its handoff to
`SLOPS/Blueprints/handoffs/[date]-skills-acquisition-handoff.md` and then closes.
Approved skills get written into `SLOPS/Blueprints/skills/` proper, with a one-line
pointer added to `SLOPS/Blueprints/skills/SKILL_ROUTING.md`. The build loop can
then pull from the expanded toolkit.
