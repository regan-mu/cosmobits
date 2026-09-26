import Image from 'next/image';
import { PARTNERS } from '@/content/site';

/**
 * Block 2 (spec 7.3): one static row, single-tone logos, no carousel.
 * Rendered only with FLAGS.SHOW_PARTNERS, once the label and logos are confirmed.
 */
export default function Partners() {
  if (!PARTNERS.label) return null;

  return (
    <section aria-labelledby="partners-heading" className="border-b border-cb-border py-12">
      <div className="cb-container flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        <h2 id="partners-heading" className="cb-small shrink-0 text-cb-muted">
          {PARTNERS.label}
        </h2>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
          {PARTNERS.items.map((p) => (
            <li key={p.name}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener"
                className="block opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100"
              >
                {p.logo ? (
                  <Image src={p.logo} alt={p.name} width={160} height={32} className="h-8 w-auto brightness-0 invert" />
                ) : (
                  <span className="font-semibold">{p.name}</span>
                )}
                <span className="cb-sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
