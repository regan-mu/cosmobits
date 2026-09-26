import { PROCESS_STEPS } from '@/content/site';
import { FLAGS } from '@/lib/flags';

/** Block 5 (spec 7.3): replaces "Why choose us" and "Our values". A real sequence, so it's numbered. */
export default function ProjectSteps() {
  return (
    <section id="process" aria-labelledby="process-heading" className="cb-section cb-section--surface">
      <div className="cb-container">
        <header className="cb-section-header">
          <h2 id="process-heading" className="cb-h2">
            How a project runs
          </h2>
        </header>

        <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col border-t border-cb-border pt-6">
              <span aria-hidden="true" className="cb-tabular text-2xl font-bold text-cb-brand">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="cb-h4 mt-4">
                <span className="cb-sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-cb-muted">{step.text}</p>
              {FLAGS.SHOW_STEP_DURATIONS && step.duration && (
                <p className="cb-small mt-4 text-cb-muted">Typically {step.duration.toLowerCase()}</p>
              )}
            </li>
          ))}
        </ol>

        {FLAGS.SHOW_CODE_OWNERSHIP && <p className="mt-12 font-semibold">You own the code we write for you.</p>}
      </div>
    </section>
  );
}
