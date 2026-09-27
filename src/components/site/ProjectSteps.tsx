import { PROCESS_STEPS } from '@/content/site';
import { FLAGS } from '@/lib/flags';
import Reveal from './Reveal';

/**
 * Block 5 (spec 7.3): numbered step cards on a colour band (owner-supplied
 * reference pattern). One card is highlighted: the first by default, then
 * whichever the pointer is over. Replaces "Why choose us" and "Our values".
 */
export default function ProjectSteps() {
  return (
    <section id="process" aria-labelledby="process-heading" className="cb-steps-section cb-section">
      <div className="cb-container">
        <Reveal as="header" className="cb-section-header">
          <h2 id="process-heading" className="cb-h2">
            How We Run Our Projects
          </h2>
        </Reveal>

        <ol className="cb-steps grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="flex">
              <div className="cb-step flex w-full flex-col rounded-xl border p-7 lg:p-8">
                <span
                  aria-hidden="true"
                  className="cb-tabular flex h-12 w-12 items-center justify-center rounded-full bg-cb-brand text-xl font-bold text-cb-brand-ink"
                >
                  {i + 1}
                </span>
                <h3 className="cb-h4 mt-6">
                  <span className="cb-sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="cb-step__text mt-3">{step.text}</p>
                {FLAGS.SHOW_STEP_DURATIONS && step.duration && (
                  <p className="cb-step__text cb-small mt-auto pt-5">Typically {step.duration.toLowerCase()}</p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        {FLAGS.SHOW_CODE_OWNERSHIP && (
          <p className="mt-12 text-center font-semibold">You own the code we write for you.</p>
        )}
      </div>
    </section>
  );
}
