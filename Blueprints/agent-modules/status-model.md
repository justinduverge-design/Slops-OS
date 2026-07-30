# Status model (authoritative)

This module is the single authority for task state across every layer. Queues at L0
(`Direction/TODO.md`), L1 (`slops-saloon/Direction/current_sprint.md`), and L2
(`omen/Direction/current_sprint.md`) all use it. It replaces the retired checkbox
mechanic — `- [ ]` / `- [x]` boxes, selecting work by box state, and ticking a box to
close.

## Lifecycle

```text
READY → IN_PROGRESS → VERIFIED → CLOSED
```

`CLOSED` is terminal. A regression after `CLOSED` does not reopen the task — it creates a
**new linked task** that names the closed one.

## Closure

`CLOSED` requires a `Closure:` value:

| Closure | Requires |
| :--- | :--- |
| `COMPLETED` | evidence — a commit hash, PR, path, or output location |
| `SUPERSEDED` | a named successor task or artifact |
| `DESCOPED` | a stated reason |

## `Blocked by:`

Required on **every active task** (`READY`, `IN_PROGRESS`, `VERIFIED`). Repeatable — one
blocker per line. The **type is the first token**:

| Form | Meaning |
| :--- | :--- |
| `None` | not blocked |
| `AGENT_RESOLVABLE — <reason>` | an agent can clear this without founder input |
| `FOUNDER_APPROVAL — <decision>` | needs Justin's decision |
| `EXTERNAL — <dependency>` | outside the repo (vendor, billing, device, season) |
| `TASK-<sprint-key> — <predecessor>` | another task must land first |

No empty or placeholder reasons. **Unblocked means exactly one `None` line** — `None`
never appears alongside another blocker.

## `Unblock:`

Repeatable, dated, append-only. **Never erase prior entries** — the history is the audit
trail for how a blocker was cleared.

```text
Unblock: <YYYY-MM-DD> CLEARED|ROUTED|ESCALATED|REASSESSED — <detail>
```

## Selection order

Apply in order; the first rule that discriminates wins:

1. **Founder pin** — a pinned item overrides the queue.
2. **Continue actionable `IN_PROGRESS`** — finish what is started before starting more.
3. **Effective priority** — a task blocking a higher-priority task **inherits** that
   higher priority.
4. **Downstream unblock reach** — how many tasks eventually unblock.
5. **Direct unblock count** — how many unblock immediately.
6. **Progress-now** — what can actually move today given current blockers.
7. **File order** — the tiebreak of last resort.

## WIP

A shortlist is **not** authority to claim five items. One new claim per agent by default;
work items in parallel only when they have been assessed parallel-safe (no shared hot
files, no ordering dependency). Release a task back to `READY` when the only remaining
blocker is escalated and outside your authority — do not hold a claim on work you cannot
move.

## Required field block

Planning and grooming emit this block per task. This is the shape `planning-pass` writes.

```text
### <TASK-KEY> — <imperative title>

- **Status:** READY
- **Blocked by:** None
- **Priority:** P1
- **Cost:** small
- **Done when:** <explicit, testable outcome>
- **Do not touch:** <boundaries>
```

A closed task carries `Closure:` and its evidence instead of `Blocked by:`:

```text
- **Status:** CLOSED
- **Closure:** COMPLETED
- **Evidence:** <commit hash / PR / path / output location>
```

`VERIFIED` carries an `Evidence:` pointer as well — per
`Blueprints/definition-of-done.md`, point to evidence rather than pasting command output.
