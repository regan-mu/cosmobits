import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import LegalPage, { type LegalSection } from '@/components/site/LegalPage';
import { CONTACT } from '@/lib/contact';

// Draft (spec 9.5): plain-language structure, pending legal review. Kept out of
// search results until the reviewed version is published.
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How CosmoBits Technologies collects and uses personal data sent through this website.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
};

const email = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;
const newTab = <span className="cb-sr-only"> (opens in a new tab)</span>;

const SECTIONS: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who We Are',
    body: (
      <p>
        CosmoBits Technologies, {CONTACT.address.line1}, {CONTACT.address.area}, {CONTACT.address.city},{' '}
        {CONTACT.address.country}. For anything about your data, email {email}.
      </p>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What We Collect',
    body: (
      <>
        <p>When you send the contact form, we collect:</p>
        <ul>
          <li>your name and email address;</li>
          <li>your company name and phone number, if you give them;</li>
          <li>the topic you choose and your message.</li>
        </ul>
        <p>We don&apos;t use advertising or analytics cookies on this website.</p>
      </>
    ),
  },
  {
    id: 'why-we-collect-it',
    title: 'Why We Collect It',
    body: (
      <p>
        We use these details only to reply to your enquiry and to follow it up, for example with a proposal you
        asked for. We don&apos;t sell your data or add you to a mailing list.
      </p>
    ),
  },
  {
    id: 'who-can-see-it',
    title: 'Who Can See It',
    body: (
      <ul>
        <li>Members of our team who handle enquiries.</li>
        <li>
          Our email delivery provider, which sends our notification of your enquiry and the confirmation email you
          receive.
        </li>
        <li>
          Google reCAPTCHA, which checks that form submissions come from a person rather than a bot. Google&apos;s{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">
            privacy policy
            {newTab}
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener">
            terms of service
            {newTab}
          </a>{' '}
          apply to that check.
        </li>
      </ul>
    ),
  },
  {
    id: 'how-long-we-keep-it',
    title: 'How Long We Keep It',
    body: (
      <p>
        We keep enquiries for as long as we need them to respond and follow up, and delete them sooner if you ask.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    body: (
      <p>
        You can ask us to show you the personal data we hold about you, correct it, or delete it, and you can
        object to how we use it. Email {email} and we&apos;ll respond. If you&apos;re not satisfied with our answer,
        you can complain to the Office of the Data Protection Commissioner in Kenya.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    body: <p>If we change this policy, we&apos;ll update this page and the date at the top.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      icon={FileText}
      title="Privacy Policy"
      updated="26 September 2026"
      intro={
        <p>
          What personal data CosmoBits Technologies collects through this website, why, and what you can ask us to
          do with it. Kenya&apos;s Data Protection Act, 2019 applies to the personal data we collect here.
        </p>
      }
      sections={SECTIONS}
      contactPrompt="Questions about your data?"
    />
  );
}
