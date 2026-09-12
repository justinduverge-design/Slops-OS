# Handoff — 2026-09-12 — skill reach, the metadata contract, and the composing gap

**Session type:** L0 organization pass (Cowork). No app source touched. Nothing committed or pushed.

## Files updated

**New**
- `Blueprints/tools/skill-link/link-skills.mjs` — relative symlinks into `.claude/skills` for L0 and L2. `--check` exits 1 on drift and treats an absolute target as drift.
- `Blueprints/skills/slops-native-screen-design/SKILL.md` — the composing counterpart to `slops-native-ui-audit`. `draft`, v0.1.0.
- `References/patterns/writing-for-agents.md` — harvested from `mattpocock/skills` (MIT), plus the SLOPS dated-environmental-claim rule.
- `Direction/decisions/2026-09-12-agent-wrapper-disposition.md` — `valor-brain/v1`, answers OS1.

**Changed**
- `Blueprints/skills/slops-context-markdown/SKILL.md` — Writing for agents · Valor Brain metadata · Truth Gate; 3 new completion-checklist lines.
- `Blueprints/skills/slops-skill-author/SKILL.md` — frontmatter as the delivery contract; environmental claims; skill-link + registry-drift in Verification. v1.1.0.
- `Blueprints/skills/slops-ui-ux-audit/SKILL.md` — description now front-loads **WEB APP ONLY**; "Slops-native" (meaning "Slops' own") removed as a routing hazard.
- `Blueprints/skills/SKILL_ROUTING.md` — "Reaching the library (skill-link)" section; `slops-native-screen-design` row.
- `Blueprints/skills/SLOPS_LIFECYCLE.md` — phase 7 row for the new skill.
- `Blueprints/agent-modules/session-handoff.md` — gate runs before the handoff is written.
- `Blueprints/specs/valor-brain-metadata-v1.md` — environmental-claims amendment (convention, **no schema change**); powershell fences → bash.
- `Blueprints/agents/AGENT_INDEX.md` + 7 wrapper files — the 7 converted wrappers flipped `candidate` → `superseded` with `superseded_by`; §5 count note corrected to 36 files / 29 live candidates.
- `Direction/roadmap.md` — rewritten. Prior version tracked Stripe and a web launch checkpoint and never mentioned the native pivot.
- `Direction/TODO.md` — OS1 narrowed to one remaining founder call.
- `Blueprints/tools/truth-gate/truth-gate-ignore.txt` — 12 suppressions, each with a reason.
- `slops-saloon/omen/Blueprints/definition-of-done.md` — cross-layer Truth Gate in Record integrity.
- `slops-saloon/omen/Direction/current_sprint.md` — `X4-SkillReach` → `VERIFIED` with evidence.
- ~183 markdown files — Windows backslash repo-paths normalised to forward slashes; PowerShell-only local instructions made host-neutral; `migrate-repos-out-of-onedrive-playbook.md` bannered HISTORICAL.

## Decisions made

1. **Delivery is a symlink; authorship does not move.** `Blueprints/skills/` stays the only editable copy. The tool refuses to replace a real directory with a link.
2. **Targets are relative.** An absolute target resolves on one machine and breaks everywhere else; `--check` reports it as drift.
3. **Web-only scope lives in the `description`**, because that is what routing reads.
4. **`valor-brain/v1` is for knowledge pages; `SKILL.md` uses the harness contract.** Never mix them — it breaks discovery.
5. **Dated handoffs, reviews and audits are provenance, not routing authority** — suppressed as a class. Live surfaces stay unsuppressed.
6. **Environmental claims carry a date and a falsifier.** Convention in the ratified spec; no schema change, no fixture.

## Blockers surfaced

- **OS1 needs one call:** approve deleting the 18 wrappers named in the disposition decision. Staged, not applied.
- **11 dead-header P0s are true positives** — genuinely superseded files in the live tree, including L0 `context.md` and `Direction/00_FINAL_PLAN.md`. Archiving them is a founder call.
- **147→155 P0 remain**, concentrated in Omen's append-only logs (`decision_log.md` 26, `sprints_completed.md` 13, `skill-usage-ledger.md` 13, `done/LEDGER.md` 8). Whether append-only history is provenance like handoffs is the next suppression decision, and it is debatable because `decision_log.md` **is** read as authority.
- **Omen has 15+ unmerged branches.** Not triaged here.
- `.claude/worktrees/mystifying-aryabhata-9e1eea/` — commit `af3e2a7` is not an ancestor of master, but its content is the superseded sim-drive v0.2.3 and the intent it referenced did land. Safe to prune; not pruned.

## Last verified

```
node Blueprints/tools/skill-link/link-skills.mjs --check   → in-sync 122, drift 0
node Blueprints/tools/valor-brain/validate.mjs             → 4/4 valid
node Blueprints/tools/truth-gate/truth-gate.mjs --check=registry-drift → PASS
node Blueprints/tools/truth-gate/truth-gate.mjs --quiet    → FAIL, 155 P0 (backlog above)
```

The P0 count rose slightly during the backslash sweep. That is the gate working: a path written
`Blueprints\x\y` was never parsed as a path, so it could not be checked. Normalising made a class of
already-broken references visible for the first time.

## Second pass — founder review, same day

All four open calls were taken. Three applied here; the fourth needs `gh`.

1. **Wrapper disposition amended on layer grounds.** The proposed 18-file deletion conflated L2 with
   L0: Omen has no sales motion, but Slops OS has a revenue purpose, so commercial capability is L0's
   to hold. **15 parked** behind four named gates (`revenue-motion`, `paid-acquisition`,
   `localization`, `developer-audience`); **3 deleted** — the `academic/` lore wrappers, because the
   team-identity system is being rebuilt and will not inherit that framing. §5: 33 files, 7
   superseded, 14 parked, 12 candidate. **`OS1` closed.**
2. **12 files archived** to `Archive/superseded-docs/2026-09-12/` in both repos — the 11 dead-headers
   plus `migrate-repos-out-of-onedrive-playbook.md`. No inbound reference broke; verified.
3. **Append-only records suppressed** with a forward rule written into Omen's `definition-of-done.md`:
   old entries are history, entries appended from today cite repo-relative paths that resolve.
4. **Branches: 58, not 15.** Normalising the `(#NNN)` suffix off main's subjects, 31 have every commit
   subject already on main — squash debris. The other 27 are unresolvable from here because squash
   merges also *retitle* (`feat/one-typeface-alegreya-sans` landed as "One typeface: Alegreya Sans,
   shipped for the first time (#422)"). **`gh` is not installed on this Mac.**

## Truth Gate — before and after

| | P0 | P1 |
|---|---|---|
| Session start | 317 | 194 |
| After wiring + triage | 155 | 94 |
| **After founder calls** | **64** | **63** |

`dead-header`, `baseline`, `sprint-git-drift`, `valor-brain`, `registry-drift` and
`dangling-tree-ref` are all **0**. The remaining 64 are `broken-path` in a long tail of one or two
per file across ~40 files — real work, no longer a wall.

## Next recommended pull

1. `brew install gh && gh auth login`, then
   `gh pr list --state all --limit 400 --json number,state,headRefName,title,mergedAt` to settle the
   58 branches. Start with `feat/m9-backend-gap-closure` (10 commits; the `M9-BE-*` items are the five
   sitting in `READY_FOR_REVIEW`, invisible to the inbox selector and flagged twice).
2. Restart Claude Code first and confirm the skills surface by name.
