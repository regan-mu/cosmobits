import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

/** Public site shell: dark palette, skip link, header and footer. The admin dashboard doesn't use it. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cb-site">
      <a
        href="#main"
        className="cb-btn fixed left-4 top-3 z-[60] -translate-y-24 focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
