import Image from 'next/image';
import { publishedWork } from '@/content/work';

/**
 * Block 7 (spec 7.3): Challenge / Solution / Outcome cards.
 * Renders nothing until a case study in src/content/work.ts is published.
 */
export default function SelectedWork() {
  const work = publishedWork().slice(0, 3);
  if (work.length === 0) return null;

  return (
    <section id="work" aria-labelledby="work-heading" className="cb-section">
      <div className="cb-container">
        <header className="cb-section-header">
          <h2 id="work-heading" className="cb-h2">
            Selected work
          </h2>
        </header>

        <ul className="grid gap-6 lg:grid-cols-3">
          {work.map((c) => (
            <li key={c.slug} className="flex flex-col rounded-xl border border-cb-border p-6 lg:p-7">
              <p className="cb-small text-cb-muted">
                {c.sector} · {c.country}
              </p>
              <div className="mt-4 flex items-center gap-3">
                {c.logo && <Image src={c.logo} alt="" width={120} height={28} className="h-7 w-auto" />}
                <h3 className="cb-h4">{c.client}</h3>
              </div>

              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="font-semibold">Challenge</dt>
                  <dd className="mt-1 text-cb-muted">{c.challenge}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Solution</dt>
                  <dd className="mt-1 text-cb-muted">{c.solution}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Outcome</dt>
                  <dd className="mt-1">
                    <ul className="space-y-1 text-cb-muted">
                      {c.outcomes.map((o) => (
                        <li key={o.measure} className="cb-tabular">
                          {o.measure}: {o.before ? `${o.before} → ${o.after}` : o.after}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              {c.quote && (
                <blockquote className="mt-6 border-t border-cb-border pt-5">
                  <p>&ldquo;{c.quote.text}&rdquo;</p>
                  <footer className="cb-small mt-2 text-cb-muted">
                    {c.quote.name}, {c.quote.role}
                  </footer>
                </blockquote>
              )}

              {c.url && (
                <a href={c.url} target="_blank" rel="noopener" className="cb-link mt-auto pt-6">
                  Visit {c.client}
                  <span className="cb-sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
