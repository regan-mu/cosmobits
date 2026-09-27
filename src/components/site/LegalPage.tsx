import type { ReactNode } from 'react';
import { Mail, type LucideIcon } from 'lucide-react';
import { CONTACT } from '@/lib/contact';
import IconTile from './IconTile';
import LegalToc from './LegalToc';

export type LegalSection = { id: string; title: string; body: ReactNode };

// Body typography for the legal text: muted paragraphs, bulleted lists, underlined brand links
const PROSE = [
  'text-cb-muted [&>*+*]:mt-4',
  '[&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_li]:marker:text-cb-brand',
  '[&_a]:text-cb-brand [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[0.2em] [&_a:hover]:text-cb-text',
].join(' ');

type Props = {
  /** Icon on the header card */
  icon: LucideIcon;
  title: string;
  updated: string;
  /** One-paragraph summary under the title */
  intro: ReactNode;
  sections: LegalSection[];
  /** Line on the closing contact card, e.g. "Questions about your data?" */
  contactPrompt: string;
};

/**
 * Shared layout for /privacy and /terms (spec 6.3: calm, no halo, mesh or arc).
 * A header card in the same style as the closing contact card (owner
 * preference: icon tile, title, status line and summary), an "On This Page"
 * contents list (sticky on desktop, highlights the section being read),
 * numbered section headings, and the closing contact card.
 */
export default function LegalPage({ icon, title, updated, intro, sections, contactPrompt }: Props) {
  return (
    <article>
      <header className="cb-container pb-12 pt-[calc(var(--cb-header-h)+3rem)] lg:pb-16">
        <div className="flex flex-col items-center gap-5 rounded-xl border border-cb-border bg-cb-surface px-6 py-8 text-center lg:px-10 lg:py-12">
          <IconTile icon={icon} />
          <div className="min-w-0">
            <h1 className="cb-h2 text-cb-text">{title}</h1>
            <p className="cb-small mt-2 text-cb-muted">
              <span className="block text-cb-brand sm:inline">Under legal review</span>
              <span aria-hidden="true" className="hidden sm:inline"> · </span>
              <span className="block sm:inline">Last updated {updated}</span>
            </p>
            <div className="mx-auto mt-4 max-w-[62ch] text-lg text-pretty text-cb-muted">{intro}</div>
          </div>
        </div>
      </header>

      <div className="cb-container grid gap-10 pb-14 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="lg:col-span-3">
          <LegalToc items={sections.map(({ id, title }) => ({ id, title }))} />
        </div>

        <div className="lg:col-span-9 xl:col-span-8">
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="border-t border-cb-border py-10 first:border-t-0 first:pt-0"
            >
              <div className="flex items-baseline gap-4">
                <span aria-hidden="true" className="cb-tabular text-sm font-semibold text-cb-brand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 id={`${section.id}-heading`} className="cb-h3 text-cb-text">
                  {section.title}
                </h2>
              </div>
              <div className={`mt-4 sm:pl-10 ${PROSE}`}>{section.body}</div>
            </section>
          ))}

          <div className="mt-4 flex flex-col gap-4 rounded-xl border border-cb-border bg-cb-surface p-6 sm:flex-row sm:items-center lg:p-8">
            <IconTile icon={Mail} />
            <div>
              <p className="font-semibold text-cb-text">{contactPrompt}</p>
              <p className="mt-1 text-cb-muted">
                Email{' '}
                <a href={`mailto:${CONTACT.email}`} className="cb-link">
                  {CONTACT.email}
                </a>{' '}
                and we&apos;ll get back to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
