import { ABOUT, STATS } from '@/content/site';
import { CONTACT } from '@/lib/contact';
import { FLAGS } from '@/lib/flags';

/** Block 8 (spec 7.3): short prose; photo and stats band only once real material exists. */
export default function About() {
  const since = ABOUT.foundedYear ? `Since ${ABOUT.foundedYear} we've` : "We've";
  const clients = ABOUT.clientTypes ? ` with ${ABOUT.clientTypes}` : ' with businesses in Kenya and across Africa';

  return (
    <section id="about" aria-labelledby="about-heading" className="cb-section cb-section--surface border-t border-cb-border">
      <div className="cb-container grid gap-8 lg:grid-cols-12 lg:gap-6">
        <h2 id="about-heading" className="cb-h2 lg:col-span-4">
          About CosmoBits
        </h2>

        <div className="cb-prose space-y-5 text-lg lg:col-span-7 lg:col-start-6">
          <p>
            CosmoBits Technologies is a technology company based at {CONTACT.address.line1.split(',')[0]} in{' '}
            {CONTACT.address.area}, {CONTACT.address.city}. {since} worked{clients} on AI projects, custom
            software, cloud hosting and IT supply.
            {ABOUT.teamSentence && ` ${ABOUT.teamSentence}`}
          </p>
          <p className="text-cb-muted">
            We&apos;re one team across all of it, so the people who source your laptops and licences are the
            same people who set up your hosting and build the software on top.
          </p>
        </div>

        {FLAGS.SHOW_STATS && STATS.length > 0 && (
          <dl className="grid grid-cols-2 gap-6 border-t border-cb-border pt-8 sm:grid-cols-4 lg:col-span-12">
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
