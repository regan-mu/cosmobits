import { CONTACT } from '@/lib/contact';
import { FLAGS } from '@/lib/flags';
import BookingLink from './BookingLink';
import { Arc, Halo } from './decor';

/** Block 9 (spec 7.3): Halo #2 and the mirrored arc sit behind it; no mesh. */
export default function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="cb-cta-band cb-section border-y border-cb-border">
      <Arc className="cb-cta-arc" />
      <Halo className="cb-cta-halo" strength={0.34} />

      <div className="cb-container flex flex-col items-center text-center">
        <h2 id="cta-heading" className="cb-h2">
          Tell us what you&apos;re working on.
        </h2>
        <p className="cb-lead mt-3 max-w-none">We&apos;ll reply {CONTACT.replyTime}.</p>
        <BookingLink className="cb-btn cb-btn--lg mt-8" />
        {FLAGS.SHOW_COMPANY_PROFILE && (
          <p className="cb-small mt-6 max-w-[48ch] text-cb-muted">
            Buying through a tender or procurement process?{' '}
            <a href="/cosmobits-company-profile.pdf" className="cb-link">
              Download our company profile (PDF)
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
