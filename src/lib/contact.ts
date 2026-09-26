/**
 * Single source for contact details (spec 3.2). Every component reads from here.
 * `null` means the owner hasn't supplied the value yet; the UI hides whatever
 * depends on it. See .agents/ui-rewrite-tracker.md, "Owner content".
 */
export const CONTACT = {
  phoneDisplay: '+254 119 699 617',
  phoneE164: '+254119699617',
  email: 'hello@cosmobits.tech',
  /** WhatsApp Business number in E.164, e.g. "+2547..." */
  whatsappE164: null as string | null,
  /** Google Calendar appointment schedule or Calendly URL */
  bookingUrl: null as string | null,
  /** Reply-time promise, used in the CTA band and the form's success message */
  replyTime: 'within 24 hours',
  address: {
    line1: 'APA Arcade, Level 1',
    area: 'Hurlingham',
    city: 'Nairobi',
    country: 'Kenya',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=APA+Arcade+Hurlingham+Nairobi',
  hours: [
    { days: 'Mon–Fri', time: '8:00–18:00' },
    { days: 'Sat', time: '9:00–13:00' },
  ],
  social: {
    linkedin: null as string | null,
    x: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
  },
};

export const TAGLINE = 'Intelligent Solutions, Lasting Impact.';

/** Where "Book a consultation" goes: the booking page once it exists, else the contact section. */
export const BOOKING = CONTACT.bookingUrl
  ? { href: CONTACT.bookingUrl, external: true }
  : { href: '/#contact', external: false };

export const whatsappUrl = (e164: string) => `https://wa.me/${e164.replace(/\D/g, '')}`;
