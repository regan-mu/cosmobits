import { BadgeCheck, Handshake, Lightbulb, Sprout, Users, type LucideIcon } from 'lucide-react';
import { ABOUT, PRINCIPLES, STATS } from '@/content/site';
import { CONTACT } from '@/lib/contact';
import { FLAGS } from '@/lib/flags';

// Same icon set, stroke and neutral colour as the other cards (spec 7.2)
const ICONS: Record<string, LucideIcon> = {
  practical: Lightbulb,
  quality: BadgeCheck,
  partnership: Handshake,
  impact: Sprout,
  collaboration: Users,
};

/**
 * Block 8 (spec 7.3): who we are on the left, the principles that guide us on
 * the right (owner preference). Photo and stats band only once real material exists.
 */
export default function About() {
  const since = ABOUT.foundedYear ? `Since ${ABOUT.foundedYear}, we've` : "We've";
  const clients = ABOUT.clientTypes ?? 'businesses and organisations';

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="cb-section cb-section--surface border-t border-cb-border"
    >
      <div className="cb-container">
        <header className="cb-section-header">
          <h2 id="about-heading" className="cb-h2">
            About CosmoBits
          </h2>
        </header>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="cb-prose space-y-5 text-lg lg:self-center">
            <p>
              CosmoBits Technologies is a technology company based at {CONTACT.address.line1.split(',')[0]} in{' '}
              {CONTACT.address.area}, {CONTACT.address.city}. We design, build and run the systems organisations
              depend on: AI tools, custom software and the cloud infrastructure beneath them, plus the hardware
              and licences to run it all.
            </p>
            <p className="text-cb-muted">
              {since} worked with {clients} to cut manual work, make better use of the data they already have,
              and replace fragile tools with systems that hold up as they grow.
              {ABOUT.teamSentence && ` ${ABOUT.teamSentence}`}
            </p>
            <p className="text-cb-muted">
              What we&apos;re best at is turning a messy business requirement into a system that&apos;s
              reliable, secure and straightforward to maintain. One team covers the whole stack, so you deal
              with the same people from the laptops to the AI.
            </p>
          </div>

          <div className="rounded-xl border border-cb-border bg-cb-bg p-6 lg:p-8">
            <h3 className="cb-h3">The Principles That Guide Us</h3>
            <ul className="mt-6 space-y-5">
              {PRINCIPLES.map((p) => {
                const Icon = ICONS[p.id];
                return (
                  <li key={p.id} className="flex gap-4">
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0 text-cb-muted" />
                    <div>
                      <h4 className="font-semibold">{p.title}</h4>
                      <p className="mt-1 text-cb-muted">{p.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {FLAGS.SHOW_STATS && STATS.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-cb-border pt-8 text-center sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="cb-small text-cb-muted">{stat.label}</dt>
                <dd className="cb-tabular order-first text-4xl font-bold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
