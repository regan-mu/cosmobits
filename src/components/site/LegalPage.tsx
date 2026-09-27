import type { ReactNode } from 'react';
import { Mail } from 'lucide-react';
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
 * A centred header band, an "On This Page" contents list (sticky on desktop,
 * highlights the section being read), numbered section headings, and a
 * closing contact card.
 */
export default function LegalPage({ title, updated, intro, sections, contactPrompt }: Props) {
  return (
    <article>
      <header className="border-b border-cb-border bg-cb-surface pb-14 pt-[calc(var(--cb-header-h)+3.5rem)] lg:pb-16">
        <div className="cb-container text-center">
          <p className="cb-small inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-cb-border bg-cb-bg px-4 py-1.5 text-cb-muted">
            <span className="text-cb-brand">Under legal review</span>
            <span aria-hidden="true">·</span>
            <span>Last updated {updated}</span>
          </p>
          <h1 className="cb-h2 mt-6">{title}</h1>
          <div className="cb-lead mx-auto mt-4 text-balance" style={{ maxWidth: '44rem' }}>
            {intro}
          </div>
        </div>
      </header>

      <div className="cb-container grid gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
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
