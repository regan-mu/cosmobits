import type { CSSProperties } from 'react';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

// Navbar height, as on the previous site (h-26, 104px, the same at every width).
// The hero and legal pages pad their tops by this amount.
const SITE_VARS = { '--cb-header-h': '104px' } as CSSProperties;

/** Public site shell: dark palette, skip link, header and footer. The admin dashboard doesn't use it. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cb-site" style={SITE_VARS}>
      {/* Without JavaScript, scroll-in content (Reveal) is shown straight away */}
      <noscript>
        <style>{'.cb-reveal{opacity:1!important;translate:none!important}'}</style>
      </noscript>
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
