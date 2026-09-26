import { AI_CAPABILITIES } from '@/content/site';
import { FLAGS } from '@/lib/flags';
import BookingLink from './BookingLink';

/** Block 4 (spec 7.3): a compact two-column list, no icons, cards or tags. */
export default function AIPractice() {
  return (
    <section id="ai" aria-labelledby="ai-heading" className="cb-section">
      <div className="cb-container">
        <header className="cb-section-header">
          <h2 id="ai-heading" className="cb-h2">
            AI in practice
          </h2>
          <p className="cb-lead">
            Most of our AI work starts with a problem a team already has: too many repetitive customer
            questions, documents typed up by hand, stock that runs out without warning.
          </p>
        </header>

        <dl className="grid gap-x-12 md:grid-cols-2">
          {AI_CAPABILITIES.map((item) => (
            <div key={item.name} className="border-t border-cb-border py-5">
              <dt className="cb-h4">{item.name}</dt>
              <dd className="mt-1.5 max-w-[52ch] text-cb-muted">{item.text}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-col items-start gap-3">
          <BookingLink className="cb-btn cb-btn--lg" />
          <p className="cb-small text-cb-muted">The first consultation is free.</p>
          {FLAGS.SHOW_DATA_HANDLING && (
            <a href="#data" className="cb-link mt-2">
              How we handle your data
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
