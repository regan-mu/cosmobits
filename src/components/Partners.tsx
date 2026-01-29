'use client';

import { 
  Building2, 
  Landmark, 
  Factory, 
  Store, 
  Briefcase,
  Globe,
  Shield,
  BrainCircuit , Cloud
} from 'lucide-react';

const partners = [
  { name: 'Qloud Point Solutions', icon: Cloud, url: 'https://qloudpointsolutions.com' },
  { name: 'CareerElevate.ai', icon: BrainCircuit , url: 'https://careerelevate.ai' },
  { name: 'Pamba Africa', icon: Briefcase, url: 'https://pamba.africa' },
  { name: 'Nsimbi Advocacy', icon: Store, url: 'https://nsimbiadvocacy.com' }
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners];

export default function Partners() {
  return (
    <section className="relative py-16 bg-white overflow-hidden border-b border-primary-dark/5">
      {/* Section Label */}
      <div className="container-custom" style={{ marginBottom: '4rem' }}>
        <p className="text-center text-primary-dark/40 text-sm font-medium tracking-wider uppercase">
          Trusted by Leading Organizations
        </p>
      </div>

      {/* Marquee Container - constrained to match page layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="relative group/marquee overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex gap-8 animate-marquee group-hover/marquee:paused">
            {allPartners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-soft-gray border border-primary-dark/5 shrink-0 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary-dark/10 to-accent/10 flex items-center justify-center group-hover:from-primary-dark group-hover:to-primary-light transition-all">
                  <partner.icon className="w-5 h-5 text-primary-dark/60 group-hover:text-accent transition-colors" />
                </div>
                <span className="text-primary-dark/70 font-medium whitespace-nowrap group-hover:text-primary-dark transition-colors">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
