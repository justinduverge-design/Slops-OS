# Truth Gate

Checks that the SLOPS documentation layer agrees with itself and with disk.
Read-only — it never edits, moves, or deletes anything.

```bash
node Blueprints/tools/truth-gate/truth-gate.mjs
```

```bash
node Blueprints/tools/truth-gate/truth-gate.mjs --quiet
```

| Flag | Effect |
|---|---|
| `--quiet` | P0 findings only |
| `--json` | machine-readable output |
| `--check=<name>` | run one check |
| `--root=<path>` | scan a different tree |

Exit `0` = no P0. Exit `1` = at least one P0. Exit `2` = the gate itself failed.

## Checks

| Check | Severity | Finds |
|---|---|---|
| `dead-header` | P0 | A file whose own header says it is HISTORICAL / SUPERSEDED / "do not run" but is still in the live tree. |
| `broken-path` | P0 | A cited path whose file exists **nowhere** in the repo. |
| `stale-path` | P1 | A cited path that doesn't resolve, but a file of that name exists elsewhere — the path is stale, not the file. |
| `baseline` | P0 | A layer root missing a required entry file (`DBS_INDEX.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`). |
| `sprint-git-drift` | P0 | A sprint item marked "not pushed/merged" whose work is already on main. Handles squash merges by comparing commit subjects. |
| `registry-drift` | P1 | A skill or agent on disk that no index knows about. |
| `dangling-tree-ref` | P1 | A doc referencing a directory that has been deleted. |
| `valor-brain` | P0 | An opted-in `valor-brain/v1` page whose metadata or required body sections violate the ratified contract. |

### Severity contract

- **P0** — an agent reading current docs would act on false information.
- **P1** — drift that becomes P0 if ignored.
- **P2** — hygiene.

## Why `sprint-git-drift` matters most

It caught two live cases on 2026-08-05: `current_sprint.md` claimed B2-D-E1 and
B2-D-E2 were "not pushed, merged, or deployed" when both had already shipped as
PRs #265 and #266. An agent pulling from that file would have redone merged work.

This repo squash-merges, so the branch SHA never lands on main and a naive
ancestry check reports every shipped item as unmerged. The check compares
normalized commit subjects instead.

## Suppressions

Edit `truth-gate-ignore.txt`:

```
<check-or-*> | <path prefix> | <reason>
```

Every suppression needs a reason. Prefixes match with `startsWith`, so a folder
prefix covers everything beneath it. When a reason stops being true, delete the
line — a suppression you can't justify is a finding you're hiding.

## Wiring into CI

Add to `.github/workflows/pr-quality.yml` so drift fails the PR instead of
accumulating:

```yaml
- name: Truth Gate
  run: node Blueprints/tools/truth-gate/truth-gate.mjs --quiet
```

## Known limits

- `dead-header` is a heuristic over the first 12 lines. It reads banner-shaped
  lines (blockquote, bold, `status:` key) and skips anything marked "partially"
  superseded. Files that *describe* superseded things are suppressed by path.
- Path checking covers markdown links and multi-segment backticked paths. A bare
  backticked filename is treated as prose, not a path claim.
- `registry-drift` does a substring match against the index body, so a name
  mentioned anywhere in the file counts as registered.
