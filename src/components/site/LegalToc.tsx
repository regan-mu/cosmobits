'use client';

import { useEffect, useState } from 'react';

type Item = { id: string; title: string };

/** Where a section counts as "being read": its top has passed just under the navbar. */
const ACTIVE_OFFSET = 160;

/**
 * "On This Page" contents for the legal pages. Sticky beside the text on
 * desktop; highlights the section being read.
 */
export default function LegalToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      let current: string | null = null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
      }
      // At the very bottom, the last section is the one being read even if it's short
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = items[items.length - 1]?.id ?? current;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return (
    <nav
      aria-labelledby="legal-toc-heading"
      className="rounded-xl border border-cb-border bg-cb-surface p-5 lg:sticky lg:top-[calc(var(--cb-header-h)+2rem)] lg:border-0 lg:bg-transparent lg:p-0"
    >
      <h2 id="legal-toc-heading" className="cb-small font-semibold text-cb-text">
        On This Page
      </h2>
      <ol className="mt-3 space-y-0.5 lg:border-l lg:border-cb-border">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`-ml-px flex min-h-11 items-center gap-3 border-l-2 py-1.5 pl-3 text-[0.9375rem] transition-colors lg:min-h-9 lg:pl-4 ${
                  isActive
                    ? 'border-cb-brand text-cb-text'
                    : 'border-transparent text-cb-muted hover:text-cb-text'
                }`}
              >
                <span className={`cb-tabular text-xs ${isActive ? 'text-cb-brand' : 'text-white/50'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
