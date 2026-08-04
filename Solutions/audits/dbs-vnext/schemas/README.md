# Draft Direction v1 schemas

These JSON Schema documents are review fixtures for `direction-schema-v1-proposal.md`. They are deliberately stored in `Solutions/`; they are not canonical contracts and must not be copied into `Blueprints/` without an accepted Slops OS decision.

Included draft interfaces:

- `agent-inbox-item.schema.json`
- `sprint-item.schema.json`
- `decision.schema.json`
- `session-close.schema.json`

The schemas validate the portable structured representation of the YAML front matter. Full workspace validation also needs transition history, link resolution, inverse supersession, ownership, and promotion checks; those cross-record rules cannot be expressed safely as isolated JSON Schema documents.
