# UI rewrite tracker

Progress against [ui-rewrite.md](ui-rewrite.md). Tick an item only when its acceptance criteria in the spec pass.
`[x]` done · `[ ]` not done · `[~]` done in part (the note says what's missing).

**Round 1 scope (agreed 26 Sep 2026):** homepage + design foundations (spec PR 1–3). PR 0, PR 4 and PR 5 are for a later round.
**Branch:** `ui-rewrite`, one commit per phase. Every change is also logged in [CHANGELOG-website.md](../CHANGELOG-website.md).

**How owner content works:** unconfirmed values are `null` in `src/lib/contact.ts` / `src/content/*.ts`, and anything that depends on them is hidden with a flag in `src/lib/flags.ts`. No `{{OWNER:` placeholder is written into code; `npm run check:content` (run by `prebuild`) fails the build if one appears. The "Owner content" list below records what's needed and where it goes.

---

## PR 0: Inventory (spec 2)

- [ ] `AUDIT-INVENTORY.md` with typefaces, colours, gradients/halos, section-header icons, motion. *Skipped in round 1 because the old components were replaced outright. The before-state is in git at commit `a578e7f`.*
- [ ] PageSpeed Insights baseline (mobile + desktop) of the live site, recorded before the rebuild ships.

## PR 1: Critical fixes (spec 3)

- [ ] 3.1 Stats: hero trio and AI quartet removed; About stats band behind `SHOW_STATS`; server-rendered numbers, no count-up, `tabular-nums`
- [ ] 3.2 `src/lib/contact.ts` single source; every `tel:` is `+254119699617`; no `254700000000`
- [ ] 3.2 WhatsApp link in Contact and footer *(needs owner number)*
- [ ] 3.3 Placeholder testimonials removed from repo and site
- [ ] 3.4 Social icons use real URLs only (hidden until owner supplies them)
- [ ] 3.4 Privacy and Terms point to real pages
- [ ] 3.4 "See Our Work" removed; "Learn More" buttons removed; footer "Website" link removed; footer "AI Consultation" fixed
- [ ] 3.4 linkinator crawl reports 0 broken links; no `href="#"` *(run against a deploy)*
- [ ] 3.5 OG image (1200×630) from the hero-bits artwork returns 200
- [ ] 3.5 Validated in LinkedIn Post Inspector / opengraph.xyz *(after deploy)*
- [ ] 3.6 "24/7 support" claim removed everywhere
- [ ] 3.7 Newsletter form removed
- [ ] `/privacy` and `/terms` stubs, `noindex`, awaiting legal review
- [ ] Placeholder guard in `prebuild`

## PR 2: Design foundations (spec 5, 6, 7.2, 7.5)

- [ ] 5 Schibsted Grotesk via `next/font`, one family, other font imports removed
- [ ] 5.3 `lang="en-KE"`, `og:locale` `en_KE`
- [ ] 5.4 Type scale and rules (sentence case, 65ch/40ch measures, weights 400/600/700, no all caps, underlined body links)
- [ ] 6.1 Colour tokens; off-palette colours removed from the public site
- [ ] 6.1 No gradient text or gradient buttons
- [ ] 6.3/6.4 `Halo` component; exactly 2 on the homepage
- [ ] 6.4 No `blur-3xl` / `blur-2xl` / glow shadows on the public site
- [ ] 6.5 `HeroMesh` (hero only) with the hole around the graphic
- [ ] 6.5 `Arc`: exactly 2 on the homepage
- [ ] 6.5 Mesh hole checked against the rendered graphic at 1280 / 1440 / 1920
- [ ] 7.2 Section-header icons and eyebrows removed
- [ ] 7.5 Scroll-triggered entrances, hover lifts, pulses removed; reduced motion honoured
- [ ] 7.3 Radius hierarchy (6px controls, 10–12px cards) and no default shadows
- [ ] Remove unused CSS (old gradients, glass, stars, marquee, btn styles)

## PR 3: Homepage restructure, graphics, copy (spec 7.3, 7.4, 7.6, 7.7, 8)

- [ ] Block 1 Hero matches `hero-mockup.html` at 1440×820
- [ ] 7.6 `HeroBits` inline SVG, load animation plays once, skipped under reduced motion, not replayed on client navigation
- [ ] 7.6 Responsive: 38vw at 768–1023, below CTAs at <768 with `.cb-far` hidden, nothing overlaps at 360px
- [ ] Block 2 Partners *(behind `SHOW_PARTNERS`: needs label and logos with permission)*
- [ ] Block 3 What we do + `ServicesStack` graphic, 4 service blocks
- [ ] Block 3 "About {service}" links *(behind `SHOW_SERVICE_PAGES` until PR 4)*
- [ ] Block 4 AI in practice, compact 2-col list, one CTA
- [ ] Block 5 How a project runs, 4 numbered steps
- [ ] Block 5 "Typically …" duration lines *(behind `SHOW_STEP_DURATIONS`)*
- [ ] Block 5 "You own the code we write for you." *(behind `SHOW_CODE_OWNERSHIP`)*
- [ ] Block 6 How we handle your data *(built; behind `SHOW_DATA_HANDLING` until every item is owner-confirmed)*
- [ ] Block 7 Selected work: template + data model in `src/content/work.ts` *(section hidden until a case study is published)*
- [ ] Block 8 About, short prose
- [ ] Block 8 Photo *(behind `SHOW_ABOUT_PHOTO`)* and stats band *(behind `SHOW_STATS`)*
- [ ] Block 9 CTA band, Halo #2 + mirrored arc
- [ ] Block 9 Company profile PDF line *(behind `SHOW_COMPANY_PROFILE`)*
- [ ] Block 10 Contact: details + form, form first on mobile, Quick Connect removed
- [ ] Block 10 Form: visible labels, optional phone with +254 hint, honeypot, inline errors and success, consent note, "Send message"
- [ ] Block 11 Footer simplified (brandline, Services/Company/Contact columns, legal row, "Made in Nairobi")
- [ ] 7.4 Nav: sticky, transparent → solid after 16px, sentence-case items, "Book a consultation" button, no "Home"
- [ ] 7.4 Mobile menu: full-height sheet, 48px targets, phone at the bottom, focus trapped, Escape closes
- [ ] 7.4 Services dropdown *(needs service pages, PR 4)*
- [ ] 8.3 One primary CTA label, "Book a consultation" *(points to `#contact` until the booking URL exists)*
- [ ] 8.2 Banned phrases: none in site copy (`npm run check:content`)
- [ ] 4.2 C9 "Software Outsourcing" renamed to "Software licensing"
- [ ] FloatingContact widget removed (owner decision)
- [ ] Metadata: title, description, no `meta keywords`, no unconfirmed `twitter:creator`
- [ ] Skip-to-content link

## PR 4: Pages and SEO (spec 9), later round

- [ ] `/services/ai`, `/services/software-development`, `/services/cloud`, `/services/it-equipment`, `/services/software-licensing` (template in 9.4, 500–900 words each)
- [ ] `/about` (Mission, Vision, Values from 8.4)
- [ ] `/security`
- [ ] `/contact` (with map)
- [ ] `/work` and `/work/[slug]` templates (hidden until content)
- [ ] Per-route metadata, canonical, `Service` + `BreadcrumbList` schema
- [ ] `robots.ts`, `sitemap.ts`
- [ ] Organization + ProfessionalService JSON-LD on the homepage
- [ ] 404 page with the "missing bit" grid (7.6)
- [ ] Per-service OG image variants
- [ ] Redirects for any old anchors linked externally
- [ ] Turn on `SHOW_SERVICE_PAGES` (service block links + nav dropdown + footer links to pages)

## PR 5: Quality pass (spec 10), later round

- [ ] axe DevTools: zero serious/critical issues
- [ ] Full keyboard pass
- [ ] PSI re-run vs the PR 0 baseline (LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile)
- [ ] Homepage JS < 170KB gzipped
- [ ] Contrast check of muted text over the halos

## Final acceptance checklist (spec 12)

- [ ] No stat renders as 0 in view-source; any stats shown are owner-supplied
- [ ] All `tel:` links use +254119699617
- [ ] No placeholder testimonials anywhere in the repo
- [ ] Zero broken links (linkinator) and no `href="#"`
- [ ] OG image returns 200 and previews correctly on LinkedIn and WhatsApp
- [ ] Tagline verbatim in the hero brandline, the footer and the schema `slogan`
- [ ] Only the block-mark logo appears; the logo file is unaltered
- [ ] Every colour is a 6.1 token; all text pairs meet the contrast table
- [ ] One font family loads; type scale matches 5.4
- [ ] No section-header icons or eyebrow labels
- [ ] Exactly two halos on the homepage, one per service page; no other glows
- [ ] Glassmorphism only in the services-stack AI layer
- [ ] Mesh only in heroes, never visible through the hero graphic; exactly two arcs on the homepage; no circles outside the 6.5 list
- [ ] Homepage hero matches `hero-mockup.html` at 1440×820
- [ ] Hero-bits animates once, skipped under reduced motion, hero text visible at first paint
- [ ] No scroll-triggered section animations
- [ ] One primary CTA label site-wide, pointing at a working booking page
- [ ] Data-handling block contains only owner-confirmed statements, no badges or seals
- [ ] No copy says CosmoBits owns servers or a data centre
- [ ] None of the 8.2 phrases in rendered copy
- [ ] Five service pages, `/about`, `/security`, `/contact` live with unique title, description, canonical, schema
- [ ] `robots.txt` and `sitemap.xml` live; schema validates
- [ ] Mobile PSI targets met, or a documented reason
- [ ] axe zero serious/critical; keyboard pass done
- [ ] `npm run check:content` passes on the production build

---

## Owner content (spec 11)

Each item says where the value goes once you have it. Filling a value in and flipping its flag is usually all that's needed.

- [ ] 1. Real LinkedIn / X / Instagram / Facebook URLs, or drop some → `CONTACT.social` in `src/lib/contact.ts` (icons show automatically when set)
- [ ] 2. WhatsApp Business number (E.164) → `CONTACT.whatsappE164`
- [ ] 3. Is 24/7 support offered, and to whom? *(claim removed for now)*
- [ ] 4. Is there a real newsletter list? *(form removed for now)*
- [x] 5. Hero H1: option A (as in the approved mockup)
- [ ] 6. Partners: label ("Partners" / "Clients" / "Some of the teams we work with"), logo files and permission → `PARTNERS` in `src/content/site.ts`, then `SHOW_PARTNERS`
- [ ] 7. Hosting providers and regions; any partner status; hardware brands supplied → service copy in `src/content/site.ts`
- [ ] 8. AI languages supported (English / Swahili?) → chatbot line in `AI_CAPABILITIES`
- [ ] 9. Step durations, pricing model, demo cadence, support terms/SLA, code ownership → `PROCESS_STEPS`, then `SHOW_STEP_DURATIONS` / `SHOW_CODE_OWNERSHIP`
- [ ] 10. Confirm each data-handling commitment (DPAs, residency, access, training use, encryption/logging) → `DATA_COMMITMENTS`, then `SHOW_DATA_HANDLING`
- [ ] 11. First case study → `src/content/work.ts` (section shows when one is `published: true`)
- [ ] 12. Founding year, client types, team/founder sentence → `ABOUT` in `src/content/site.ts`
- [ ] 13. Photos per the brief (7.8) → `SHOW_ABOUT_PHOTO`
- [ ] 14. Real stats: years, projects, clients, countries → `STATS`, then `SHOW_STATS`
- [ ] 15. Reply time: "24 hours" (current) or "one working day"? → `CONTACT.replyTime`
- [ ] 16. Company profile PDF (registration, KRA PIN, tax compliance, directors, references) → `public/cosmobits-company-profile.pdf`, then `SHOW_COMPANY_PROFILE`
- [ ] 17. Booking link (Google Calendar appointment schedule or Calendly) → `CONTACT.bookingUrl`
- [ ] 18. British or US spelling *(built with British: "licences", "enquiry")*
- [ ] 19. Approve rewritten Mission and Vision *(for `/about`, PR 4)*
- [ ] 20. Legal review of `/privacy` and `/terms`; ODPC registration status
- [ ] 21. FAQ answers per service *(PR 4)*
- [ ] 22. Uni Sans licence decision. The demo font files in `public/FONTS/` are publicly downloadable from the site; consider removing them.
- [ ] 23. Confirm the block mark is the current logo; replace the old mark in `favicon.ico` and the missing `android-chrome-*.png` icons referenced by `site.webmanifest`
