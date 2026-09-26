/**
 * Homepage copy (spec 7.3, 8). Drafts from the spec, with every unconfirmed
 * fact left out or set to `null`. When the owner confirms something, add it
 * here and switch on the matching flag in src/lib/flags.ts.
 */

export type Service = {
  /** Anchor id on the homepage, later the service page slug */
  id: string;
  name: string;
  /** Short name for links, e.g. "About cloud infrastructure" */
  shortName: string;
  summary: string;
  bullets: string[];
  /** Service page (PR 4); linked only when FLAGS.SHOW_SERVICE_PAGES is on */
  href: string;
};

/** Block 3. AI has its own block (4), so it isn't one of these four. */
export const SERVICES: Service[] = [
  {
    id: 'software-development',
    name: 'Software development',
    shortName: 'software development',
    summary: 'Web apps, mobile apps and internal systems, built and maintained by our team.',
    bullets: [
      'Web and mobile apps',
      'API integrations',
      'DevOps and CI/CD setup',
      'Engineering process reviews for small teams',
    ],
    href: '/services/software-development',
  },
  {
    id: 'cloud',
    name: 'Cloud infrastructure',
    shortName: 'cloud infrastructure',
    // Infrastructure wording rule (7.3): CosmoBits designs and manages infrastructure on
    // cloud providers' platforms; it doesn't own servers or run a data centre.
    summary:
      'We design your cloud architecture, build it as code, run it day to day, and keep the monthly bill in line with what you actually use.',
    bullets: [
      'Architecture and infrastructure design',
      'Migration to the cloud or between providers',
      'Infrastructure as code, monitoring and backups',
      'Cost optimisation and right-sizing',
    ],
    href: '/services/cloud',
  },
  {
    id: 'it-equipment',
    name: 'IT equipment supply',
    shortName: 'IT equipment',
    summary: 'Servers, networking and staff devices, installed and supported.',
    bullets: ['Servers and storage', 'Networking', 'Laptops and desktops', 'Installation and maintenance'],
    href: '/services/it-equipment',
  },
  {
    id: 'software-licensing',
    name: 'Software licensing',
    shortName: 'software licensing',
    summary: 'Operating systems, security suites and enterprise licences, bought right and tracked.',
    bullets: [
      'OS and Microsoft licensing',
      'Anti-malware and security suites',
      'Volume licensing',
      'Licence tracking',
    ],
    href: '/services/software-licensing',
  },
];

export const AI_SERVICE = { id: 'ai', name: 'AI', href: '/services/ai' };

/** Block 4. `id` picks the card's icon in AIPractice. */
export const AI_CAPABILITIES = [
  {
    id: 'chatbots',
    name: 'Chatbots and assistants',
    // Add the languages once confirmed, e.g. "…on your website or WhatsApp, in English and Swahili, …"
    text: 'Answer customer questions on your website or WhatsApp, handing over to staff when needed.',
    points: ['Website and WhatsApp chat', 'Answers drawn from your own documents', 'Hand-over to your team'],
  },
  {
    id: 'forecasting',
    name: 'Forecasting',
    text: 'Predict sales, demand or risk from the data you already keep.',
    points: ['Sales and demand forecasts', 'Stock and reorder planning', 'Risk scoring'],
  },
  {
    id: 'documents',
    name: 'Document processing',
    text: 'Read invoices, forms and contracts, and pull the fields into your systems.',
    points: ['Invoices, receipts and forms', 'Contract review', 'Extracted fields sent to your systems'],
  },
  {
    id: 'vision',
    name: 'Computer vision',
    text: 'Spot defects, count stock or check safety gear from camera feeds.',
    points: ['Defect detection', 'Stock counts from camera feeds', 'Safety-gear checks'],
  },
  {
    id: 'automation',
    name: 'Workflow automation',
    text: "Take repetitive data entry and routing off your team's plate.",
    points: ['Data entry between systems', 'Routing and approvals', 'Scheduled reports'],
  },
  {
    id: 'custom',
    name: 'Custom models',
    text: "Trained on your data when an off-the-shelf tool won't do.",
    points: ['Trained on your own data', 'Tested on your real cases before launch', 'Handed over with documentation'],
  },
];

