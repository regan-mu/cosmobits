# CosmoBits Technologies: Website Audit & Improvement Spec

**Site:** https://www.cosmobits.tech (Next.js, single page)
**Audit date:** 26 September 2026
**Audience:** the AI coding agent implementing changes, plus the CosmoBits team reviewing them
**Scope:** homepage content, structure, UI/UX, visual system, copy, SEO/technical, accessibility
**Brand inputs:** `COSMOBITS_LOGO_FINAL.png` (block mark, the current logo) and the CosmoBits Technologies Mini Guidelines (Oct 2025)
**Assets delivered with this spec:**
- `assets/hero-bits.svg`: homepage hero graphic (7.6).
- `assets/services-stack.svg`: "What we do" graphic (7.7).
- `reference/hero-mockup.html`: the owner-approved hero at 1440×820, including the mesh, arc and halo. Open it in a browser and match it. It's a visual reference only; don't copy its markup into the app.
**Competitor reference:** Glitex Solutions, reviewed 26 Sep 2026 (Appendix A)
**Revision, 26 Sep 2026 (owner):** the cloud offer is positioned as cloud infrastructure (design, migration, infrastructure as code, operations, cost optimisation) rather than hosting and upkeep. Blocks 1, 3, 5, 6, 8, sections 7.7, 9.4, 9.6, 11 and Appendix A are updated to match.
**Revision, 26 Sep 2026 (owner):** About becomes two columns, prose beside "The Principles That Guide Us" (Block 8, S3, 7.2).
**Revision, 26 Sep 2026 (owner):** section titles use title case (5.4), and Block 5 is renamed "How We Run Our Projects" with numbered step cards on a colour band and a highlighted card (7.3, 6.1, 6.5).
**Revision, 26 Sep 2026 (owner):** AI capabilities return to the previous site's card grid, restyled (Block 4, 7.2).
**Revision, 26 Sep 2026 (owner):** a tall variant of the services graphic fills the height of the service cards on desktop (7.7).
**Revision, 26 Sep 2026 (owner):** section headers are centred with their intro, as on the previous site (5.4, 7.2).

---

## How to use this document (read first, agent)

This file is both an audit and a build spec. Work through it in the order given in **Section 12**. Each task has acceptance criteria; a task isn't done until they pass.

Findings carry one of two labels:

- **[VERIFIED]** came from fetching the live site on the audit date.
- **[INVENTORY]** couldn't be seen from outside the codebase (fonts, colours, gradients, icons, motion). You confirm these in Phase 0 (Section 2) before changing anything.

### Ground rules

1. **Locked brand elements. Do not change:**
   - The logo files and their proportions. The current logo is the block mark in `COSMOBITS_LOGO_FINAL.png`; the monitor-and-circuits mark in the Oct 2025 guidelines is superseded (Appendix B).
   - The brand palette: `#150F33` Blue Violet and `#C496C4` Light Purple (primaries per the guidelines), plus the logo's `#453A7D` and `#A879B1`. You may derive tints and set *where* and *how much* each is used (6.1), but you may not introduce new hues.
   - The company name, "CosmoBits Technologies".
   - The tagline, verbatim, including punctuation: **Intelligent Solutions, Lasting Impact.**
2. **Unlocked:** typefaces, layout, section structure, copy (apart from the tagline), iconography, gradients, motion.
3. **Never invent facts.** No made-up statistics, client names, quotes, years, certifications, partner statuses or response times. Where content is missing, insert a placeholder in this exact format: `{{OWNER: description of what's needed}}`.
4. **No unresolved placeholders in production.** Add a build step that fails if `{{OWNER:` appears in any rendered route (see Section 12). Sections that depend on missing content get hidden behind a flag instead of shipping empty.
5. **Record decisions.** Keep a `CHANGELOG-website.md` with one line per change, so the team can review what moved and why.

---

## 1. Executive summary

The site has a sound skeleton: a clear service offering, a real Nairobi address, a working contact form and a sensible Next.js setup. What undermines it is a layer of template defaults and unfinished details that visitors read as "generated and never checked".

Four problems matter more than any styling change:

1. **Every statistic renders as "0"** in the server HTML (16 counters). Crawlers, link previews and many real visitors see "0 Happy Clients".
2. **The "Call Now" buttons dial a placeholder number** (`tel:+254700000000`) while the page displays +254 119 699 617.
3. **The testimonials are placeholders** attributed to named people at named companies. They have to go, because a prospect who checks them will stop trusting everything else on the page.
4. **Several links lead nowhere:** social icons point at platform homepages, Privacy and Terms point at `#`, "See Our Work" has no work behind it, the four "Learn More" buttons have no pages, and the share image returns 404.

After those, the biggest improvements to professionalism come from:

- cutting repeated sections (Mission, Vision, five Values and six "Why Choose Us" cards all make the same point),
- one CTA vocabulary instead of seven,
- a deliberate typeface,
- limiting halo gradients to two intentional places,
- removing the icon badges from section headers,
- rewriting copy that relies on stock phrases.

SEO needs its own pages per service, fixed metadata and structured data. At the moment a search for "CosmoBits" surfaces unrelated organisations with similar names.

This revision also includes:
- a hero graphic built from the logo's own shapes (7.6), which replaces the current generic hero image;
- a services graphic (7.7);
- a plain-language data-handling section and procurement-friendly details adapted from a competitor review (Block 6, Appendix A);
- a photography brief (7.8).

**Overall assessment:** structurally recoverable with no rebrand needed. Critical trust issues come first, then the visual cleanup.

---

## 2. Phase 0: Inventory the codebase (agent task, do before any edits)

Content fetching can't see the visual layer, so start by producing `AUDIT-INVENTORY.md` in the repo root with the tables below, filled from the code. Run these searches (ripgrep; adjust paths as needed):

```bash
# Typefaces
rg -n "next/font|@font-face|fontFamily|font-family|--font-" app src styles tailwind.config.* 2>/dev/null

# Colours and tokens
rg -n "colors\s*:|--color-|--primary|--accent|#[0-9a-fA-F]{6}\b|hsl\(|oklch\(" tailwind.config.* app/globals.css src 2>/dev/null

# Halos, glows, gradients
rg -n "radial-gradient|linear-gradient|bg-gradient|from-\S+ (via-\S+ )?to-|blur-(xl|2xl|3xl)|backdrop-blur|shadow-\[0_0|drop-shadow|glow" app src components 2>/dev/null

# Section-header icons and icon libraries
rg -n "lucide-react|react-icons|@heroicons|<svg" app src components 2>/dev/null

# Motion
rg -n "framer-motion|motion\.|whileInView|initial=\{|animate=\{|AnimatePresence|IntersectionObserver|aos|gsap" app src components 2>/dev/null

# Counters (the "0" bug)
rg -n "CountUp|countup|useState\(0\)|animateValue|useInView" app src components 2>/dev/null

# Broken or placeholder links
rg -n "tel:|mailto:|linkedin\.com|twitter\.com|x\.com|instagram\.com|facebook\.com|href=\"#\"|href='#'" app src components 2>/dev/null
```

### Inventory tables to fill

**Typefaces**

| Role | Family | Weights loaded | Loaded via | Used where |
|---|---|---|---|---|
| Headings | | | | |
| Body | | | | |
| Other (mono, display, icon font) | | | | |

Also record: total font files and KB downloaded on first load (DevTools → Network → Font).

**Colours**

The target palette is fixed (6.1). This table records where colours are used today and flags every off-palette value for removal.

| Hex / value | Current name or class | Where it's used | Proposed token (Section 6) |
|---|---|---|---|

**Gradients and halos:** list every instance with file, line, element and a short description (e.g. "blurred purple circle behind AI cards"). Count them. Section 6 reduces this to two.

**Section-header icons:** list every icon rendered next to or above a section eyebrow or H2.

**Motion:** list every scroll-triggered or looping animation.

**Performance baseline:** run PageSpeed Insights (https://pagespeed.web.dev) for mobile and desktop on the homepage. Record LCP, INP, CLS, the performance score, and the top five opportunities. Re-run after Section 12 is complete and record the comparison.

**Acceptance:** `AUDIT-INVENTORY.md` exists and is committed with all tables filled in, and no code has been changed yet.

---

## 3. Critical fixes (ship first, as one PR)

These are about trust and function, not taste. Ship them before the redesign, even if the redesign is weeks away.

### 3.1 Statistics render as "0" [VERIFIED]

**Found:** 16 counters render `0` in the served HTML.

| Location | Counters |
|---|---|
| Hero | Efficiency Gains, Client Satisfaction, Technical Support |
| About | Years of Excellence, Projects Completed, Happy Clients, Countries Served |
| AI section | Average ROI, Cost Reduction, Faster Processing, Accuracy Rate |
| Contact CTA area | none, but check for others in the inventory |

The count-up animation starts at `0` and only reaches the real value once client-side JavaScript runs and the element scrolls into view. Search engines, social link previews, visitors on slow connections and visitors who prefer reduced motion all see zeros.

**Fix:**
- Delete the hero trio and the AI-section quartet. They're vague ("Technical Support" isn't a quantity), and generic percentages like "Average ROI" can't be backed up without published case studies.
- Keep at most **one** stats band, in About. It may only show numbers the owner supplies: `{{OWNER: years operating, projects delivered, active clients, countries served}}`. Put the band behind a flag (`SHOW_STATS=false`) until real numbers exist.
- Render the final number in the server HTML. If a count-up is kept at all, it must animate *from* the rendered value's width without changing the SSR text, and must not run when `prefers-reduced-motion: reduce` is set. The simplest correct option is no count-up at all, which is the recommendation.
- Use `font-variant-numeric: tabular-nums` on stat figures.

**Acceptance:** `curl -s https://www.cosmobits.tech | grep -c ">0<"` returns no stat zeros. View-source shows the real numbers, or no stats band.

### 3.2 Phone link dials a placeholder [VERIFIED]

**Found:** The page displays `+254 119 699 617`, but both "Call Now" and the footer phone link use `tel:+254700000000`.

**Fix:** Keep a single constant, e.g. `lib/contact.ts`, holding the phone number (display and E.164 formats), email, address, hours and social URLs. Every component reads from it.

```ts
export const CONTACT = {
  phoneDisplay: "+254 119 699 617",
  phoneE164: "+254119699617",
  email: "hello@cosmobits.tech",
  whatsapp: "{{OWNER: WhatsApp Business number in E.164, or remove}}",
  address: { line1: "APA Arcade, Level 1", area: "Hurlingham", city: "Nairobi", country: "Kenya" },
  hours: [
    { days: "Mon–Fri", time: "8:00–18:00" },
    { days: "Sat", time: "9:00–13:00" },
  ],
  social: {
    linkedin: "{{OWNER: full LinkedIn company URL}}",
    x: "{{OWNER: full X/Twitter URL, confirm @cosmobitstech exists}}",
    instagram: "{{OWNER: full URL or remove}}",
    facebook: "{{OWNER: full URL or remove}}",
  },
} as const;
```

