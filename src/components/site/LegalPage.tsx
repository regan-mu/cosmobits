/**
 * Shared layout for /privacy and /terms: calm, no halo, mesh or arc (spec 6.3).
 * The column is centred on the page with a centred title (owner preference);
 * body text stays left-aligned for readability.
 */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="cb-container pb-24 pt-[calc(var(--cb-header-h)+3rem)]">
      <header className="cb-prose mx-auto border-b border-cb-border pb-8 text-center">
        <h1 className="cb-h2">{title}</h1>
        <p className="cb-small mt-3 text-cb-muted">
          Last updated {updated}. This page is under legal review and may change.
        </p>
      </header>
      <div className="cb-prose cb-legal mx-auto mt-10">{children}</div>
    </article>
  );
}
