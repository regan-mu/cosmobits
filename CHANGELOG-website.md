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

### Metadata, share image, legal stubs (spec 3.5, 9.1, 9.3, 9.5)
- Title is now "AI, Software & Cloud Solutions in Nairobi, Kenya | CosmoBits" and the description is the 144-character version from 9.1; `og:locale` is `en_KE`.
- Removed `meta keywords` and the unconfirmed `twitter:creator` (@cosmobitstech).
- `public/og-image.png` (1200×630, was a 404): the hero-bits artwork, logo, tagline and "AI, software, cloud and IT supply, Nairobi" on `#150F33`, rendered from the hero SVG in Schibsted Grotesk.
- Removed icon references that 404'd (`favicon-16x16.png`, `apple-touch-icon.png`, `android-chrome-*.png` in the manifest); the manifest now points at `favicon.ico` and uses the brand background as its theme colour.
- Organization + ProfessionalService JSON-LD on the homepage, with only confirmed values: no `sameAs` until real profiles exist, and `areaServed` is Kenya only.
- `/privacy` and `/terms` drafted in plain language from what the site actually does (form fields, email delivery, reCAPTCHA, no analytics cookies). Marked "under legal review" and `noindex` until reviewed.
- Fix: restored the old brand colours (`primary-dark`, `accent`, `ai-glow`, …) and `--font-display` as admin-only tokens. The admin dashboard still uses them, and the homepage commit had removed them.

### Cloud infrastructure positioning (owner revision)
- Hero lead: "…designs and manages the cloud infrastructure it runs on…" replaces "sets up and maintains your hosting".
- "Cloud & hosting" service renamed "Cloud infrastructure": architecture and design, migration, infrastructure as code with monitoring and backups, cost optimisation and right-sizing. Same rename in the enquiry form, footer, services graphic label and "What we do" intro.
- About and the data-residency line now say "cloud infrastructure" instead of "hosting".
- Spec updated to match (revision note at the top): Block 1, Block 3 table, an infrastructure wording rule with a "what the cloud offer covers" list, 7.7 labels, `/services/cloud` in 9.4, cloud keywords in 9.6, owner item 7, Appendix A.
- Service block bullets use the check-circle icon from the previous site instead of dash markers (owner request), in the neutral muted colour per 7.2.
- Section headers (H2 + intro) are centred, with the intro capped at 42rem, as on the previous site (owner preference; spec 5.4 and 7.2 updated). Closing CTA lines in What we do and AI in practice are centred to match, and About now has a centred header above its prose instead of a heading beside it.
- "What we do" graphic: new tall variant (`public/services-stack-tall.svg`, `ServicesStackTall`) fills the full height of the service cards from 1024px up; the short graphic stays above the cards on smaller screens (owner request; spec 7.7 updated).
- AI in practice: capabilities are back in the previous site's card grid (3/2/1 columns), restyled to match the service cards: flat bordered cards on the surface colour, neutral line icons, and three checked points each. The points were rewritten to avoid the old unconfirmed claims (24/7, multi-language, "superhuman accuracy"). Owner request; spec Block 4 and 7.2 updated.
- Block 5 renamed "How We Run Our Projects" and rebuilt on the owner's reference pattern: numbered circle badges in the brand colour, step cards four across on wide screens, a surface-colour band behind the header and the top of the cards, and one highlighted card in the logo violet (the first by default, then whichever card the pointer is over). Kept to the four real steps.
- Section titles now use title case ("What We Do", "AI in Practice", "How We Handle Your Data", "Selected Work", "Tell Us What You're Working On."), as do the Privacy Policy and Terms of Service page titles; card titles, buttons and navigation stay in sentence case. Owner preference; spec 5.4, 6.1, 6.5, 7.3 and 8.4 updated.