/** Block 5. `duration` shows only when FLAGS.SHOW_STEP_DURATIONS is on. */
export const PROCESS_STEPS: { title: string; text: string; duration: string | null }[] = [
  {
    title: 'Consultation',
    text: "A free call to understand the problem. We'll tell you if we're not the right fit.",
    duration: null,
  },
  {
    title: 'Assessment & proposal',
    text: "We talk to the people involved and review your current systems. You then get a written proposal with scope, recommended architecture, timeline and price. Nothing is built until you've approved it.",
    duration: null,
  },
  {
    title: 'Build',
    text: 'Work runs to agreed milestones. Each milestone includes testing and security checks, and documentation is written as we go.',
    duration: 'Depends on scope',
  },
  {
    title: 'Handover & support',
    text: 'We deploy the system, train your staff, and hand over the documentation. Support follows on the terms we agree with you.',
    duration: 'Ongoing',
  },
];

/** Block 6. Every item must be owner-confirmed before FLAGS.SHOW_DATA_HANDLING goes on. */
export const DATA_COMMITMENTS = [
  {
    title: "Kenya's Data Protection Act, 2019",
    text: 'We process client personal data under a written data processing agreement, signed before work starts.',
  },
  {
    title: 'Data residency',
    text: 'Infrastructure is set up in the region your contract specifies, and we keep your data there.',
  },
  {
    title: 'Access control',
    text: 'Our staff get access only to the systems their role needs, and access is removed when a project ends.',
  },
  {
    title: 'Your data stays yours',
    text: "Client data isn't used to train models for anyone else.",
  },
];

/**
 * Block 8. Follows the outline of the owner's reference (who we are, what we
 * build, who for, what we're good at) in CosmoBits' own words; a competitor's
 * wording must never be copied (spec Appendix A).
 */
export const ABOUT = {
  /** Owner to supply; appended to the first paragraph when set */
  foundedYear: null as number | null,
  /** e.g. "SMEs, NGOs, law firms and fintechs"; replaces the generic "businesses and organisations" */
  clientTypes: null as string | null,
  /** One sentence about the founders or team */
  teamSentence: null as string | null,
};

/** Block 8, right column (owner preference: the previous site's principles, rewritten plainly) */
export const PRINCIPLES = [
  {
    id: 'practical',
    title: 'Practical innovation',
    text: "We use newer tools like AI where they solve a real problem, and we'll say so when a simpler fix will do.",
  },
  {
    id: 'quality',
    title: 'Built properly',
    text: 'Tested, documented and secured before it goes live, not patched afterwards.',
  },
  {
    id: 'partnership',
    title: 'Partnership',
    text: 'We work alongside your team through the project and after it goes live.',
  },
  {
    id: 'impact',
    title: 'Lasting impact',
    text: 'Systems your team can understand, run and extend for years, not ones only we can keep alive.',
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    text: 'Your people are involved at every stage, from the first call to training at handover.',
  },
];

/** Block 8 stats band, shown only with FLAGS.SHOW_STATS. Owner-supplied numbers only. */
export const STATS: { value: string; label: string }[] = [];

/** Block 2, shown only with FLAGS.SHOW_PARTNERS */
export const PARTNERS = {
  /** "Partners", "Clients" or "Some of the teams we work with": owner to confirm */
  label: null as string | null,
  items: [
    { name: 'Qloud Point Solutions', url: 'https://qloudpointsolutions.com', logo: null as string | null },
    { name: 'CareerElevate.ai', url: 'https://careerelevate.ai', logo: null as string | null },
    { name: 'Pamba Africa', url: 'https://pamba.africa', logo: null as string | null },
    { name: 'Nsimbi Advocacy', url: 'https://nsimbiadvocacy.com', logo: null as string | null },
  ],
};

/** Contact form service options (renamed services, 4.2 C9) */
export const ENQUIRY_TOPICS = [
  'AI',
  'Software development',
  'Cloud infrastructure',
  'IT equipment supply',
  'Software licensing',
  'General enquiry',
];