**Acceptance:** every `tel:` link resolves to `+254119699617`, and `rg "254700000000"` returns nothing.

**Local note:** WhatsApp is a primary business channel in Kenya. If the company runs WhatsApp Business, add a `https://wa.me/<number>` contact option next to phone and email. Don't use a floating chat bubble; a plain link in Contact and the footer is enough.

### 3.3 Placeholder testimonials [VERIFIED; owner confirmed placeholders]

**Found:** "What Our Clients Say" shows Sarah Kamau (TechStart Kenya), Michael Oduya (FinanceHub Africa), Grace Mwangi (LogiTech Solutions) and David Otieno (BuildRight Construction). Only one card has a quote, and it cites a round "60%". "LogiTech Solutions" is also close enough to Logitech to confuse readers.

**Fix:** Remove the whole section and component data now. Replace it later with the "Selected work" section (Section 7.3, Block 7) once real material exists. Real client quotes can be added then, with written permission, the person's real name and role, and ideally a photo or company logo.

**Acceptance:** none of those four names or company names appear anywhere in the repo or the rendered site.

### 3.4 Dead and placeholder links [VERIFIED]

| Link | Current target | Fix |
|---|---|---|
| Footer social icons (4) | `https://linkedin.com`, `https://twitter.com`, `https://instagram.com`, `https://facebook.com` | Use the real profile URLs from `CONTACT.social`. Remove any icon without a real profile. Use proper labels (`aria-label="CosmoBits on LinkedIn"`), not the raw URL as link text. |
| Privacy Policy | `#` | Create `/privacy` (Section 9.5). |
| Terms of Service | `#` | Create `/terms`. |
| "See Our Work" (hero) | no work section exists | Remove until Selected Work exists; then link to it. |
| "Learn More" ×4 (services) | no destination | Link to the new service pages (Section 9.4). |
| Footer "Website" quick-connect link | links to the page you're already on | Remove. |
| Footer "AI Consultation" | `#ai` | Point to `/services/ai` once it exists. |

**Acceptance:** a crawl (e.g. `npx linkinator https://www.cosmobits.tech --recurse`) reports 0 broken links, and there are no `href="#"`.

### 3.5 Social share image returns 404 [VERIFIED]

**Found:** The `og:image` and `twitter:image` meta tags point at `https://www.cosmobits.tech/og-image.png`, which returns 404. Every share on LinkedIn, WhatsApp, X or Slack shows no image.

**Fix:** Add `app/opengraph-image.tsx` (Next.js `ImageResponse`, 1200×630) or a static `public/og-image.png`. Build it from the hero-bits artwork (7.6) on `#150F33`, with the logo, the tagline and one line such as "AI, software, cloud and IT supply, Nairobi" in Schibsted Grotesk. No stock imagery. Add a per-service variant once service pages exist.

**Acceptance:** the URL returns 200 with `image/png`. LinkedIn Post Inspector and https://www.opengraph.xyz show the image.

### 3.6 Contradictory support claim [VERIFIED]

**Found:** "24/7 Support" is claimed in the hero stats, in "Why Choose Us" and in the final CTA strip. The contact section lists Mon–Fri 8–6 and Sat 9–1.

**Fix:** Ask `{{OWNER: is 24/7 support offered, and to whom? e.g. managed-cloud clients under contract}}`. If it applies only under contract, write exactly that: "24/7 monitoring for managed-service clients". Otherwise remove the claim everywhere.

### 3.7 Newsletter form [VERIFIED present]

**Found:** The footer has "Stay in the Loop … Subscribe".

**Fix:** If there's no mailing list and no plan to send one, remove it. An unanswered signup costs more than no signup. If there is a list, wire it to the provider, add a success state, and add a one-line privacy note that links to `/privacy`.

---

## 4. "Looks AI-generated": audit of tells

Visitors in 2026 recognise generated sites quickly. The signals are mostly patterns, not individual words: the same section shapes every template produces, copy that could describe any company, and decoration spread evenly across the page. Each row below says where the pattern shows up, why it reads as generated, and the fix.

### 4.1 Structure and layout

| # | Pattern | Where [status] | Why it reads as generated | Fix |
|---|---|---|---|---|
| S1 | Eyebrow label above every H2 | "Who We Are", "Our Values", "Why Choose Us", "Artificial Intelligence Solutions", "Our Services", "Client Success Stories", "Get In Touch" [VERIFIED] | A tracked label over every heading is the most common template habit. Here some labels just repeat the heading ("Get In Touch" above "Get in Touch"). | Remove all section eyebrows. The H2 does the job alone. |
| S2 | Icon badge beside each section header | Every section [owner-reported; INVENTORY to locate] | Adds decoration without meaning, and makes each section open the same way. | Remove all section-header icons (owner request). See 7.2. |
| S3 | Mission + Vision + five Values + six "Why Choose Us" cards | About → Values → Why Choose Us [VERIFIED] | Four blocks all say "we're innovative, excellent and client-focused". Stacking them is filler. | Keep a short About paragraph on the homepage. Move Mission/Vision to `/about` (tender and procurement documents often ask for them). Cut Values to one line or drop it. *(Owner, 26 Sep 2026: Values return as "The Principles That Guide Us" beside the About text, rewritten plainly; see Block 8.)* Replace Why Choose Us with "How We Run Our Projects" (7.3). |
| S4 | Grids of identical icon cards | Values (5), Why Choose Us (6), AI solutions (6), Services (4) [VERIFIED counts; INVENTORY for styling] | Twenty-one cards with the same shape, radius and shadow is the stock SaaS kit, and a 5-card grid always leaves an orphan. | Vary the form by content: services as four substantial blocks, AI capabilities as a compact two-column list, process as a numbered sequence (it genuinely is one), About as prose with a photo. |
| S5 | Big-number stat rows | Hero, About, AI section [VERIFIED] | "Big number + small label" is the default hero filler, and here the numbers are 0 (3.1). | One stats band, real numbers only (3.1). |
| S6 | Scroll-triggered fade/slide-up on every section | [INVENTORY] | Uniform entrance animation on every block is a generated-site signature and delays content. | Remove section entrance animations. Allow a single hero load sequence at most, disabled under reduced motion. Keep motion that responds to user action (menu open, accordion, form feedback). |
| S7 | Halo/glow gradients everywhere | [owner-reported; INVENTORY to count] | Evenly scattered glows flatten hierarchy: when everything glows, nothing is emphasised. | Two halos on the homepage, each with a job (Section 6.3). |
| S8 | "Discover AI Solutions" scroll hint under hero | [VERIFIED] | Template chrome. | Remove. |
| S9 | Middle-dot meta strings | "Free consultation • No commitment • Expert guidance"; "Free Consultation / 24/7 Support / Custom Solutions" strip [VERIFIED] | A generic reassurance string with separators. | One plain sentence under the CTA: "The first consultation is free." |

### 4.2 Copy

| # | Pattern | Examples on the site [VERIFIED] | Fix |
|---|---|---|---|
| C1 | Stock superlatives | "cutting-edge" (×5+), "leading technology solutions provider", "premier", "world-class", "highest standards", "exceptional results" | Delete. Replace with something checkable: a tool, a sector, a location or a process step. |
| C2 | Empty promises | "on time, every time", "superhuman accuracy", "Your success is our success", "exceeds expectations" | Delete. If there's a real commitment, state it precisely ("We reply to every enquiry within one working day"), and only if true. |
| C3 | Abstract nouns doing all the work | "digital transformation", "sustainable growth", "digital potential", "bridges the digital divide", "enduring value" | Name what actually happens: "move your servers to AWS", "a WhatsApp bot that answers order questions", "a forecast of next month's stock needs". |
| C4 | Title Case headings | "Driving Digital Transformation Across Africa", "The Principles That Guide Us" | *Superseded by owner preference (26 Sep 2026):* section titles use title case (5.4); card titles, buttons and navigation use sentence case. |
| C5 | Headline pattern "Adjective Noun, Adjective Noun." | Hero H1 | This is the locked tagline and stays verbatim. It moves from H1 to a brand line, and a concrete H1 takes the headline role (7.3, block 1). |
| C6 | Seven CTA labels for one action | Get Started · Get in Touch · Start Your Project · Book a Free Consultation · Schedule a Consultation · Schedule a Call · Send Message | One primary label everywhere (8.3). |
| C7 | Placeholder-sounding testimonials | See 3.3 | Removed. |
| C8 | Awkward sign-off | "Crafted within Nairobi" | "Made in Nairobi", or cut it. |
| C9 | Service naming mismatch | "Software Outsourcing" describes licensing and vendor management, not outsourced development | Rename to **Software Licensing** or **Software Licensing & Procurement**. In Kenya, "outsourcing" signals outsourced development and will attract the wrong enquiries. |

### 4.3 Visual details to check during Phase 0 [INVENTORY]

Remove any of these that exist:

- a single word in a headline set in a gradient, a different colour, or italic;
- all-caps tracked labels;
- `→` appended to button or link text;
- glowing `box-shadow` on buttons or cards;
- glassmorphism (`backdrop-blur`, frosted cards) anywhere except the one sanctioned use, the AI layer of the services graphic (7.7);
- starfield or particle backgrounds (tempting given the "Cosmo" name, but overused);
- AI-generated illustrations or stock photos of people in headsets;
- one border-radius applied to every element regardless of size.

---

## 5. Typography

### 5.1 Current typefaces [INVENTORY]

Record these from Phase 0. If the current families include any of the following, they're part of the "generated" look and should be replaced:

- Inter
- Geist
- Poppins
- Montserrat
- Space Grotesk
- Sora
- Outfit
- Plus Jakarta Sans
- Manrope
- DM Sans

None of them is bad in itself, but they're the default output of site generators and templates, so a buyer has seen them on hundreds of similar pages.

**Brand guidelines note:**
- The Oct 2025 guidelines name **Uni Sans** (primary) and **Byte Sharp** (secondary). The Uni Sans files embedded in the guidelines PDF are Fontspring *demo* versions, which typically aren't licensed for commercial use (Appendix B).
- The owner left typefaces unlocked for the website, so the site uses the recommendation below.
- If a Uni Sans web licence is bought later, it may be used for H1/H2 only: never for body text, and never in all caps.
- The wordmark and the Poppins "TECHNOLOGIES" line are part of the logo image and aren't affected.

### 5.2 Recommendation

**Primary recommendation: one family, Schibsted Grotesk** (Google Fonts, variable, free), used for headings and body.

Why this family:
- It was drawn for a Scandinavian news publisher, so it's built to read well in long text and to hold authority in headlines. That suits a company that needs to look credible to procurement teams as well as founders.
- It has more character than Inter or Geist (tighter shapes, a slightly condensed rhythm in bold) without looking trendy.
- One well-used family looks more deliberate than two poorly paired ones, and it halves font payload.

