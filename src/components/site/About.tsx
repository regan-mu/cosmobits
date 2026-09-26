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

/*
 * Principle dividers (owner sketch): no box per item. A vertical line runs
 * between the two columns and horizontal lines between the rows, crossing like
 * a plus sign and fading out at their outer ends. With an odd count the last
 * item spans both columns. In one-column layouts (below 640px, and 1024–1279px
 * where the card is narrow) there are only horizontal lines, faded at both ends.
 */
const GAP_X = 48; // px, matches gap-x-12
const GAP_Y = 40; // px, matches gap-y-10

const fade = (direction: string, stops: string): React.CSSProperties => ({
  maskImage: `linear-gradient(${direction}, ${stops})`,
  WebkitMaskImage: `linear-gradient(${direction}, ${stops})`,
});

// Which layout each set of lines belongs to
const TWO_COL = 'hidden sm:block lg:hidden xl:block';
const ONE_COL = 'sm:hidden lg:block xl:hidden';

function PrincipleDividers({ index, count }: { index: number; count: number }) {
  const col = index % 2;
  const row = Math.floor(index / 2);
  const rows = Math.ceil(count / 2);
  const spansBoth = count % 2 === 1 && index === count - 1;
  // Last row that still has two items; the vertical line stops there
  const lastPairRow = count % 2 === 1 ? rows - 2 : rows - 1;
  const line = 'pointer-events-none absolute bg-cb-border-strong';

  // Two columns: horizontal line under every row but the last, meeting its
  // neighbour in the column gap; fades toward the card's outer edge only.
  const hLine =
    !spansBoth && row < rows - 1 ? (
      <span
        aria-hidden="true"
        className={`${line} ${TWO_COL} h-px`}
        style={{
          bottom: -GAP_Y / 2,
          left: col === 0 ? 0 : -GAP_X / 2,
          right: col === 0 ? -GAP_X / 2 : 0,
          ...fade(col === 0 ? 'to right' : 'to left', 'transparent, #000 65%'),
        }}
      />
    ) : null;

  // Two columns: vertical line right of the left-hand items, continuous down
  // the rows; fades at its top and bottom ends.
  const vLine =
    col === 0 && !spansBoth && row <= lastPairRow ? (
      <span
        aria-hidden="true"
        className={`${line} ${TWO_COL} w-px`}
        style={{
          right: -GAP_X / 2,
          top: row === 0 ? 0 : -GAP_Y / 2,
          bottom: row === lastPairRow ? 0 : -GAP_Y / 2,
          ...(row === 0 && row === lastPairRow
            ? fade('to bottom', 'transparent, #000 40%, #000 60%, transparent')
            : row === 0
              ? fade('to bottom', 'transparent, #000 65%')
              : row === lastPairRow
                ? fade('to top', 'transparent, #000 65%')
                : {}),
        }}
      />
    ) : null;

  // One column: a line under every item but the last, faded at both ends
  const stackLine =
    index < count - 1 ? (
      <span
        aria-hidden="true"
        className={`${line} ${ONE_COL} inset-x-0 h-px`}
        style={{ bottom: -GAP_Y / 2, ...fade('to right', 'transparent, #000 30%, #000 70%, transparent') }}
      />
    ) : null;

  return (
    <>
      {hLine}
      {vLine}
      {stackLine}
    </>
  );
}

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

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="cb-prose space-y-5 text-lg lg:col-span-5 lg:self-center">
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

          <div className="rounded-xl border border-cb-border bg-cb-bg p-6 lg:col-span-7 lg:p-8">
            <h3 className="cb-h3">The Principles That Guide Us</h3>
            {/* Two columns wherever the card is wide enough; one while it shares a narrow row (1024–1279px) */}
            <ul className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {PRINCIPLES.map((p, i) => {
                const Icon = ICONS[p.id];
                const spansBoth = PRINCIPLES.length % 2 === 1 && i === PRINCIPLES.length - 1;
                return (
                  <li
                    key={p.id}
                    className={`relative flex flex-col gap-3 ${spansBoth ? 'sm:col-span-2 lg:col-span-1 xl:col-span-2' : ''}`}
                  >
                    <PrincipleDividers index={i} count={PRINCIPLES.length} />
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-cb-muted" />
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
