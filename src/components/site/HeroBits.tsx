'use client';

import { useEffect, useRef, useState } from 'react';

// Survives client-side navigation, so returning to the homepage doesn't replay
// the load animation (spec 7.6). A full reload plays it again.
let hasPlayed = false;

/**
 * Hero graphic (spec 7.6, from public/cosmobits-technologies-hero.svg): the logo
 * mark on a 7×7 grid of bits. Inlined so the page CSS can animate its parts.
 *
 * It also measures itself and sets --hole-x / --hole-y / --hole-r on the
 * enclosing `.cb-hero`, so the mesh hole and Halo #1 stay centred on it.
 */
export default function HeroBits() {
  const ref = useRef<HTMLDivElement>(null);
  const [played] = useState(() => hasPlayed);

  useEffect(() => {
    hasPlayed = true;

    const art = ref.current;
    const hero = art?.closest<HTMLElement>('.cb-hero');
    if (!art || !hero) return;

    const place = () => {
      const a = art.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      hero.style.setProperty('--hole-x', `${a.left - h.left + a.width / 2}px`);
      hero.style.setProperty('--hole-y', `${a.top - h.top + a.height / 2}px`);
      // 360px for the 600px graphic in the mockup
      hero.style.setProperty('--hole-r', `${a.width * 0.6}px`);
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="cb-hero__art">
      <svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        aria-hidden="true"
        focusable="false"
        className="cb-hero-bits"
        data-played={played ? '' : undefined}
      >
        <defs>
          <pattern id="cbCells" x="24" y="24" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect x="0.5" y="0.5" width="71" height="71" rx="4" fill="none" stroke="#C496C4" strokeOpacity="0.10" />
          </pattern>
        </defs>
        <rect x="24" y="24" width="552" height="552" fill="url(#cbCells)" />

        {/* loose bits */}
        <rect className="cb-bit" style={{ '--i': 0 } as React.CSSProperties} x="24" y="24" width="72" height="72" rx="4" fill="#453A7D" fillOpacity="0.6" />
        <rect className="cb-bit cb-far" style={{ '--i': 1 } as React.CSSProperties} x="504" y="104" width="72" height="72" rx="4" fill="#C496C4" fillOpacity="0.4" />
        <rect className="cb-bit" style={{ '--i': 2 } as React.CSSProperties} x="424" y="184" width="72" height="72" rx="4" fill="#C496C4" fillOpacity="0.85" />
        <rect className="cb-bit cb-far" style={{ '--i': 3 } as React.CSSProperties} x="504" y="344" width="72" height="72" rx="4" fill="#FFFFFF" fillOpacity="0.22" />
        <rect className="cb-bit" style={{ '--i': 4 } as React.CSSProperties} x="424" y="424" width="72" height="72" rx="4" fill="#A879B1" fillOpacity="0.75" />
        <rect className="cb-bit" style={{ '--i': 5 } as React.CSSProperties} x="468" y="276" width="36" height="36" rx="3" fill="#C496C4" />
        <rect className="cb-bit cb-far" style={{ '--i': 6 } as React.CSSProperties} x="540" y="250" width="18" height="18" rx="2" fill="#C496C4" fillOpacity="0.5" />

        {/* logo mark, enlarged: white bit, violet block with the logo's cut corner, mauve bit */}
        <rect className="cb-mark" x="264" y="24" width="152" height="152" fill="#FFFFFF" />
        <path className="cb-mark" d="M104,184 H256 V496 L126,362 Q104,340 104,318 Z" fill="#453A7D" />
        <rect className="cb-mark" x="264" y="344" width="152" height="152" fill="#A879B1" />
      </svg>
    </div>
  );
}