**Alternative, if the team wants a more enterprise and engineering feel: IBM Plex Sans.** It carries associations with serious infrastructure work and has excellent language coverage, but it's a little more neutral.

**Do not use** a monospace face for labels or data. It's a current generated-site tell and adds a font file for decoration only. Numerals use `tabular-nums` in the main family instead.

### 5.3 Implementation (Next.js)

```tsx
// app/layout.tsx
import { Schibsted_Grotesk } from "next/font/google";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE" className={sans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

```js
// tailwind.config (theme.extend)
fontFamily: {
  sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
},
```

Remove every other font import and `@font-face` found in Phase 0, and check that no component hard-codes a family.

Also set `lang="en-KE"` if the current value is `en` or `en-US`. The site's `og:locale` currently says `en_US` [VERIFIED]; change it to `en_KE`.

### 5.4 Type scale and rules

Use a 1.25 ratio (major third) on a 17px body. Sizes are in rem at 16px root.

| Token | Size | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display` | `clamp(2.5rem, 1.6rem + 3.6vw, 4rem)` | 700 | 1.05 | -0.025em | Hero H1 only |
| `h2` | `clamp(1.9rem, 1.5rem + 1.6vw, 2.6rem)` | 700 | 1.12 | -0.02em | Section headings |
| `h3` | 1.5rem | 600 | 1.25 | -0.01em | Service names, sub-sections |
| `h4` | 1.2rem | 600 | 1.3 | 0 | Card titles, list headings |
| `lead` | 1.25rem | 400 | 1.5 | 0 | Hero subhead, section intros |
| `body` | 1.0625rem (17px) | 400 | 1.6 | 0 | Paragraphs |
| `small` | 0.875rem | 500 | 1.45 | 0.005em | Form help, captions, footer |
| `brandline` | 1rem–1.125rem | 600 | 1.3 | 0.01em | The tagline where shown as a brand line |

Rules:
- Section titles (H2) and page titles use title case: capitalise the words that matter and keep short connecting words lower case unless they come first or last ("What We Do", "AI in Practice", "How We Run Our Projects"). Owner preference, 26 Sep 2026. Card titles, buttons, navigation and body headings stay in sentence case. The tagline keeps its own capitalisation because it's locked.
- Paragraph measure is capped at `max-width: 65ch`, and hero and section intros at `40ch`.
- Section headers (H2 plus the optional intro) are centred, with the intro capped at 42rem (owner preference, 26 Sep 2026, carried over from the previous site). A section's closing CTA line is centred to match. Body text, lists, cards and the hero stay left-aligned.
- Use no more than three weights: 400, 600 and 700.
- Don't accent a single word in a headline with colour, gradient or italic.
- Don't use all caps anywhere except acronyms (AI, API, AWS).
- Links in body copy are underlined (`text-underline-offset: 0.2em`), not colour-only.

**Acceptance:** one font family loads on first paint (check DevTools → Network → Font). Lighthouse reports no layout shift from font swap, and the heading hierarchy matches the table.

---

## 6. Colour and halo gradients

### 6.1 Palette: brand hues, disciplined roles

The palette comes from the brand guidelines (Oct 2025) and the current logo file. The guidelines name two primary colours, **Blue Violet `#150F33`** and **Light Purple `#C496C4`**, and the logo mark adds **deep violet `#453A7D`** and **mauve `#A879B1`**. The "TECHNOLOGIES" lettering in the logo is `#C7A0CB`, close enough to `#C496C4` that the web UI uses `#C496C4` only. The logo file itself stays untouched.

A professional site shows the brand colour in a few deliberate places on a mostly neutral page, whereas generated sites spread it across every heading, icon and border. Put these tokens in `globals.css` and replace every hard-coded colour found in Phase 0 with a token. Any value that isn't on this list is off-palette and must be removed.

```css
:root {
  --color-bg: #150F33;            /* Blue Violet, brand primary: page background */
  --color-surface: #201843;       /* bg + 22% #453A7D: alternate sections, cards */
  --color-text: #FFFFFF;
  --color-text-muted: #C7C5CE;    /* white at 76% over bg, stored as a solid */
  --color-border: #363150;        /* decorative dividers only */
  --color-border-strong: #736F85; /* inputs and controls (needs 3:1) */
  --color-brand: #C496C4;         /* Light Purple, brand primary: buttons, links, focus, brandline */
  --color-brand-ink: #150F33;     /* text on --color-brand */
  --color-brand-deep: #453A7D;    /* logo violet: graphics and halos only */
  --color-brand-mauve: #A879B1;   /* logo mauve: graphics and halos only */
  --color-focus: #C496C4;
}
```

**Dark only.** The logo's wordmark is white, and the guidelines are dark-first. Don't add a light theme or a theme toggle. If a light surface is ever needed (a printable page, say), it needs a dark-on-light logo file: `{{OWNER: supply a dark-on-light logo variant, only if needed}}`.

**Contrast (WCAG 2.2 AA), measured:**

| Pair | Ratio | Allowed use |
|---|---|---|
| `#FFFFFF` on `#150F33` | 18.3:1 | Headings, body |
| `#C7C5CE` on `#150F33` | 10.8:1 | Muted text |
| `#C7C5CE` on `#201843` | 9.7:1 | Muted text on surface |
| `#C496C4` on `#150F33` | 7.4:1 | Links, brandline, small text |
| `#150F33` on `#C496C4` | 7.4:1 | Primary button label |
| `#FFFFFF` on `#453A7D` | 9.8:1 | Text on violet, if ever needed |
| `#150F33` on `#A879B1` | 5.3:1 | Text on mauve |
| `#FFFFFF` on `#A879B1` | 3.5:1 | **Fails for body text.** Large text (24px+) only. |
| `#736F85` on `#150F33` | 3.8:1 | Input and control borders |
| `#363150` on `#150F33` | 1.5:1 | Decorative dividers only; never the only boundary of a control |

**Usage budget:**
- `--color-brand` (`#C496C4`) goes on primary buttons, inline links, focus rings, the brandline, and the step number circles in "How We Run Our Projects".
- `--color-brand-deep` and `--color-brand-mauve` appear only inside the two graphics (7.6, 7.7) and the halos (6.3), plus `--color-brand-deep` as the fill of the highlighted step card in Block 5 (owner preference).
- Headings, body text, icons, borders and card backgrounds stay neutral.

**Remove:**
- gradient text (`bg-clip-text text-transparent` patterns);
- gradient-filled buttons (primary buttons get a solid `--color-brand` fill);
- any colour not in the token list.

### 6.2 Current halo usage [INVENTORY]

Count every halo, glow or decorative gradient from Phase 0. The owner reports they're used throughout, and the target is two on the homepage.

### 6.3 Halo budget

Halos use the brand gradient from the guidelines, which runs from purple to soft lavender. On the site it's rendered as mauve `#A879B1` at the centre, fading through deep violet `#453A7D` to transparent.

| Page | Allowed halos | Where | Purpose |
|---|---|---|---|
| Homepage | **2** | 1) Hero: behind the hero graphic on the right, partly cropped by the viewport edge. 2) Final CTA band: low and wide behind the band. | The first sets the brand mood on arrival; the second marks the conversion point. |
| Service pages | 1 | Page hero only | Continuity with the homepage. |
| About, Security, Contact, legal pages | 0 | None | These pages should feel calm and factual. |

**Never** put a halo behind:
- cards or icons,
- stats or logos,
- the contact form,
- case studies,
- the services graphic,
- buttons, which includes glowing shadows.

Also remove decorative gradient borders and gradient section dividers.

### 6.4 Halo component

Replace every existing halo with one component, so the budget can be checked in code review. The strength of 0.38 matches the approved hero mockup.

```tsx
// components/Halo.tsx
type HaloProps = {
  className?: string; // positioning, e.g. "-right-40 -top-8"
  size?: number;      // px diameter, default 860 (hero)
  strength?: number;  // 0–1, default 0.38
};

export function Halo({ className = "", size = 860, strength = 0.38 }: HaloProps) {
  const inner = strength.toFixed(2);
  const mid = (strength * 0.6).toFixed(2);
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(closest-side, rgb(168 121 177 / ${inner}), rgb(69 58 125 / ${mid}) 55%, transparent)`,
      }}
    />
  );
}
```

Implementation rules:
- Use `radial-gradient`, not `filter: blur()` on a large shape. Large blur filters are expensive to paint on mid-range Android phones, which are a big share of Kenyan mobile traffic.
- The parent needs `position: relative; isolation: isolate; overflow: hidden`, so the halo can't leak into neighbouring sections.
- Halos are static, with no drift or pulse.
- Below 640px wide, reduce `size` by about 40% so the glow doesn't wash over the headline.

**Acceptance:**
- `rg "<Halo" app components` returns exactly two uses on the homepage and one per service page.
- `rg "blur-3xl|blur-2xl|shadow-\[0_0"` returns no decorative matches.
- Nothing glows except the halos.

### 6.5 Background mesh, arcs and round shapes

**Where they come from:** these were added after owner review of the hero mockup (see `reference/hero-mockup.html`). The mesh gives the hero texture and depth without imagery, and extends the "built from bits" idea: the page grid seems to resolve into the logo's bits. The arc is the one deliberately round shape. It's a quiet contrast to the logo's square geometry, and it balances the halo on the opposite corner.

#### Mesh

- **Where:** the homepage hero, and service-page heroes for continuity. Nowhere else.
- **Look:**
  - 1px lines in `#C496C4` at **7% opacity**;
  - **80px** spacing, matching the pitch of the cells in `hero-bits.svg` at desktop size;
  - fades out toward the bottom of the hero so it never hard-cuts into the next section;
  - on the homepage, also fades out in a circle around the hero graphic, so the page mesh and the graphic's own grid never cross;
  - service pages have no graphic, so they get the bottom fade only.
- **Implementation:**

```tsx
// components/HeroMesh.tsx
export function HeroMesh({ hole = true }: { hole?: boolean }) {
  return <div aria-hidden="true" className={`hero-mesh${hole ? " hero-mesh--hole" : ""}`} />;
}
```

```css
.hero-mesh {
  position: absolute;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgb(196 150 196 / 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(196 150 196 / 0.07) 1px, transparent 1px);
  background-size: 80px 80px;
  background-position: -1px -1px;
  -webkit-mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
}

/* Homepage: clear a circle around the hero graphic (graphic centre ≈ 74% / 52% at 1440×820). */
.hero-mesh--hole {
  -webkit-mask-image:
    radial-gradient(circle 360px at 74% 52%, transparent 55%, #000 100%),
    linear-gradient(to bottom, #000 70%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image:
    radial-gradient(circle 360px at 74% 52%, transparent 55%, #000 100%),
    linear-gradient(to bottom, #000 70%, transparent 100%);
  mask-composite: intersect;
}

@media (max-width: 767px) {
  .hero-mesh { background-size: 56px 56px; }
  /* The graphic moves below the CTAs on mobile, so move the hole with it. */
  .hero-mesh--hole {
    -webkit-mask-image:
      radial-gradient(circle 200px at 50% 80%, transparent 50%, #000 100%),
      linear-gradient(to bottom, #000 70%, transparent 100%);
    mask-image:
      radial-gradient(circle 200px at 50% 80%, transparent 50%, #000 100%),
      linear-gradient(to bottom, #000 70%, transparent 100%);
  }
}
```

