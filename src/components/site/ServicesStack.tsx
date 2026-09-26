/**
 * "What we do" graphic (spec 7.7, from public/services-stack.svg): four layers
 * joined by one thread for one team across the stack. Informative, so it keeps
 * its <title>. The AI layer is the site's only glassmorphism element.
 * No halo behind it and no animation.
 */
export default function ServicesStack({ className = '' }: { className?: string }) {
  return (
    <svg
      width="620"
      height="600"
      viewBox="0 0 620 600"
      role="img"
      aria-labelledby="cbStackTitle"
      className={className}
    >
      <title id="cbStackTitle">
        Four layers handled by one team: hardware and licences, cloud infrastructure, software, and AI
      </title>
      <g stroke="#C496C4" strokeOpacity="0.35" strokeWidth="1.5">
        <line x1="596" y1="120" x2="596" y2="485" />
        <line x1="570" y1="120" x2="596" y2="120" />
        <line x1="570" y1="240" x2="596" y2="240" />
        <line x1="570" y1="360" x2="596" y2="360" />
        <line x1="570" y1="485" x2="596" y2="485" />
      </g>
      <g fill="#C496C4">
        <circle cx="596" cy="120" r="5" />
        <circle cx="596" cy="240" r="5" />
        <circle cx="596" cy="360" r="5" />
        <circle cx="596" cy="485" r="5" />
      </g>
      <rect x="522" y="14" width="48" height="48" fill="#FFFFFF" />

      {/* AI: glass layer */}
      <rect x="190" y="70" width="380" height="100" rx="10" fill="#FFFFFF" fillOpacity="0.07" stroke="#FFFFFF" strokeOpacity="0.3" />
      <g stroke="#C496C4" strokeOpacity="0.55" strokeWidth="1.5">
        <line x1="240" y1="120" x2="310" y2="96" />
        <line x1="240" y1="120" x2="310" y2="144" />
        <line x1="310" y1="96" x2="385" y2="120" />
        <line x1="310" y1="144" x2="385" y2="120" />
        <line x1="385" y1="120" x2="462" y2="98" />
        <line x1="385" y1="120" x2="462" y2="142" />
        <line x1="462" y1="98" x2="532" y2="120" />
        <line x1="462" y1="142" x2="532" y2="120" />
      </g>
      <g fill="#C496C4">
        <circle cx="240" cy="120" r="5" />
        <circle cx="310" cy="96" r="5" />
        <circle cx="310" cy="144" r="5" />
        <circle cx="462" cy="98" r="5" />
        <circle cx="462" cy="142" r="5" />
        <circle cx="532" cy="120" r="5" />
      </g>
      <circle cx="385" cy="120" r="7" fill="#FFFFFF" />

      {/* Software */}
      <rect x="190" y="190" width="380" height="100" rx="10" fill="#A879B1" />
      <rect x="210" y="208" width="70" height="64" rx="4" fill="#150F33" fillOpacity="0.22" />
      <rect x="300" y="212" width="170" height="10" rx="5" fill="#150F33" fillOpacity="0.45" />
      <rect x="300" y="232" width="210" height="10" rx="5" fill="#150F33" fillOpacity="0.28" />
      <rect x="300" y="252" width="130" height="10" rx="5" fill="#150F33" fillOpacity="0.28" />
      <rect x="470" y="248" width="70" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.85" />

      {/* Cloud infrastructure */}
      <rect x="190.75" y="310.75" width="378.5" height="98.5" rx="10" fill="none" stroke="#C496C4" strokeWidth="1.5" />
      <rect x="214" y="342" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="270" y="342" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="326.75" y="342.75" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="382" y="342" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="438.75" y="342.75" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="494.75" y="342.75" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />

      {/* Hardware & licences (logo's cut corner) */}
      <path d="M200,430 H560 Q570,430 570,440 V540 H242 L198,498 Q190,490 190,478 V440 Q190,430 200,430 Z" fill="#453A7D" />
      <g fill="#150F33" fillOpacity="0.5">
        <rect x="250" y="452" width="240" height="12" rx="3" />
        <rect x="250" y="477" width="240" height="12" rx="3" />
        <rect x="250" y="502" width="240" height="12" rx="3" />
      </g>
      <circle cx="530" cy="458" r="4" fill="#FFFFFF" />
      <circle cx="530" cy="483" r="4" fill="#C496C4" />
      <circle cx="530" cy="508" r="4" fill="#C496C4" />

      {/* Labels inherit the page font (Schibsted Grotesk) */}
      <g fontSize="15" fontWeight="500" fill="#FFFFFF" fillOpacity="0.74" textAnchor="end" style={{ fontFamily: 'inherit' }}>
        <text x="172" y="125">AI</text>
        <text x="172" y="245">Software</text>
        <text x="172" y="365">Cloud infrastructure</text>
        <text x="172" y="490">Hardware &amp; licences</text>
      </g>
    </svg>
  );
}

/**
 * Tall variant for desktop (from public/services-stack-tall.svg), drawn to sit
 * beside the four service cards at roughly their height. Same parts as the
 * short graphic, with taller layers. Below 1024px the short one is used.
 */
