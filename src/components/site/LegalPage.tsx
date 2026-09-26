/** Shared layout for /privacy and /terms: calm, no halo, mesh or arc (spec 6.3). */
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
      <header className="cb-prose border-b border-cb-border pb-8">
        <h1 className="cb-h2">{title}</h1>
        <p className="cb-small mt-3 text-cb-muted">
          Last updated {updated}. This page is under legal review and may change.
        </p>
      </header>
      <div className="cb-prose cb-legal mt-10">{children}</div>
    </article>
  );
}