After building, check the hole's position against the real rendered graphic at 1280, 1440 and 1920 wide, and adjust the `at x% y%` values if the graphic's centre differs from the mockup. The mesh must never be visible *through* the graphic's cell grid.

#### Arcs (large circle outlines)

Snippets use Tailwind classes; translate them if Phase 0 shows the project styles components another way.

- **Look:** a single very large circle drawn as a 1px outline in `#C496C4` at **14% opacity**, with no fill. It's positioned mostly off-screen, so only one sweeping arc shows.
- **Budget:** exactly two on the homepage, each paired with a halo on the opposite side:
  1. **Hero:** centred off-screen at the top left. The arc sweeps from the top edge (about 370px in from the left) down to the left edge (about 350px down), passing behind the nav and headline.
  2. **Final CTA band:** mirrored, centred off-screen at the top right of the band.
- **Elsewhere:** service-page heroes may use the hero arc. Other sections get none.

```tsx
// components/Arc.tsx
type ArcProps = { className?: string; size?: number };
export function Arc({ className = "", size = 1400 }: ArcProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-[2] rounded-full border border-[rgb(196_150_196/0.14)] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

// Hero (desktop): <Arc className="-left-[960px] -top-[1000px]" />
// Hero (<768px):  <Arc size={900} className="-left-[640px] -top-[660px]" />
// CTA band:       <Arc size={1000} className="-right-[620px] -top-[780px]" />
```

- **Stacking order inside the hero:** mesh (`-z-[3]`), then arc (`-z-[2]`), then halo (`-z-[1]`), then content. The parent keeps `position: relative; isolation: isolate; overflow: hidden` (6.4).

#### Round shapes: where they belong

The logo is built from squares with one rounded corner, so circles are used as a quiet contrast and never as a second visual language.

- **Use circles for:**
  - the two arcs above;
  - the small node dots already in `services-stack.svg`;
  - round crops for team or client photos next to quotes or case studies (48–64px).
- **Keep circles off:**
  - buttons (6px radius);
  - cards (10–12px);
  - icon backgrounds;
  - step numbers, except the numbered circles in Block 5 (owner preference, 26 Sep 2026);
  - badges;
  - avatar placeholders for people who don't have a real photo (show no avatar instead).
- **No other decorative circles, rings, orbits, dots or blobs.**

**Acceptance:**
- The mesh appears only in heroes.
- There are exactly two arcs on the homepage.
- The mesh is invisible inside the hero graphic's area at 1280/1440/1920px.
- No circles appear outside the allowed list.
- Text contrast over the mesh and arc still meets 6.1. Both sit at under 15% opacity, so this should hold, but check it.

---

## 7. Structure, layout and components

### 7.1 Current structure [VERIFIED]

```
Nav: Home · About · AI Solutions · Services · Contact · [Get Started]
1  Hero: eyebrow + H1 (tagline) + subhead + 2 CTAs + 3 zero-stats + scroll hint
2  Our Partners (4 logos/links)
3  Who We Are: intro + Mission + Vision + 4 zero-stats
4  Our Values: 5 cards
5  Why Choose Us: 6 cards + CTA
6  AI Solutions: intro + 4 zero-stats + 6 cards (3 tags each) + CTA
7  Our Services: 4 large cards (6 bullets each) + CTA
8  Client Success Stories: 4 placeholder testimonials
9  CTA band: "Let's Talk About Your Next Project" + 2 CTAs + 3-item strip
10 Contact: details + quick connect + form
11 Footer: logo, blurb, contact, 4 socials, link columns, newsletter
```

That's 11 blocks, 9 CTAs, 21 icon cards and 16 counters on one page, with nothing a visitor can click through to for depth.

### 7.2 Section headers: remove icons (owner request)

With the tightened structure below, every section header is just the H2, plus an optional one-sentence intro in `lead` style:

- Remove the icon badge component from all section headers. If it's shared, delete it rather than hiding it with CSS.
- Remove eyebrow labels (S1).
- Spacing: `margin-bottom` between H2 and intro is 0.75rem, and between the header and section content is 2.5rem (mobile) / 3.5rem (desktop).
- Alignment: the header block is centred (see 5.4 rules).

Icons that remain elsewhere must carry meaning:
- **Keep:** icons in the four service blocks, provided they're consistent line icons from a single set at one stroke weight, drawn in the neutral text colour, not brand-coloured and not inside a tinted rounded square.
- **Keep:** functional icons (menu, external link, phone and mail in Contact, social logos in the footer).
- **Keep:** one neutral line icon per AI capability card (owner preference, 26 Sep 2026), same set and stroke as the service blocks.
- **Keep:** one neutral line icon per principle in Block 8 (owner preference).
- **Remove:** icons on process steps. The numbers carry those.

### 7.3 Proposed homepage

The page keeps the same overall flow the owner knows: hero, then proof, what we do, AI, about, and contact. Duplication is removed, and three sections are added:
- "How We Run Our Projects",
- "How we handle your data" (security),
- "Selected work".

```
Nav: [logo]  Services ▾  AI  About  Work*  Contact        [Book a consultation]
                (AI · Software · Cloud infrastructure · IT equipment · Licensing)

1  HERO            brandline / H1 / lead / CTAs + hero-bits graphic (7.6)       [Halo #1]
2  PARTNERS        single row, muted logos, one-line label
3  WHAT WE DO      services-stack graphic (7.7) + 4 service blocks → service pages
4  AI IN PRACTICE  intro + 6 capabilities as compact 2-col list + 1 CTA
5  HOW A PROJECT RUNS   4 numbered steps with deliverables (real sequence)
6  HOW WE HANDLE YOUR DATA   4 plain-text commitments + link to /security
7  SELECTED WORK*  case studies, Challenge / Solution / Outcome (hidden until ready)
8  ABOUT           short prose + real photo* + stats band* (real numbers only)
9  CTA BAND        one line + primary CTA + company profile link*                [Halo #2]
10 CONTACT         details (left) + form (right)
11 FOOTER          simplified
* = behind a content flag until the owner supplies material
```

**Grid:** 12 columns, max content width 1200px, gutters 24px (desktop) / 16px (mobile). Section vertical padding `clamp(4rem, 3rem + 4vw, 7.5rem)`. Alternate `--color-surface` backgrounds on blocks 3, 5 and 8 only, which gives rhythm without dividers.

**Radius hierarchy:**
- 6px on inputs and buttons;
- 10–12px on service blocks and case-study cards (matching the 10px corners in the graphics);
- 0 on full-bleed sections and images in prose.

**Shadows:** none by default. Separate cards with a 1px `--color-border`; one soft shadow is allowed on the sticky nav once it's scrolled.

#### Block 1: Hero

An approved mockup of this block exists on the design canvas ("Concept B: built from bits"). Match it.

- **Brandline (locked, verbatim):** `Intelligent Solutions, Lasting Impact.` Use the `brandline` style in `--color-brand` and place it directly above the H1.
- **H1:** `{{OWNER: pick A, B or C}}`
  - A: "AI, software and cloud for businesses in Kenya and across Africa."
  - B: "We build AI tools, software and cloud systems for African businesses, and supply the hardware they run on."
  - C: "Practical AI and dependable IT for growing businesses in Kenya."
  - *Recommendation: A.* It's shortest, names the core offer plus location, puts search terms in the H1, and it's what the approved mockup uses.
- **Lead:** "Our Nairobi team builds chatbots, forecasting models and custom software, designs and manages the cloud infrastructure it runs on, and sources the servers, laptops and licences your staff use." Owner to edit if any part isn't accurate.
- **CTAs:**
  - primary button "Book a consultation", linking to the booking page (8.3);
  - secondary text link "See our services" (→ `#services`), underlined in `#C7A0CB`/`--color-brand`.
- **Visual:** the hero-bits graphic (7.6) in the right column. Behind it, in stacking order: the background mesh with a clear circle around the graphic, the hero arc at the top left (6.5), and Halo #1. Photos belong in About and on service pages (7.8), not the hero, so the hero stays consistent with the brand mark.
- **Remove:**
  - the eyebrow "AI-Powered Digital Transformation",
  - the three stats,
  - "See Our Work" (until Work exists),
  - the scroll hint,
  - the current hero image.
- **Height:** don't force `100vh`. Let content set the height so block 2 peeks above the fold on a 1366×768 laptop. The mockup is 1440×820 including the nav.

#### Block 2: Partners

- **Label:** `{{OWNER: confirm "Partners" vs "Clients" vs "Some of the teams we work with" — which is accurate for Qloud Point Solutions, CareerElevate.ai, Pamba Africa, Nsimbi Advocacy?}}`
- **Logos:**
  - real logos, shown with permission;
  - single-tone (white at ~60% opacity), full opacity on hover/focus;
  - consistent height (28–32px);
  - each with real alt text (the company name, never "Partner 1").
- **Layout:** a static row, not a marquee or carousel. Carousels duplicate the markup, so screen readers and crawlers read every logo twice.
- **External links:** add `rel="noopener"`, plus visually hidden "(opens in new tab)" text if they use `target="_blank"`.

#### Block 3: What we do

- **H2:** "What We Do"
- **Intro (draft):** "We can cover a project end to end: the devices and licences, the cloud infrastructure it runs on, the software your team uses, and the AI on top."
- **Layout:**
  - Desktop (≥1024px): the services-stack graphic (7.7) takes 5 columns on the left, and the four service blocks take 7 columns on the right as a 2×2 grid.
  - Below 1024px: the graphic sits above the blocks at `max-width: 480px`.
- **Each block contains:**
  - the service name (h3),
  - a one-sentence description,
  - 3–4 specific bullets,
  - a link "About {service}" → the service page.

| Service | One-liner (draft, owner to confirm) | Keep bullets |
|---|---|---|
| Software development | Web apps, mobile apps and internal systems, built and maintained by our team. | Web and mobile apps · API integrations · DevOps and CI/CD setup · Engineering process reviews for small teams |
| Cloud infrastructure | We design your cloud architecture, build it as code, run it day to day, and keep the monthly bill in line with what you actually use. | Architecture and infrastructure design · Migration to the cloud or between providers · Infrastructure as code, monitoring and backups · Cost optimisation and right-sizing `{{OWNER: providers you work on (AWS, Azure, GCP, local providers), regions, any partner status or certifications}}` |
| IT equipment supply | Servers, networking and staff devices from `{{OWNER: brands you actually supply}}`, installed and supported. | Servers and storage · Networking · Laptops and desktops · Installation and maintenance |
| Software licensing | Operating systems, security suites and enterprise licences, bought right and tracked. | OS and Microsoft licensing · Anti-malware and security suites · Volume licensing · Licence tracking |

