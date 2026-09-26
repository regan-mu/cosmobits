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

### Homepage rebuild and critical fixes (spec 3, 7, 8)
- New block order per 7.3: hero, (partners, flagged), what we do, AI in practice, how a project runs, (data handling, flagged), (selected work, hidden until published), about, CTA band, contact.
- Public pages moved into an `app/(site)` route group with their own layout (skip link, header, footer), so `/admin` is unaffected.
- Hero rebuilt to match `hero-mockup.html`: brandline (tagline verbatim) above a concrete H1 (option A), lead, one primary CTA plus "See our services". Checked at 1440×820 against the mockup.
- `HeroBits` inlines the hero graphic; its load animation runs once, never on client-side navigation back, and not at all under reduced motion.
- `ServicesStack` inlines the "What we do" graphic with its `<title>`; its AI layer is the only glass element on the site.
- Removed: all 16 count-up stats and `CounterAnimation` (3.1), placeholder testimonials (3.3), "See Our Work", "Learn More" ×4, the footer "Website" link, `href="#"` links, platform-homepage social links (3.4), the "24/7 support" claim (3.6), the newsletter form (3.7), Mission/Vision/Values/Why Choose Us cards (S3), section eyebrows and header icon badges (7.2), the scroll hint (S8), every scroll-triggered entrance, hover lift and glow (7.5).
- Removed `FloatingContact`, the floating chat-style form (owner decision; the spec rules out floating chat bubbles).
- `src/lib/contact.ts` is the single source for phone, email, address, hours and socials. Every `tel:` link is `+254119699617` (was `+254700000000`) (3.2).
- `src/lib/flags.ts` holds content flags; unconfirmed owner content is `null` and hidden, never a placeholder in code.
- One primary CTA label, "Book a consultation" (8.3). It points to `/#contact` until a booking URL is set in `CONTACT.bookingUrl`.
- "Software Outsourcing" renamed to "Software licensing" in copy and the enquiry form (4.2 C9).
- Copy rewritten from the spec drafts, with unconfirmed facts left out (languages, durations, brands, founding year, etc.).
- Contact form: visible labels, optional phone with a +254 hint, inline field errors that say how to fix them, inline success and error states instead of toasts, a consent note linking to `/privacy`, "Send message" button, and a honeypot field. `/api/contact` now answers bot submissions (honeypot filled) with success and saves nothing.
- Error text uses the brand colour plus an icon and a message, because the palette has no red; it doesn't rely on colour alone.
- Footer: logo, brandline, Services/Company/Contact columns, Privacy and Terms links, social icons only when real URLs exist, "Made in Nairobi". Service links go to each service's block on the homepage until service pages exist.
- Header: transparent over the hero, solid after 16px of scroll; mobile full-height sheet with focus trap, Escape to close and the phone number at the bottom.
- Logo served from `public/cosmobits-technologies-logo-web.png`, the cropped 900×284 copy used in the mockup, at its display size (the original PNG is unchanged, and was being requested at `w=3840`).
- Removed old landing CSS (gradient text, glass, glows, stars, marquee, pill buttons, forced uppercase headings) and the old brand variables.
- Removed the landing-page tests and `debug-cta.mjs`, which only tested the deleted components.
