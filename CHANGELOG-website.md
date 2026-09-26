# Website changelog

One line per change, so the team can review what moved and why. Spec: `.agents/ui-rewrite.md`. Progress: `.agents/ui-rewrite-tracker.md`.

## 2026-09-26: UI rewrite, round 1 (branch `ui-rewrite`)

### Setup
- Added the rewrite spec, the approved hero mockup and a progress tracker under `.agents/`.
- Added `scripts/check-content.mjs`, run by `prebuild`: fails on `{{OWNER:` placeholders in source and warns on banned stock phrases (spec 8.2, 12).
