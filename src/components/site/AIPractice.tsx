import { Bot, CheckCircle2, Cpu, Eye, FileText, LineChart, Workflow, type LucideIcon } from 'lucide-react';
import { AI_CAPABILITIES } from '@/content/site';
import { FLAGS } from '@/lib/flags';
import BookingLink from './BookingLink';
import Reveal from './Reveal';
import { Arc } from './decor';

// Same icon set, stroke and brand colour as the service cards (spec 7.2)
const ICONS: Record<string, LucideIcon> = {
  chatbots: Bot,
  forecasting: LineChart,
  documents: FileText,
  vision: Eye,
  automation: Workflow,
  custom: Cpu,
};

/**
 * Block 4 (spec 7.3): the previous site's card grid (owner preference), in the
 * new visual language: flat bordered cards, line icons, no glow or hover lift.
 */
export default function AIPractice() {
  return (
    <section id="ai" aria-labelledby="ai-heading" className="cb-section relative isolate overflow-hidden">
      <Arc className="-bottom-[420px] -left-[420px] h-[640px] w-[640px] lg:-bottom-[620px] lg:-left-[600px] lg:h-[1000px] lg:w-[1000px]" />
      <div className="cb-container">
        <Reveal as="header" className="cb-section-header">
          <h2 id="ai-heading" className="cb-h2">
            AI in Practice
          </h2>
          <p className="cb-lead">
            Most of our AI work starts with a problem a team already has: too many repetitive customer
            questions, documents typed up by hand, stock that runs out without warning.
          </p>
        </Reveal>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AI_CAPABILITIES.map((item, i) => {
            const Icon = ICONS[item.id];
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={(i % 3) * 100}
                className="flex flex-col rounded-xl border border-cb-border bg-cb-surface p-6 lg:p-7"
              >
                <Icon size={24} strokeWidth={1.5} aria-hidden="true" className="mb-5 text-cb-brand" />
                <h3 className="cb-h4 text-cb-text">{item.name}</h3>
                <p className="mt-2 text-cb-muted">{item.text}</p>
                <ul className="mt-5 space-y-2 border-t border-cb-border pt-5 text-[0.9375rem] text-cb-muted">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <CheckCircle2
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="mt-[0.2em] shrink-0 text-cb-brand"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12 flex flex-col items-center gap-3 text-center">
          <BookingLink className="cb-btn cb-btn--lg" />
          {FLAGS.SHOW_DATA_HANDLING && (
            <a href="#data" className="cb-link mt-2">
              How we handle your data
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
