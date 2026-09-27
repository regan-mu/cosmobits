import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CONTACT, whatsappUrl } from '@/lib/contact';
import { FLAGS } from '@/lib/flags';
import ContactForm from './ContactForm';
import IconTile from './IconTile';

const ITEM = 'flex items-center gap-3 sm:gap-4';
const TITLE = 'text-base font-semibold leading-snug text-cb-text';
const DETAIL = 'mt-0.5 text-sm leading-5 text-cb-muted';

/** "8:00–18:00" → "8am–6pm", so the hours fit on one line beside their icon */
const shortHours = (range: string) =>
  range
    .split('–')
    .map((t) => {
      const [h, m] = t.split(':').map(Number);
      const hour12 = h % 12 || 12;
      return `${hour12}${m ? `:${String(m).padStart(2, '0')}` : ''}${h < 12 ? 'am' : 'pm'}`;
    })
    .join('–');

const PILL =
  'inline-flex min-h-11 items-center gap-2 rounded-full border border-cb-brand/30 bg-cb-brand/10 px-4 text-[0.9375rem] font-medium text-cb-brand transition-colors hover:bg-cb-brand/20';

/**
 * Block 10 (spec 7.3): the previous site's layout (owner preference), in the
 * current branding. Contact details and quick links on the left, the form on
 * the right; the form comes first on mobile.
 */
export default function Contact() {
  const { address } = CONTACT;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="cb-section">
      <div className="cb-container">
        <header className="cb-section-header">
          <h2 id="contact-heading" className="cb-h2">
            Get in Touch
          </h2>
          <p className="cb-lead text-balance">
            Tell us about your project or ask us a question. We&apos;ll reply {CONTACT.replyTime}.
          </p>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:order-2 lg:col-span-7">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:order-1 lg:col-span-5">
            <div className="rounded-xl border border-cb-border bg-cb-surface p-5 sm:p-6 lg:p-8">
              <h3 className="cb-h4 text-cb-text">Contact Information</h3>
              {/* Each item is as tall as its 48px icon tile: a title and one smaller line, as on the previous site */}
              <ul className="mt-6 space-y-5">
                <li className={ITEM}>
                  <IconTile icon={MapPin} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h4 className={TITLE}>Visit Us</h4>
                      <a href={CONTACT.mapsUrl} target="_blank" rel="noopener" className="cb-link text-xs">
                        Get directions
                        <span className="cb-sr-only"> (opens Google Maps in a new tab)</span>
                      </a>
                    </div>
                    <address className={`${DETAIL} not-italic`}>
                      {address.line1}, {address.area}
                    </address>
                  </div>
                </li>
                <li className={ITEM}>
                  <IconTile icon={Phone} />
                  <div className="min-w-0">
                    <h4 className={TITLE}>Call Us</h4>
                    <a href={`tel:${CONTACT.phoneE164}`} className={`${DETAIL} block hover:text-cb-text`}>
                      {CONTACT.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className={ITEM}>
                  <IconTile icon={Mail} />
                  <div className="min-w-0">
                    <h4 className={TITLE}>Email Us</h4>
                    <a href={`mailto:${CONTACT.email}`} className={`${DETAIL} block hover:text-cb-text`}>
                      {CONTACT.email}
                    </a>
                  </div>
                </li>
                <li className={ITEM}>
                  <IconTile icon={Clock} />
                  <div className="min-w-0">
                    <h4 className={TITLE}>Working Hours</h4>
                    <p className={DETAIL}>
                      {CONTACT.hours.map((h) => `${h.days} ${shortHours(h.time)}`).join(', ')}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-cb-border bg-cb-surface p-5 sm:p-6 lg:p-8">
              <h3 className="cb-h4 text-cb-text">Quick Connect</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={`mailto:${CONTACT.email}`} className={PILL}>
                  <Mail size={16} aria-hidden="true" />
                  Email Us
                </a>
                <a href={`tel:${CONTACT.phoneE164}`} className={PILL}>
                  <Phone size={16} aria-hidden="true" />
                  Call Now
                </a>
                {CONTACT.whatsappE164 && (
                  <a href={whatsappUrl(CONTACT.whatsappE164)} className={PILL}>
                    <MessageCircle size={16} aria-hidden="true" />
                    WhatsApp
                  </a>
                )}
              </div>

              {FLAGS.SHOW_COMPANY_PROFILE && (
                <p className="cb-small mt-6 border-t border-cb-border pt-5 text-cb-muted">
                  Buying through a tender or procurement process?{' '}
                  <a href="/cosmobits-company-profile.pdf" className="cb-link">
                    Download our company profile (PDF)
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