export function ServicesStackTall({ className = '' }: { className?: string }) {
  return (
    <svg
      width="620"
      height="1040"
      viewBox="0 0 620 1040"
      role="img"
      aria-labelledby="cbStackTallTitle"
      className={className}
    >
      <title id="cbStackTallTitle">
        Four layers handled by one team: hardware and licences, cloud infrastructure, software, and AI
      </title>
      <g stroke="#C496C4" strokeOpacity="0.35" strokeWidth="1.5">
        <line x1="596" y1="167.5" x2="596" y2="932.5" />
        <line x1="570" y1="167.5" x2="596" y2="167.5" />
        <line x1="570" y1="422.5" x2="596" y2="422.5" />
        <line x1="570" y1="677.5" x2="596" y2="677.5" />
        <line x1="570" y1="932.5" x2="596" y2="932.5" />
      </g>
      <g fill="#C496C4">
        <circle cx="596" cy="167.5" r="5" />
        <circle cx="596" cy="422.5" r="5" />
        <circle cx="596" cy="677.5" r="5" />
        <circle cx="596" cy="932.5" r="5" />
      </g>
      <rect x="522" y="14" width="48" height="48" fill="#FFFFFF" />

      {/* AI: glass layer */}
      <rect x="190" y="70" width="380" height="195" rx="10" fill="#FFFFFF" fillOpacity="0.07" stroke="#FFFFFF" strokeOpacity="0.3" />
      <g stroke="#C496C4" strokeOpacity="0.55" strokeWidth="1.5">
        <line x1="240" y1="167.5" x2="310" y2="115.5" />
        <line x1="240" y1="167.5" x2="310" y2="219.5" />
        <line x1="310" y1="115.5" x2="385" y2="167.5" />
        <line x1="310" y1="219.5" x2="385" y2="167.5" />
        <line x1="385" y1="167.5" x2="462" y2="117.5" />
        <line x1="385" y1="167.5" x2="462" y2="217.5" />
        <line x1="462" y1="117.5" x2="532" y2="167.5" />
        <line x1="462" y1="217.5" x2="532" y2="167.5" />
        <line x1="240" y1="167.5" x2="310" y2="167.5" />
        <line x1="310" y1="167.5" x2="385" y2="167.5" />
        <line x1="385" y1="167.5" x2="462" y2="167.5" />
        <line x1="462" y1="167.5" x2="532" y2="167.5" />
      </g>
      <g fill="#C496C4">
        <circle cx="240" cy="167.5" r="5" />
        <circle cx="310" cy="115.5" r="5" />
        <circle cx="310" cy="219.5" r="5" />
        <circle cx="462" cy="117.5" r="5" />
        <circle cx="462" cy="217.5" r="5" />
        <circle cx="532" cy="167.5" r="5" />
        <circle cx="310" cy="167.5" r="5" />
        <circle cx="462" cy="167.5" r="5" />
      </g>
      <circle cx="385" cy="167.5" r="7" fill="#FFFFFF" />

      {/* Software */}
      <rect x="190" y="325" width="380" height="195" rx="10" fill="#A879B1" />
      <rect x="210" y="345" width="70" height="155" rx="4" fill="#150F33" fillOpacity="0.22" />
      <rect x="300" y="351" width="170" height="10" rx="5" fill="#150F33" fillOpacity="0.45" />
      <rect x="300" y="371" width="210" height="10" rx="5" fill="#150F33" fillOpacity="0.28" />
      <rect x="300" y="391" width="130" height="10" rx="5" fill="#150F33" fillOpacity="0.28" />
      <rect x="300" y="421" width="250" height="44" rx="4" fill="#150F33" fillOpacity="0.16" />
      <rect x="314" y="433" width="150" height="8" rx="4" fill="#150F33" fillOpacity="0.3" />
      <rect x="314" y="449" width="100" height="8" rx="4" fill="#150F33" fillOpacity="0.22" />
      <rect x="470" y="476" width="70" height="24" rx="4" fill="#FFFFFF" fillOpacity="0.85" />

      {/* Cloud infrastructure */}
      <rect x="190.75" y="580.75" width="378.5" height="193.5" rx="10" fill="none" stroke="#C496C4" strokeWidth="1.5" />
      <rect x="214" y="605.5" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="270" y="605.5" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="326.75" y="606.25" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="382" y="605.5" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="438.75" y="606.25" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="494.75" y="606.25" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="214" y="659.5" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="270.75" y="660.25" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="326" y="659.5" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="382" y="659.5" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="438" y="659.5" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="494.75" y="660.25" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="214.75" y="714.25" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="270" y="713.5" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="326.75" y="714.25" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="382.75" y="714.25" width="34.5" height="34.5" rx="3" fill="none" stroke="#C496C4" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="438" y="713.5" width="36" height="36" rx="3" fill="#C496C4" />
      <rect x="494" y="713.5" width="36" height="36" rx="3" fill="#C496C4" />

      {/* Hardware & licences (logo's cut corner) */}
      <path d="M200,835 H560 Q570,835 570,845 V1030 H242 L198,988 Q190,980 190,968 V845 Q190,835 200,835 Z" fill="#453A7D" />
      <g fill="#150F33" fillOpacity="0.5">
        <rect x="250" y="861" width="240" height="12" rx="3" />
        <rect x="250" y="891" width="240" height="12" rx="3" />
        <rect x="250" y="921" width="240" height="12" rx="3" />
        <rect x="250" y="951" width="240" height="12" rx="3" />
        <rect x="250" y="981" width="240" height="12" rx="3" />
      </g>
      <circle cx="530" cy="867" r="4" fill="#FFFFFF" />
      <circle cx="530" cy="897" r="4" fill="#C496C4" />
      <circle cx="530" cy="927" r="4" fill="#C496C4" />
      <circle cx="530" cy="957" r="4" fill="#C496C4" />
      <circle cx="530" cy="987" r="4" fill="#C496C4" />

      <g style={{ fontFamily: 'inherit' }} fontSize="15" fontWeight="500" fill="#FFFFFF" fillOpacity="0.74" textAnchor="end">
        <text x="172" y="172.5">AI</text>
        <text x="172" y="427.5">Software</text>
        <text x="172" y="682.5">Cloud infrastructure</text>
        <text x="172" y="937.5">Hardware &amp; licences</text>
      </g>
    </svg>
  );
}
