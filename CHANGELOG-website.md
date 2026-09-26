# Website changelog

One line per change, so the team can review what moved and why. Spec: `.agents/ui-rewrite.md`. Progress: `.agents/ui-rewrite-tracker.md`.

## 2026-09-26: UI rewrite, round 1 (branch `ui-rewrite`)

### Setup
- Added the rewrite spec, the approved hero mockup and a progress tracker under `.agents/`.
- Added `scripts/check-content.mjs`, run by `prebuild`: fails on `{{OWNER:` placeholders in source and warns on banned stock phrases (spec 8.2, 12).

### Design foundations (spec 5, 6)
- Typeface: Schibsted Grotesk via `next/font` replaces the Google Fonts `<link>` for Jost and Audiowide (5.2, 5.3). One family, self-hosted by Next.
- `<html lang>` changed from `en` to `en-KE` (5.3).
- Colour tokens from 6.1 added as Tailwind theme colours with a `cb-` prefix (`bg-cb-bg`, `text-cb-muted`, …). The prefix avoids a clash with the shadcn tokens (`--color-border`, `--color-accent`) the admin dashboard relies on.
- Type scale (5.4) as `.cb-display`, `.cb-h2`, `.cb-h3`, `.cb-h4`, `.cb-lead`, `.cb-small`, `.cb-brandline`. The hero H1 tops out at 62px (3.875rem) rather than 4rem, to match the approved mockup.
- Content width is 1280px with side padding scaling to 80px, rather than 1200px, so the hero lines up with the mockup at 1440 wide.
- Added `Halo`, `Arc` and `HeroMesh` (`src/components/site/decor.tsx`), using radial gradients rather than blur filters (6.4, 6.5).
- The mesh hole and Halo #1 follow the hero graphic's measured position (CSS variables set by `HeroBits`), so the hole lines up at every width instead of relying on fixed percentages.
- Buttons 6px radius with solid brand fill, no glow; body links underlined; 2px focus ring on every control (6.1, 10).
- Global `prefers-reduced-motion: reduce` handling for the public site (7.5).
