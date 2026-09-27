import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/site/LegalPage';

// Draft (spec 9.5): short website terms, pending legal review. Kept out of
// search results until the reviewed version is published.
export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms for using the CosmoBits Technologies website.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

// The closing contact card on the page covers "questions about these terms".
const SECTIONS: LegalSection[] = [
  {
    id: 'information-on-this-site',
    title: 'Information on This Site',
    body: (
      <p>
        We describe our services here as accurately as we can, but the content is general information, not an
        offer or professional advice for your situation. Scope, price and timelines for any project are set in a
        written proposal.
      </p>
    ),
  },
  {
    id: 'our-content',
    title: 'Our Content',
    body: (
      <p>
        The text, graphics and logo on this site belong to CosmoBits Technologies. Please don&apos;t copy or reuse
        them without our permission.
      </p>
    ),
  },
  {
    id: 'links-to-other-sites',
    title: 'Links to Other Sites',
    body: (
      <p>
        We link to other websites where it&apos;s useful. We&apos;re not responsible for their content or how they
        handle your data.
      </p>
    ),
  },
  {
    id: 'using-the-contact-form',
    title: 'Using the Contact Form',
    body: (
      <p>
        Please don&apos;t send passwords, payment details or other sensitive information through the contact form.
        Our <a href="/privacy">privacy policy</a> explains how we handle what you do send.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    body: <p>These terms are governed by the laws of Kenya.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="26 September 2026"
      intro={
        <p>
          These terms cover your use of this website. Work we do for clients is covered by the written agreement
          for that project, not by these terms.
        </p>
      }
      sections={SECTIONS}
      contactPrompt="Questions about these terms?"
    />
  );
}