**Infrastructure wording rule:** CosmoBits designs and manages infrastructure on cloud providers' platforms; it doesn't own servers or run a data centre. Never write "our data centre", "our servers", "we host" or "our cloud". Write "we design", "we build and manage", "running on {provider} in {region}", or "your cloud account".

**What the cloud offer covers** (for copy on the homepage and `/services/cloud`; describe it in these terms rather than as hosting):
- **Architecture and design:** network layout (VPCs, subnets, private connectivity), compute choices (VMs, containers, managed Kubernetes, serverless), managed databases and storage, and high availability across zones where the workload needs it.
- **Migration:** moving on-premise servers or hosting accounts to the cloud, or between providers, with a cut-over plan and rollback.
- **Infrastructure as code:** Terraform or the provider's own tooling, kept in version control and deployed through CI/CD, so environments can be rebuilt and reviewed.
- **Operations:** monitoring and alerting, patching, backups with tested restores, access control (IAM, least privilege) and incident response, under a support contract.
- **Cost optimisation (FinOps):** right-sizing instances, reserved or committed-use capacity, autoscaling, storage lifecycle rules, removing idle resources, and a monthly cost report with tagging by team or project.
- Name specific tools and providers only once the owner confirms the team uses them.

AI gets its own block (4), so it isn't one of the four here.

#### Block 4: AI in practice

- **H2:** "AI in Practice"
- **Lead:** "Most of our AI work starts with a problem a team already has: too many repetitive customer questions, documents typed up by hand, stock that runs out without warning."
- **Capabilities:** a card grid (three columns on desktop, two on tablet, one on mobile), as on the previous site (owner preference, 26 Sep 2026), restyled in the new language: flat 12px-radius cards with a 1px `--color-border` on `--color-surface`, one neutral line icon, the name (h4), one line, and three checked points using the same check icon as the service blocks. No gradient icon tiles, glows, hover lifts or tags.
  - **Chatbots and assistants:** answer customer questions on your website or WhatsApp, in English and Swahili `{{OWNER: confirm languages}}`, handing over to staff when needed.
  - **Forecasting:** predict sales, demand or risk from the data you already keep.
  - **Document processing:** read invoices, forms and contracts, and pull the fields into your systems.
  - **Computer vision:** spot defects, count stock or check safety gear from camera feeds.
  - **Workflow automation:** take repetitive data entry and routing off your team's plate.
  - **Custom models:** trained on your data when an off-the-shelf tool won't do.
- **CTA:** "Book a consultation", with a small line under it: "The first consultation is free."
- **Link:** "How we handle your data" → Block 6. Buyers' first question about AI is where their data goes.
- **Remove:** the four ROI/percentage counters and the tag rows.

#### Block 5: How We Run Our Projects

This replaces "Why Choose Us" and "Our Values". It's a genuine sequence, so numbering is appropriate. Each step names what the client actually receives, because procurement readers and evaluators look for deliverables, not adjectives.

- **H2:** "How We Run Our Projects" (owner, 26 Sep 2026; was "How a project runs")
- **Layout (owner-supplied reference pattern, 26 Sep 2026):** step cards, four across on wide screens (from 1280px), two across on tablets, one column on mobile. A `--color-surface` band runs behind the section header and the top of the first row of cards; the rest of the section is `--color-bg`.
- **Each step card:** a 48px circle in `--color-brand` with the step number in `--color-brand-ink`, the title (h4), one or two sentences in muted text, and a small "Typically …" line when durations are confirmed. 12px radius, 1px `--color-border`, `--color-bg` fill.
- **Highlighted card:** one card is filled with `--color-brand-deep` and its text switches to white. The first card is highlighted by default; on pointer devices the highlight moves to the card under the pointer.
- Don't add steps to match a longer reference: only steps that describe how CosmoBits actually works.

| Step | Title | Description (draft; owner confirms every promise) | Typical duration |
|---|---|---|---|
| 1 | Consultation | A free call to understand the problem. We'll tell you if we're not the right fit. | `{{OWNER: e.g. 30–60 minutes}}` |
| 2 | Assessment & proposal | We talk to the people involved and review your current systems. You then get a written proposal with scope, recommended architecture, timeline and price `{{OWNER: fixed-price, time-and-materials, or both}}`. Nothing is built until you've approved it. | `{{OWNER: e.g. 1–2 weeks}}` |
| 3 | Build | Work runs to agreed milestones, with a working demo every `{{OWNER: cadence}}`. Each milestone includes testing and security checks, and documentation is written as we go. | Depends on scope |
| 4 | Handover & support | We deploy the system, train your staff, and hand over the documentation. Support follows on the agreed terms `{{OWNER: support hours / SLA, and whether it's contract-backed}}`, and we run the infrastructure under the data-residency terms in the contract. | Ongoing |

- **Optional line under the steps:** "You own the code we write for you." Include it only if true: `{{OWNER: confirm IP/code ownership terms}}`.

#### Block 6: How we handle your data (new)

This block is adapted from the competitor review (Appendix A). It answers the question every AI buyer has, in plain text.

- **H2:** "How We Handle Your Data"
- **Lead (draft):** "AI and software projects mean giving a vendor access to your data. Here's what we do with it."
- **Four items** in a two-column list, bold title plus one or two sentences each, with no icons and no badge images. **Every item must be confirmed by the owner before launch**; drop any item that isn't standard practice.
  - **Kenya's Data Protection Act, 2019:** we process client personal data under a written data processing agreement, signed before work starts. `{{OWNER: confirm DPAs are standard}}`
  - **Data residency:** infrastructure is set up in the region your contract specifies, and we keep your data there. `{{OWNER: typical regions/providers}}`
  - **Access control:** our staff get access only to the systems their role needs, and access is removed when a project ends. `{{OWNER: confirm}}`
  - **Your data stays yours:** client data isn't used to train models for anyone else. `{{OWNER: confirm}}`
- **Optional, only if standard practice:** encryption in transit and at rest, audit logging. `{{OWNER}}`
- **Link:** "Security and data handling" → `/security` (9.4), a fuller page written for procurement and IT reviewers.
- **Rules:**
  - no "compliant" seals or certification logos unless the company holds the certification (e.g. ISO 27001);
  - no GDPR/CCPA badges;
  - no padlock or shield icons.
  - Plain statements carry more weight with evaluators than decoration does.

#### Block 7: Selected work (flagged until content exists)

The first case study is in progress. The agent builds the template and data model now; the section and `/work` stay hidden until at least one case study is published. One strong case study is enough to switch the section on.

- **H2:** "Selected Work"
- **Card format** (borrowed structure; see Appendix A):
  - **Tags:** sector and country (e.g. "Logistics · Kenya").
  - **Client:** name and logo with written permission. If the client prefers, use an anonymised description instead ("a Nairobi logistics company").
  - **Challenge:** one or two sentences on what wasn't working.
  - **Solution:** one or two sentences on what was built or supplied.
  - **Outcome:** real figures, each **naming its measure** ("report turnaround: 3 days → same day"), or an honest qualitative result. Never a bare percentage like "97%".
  - Optional: one real quote with name, role and permission.
  - Optional: a link to the client's site, if they agree.
- **Data model:** `content/work/*.mdx` (or JSON), with fields `slug, client, anonymised, sector, country, services[], challenge, solution, outcomes[{measure, before, after}], quote?, published`.
- **Linking:** each case study gets its own page at `/work/{slug}`. The homepage shows up to three; "See all work" appears at 4 or more.

#### Block 8: About

- **H2:** "About CosmoBits"
- **Layout (owner preference, 26 Sep 2026):** two columns from 1024px. Left: the About prose, vertically centred. Right: "The Principles That Guide Us" in a bordered card with five principles, each a neutral line icon, a bold title and one plain sentence. Stacked on mobile, prose first.
- **Prose (draft):** three short paragraphs following the outline of the owner's reference text (who we are, what we build, who for, what we're good at), written in CosmoBits' own words. The reference was a competitor's About copy; never reuse a competitor's wording (Appendix A).
  1. "CosmoBits Technologies is a technology company based at APA Arcade in Hurlingham, Nairobi. We design, build and run the systems organisations depend on: AI tools, custom software and the cloud infrastructure beneath them, plus the hardware and licences to run it all."
  2. "Since `{{OWNER: year founded}}`, we've worked with `{{OWNER: kinds of clients, e.g. SMEs, NGOs, law firms, fintechs}}` to cut manual work, make better use of the data they already have, and replace fragile tools with systems that hold up as they grow. `{{OWNER: one sentence about the founders or team}}`" Until supplied, the year is dropped and the clients read "businesses and organisations".
  3. "What we're best at is turning a messy business requirement into a system that's reliable, secure and straightforward to maintain. One team covers the whole stack, so you deal with the same people from the laptops to the AI."
