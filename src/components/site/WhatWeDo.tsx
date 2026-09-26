import { CheckCircle2, Cloud, Code2, KeyRound, Server, type LucideIcon } from 'lucide-react';
import { SERVICES } from '@/content/site';
import { BOOKING } from '@/lib/contact';
import { FLAGS } from '@/lib/flags';
import ServicesStack, { ServicesStackTall } from './ServicesStack';

// One line-icon set, one stroke weight, neutral colour (spec 7.2)
const ICONS: Record<string, LucideIcon> = {
  'software-development': Code2,
  cloud: Cloud,
  'it-equipment': Server,
  'software-licensing': KeyRound,
};

/** Block 3 (spec 7.3) */
export default function WhatWeDo() {
  return (
    <section id="services" aria-labelledby="services-heading" className="cb-section cb-section--surface">
      <div className="cb-container">
        <header className="cb-section-header">
          <h2 id="services-heading" className="cb-h2">
            What We Do
          </h2>
          <p className="cb-lead">
            We can cover a project end to end: the devices and licences, the cloud infrastructure it runs on, the software
            your team uses, and the AI on top.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          {/* Short graphic above the cards below 1024px; tall one beside them, filling their height, above */}
          <div className="lg:relative lg:col-span-5">
            <ServicesStack className="mx-auto block h-auto w-full max-w-[480px] lg:hidden" />
            <ServicesStackTall className="absolute inset-0 hidden h-full w-full lg:block" />
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {SERVICES.map((service) => {
              const Icon = ICONS[service.id];
              return (
                <li
                  key={service.id}
                  id={service.id}
                  className="flex flex-col rounded-xl border border-cb-border bg-cb-bg p-6 lg:p-7"
                >
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" className="mb-5" />
                  <h3 className="cb-h3">{service.name}</h3>
                  <p className="mt-3 text-cb-muted">{service.summary}</p>
                  <ul className="mt-5 space-y-2 border-t border-cb-border pt-5 text-[0.9375rem]">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5">
                        <CheckCircle2
                          size={18}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="mt-[0.2em] shrink-0 text-cb-muted"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {FLAGS.SHOW_SERVICE_PAGES && (
                    <a href={service.href} className="cb-link mt-auto pt-6 font-medium">
                      About {service.shortName}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-12 text-center text-cb-muted">
          Not sure where to start?{' '}
          <a href={BOOKING.href} className="cb-link">
            Book a consultation
          </a>{' '}
          and we&apos;ll point you the right way.
        </p>
      </div>
    </section>
  );
}
