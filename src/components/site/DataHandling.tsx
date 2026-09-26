import { DATA_COMMITMENTS } from '@/content/site';

/**
 * Block 6 (spec 7.3): plain statements, no icons, badges or seals.
 * Rendered only with FLAGS.SHOW_DATA_HANDLING, once every item is owner-confirmed.
 */
export default function DataHandling() {
  return (
    <section id="data" aria-labelledby="data-heading" className="cb-section">
      <div className="cb-container">
        <header className="cb-section-header">
          <h2 id="data-heading" className="cb-h2">
            How we handle your data
          </h2>
          <p className="cb-lead">
            AI and software projects mean giving a vendor access to your data. Here&apos;s what we do with it.
          </p>
        </header>

        <dl className="grid gap-x-12 md:grid-cols-2">
          {DATA_COMMITMENTS.map((item) => (
            <div key={item.title} className="border-t border-cb-border py-5">
              <dt className="cb-h4">{item.title}</dt>
              <dd className="mt-1.5 max-w-[52ch] text-cb-muted">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
