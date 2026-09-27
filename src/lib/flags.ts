/**
 * Content flags (spec 3.1, 7.3). Each one stays off until the owner supplies
 * the material it depends on; see .agents/ui-rewrite-tracker.md.
 */
export const FLAGS = {
  /** Block 2: needs the confirmed label and logos with permission */
  SHOW_PARTNERS: false,
  /** "About {service}" links, nav dropdown, footer links: needs the service pages (PR 4) */
  SHOW_SERVICE_PAGES: false,
  /** Block 5 "Typically …" lines: needs durations for every step */
  SHOW_STEP_DURATIONS: false,
  /** Block 5 "You own the code we write for you.": needs confirmed IP terms */
  SHOW_CODE_OWNERSHIP: false,
  /** Block 6: needs every commitment confirmed */
  SHOW_DATA_HANDLING: false,
  /** Block 8 photo: needs a real team or office photo */
  SHOW_ABOUT_PHOTO: false,
  /** Block 8 stats band: needs real numbers */
  SHOW_STATS: false,
  /** Procurement line in Contact: needs public/cosmobits-company-profile.pdf */
  SHOW_COMPANY_PROFILE: false,
} as const;
