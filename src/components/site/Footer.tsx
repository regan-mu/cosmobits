import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  type LucideIcon,
} from 'lucide-react';
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
const COLUMNS: { title: string; links: { name: string; href: string }[] }[] = [
  {
    title: 'Services',
    links: [
      { name: 'AI', href: FLAGS.SHOW_SERVICE_PAGES ? AI_SERVICE.href : `/#${AI_SERVICE.id}` },
      ...SERVICES.map((s) => ({ name: s.name, href: FLAGS.SHOW_SERVICE_PAGES ? s.href : `/#${s.id}` })),
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/#about' },
      { name: 'Contact', href: '/#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
];

/**
 * Block 11 (spec 7.3): the previous site's footer layout (owner preference) in
 * the current branding. No newsletter (no list exists, spec 3.7) and social
 * icons only for profiles set in CONTACT.social.
 */
export default function Footer() {
  const socials = SOCIAL.filter((s) => CONTACT.social[s.key]);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cb-border bg-cb-bg">
      <div className="cb-container grid gap-12 border-b border-cb-border pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <Link href="/" aria-label="CosmoBits Technologies home" className="inline-flex rounded-sm">
            <Image
              src="/cosmobits-technologies-logo-web.png"
              alt="CosmoBits Technologies"
              width={900}
              height={284}
              sizes="180px"
              className="h-14 w-auto"
            />
          </Link>
          <p className="cb-brandline mt-6">{TAGLINE}</p>
          <p className="mt-3 max-w-md text-cb-muted">
            AI, custom software, cloud infrastructure and IT supply for businesses in Kenya and across Africa.
          </p>

          <ul className="mt-6 space-y-3 text-cb-muted">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-3 transition-colors hover:text-cb-brand">
                <Mail size={18} strokeWidth={1.75} aria-hidden="true" className="text-cb-brand" />
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phoneE164}`} className="inline-flex items-center gap-3 transition-colors hover:text-cb-brand">
                <Phone size={18} strokeWidth={1.75} aria-hidden="true" className="text-cb-brand" />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            {CONTACT.whatsappE164 && (
              <li>
                <a
                  href={whatsappUrl(CONTACT.whatsappE164)}
                  className="inline-flex items-center gap-3 transition-colors hover:text-cb-brand"
                >
                  <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" className="text-cb-brand" />
                  WhatsApp
                </a>
              </li>
            )}
            <li className="flex items-center gap-3">
              <MapPin size={18} strokeWidth={1.75} aria-hidden="true" className="shrink-0 text-cb-brand" />
              <address className="not-italic">
                {CONTACT.address.area}, {CONTACT.address.city}, {CONTACT.address.country}
              </address>
            </li>
          </ul>

          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map(({ key, label, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={CONTACT.social[key]!}
                    target="_blank"
                    rel="noopener"
                    aria-label={`CosmoBits on ${label} (opens in a new tab)`}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-cb-border text-cb-muted transition-colors hover:border-cb-brand/40 hover:text-cb-brand"
                  >
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-labelledby={`footer-${col.title.toLowerCase()}`}>
            <h2 id={`footer-${col.title.toLowerCase()}`} className="font-semibold text-cb-text">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-cb-muted transition-colors hover:text-cb-brand"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="cb-container cb-small flex flex-col items-center justify-between gap-3 py-6 text-center text-cb-muted md:flex-row md:text-left">
        <span>© {year} CosmoBits Technologies. All rights reserved.</span>
        <span className="inline-flex items-center gap-1.5">
          Made with
          <Heart size={14} aria-hidden="true" className="fill-cb-brand text-cb-brand" />
          <span className="cb-sr-only">love</span>
          in Nairobi
        </span>
      </div>
    </footer>
  );
}
