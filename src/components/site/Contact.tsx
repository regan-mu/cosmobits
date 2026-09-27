import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CONTACT, whatsappUrl } from '@/lib/contact';
import { FLAGS } from '@/lib/flags';
import ContactForm from './ContactForm';
import IconTile from './IconTile';

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

        <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:order-2 lg:col-span-3">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:order-1 lg:col-span-2">
            <div className="rounded-xl border border-cb-border bg-cb-surface p-6 lg:p-8">
              <h3 className="cb-h4 text-cb-text">Contact Information</h3>
              <ul className="mt-6 space-y-6">
                <li className="flex gap-4">
                  <IconTile icon={MapPin} />
                  <div>
                    <h4 className="font-semibold text-cb-text">Visit Us</h4>
                    <address className="mt-1 not-italic text-cb-muted">
                      {address.line1}
                      <br />
                      {address.area}, {address.city}, {address.country}
                    </address>
                    <a
                      href={CONTACT.mapsUrl}
                      target="_blank"
                      rel="noopener"
                      className="cb-link mt-1 inline-block text-[0.9375rem]"
                    >
                      Get directions
                      <span className="cb-sr-only"> (opens Google Maps in a new tab)</span>
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <IconTile icon={Phone} />
                  <div>
                    <h4 className="font-semibold text-cb-text">Call Us</h4>
                    <a href={`tel:${CONTACT.phoneE164}`} className="mt-1 inline-block text-cb-muted hover:text-cb-text">
                      {CONTACT.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <IconTile icon={Mail} />
                  <div>
                    <h4 className="font-semibold text-cb-text">Email Us</h4>
                    <a href={`mailto:${CONTACT.email}`} className="mt-1 inline-block text-cb-muted hover:text-cb-text">
                      {CONTACT.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <IconTile icon={Clock} />
                  <div>
                    <h4 className="font-semibold text-cb-text">Working Hours</h4>
                    <dl className="cb-tabular mt-1 text-cb-muted">
                      {CONTACT.hours.map((h) => (
                        <div key={h.days} className="flex gap-3">
                          <dt className="w-16">{h.days}</dt>
                          <dd>{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-cb-border bg-cb-surface p-6 lg:p-8">
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
