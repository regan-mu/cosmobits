/**
 * Case studies (spec 7.3 block 7). The homepage section appears once at least
 * one entry has `published: true`; it shows up to three.
 *
 * Outcomes must name their measure ("report turnaround: 3 days → same day"),
 * never a bare percentage. Client names and quotes need written permission.
 */
export type CaseStudy = {
  slug: string;
  /** Client name, or a description like "a Nairobi logistics company" when anonymised */
  client: string;
  anonymised: boolean;
  /** Path under /public, only with permission */
  logo?: string;
  sector: string;
  country: string;
  services: string[];
  challenge: string;
  solution: string;
  outcomes: { measure: string; before?: string; after: string }[];
  quote?: { text: string; name: string; role: string };
  /** Client site, if they agree */
  url?: string;
  published: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [];

export const publishedWork = () => CASE_STUDIES.filter((c) => c.published);
