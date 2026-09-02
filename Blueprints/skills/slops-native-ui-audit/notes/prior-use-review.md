# Prior-use review — slops-native-ui-audit

No runs yet. `draft`.

| Date | Screen | Axis with most real defects | Axis needing screenshots | P0 missed by source-only review |
|---|---|---|---|---|

## Authoring notes

- Axis 4 (contrast under team skins) is the one most likely to be skipped and most likely
  to be broken, because it only appears when a skin overrides a token. The theme contract
  defines the permitted overrides; that boundary is the test surface.
- Axis 10 (parity) exists because reading one platform is half an audit, and the cheaper
  half. Enforced in the success signal rather than left to discipline.
- This skill and `slops-canvas-to-code` stage 3 will be confused for each other. The line:
  fidelity ("does it match the artboard") vs. quality ("is it good"). A screen can pass
  either and fail the other.
- Once this is `active`, `slops-ui-ux-audit` should be re-scoped to web-only in its own
  frontmatter, or the routing table will keep sending native work to the web auditor.
