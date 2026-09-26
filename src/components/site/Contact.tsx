import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CONTACT, whatsappUrl } from '@/lib/contact';
import BookingLink from './BookingLink';
import ContactForm from './ContactForm';

/** Block 10 (spec 7.3): details left, form right; the form comes first on mobile. */
export default function Contact() {
  const { address } = CONTACT;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="cb-section">
      <div className="cb-container">
        <header className="cb-section-header">
          <h2 id="contact-heading" className="cb-h2">
            Contact
          </h2>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:order-2 lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>

          <div className="lg:order-1 lg:col-span-4">
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin size={20} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-cb-muted" />
                <div>
                  <h3 className="font-semibold">Office</h3>
                  <address className="mt-1 not-italic text-cb-muted">
                    {address.line1}
                    <br />
                    {address.area}, {address.city}, {address.country}
                  </address>
                  <a href={CONTACT.mapsUrl} target="_blank" rel="noopener" className="cb-link mt-1 inline-block">
                    Get directions
                    <span className="cb-sr-only"> (opens Google Maps in a new tab)</span>
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone size={20} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-cb-muted" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href={`tel:${CONTACT.phoneE164}`} className="cb-link mt-1 inline-block">
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </li>
              {CONTACT.whatsappE164 && (
                <li className="flex gap-4">
                  <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-cb-muted" />
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <a href={whatsappUrl(CONTACT.whatsappE164)} className="cb-link mt-1 inline-block">
                      Message us on WhatsApp
                    </a>
                  </div>
                </li>
              )}
              <li className="flex gap-4">
                <Mail size={20} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-cb-muted" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href={`mailto:${CONTACT.email}`} className="cb-link mt-1 inline-block">
                    {CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock size={20} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-cb-muted" />
                <div>
                  <h3 className="font-semibold">Hours</h3>
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

            {/* Until the booking page exists, "Book a consultation" points here, so skip it */}
            {CONTACT.bookingUrl && (
              <div className="mt-10 border-t border-cb-border pt-8">
                <p className="text-cb-muted">Rather talk it through?</p>
                <BookingLink className="cb-btn mt-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
