import type { Metadata } from 'next';
import LegalPage from '@/components/site/LegalPage';
import { CONTACT } from '@/lib/contact';

// Draft (spec 9.5): short website terms, pending legal review. Kept out of
// search results until the reviewed version is published.
export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'Terms for using the CosmoBits Technologies website.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="26 September 2026">
      <p>
        These terms cover your use of this website. Work we do for clients is covered by the written agreement
        for that project, not by these terms.
      </p>

      <h2>Information on this site</h2>
      <p>
        We describe our services here as accurately as we can, but the content is general information, not an
        offer or professional advice for your situation. Scope, price and timelines for any project are set in a
        written proposal.
      </p>

      <h2>Our content</h2>
      <p>
        The text, graphics and logo on this site belong to CosmoBits Technologies. Please don&apos;t copy or
        reuse them without our permission.
      </p>

      <h2>Links to other sites</h2>
      <p>
        We link to other websites where it&apos;s useful. We&apos;re not responsible for their content or how
        they handle your data.
      </p>

      <h2>Using the contact form</h2>
      <p>
        Please don&apos;t send passwords, payment details or other sensitive information through the contact
        form. Our <a href="/privacy">privacy policy</a> explains how we handle what you do send.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Kenya.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    </LegalPage>
  );
}
