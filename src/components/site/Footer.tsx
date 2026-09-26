import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, type LucideIcon } from 'lucide-react';
import { AI_SERVICE, SERVICES } from '@/content/site';
import { CONTACT, TAGLINE, whatsappUrl } from '@/lib/contact';
import { FLAGS } from '@/lib/flags';

const SOCIAL: { key: keyof typeof CONTACT.social; label: string; icon: LucideIcon }[] = [
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'x', label: 'X', icon: Twitter },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
];

// Until the service pages exist (PR 4), link to each service's block on the homepage.
const serviceLinks = [
  { name: 'AI', href: FLAGS.SHOW_SERVICE_PAGES ? AI_SERVICE.href : `/#${AI_SERVICE.id}` },
  ...SERVICES.map((s) => ({ name: s.name, href: FLAGS.SHOW_SERVICE_PAGES ? s.href : `/#${s.id}` })),
];

const companyLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

/** Block 11 (spec 7.3) */
export default function Footer() {
  const socials = SOCIAL.filter((s) => CONTACT.social[s.key]);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cb-border bg-cb-bg">
      <div className="cb-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" aria-label="CosmoBits Technologies home" className="inline-flex rounded-sm">
            <Image
              src="/cosmobits-technologies-logo-web.png"
              alt="CosmoBits Technologies"
              width={900}
              height={284}
              sizes="140px"
              className="h-11 w-auto"
            />
          </Link>
          <p className="cb-brandline mt-5">{TAGLINE}</p>
        </div>

        <nav aria-labelledby="footer-services" className="lg:col-span-3">
          <h2 id="footer-services" className="font-semibold">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5 text-cb-muted">
            {serviceLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company" className="lg:col-span-2">
          <h2 id="footer-company" className="font-semibold">
            Company
          </h2>
          <ul className="mt-4 space-y-2.5 text-cb-muted">
            {companyLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-semibold">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-cb-muted">
            <li>
              <a href={`tel:${CONTACT.phoneE164}`} className="transition-colors hover:text-white">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            {CONTACT.whatsappE164 && (
              <li>
                <a href={whatsappUrl(CONTACT.whatsappE164)} className="transition-colors hover:text-white">
                  WhatsApp
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-white">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <address className="not-italic">
                {CONTACT.address.line1}, {CONTACT.address.area}, {CONTACT.address.city}
              </address>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cb-border">
        <div className="cb-container cb-small flex flex-col gap-4 py-6 text-cb-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {year} CosmoBits Technologies</span>
            <Link href="/privacy" className="underline underline-offset-[0.2em] hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="underline underline-offset-[0.2em] hover:text-white">
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-6">
            {socials.length > 0 && (
              <ul className="flex items-center gap-1">
                {socials.map(({ key, label, icon: Icon }) => (
                  <li key={key}>
                    <a
                      href={CONTACT.social[key]!}
                      target="_blank"
                      rel="noopener"
                      aria-label={`CosmoBits on ${label} (opens in a new tab)`}
                      className="flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:text-white"
                    >
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <span>Made in Nairobi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
