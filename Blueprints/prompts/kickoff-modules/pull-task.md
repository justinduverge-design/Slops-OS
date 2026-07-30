# Pull the Task

1. Read `Direction/agent_inbox.md`.
2. **If the file starts with `📌 [item-name]`:** that item is pinned. Do not reorder. It is your active task. Skip to step 7.
3. Read `Direction/current_sprint.md`.
4. **Select up to 5 items with `Status: READY` across all lanes, ordered by the selection rule** in `Blueprints/agent-modules/status-model.md`.
5. Organize by what must come first — respect every `Blocked by:` line and its leading type token. The order you propose IS the new inbox.
6. Overwrite `Direction/agent_inbox.md` with the new shortlist (never the pin if one exists). A shortlist is not authority to claim five — record a `Claim:` on the single item you are starting.
7. Your active task is item #1.
8. **If item #1 carries any `Blocked by:` line other than `None`:** stop. Surface the block to Justin in chat. Do not skip-ahead.
9. **Soft preference:** Claude leans frontend/docs/spec. Codex leans backend/code-volume. Either can pull anything. Surface "outside my lean — confirm?" only when the item is *both* far outside the lean *and* high-risk.