- **Principles (the previous site's values, rewritten plainly):** Practical innovation · Built properly · Partnership · Lasting impact · Collaboration. Each description must be something the team actually does; no superlatives.
- **Photo:** a real team or office photo per the brief in 7.8. Until one exists, lay out without an image; never use stock or AI-generated people.
- **Stats band:** owner-supplied numbers only (3.1). Glitex shows how this looks done well: four specific numbers, present in the server HTML, shown once.
- **Link:** "More about us" → `/about`, which holds Mission, Vision and Values (edited per Section 8) for procurement and tender readers.

#### Block 9: Final CTA band

- **Heading:** "Tell Us What You're Working On."
- **Line:** "We reply to every enquiry within one working day." `{{OWNER: confirm; current site says 24 hours}}`
- **Button:** "Book a consultation". Behind the band go Halo #2 and the mirrored CTA arc (6.5); there's no mesh here.
- **Procurement line (small, muted, below the button):** "Buying through a tender or procurement process? Download our company profile (PDF)."
  - Link to `/cosmobits-company-profile.pdf`.
  - Flag it until the owner supplies the file: `{{OWNER: company profile PDF: registration, KRA PIN, tax compliance status, directors, services, references}}`.
  - Show the file size in the link text, e.g. "(PDF, 1.2 MB)".
- **Remove:** the second button and the three-item strip.

#### Block 10: Contact

- **H2:** "Contact". Two columns: details on the left, form on the right. On mobile they stack with the form first.
- **Details:**
  - address with a "Get directions" link to Google Maps,
  - phone (correct `tel:`),
  - email,
  - WhatsApp (if confirmed),
  - hours,
  - a "Book a consultation" link to the booking page.
- **Remove:** the "Quick Connect" box, which duplicates the details.
- **Form:** this is the "request a quote / general enquiry" route. Booking a call is the other route.
  - Keep the current fields; the "Service" options use the renamed services.
  - Every field gets a visible `<label>`. Phone is optional, with a `+254` hint.
  - Add a honeypot field against spam.
  - Success message, shown inline: "Thanks, we've got your message and will reply within one working day."
  - Field errors are inline and say how to fix them ("Enter an email like name@company.co.ke").
  - Consent note: "We'll only use these details to reply to you. Privacy policy."
  - Button label: "Send message".

#### Block 11: Footer

- **Row 1:**
  - logo and brandline,
  - Services column (the five service pages),
  - Company column (About, Work, Security, Contact),
  - Contact column (phone, email, address).
- **Row 2:** © year, Privacy, Terms, social icons (real URLs only), and "Made in Nairobi".
- **Remove:** the duplicated blurb, and the newsletter unless 3.7 confirms a real list.

### 7.4 Navigation

- Sticky header, 64px desktop / 56px mobile. Transparent over the hero, becoming solid (`--color-bg` + 1px border) after 16px of scroll.
- Menu: Services (dropdown) · AI · About · Work (when live) · Contact, plus a primary button "Book a consultation". Remove "Home", since the logo does that.
- Mobile: full-height sheet with large tap targets (min 48px), the phone number and WhatsApp at the bottom, and focus trapped while open.
- Mark the active page with `aria-current="page"`.

### 7.5 Motion (whole site)

- **Remove** all scroll-triggered section entrances, card hover lifts, and anything that bounces or pulses.
- **The one orchestrated moment** is the hero-bits assembly (7.6).
  - Hero text doesn't animate; it renders immediately, so the largest contentful paint (LCP) isn't delayed.
- **Also allowed:**
  - the nav background transition,
  - menu, dropdown and accordion open/close,
  - button press states,
  - form feedback.
- **Reduced motion:** honour `prefers-reduced-motion: reduce` globally, with no transforms and at most instant opacity changes.
- If `framer-motion` is only used for scroll entrances, remove the dependency. The hero animation below is plain CSS.

### 7.6 Hero graphic: `hero-bits.svg` (approved concept B)

**What it is:** the logo mark (white bit, violet block with the logo's cut corner, mauve bit), enlarged and set on a 7×7 grid of faint square "bits". A few loose bits sit in nearby cells, and two smaller ones are still in transit. The graphic is built only from the logo's own shapes and palette. It deliberately avoids starfields, circuits and stock imagery.

**File:** `assets/hero-bits.svg` is delivered with this spec. It has a 600×600 viewBox, and its colours are the tokens in 6.1.

**Implementation:**
- Inline the SVG as a React component (`components/HeroBits.tsx`) rather than using `<img>`, so the page CSS can animate its parts.
- Keep `aria-hidden="true"`. It's decorative, and the headline carries the meaning.
- Keep the SVG's classes:
  - `.cb-mark` on the three logo pieces,
  - `.cb-bit` (with a `--i` stagger index) on loose bits,
  - `.cb-far` on bits hidden on small screens.

**Size and placement:**
- Right column of the hero, `width: min(600px, 42vw)`, vertically centred with the text column.
- Halo #1 sits behind it (6.4 defaults).

**Load animation (plays once; never on scroll, never looping):**

```css
@media (prefers-reduced-motion: no-preference) {
  .cb-hero-bits .cb-mark {
    animation: cb-fade 300ms ease-out both;
  }
  .cb-hero-bits .cb-bit {
    transform-box: fill-box;
    animation: cb-slide 650ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
    animation-delay: calc(150ms + var(--i) * 60ms);
  }
}
@keyframes cb-fade  { from { opacity: 0; } }
@keyframes cb-slide { from { opacity: 0; transform: translateX(40px); } }
```

The total runtime is under one second. It must not trigger again on client-side navigation back to the homepage. Guard it with a `data-played` attribute set after the first run, or with `sessionStorage` wrapped in try/catch.

**Responsive:**
- **≥1024px:** two columns, as in the mockup.
- **768–1023px:** the graphic stays on the right at `width: 38vw`.
- **Below 768px:** the graphic moves below the CTAs, centred, at `width: min(360px, 80vw)`.
  - Hide `.cb-far` bits (`display: none`) so the grid doesn't crowd the text.
  - The mesh hole and the arc switch to their mobile values (6.5).
  - Reduce the halo size by about 40%.

**Acceptance:**
- The graphic matches the canvas mockup.
- The hero text is visible at first paint.
- The animation runs once and is skipped under reduced motion.
- No layout shift occurs (the SVG has explicit width/height or aspect-ratio).
- At 360px wide, nothing overlaps.

**Also use for:**
- The share image (3.5): the mark and grid on `#150F33`, with the logo and tagline, 1200×630.
- The 404 page: the grid with one bit visibly "missing", plus a plain message and a link home.

### 7.7 "What we do" graphic: `services-stack.svg` (concept A, reused)

**What it is:** four layers stacked from bottom to top, joined by one thread on the right that stands for one team across the stack:
- **Hardware & licences** (violet, with the logo's cut corner),
- **Cloud infrastructure** (outlined, with instance squares),
- **Software** (mauve, with interface lines),
- **AI** (a frosted glass panel with a small node network).

A white bit echoes the logo.

**File:** `assets/services-stack.svg` is delivered with this spec. It has a 620×600 viewBox, with labels in SVG `<text>` that inherit Schibsted Grotesk when inlined.

**Implementation:**
- Inline it as `components/ServicesStack.tsx`.
- Keep its `<title>` so screen readers get the summary. It's informative, not decorative.
- Place it per Block 3.
- **Two variants (owner request, 26 Sep 2026):** from 1024px up, a tall variant (`public/services-stack-tall.svg`, 620×1040, exported as `ServicesStackTall`) fills the full height of the four service cards beside it. It has the same parts with taller layers and a little more detail (extra interface lines, three rows of instances, five rack rows). Below 1024px the original short graphic sits above the cards.
- No halo sits behind it, and no animation.

**Glassmorphism:** the brand guidelines list glassmorphism as a brand style. The AI layer in this graphic is **the only glass element on the site**. It uses the same rule as the halos: one deliberate use, not a style applied to every card.

**Labels:** the third layer is labelled "Cloud infrastructure" (was "Hosting & upkeep"). If the owner renames it or "Hardware & licences" to match the final service names, edit the `<text>` nodes. Keep them under 22 characters so they fit left of the layers.

### 7.8 Photography brief (for About, service pages and case studies)

The hero uses the brand graphic, but the rest of the site needs real photos. A half-day with a Nairobi photographer is ideal; a recent phone in good daylight is acceptable.

**Shots, in order of value:**

1. **Hands racking a server or patching cables into a network switch** during a real install. Hardware is the differentiator, and it belongs on `/services/it-equipment` and in case studies.
2. **Two or three team members working at a screen or whiteboard** at APA Arcade, mid-conversation, not looking at the camera. Use it for About and `/services/software-development`.
3. **An engineer setting up devices at a client site**, only with the client's written permission. Use it in case studies.
4. **The team together, the office entrance, and the building.** Use these on the About page.

**Technical:**
- Landscape, at least 3000px wide.
- Leave empty space on one side for text.
- Natural light, with no heavy filters.
- Export as JPEG. The site serves AVIF/WebP through `next/image`.

**Avoid:**
- posed handshakes;
- people pointing at screens;
- suits against glass skyscrapers;
- stock photos;
- AI-generated people.

Some sample images in the brand guidelines have this polished stock look; the website should be visibly more real than that.

---

## 8. Copy and voice

### 8.1 Voice

Write like a senior engineer explaining the work to a business owner over coffee.

- **Specific over impressive.** Name the tool, the sector, the channel, the step. "A WhatsApp bot that answers delivery questions" beats "intelligent conversational AI".
- **Short, active sentences, with contractions.** Use "we'll", "you're", "it's".
- **Promise only what's true and checkable.**
- **Kenyan and East African context where it's real:** M-Pesa integrations, Swahili, KRA, the Data Protection Act. Include these only if the team actually does that work. `{{OWNER: which apply?}}`
- **Spelling:** pick British/Commonwealth spelling (common in Kenyan business writing: "optimise", "organisation") and apply it consistently. `{{OWNER: confirm British or US}}`

### 8.2 Words and phrases to remove site-wide

Add this list as a lint check. A simple `rg -i` in CI works; failing the build is optional, but warn at least.

```
cutting-edge, state-of-the-art, world-class, premier, leading provider,
seamless, robust (outside technical specs), empower/empowering, leverage (verb),
unlock, elevate, supercharge, streamline (as a slogan), revolutionise,
transformative, game-changing, innovative (as self-description),
digital transformation (max once per page, and never in a heading),
bridge the digital divide, synergy, next level, superhuman,
exceed expectations, your success is our success, on time every time,
we are passionate about, one-stop shop
```

### 8.3 CTA system

| Role | Label | Destination | Where |
|---|---|---|---|
| Primary (the one action) | **Book a consultation** | Booking page: a Google Calendar appointment schedule or Calendly link `{{OWNER: booking URL}}`, opening in a new tab; fallback `/contact` | Nav button, hero, AI block, final CTA band, end of every service page |
| Secondary | See our services | `#services` | Hero only |
| Contextual | About {service} | Service page | Service blocks |
| Form submit | Send message | none | Contact form |
| Direct | Call +254 119 699 617 · Email hello@cosmobits.tech · WhatsApp | `tel:` / `mailto:` / `wa.me` | Contact, footer |

Retire these labels: Get Started, Get in Touch (as a button), Start Your Project, Book a Free Consultation, Schedule a Consultation, Schedule a Call, Explore Our Services, Learn More.

### 8.4 Before / after for headings and intros not already covered in Section 7

| Location | Before [VERIFIED] | After |
|---|---|---|
| About heading | Driving Digital Transformation Across Africa | About CosmoBits |
| About intro | CosmoBits Technologies is a leading technology solutions provider dedicated to empowering businesses with innovative AI and digital tools that drive sustainable growth. | See Block 8 draft. |
| AI heading | AI Solutions Built for Your Workflow | AI in Practice |
| Services heading | Technology Solutions | What We Do |
| Services intro | Beyond AI, we provide comprehensive technology services that power your digital infrastructure and drive business growth. | Remove; the four blocks explain themselves. |
| Services CTA | Not sure which service is right for you? Schedule a Consultation | "Not sure where to start? Book a consultation and we'll point you the right way." |
| Final CTA | Let's Talk About Your Next Project / Join the growing number of businesses leveraging AI… | Tell Us What You're Working On. |
| Contact intro | Ready to transform your business with AI and cutting-edge technology? Get in touch with our team of experts today. | Remove; the heading "Contact" and the form are enough. |
| Footer blurb | Empowering businesses across Africa with innovative AI solutions and cutting-edge technology. Your trusted partner for digital transformation. | Use the brandline (tagline) only. |
| Mission (move to /about) | To deliver comprehensive technology solutions … bridges the digital divide while maintaining the highest standards of innovation and service excellence. | "To give African businesses the AI, software and infrastructure they need to compete, built properly and supported after launch." `{{OWNER: approve or edit}}` |
| Vision (move to /about) | To become the premier AI and technology partner … | "A business in Nairobi, Kampala or Kigali should be able to get world-standard technology work done without leaving the region." `{{OWNER: approve; adjust cities to where you actually operate}}` |

---

## 9. SEO and technical

No SEO tool (Ahrefs, Semrush, Search Console) was connected for this audit, so search-volume and difficulty figures below are directional estimates. Validate them in Google Search Console and Keyword Planner once the service pages exist.

### 9.1 On-page issues

| Page | Issue | Severity | Fix |
|---|---|---|---|
| Home | All stats render as 0 in the HTML (3.1) | Critical | Real numbers in SSR, or remove. |
| Home | Single-page site: every service competes for one URL, and "Learn More" leads nowhere | Critical | Service pages (9.4). |
| Home | `og:image` 404 (3.5) | High | Add the image. |
| Home | Title "CosmoBits Technologies \| AI-Powered Digital Transformation" (58 chars) has no service or location terms | High | `AI, Software & Cloud Solutions in Nairobi, Kenya \| CosmoBits` (60 chars). |
| Home | Meta description is 217 chars (gets truncated around 155) and leans on "cutting-edge" | Medium | "AI, custom software, cloud and IT equipment for businesses in Kenya and across Africa. Nairobi team, free first consultation. Talk to CosmoBits." (144 chars) |
| Home | H1 is the keyword-free tagline | Medium | Concrete H1 (Block 1). |
| Home | Title Case headings and duplicate eyebrow/H2 "Get In Touch / Get in Touch" | Low | Title case for section titles only (5.4); remove eyebrows. |
| Home | `meta keywords` present (ignored by Google, and reveals targeting to competitors) | Low | Remove. |
| Home | `og:locale` = `en_US` | Low | `en_KE`. |
| Home | Footer logo requested through `_next/image` at `w=3840` | Medium | Set explicit `width`/`height` and `sizes` so a ~160–200px logo is served at a matching size. Use SVG if available. |
| Home | Social links point to platform homepages | Medium | Real URLs and `sameAs` in schema. |
| Home | Privacy and Terms missing | High (trust + legal) | 9.5. |

### 9.2 Technical checklist

| Check | Status | Details |
|---|---|---|
| HTTPS | Pass | Served over HTTPS; apex redirected to `www` during fetch. Confirm it's a 301 (not 302/307) with `curl -I https://cosmobits.tech`. |
| Canonical | Pass (home) | `https://www.cosmobits.tech`. Each new page needs its own self-referencing canonical via `metadata.alternates.canonical`. |
| Robots meta | Pass | `index, follow`. |
| robots.txt | Unknown | Confirm or create `app/robots.ts` allowing all and pointing to the sitemap. |
| XML sitemap | Unknown | Create `app/sitemap.ts` listing every route with `lastModified`. |
| Structured data | Not observed | Add Organization + ProfessionalService JSON-LD (9.3). |
| Open Graph / Twitter | Fail | Image 404; confirm `@cosmobitstech` exists or remove `twitter:creator`. |
| Server-rendered content | Fail | Counters render 0. Check any other client-only content in Phase 0. |
| Internal linking | Fail | Only `#` fragments; no crawlable internal pages. |
| Broken links | Fail | Social, Privacy, Terms, "See Our Work", "Learn More". |
| Image optimisation | Warning | Oversized logo request; audit other images in Phase 0 (AVIF/WebP via `next/image`, explicit dimensions). |
| Core Web Vitals | Unknown | Run PSI (Phase 0). Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile. |
| Mobile | Unknown | Check tap targets ≥ 44px, no horizontal scroll at 360px, readable text without zoom. |
| Brand search | Warning | A web search for "CosmoBits" on the audit date surfaced a University of Bologna cosmology project and a Mexican IT firm (Cosmobit), not this site. Fix with 9.3 + 9.6. |

### 9.3 Structured data

Add to `app/layout.tsx` (or the homepage) as `<script type="application/ld+json">`. Fill the placeholders from `lib/contact.ts`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.cosmobits.tech/#org",
      "name": "CosmoBits Technologies",
      "alternateName": "CosmoBits",
      "url": "https://www.cosmobits.tech",
      "logo": "https://www.cosmobits.tech/cosmobits-technologies-logo.png",
      "slogan": "Intelligent Solutions, Lasting Impact.",
      "email": "hello@cosmobits.tech",
      "telephone": "+254119699617",
      "sameAs": ["{{OWNER: LinkedIn URL}}", "{{OWNER: X URL}}"]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.cosmobits.tech/#business",
      "name": "CosmoBits Technologies",
      "parentOrganization": { "@id": "https://www.cosmobits.tech/#org" },
      "url": "https://www.cosmobits.tech",
      "telephone": "+254119699617",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "APA Arcade, Level 1",
        "addressLocality": "Hurlingham, Nairobi",
        "addressCountry": "KE"
      },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "13:00" }
      ],
      "areaServed": ["KE", "{{OWNER: other countries actually served}}"]
    }
  ]
}
```

Add `Service` schema on each service page and `BreadcrumbList` on all inner pages. Validate with https://validator.schema.org and Google's Rich Results Test.

### 9.4 New pages

| Route | Purpose | H1 (draft) | Title tag (≤60) |
|---|---|---|---|
| `/services/ai` | AI consulting and builds | AI solutions for businesses in Kenya | AI Solutions & Consulting in Kenya \| CosmoBits |
| `/services/software-development` | Custom software | Custom software development in Nairobi | Software Development Company in Nairobi \| CosmoBits |
| `/services/cloud` | Cloud infrastructure: design, migration, infrastructure as code, operations and cost optimisation on providers' platforms | Cloud infrastructure design, management and cost optimisation | Cloud Infrastructure & Migration in Kenya \| CosmoBits |
| `/services/it-equipment` | Hardware supply | IT equipment supply and installation | IT Equipment Suppliers in Nairobi \| CosmoBits |
| `/services/software-licensing` | Licensing | Software licensing and procurement | Software Licensing in Kenya \| CosmoBits |
| `/about` | Company, team, mission/vision/values | About CosmoBits | About CosmoBits Technologies, Nairobi |
| `/security` | Full data-handling statement for procurement and IT reviewers (Block 6, expanded) | Security and data handling | Security & Data Handling \| CosmoBits |
| `/work` | Case studies (when ≥4) | Selected work | Our Work & Case Studies \| CosmoBits |
| `/contact` | Contact + map | Contact | Contact CosmoBits \| Nairobi, Kenya |
| `/privacy`, `/terms` | Legal | Privacy policy / Terms of service | none |

Service page template (same layout for all five):

1. Hero: H1, lead, primary CTA, one halo.
2. Who it's for: 2–3 short examples of typical clients or situations.
3. What we do: the full bullet list from the current site, each with one line of explanation.
4. How it works: link to or reuse the 4-step process.
5. Relevant work: case studies tagged with this service (hidden if none).
6. FAQ: 4–6 real questions buyers ask. Examples:
   - "Do you work outside Nairobi?"
   - "Can you integrate with M-Pesa?"
   - "Who owns the code?"
   - "What does a typical project cost?"
   Give ranges only if the owner is comfortable. Add `FAQPage` schema only if the answers are genuinely useful.
7. CTA band: "Book a consultation".

Aim for 500–900 words of genuinely useful content per service page. Thin 150-word pages won't rank.

### 9.5 Legal pages

- **`/privacy`:** what the contact form collects, why, how long it's kept, who can access it, how to request deletion, and the contact for data requests.
  - Kenya's Data Protection Act, 2019 applies to personal data collected through the site.
  - `{{OWNER: check with a lawyer whether CosmoBits must register with the Office of the Data Protection Commissioner, and have the final text reviewed}}`.
  - The agent should draft a plain-language structure with placeholders, not final legal wording.
- **`/terms`:** a short website terms page, also for legal review.

### 9.6 Keyword opportunities (directional)

| Keyword | Est. difficulty | Opportunity | Intent | Target page |
|---|---|---|---|---|
| cosmobits / cosmobits technologies | Easy | High | Navigational | Home |
| AI company in Kenya | Moderate | High | Commercial | /services/ai |
| AI consultancy Nairobi | Easy–moderate | High | Commercial | /services/ai |
| chatbot development Kenya | Easy | High | Commercial | /services/ai |
| WhatsApp chatbot for business Kenya | Easy | High | Commercial | /services/ai (section) |
| software development company Nairobi | Hard | High | Commercial | /services/software-development |
| custom software development Kenya | Moderate | High | Commercial | /services/software-development |
| mobile app developers Nairobi | Hard | Medium | Commercial | /services/software-development |
| M-Pesa integration developer | Moderate | Medium | Commercial | /services/software-development (if offered) |
| cloud migration Kenya | Easy–moderate | High | Commercial | /services/cloud |
| cloud infrastructure management Kenya | Easy–moderate | High | Commercial | /services/cloud |
| cloud cost optimisation Kenya | Easy | Medium | Commercial | /services/cloud (section) |
| DevOps / Terraform consultants Nairobi | Easy | Medium | Commercial | /services/cloud (only if the team does this work) |
| AWS / Azure partner Kenya | Moderate | Medium | Commercial | /services/cloud (only if partner status is real) |
| IT equipment suppliers Nairobi | Moderate | Medium | Transactional | /services/it-equipment |
| server suppliers Kenya | Easy–moderate | Medium | Transactional | /services/it-equipment |
| Microsoft licensing Kenya | Moderate | Medium | Transactional | /services/software-licensing |
| antivirus for business Kenya | Easy | Medium | Transactional | /services/software-licensing |
| document automation Kenya | Easy | Medium | Commercial | /services/ai (section) |
| data protection act AI Kenya | Easy | Medium | Informational | Future article or /services/ai FAQ |

Off-site actions for brand search:

- **Google Business Profile.** Create or claim it with the exact name, address, phone, hours and category ("Software company" or "IT services"), plus real photos, and ask real clients for reviews.
- **LinkedIn company page.** Complete it and link it both ways with the site.
- **Kenyan and regional directories.** List the company consistently (same name, address and phone everywhere).
- **Partner backlinks.** Ask partners (Qloud Point, CareerElevate.ai, Pamba Africa, Nsimbi Advocacy) whether they'll link back where the relationship is real.

*Not covered here:* head-to-head competitor comparison. Worth a follow-up once service pages exist and Search Console has a few weeks of data.

---

## 10. Accessibility and performance

These are quality floors. They aren't features to announce, but a site that fails them reads as unprofessional to the buyers who notice.

### Accessibility (WCAG 2.2 AA)

- **Contrast:** every text/background pair passes (6.1). Check muted text over the halos especially.
- **Focus:** a visible focus ring on every interactive element (`outline: 2px solid var(--color-focus); outline-offset: 3px`). Never `outline: none` without a replacement.
- **Keyboard:** the whole page works with Tab/Shift-Tab/Enter/Escape, including the Services dropdown and mobile menu. Add a "Skip to content" link.
- **Semantics:**
  - one H1 per page,
  - no skipped heading levels,
  - landmarks (`header`, `nav`, `main`, `footer`),
  - form fields with `<label>`,
  - errors linked by `aria-describedby`.
- **Targets:** interactive elements are at least 44×44px on touch.
- **Motion:** `prefers-reduced-motion` respected (7.5).
- **Images:** meaningful `alt`; decorative images and halos get `alt=""` / `aria-hidden`.
- **Language:** `lang="en-KE"`.

### Performance

- **Budget (mobile, 4G, mid-range Android):**
  - LCP < 2.5s,
  - INP < 200ms,
  - CLS < 0.1,
  - JS < 170KB gzipped on the homepage,
  - one font family.
- Every image goes through `next/image` with explicit dimensions and `sizes`, AVIF/WebP, and `priority` only on the hero image if there is one.
- Remove unused animation libraries after 7.5.
- Halos use gradients, not blur filters (6.4).
- Load contact form validation with the form, not in the global bundle.
- Use no third-party chat widgets. A WhatsApp link does the job with no script cost.

---

## 11. Content the owner needs to supply

The agent can't finish these without the team. Each maps to a `{{OWNER: …}}` placeholder.

| # | Item | Where |
|---|---|---|
| 1 | Real LinkedIn / X / Instagram / Facebook URLs, or confirmation to drop some | 3.4, schema |
| 2 | WhatsApp Business number, if used | 3.2, Block 10 |
| 3 | Whether 24/7 support exists, and for whom | 3.6 |
| 4 | Whether a newsletter list exists | 3.7 |
| 5 | Hero H1 choice (A / B / C). The mockup uses A. | Block 1 |
| 6 | Relationship to the four listed partners, and logo permission | Block 2 |
| 7 | Cloud providers and regions you work on; tools (e.g. Terraform, Kubernetes); any partner status or certifications; hardware brands supplied | Block 3, 9.4 |
| 8 | AI languages supported (English/Swahili?) | Block 4 |
| 9 | Pricing model, step durations, demo cadence, support terms/SLA, code ownership | Block 5 |
| 10 | Confirmation of each data-handling commitment (DPAs, residency, access, training use, encryption/logging) | Block 6, `/security` |
| 11 | The case study currently in progress, then more as they're ready | Block 7 |
| 12 | Founding year, client types, team/founder sentence | Block 8 |
| 13 | Photos per the brief | 7.8 |
| 14 | Real stats: years, projects, clients, countries | 3.1, Block 8 |
| 15 | Confirmed reply time (24 hours vs one working day) | Block 9 |
| 16 | Company profile PDF for tenders (registration, KRA PIN, tax compliance, directors, references) | Block 9 |
| 17 | Booking link (Google Calendar appointment schedule or Calendly) | 8.3 |
| 18 | British vs US spelling | 8.1 |
| 19 | Approval of rewritten Mission and Vision | 8.4 |
| 20 | Legal review of Privacy and Terms; ODPC registration status | 9.5 |
| 21 | FAQ answers per service | 9.4 |
| 22 | Uni Sans licence decision (Appendix B) | 5.1 |
| 23 | Confirmation that the block mark is the current logo, and removal of the old mark elsewhere | Ground rules, Appendix B |

---

## 12. Implementation order and acceptance

Work in this order, one PR per phase, and update `CHANGELOG-website.md` in each.

**PR 0: Inventory.** Produce `AUDIT-INVENTORY.md` (Section 2). No code changes.

**PR 1: Critical fixes** (Section 3):
- `lib/contact.ts`;
- the `tel:` fix;
- remove the hero and AI stats, and flag the About stats;
- remove the testimonials;
- fix or remove dead links;
- the OG image (using the hero-bits artwork);
- the 24/7 claim;
- the newsletter decision;
- stub `/privacy` and `/terms`, hidden from the sitemap until reviewed.

**PR 2: Design foundations** (Sections 5, 6, 7.2, 7.5):
- the typeface swap;
- colour tokens (6.1) and removal of off-palette colours;
- the `Halo`, `HeroMesh` and `Arc` components (6.4, 6.5), and halo removals;
- removing section-header icons and eyebrows;
- motion cleanup;
- the radius and shadow system.

**PR 3: Homepage restructure, graphics and copy** (Sections 7.3, 7.4, 7.6, 7.7, 8):
- the new block order, including "How we handle your data";
- `HeroBits` with the load animation;
- `ServicesStack`;
- the navigation;
- the CTA system with the booking link;
- rewritten copy;
- the case study data model;
- content flags for Work, Stats, Photos and the company profile.

**PR 4: Pages and SEO** (Section 9):
- the five service pages, plus `/about`, `/security` and `/contact`;
- the `/work` template (hidden);
- metadata per route;
- `robots.ts`, `sitemap.ts` and JSON-LD;
- the 404 page (7.6);
- redirects if any old anchors are linked externally.

**PR 5: Quality pass** (Section 10):
- an accessibility audit (axe DevTools plus a manual keyboard pass);
- the performance pass;
- a PSI re-run compared against the Phase 0 baseline.

### Placeholder guard (add in PR 1)

```json
// package.json
"scripts": {
  "check:placeholders": "! rg -n '\\{\\{OWNER:' app components lib content --glob '!**/*.md'",
  "prebuild": "npm run check:placeholders"
}
```

Content behind a disabled flag should live in a data file the guard can skip, or keep its placeholders out of rendered code until the owner supplies content.

### Final acceptance checklist

- [ ] No stat renders as 0 in view-source; any stats shown are owner-supplied.
- [ ] All `tel:` links use +254119699617.
- [ ] No placeholder testimonials anywhere in the repo.
- [ ] Zero broken links (linkinator) and no `href="#"`.
- [ ] OG image returns 200 and previews correctly on LinkedIn and WhatsApp.
- [ ] The tagline appears verbatim ("Intelligent Solutions, Lasting Impact.") in the hero brandline, the footer and the schema `slogan`.
- [ ] Only the block-mark logo appears; the logo file is unaltered.
- [ ] Every colour in the codebase is one of the 6.1 tokens; all text pairs meet the contrast table.
- [ ] One font family loads, and the type scale matches 5.4.
- [ ] No section-header icons or eyebrow labels.
- [ ] Exactly two halos on the homepage and one per service page; no other glows.
- [ ] Glassmorphism appears only in the services-stack AI layer.
- [ ] Mesh only in heroes, never visible through the hero graphic; exactly two arcs on the homepage; no circles outside the 6.5 list.
- [ ] The homepage hero matches `reference/hero-mockup.html` at 1440×820.
- [ ] The hero-bits graphic matches the mockup, animates once, is skipped under reduced motion, and hero text is visible at first paint.
- [ ] No scroll-triggered section animations.
- [ ] One primary CTA label ("Book a consultation") site-wide, pointing at a working booking page.
- [ ] The data-handling block contains only owner-confirmed statements, with no badges or seals.
- [ ] No copy says CosmoBits owns servers or a data centre.
- [ ] None of the phrases in 8.2 appear in rendered copy.
- [ ] Five service pages, `/about`, `/security` and `/contact` are live, each with a unique title, description, canonical and schema.
- [ ] `robots.txt` and `sitemap.xml` are live, and the schema validates.
- [ ] Mobile PSI: LCP < 2.5s, CLS < 0.1, INP < 200ms, or a documented reason why not.
- [ ] axe reports zero serious or critical issues, and a full keyboard pass is completed.
- [ ] `npm run check:placeholders` passes on the production build.

---

## Appendix A: Competitor review (Glitex Solutions)

Reviewed on 26 September 2026: https://www.glitexsolutions.co.ke/. Glitex is a Nairobi software company that sells to enterprise, government and NGO buyers, and it addresses procurement officers and CIOs directly.

**Borrowed, adapted, and where it lives in this spec:**

| Their practice | Our version | Section |
|---|---|---|
| Named case studies in Challenge / Solution / Outcome format, tagged by sector and country | Same structure, with outcomes that name their measure | Block 7 |
| Security and compliance written as specific commitments (Kenya DPA, data processing agreements, access control, residency, logging) | "How we handle your data", with owner-confirmed statements only, plus `/security` | Block 6 |
| Delivery phases listing concrete deliverables (workshops, assessments, architecture recommendation, SLA-backed support) | Four steps with deliverables and typical durations | Block 5 |
| Closing section addressed to procurement and institutional buyers | Procurement line and company profile PDF | Block 9 |
| One stats band with specific numbers present in the HTML | Same, with owner-supplied numbers only | 3.1, Block 8 |
| Calendly booking plus a separate quote form | Booking link plus the contact form as the quote route | 8.3, Block 10 |
| Skip-to-content link, real social profile URLs, separate portfolio, process and blog pages | Already in the spec | 10, 3.4, 9.4 |

**Seen there, deliberately not copied:**
- A grammar error ("We prides ourselves") and "one of the leading" in their meta description, which is the text Google shows in search results.
- Two H1s on the homepage, and a canonical URL (non-www) that doesn't match the served URL (www).
- Carousel markup that duplicates case studies and logos, with logos labelled "customer 0–17".
- Outcome figures like "97%" that don't say what was measured.
- Self-awarded compliance badges ("CCPA COMPLIANT", GDPR) shown as images.
- Buzzword copy ("enterprise-grade", "mission-critical", "future-ready", "seamless ecosystem") and a sentence copy-pasted between two sections.

**Where CosmoBits can win:** Glitex sells custom systems, but its homepage doesn't offer IT equipment, licensing or cloud infrastructure management. An institution can buy the devices, the licences, the cloud infrastructure design and operations, and the software from CosmoBits as one vendor. Blocks 3 and 7.7 make that visible. Take their structure, never their wording: two Nairobi firms with similar phrasing makes the second one look like the copy.

## Appendix B: Notes on the brand guidelines (Oct 2025 mini guidelines)

These notes are for the owner rather than the agent. They were found while preparing this spec.

1. **Superseded logo.** The guidelines PDF shows a monitor-and-circuits mark. The current logo (`COSMOBITS_LOGO_FINAL.png`) is the block mark. Update the guidelines, and replace the old mark wherever it still appears: social avatars, letterheads, email signatures, the site favicon.
2. **Demo fonts.** The Uni Sans files embedded in the PDF are Fontspring demo versions. Demo licences typically don't cover commercial use. Before Uni Sans is used in print, social graphics or on the web, buy the appropriate licences (desktop, and web if needed). The website uses Schibsted Grotesk (Section 5), so it isn't blocked by this.
3. **Copy-paste slip.** The image placement page refers to "The Careerelevate.ai Logo". Correct it to CosmoBits.
4. **Sample imagery.** The example photos in the guidelines have a polished stock/AI look. The photography brief (7.8) sets a more credible standard for the site, and could replace those examples in the next guidelines revision.
5. **Glassmorphism and the gradient.** Both are kept as brand elements. On the website each is used deliberately and sparingly (6.3, 7.7), which keeps them distinctive instead of turning them into wallpaper.
