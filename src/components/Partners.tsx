'use client';

import { 
  Store, 
  Briefcase,
  BrainCircuit,
  Cloud
} from 'lucide-react';

const partners = [
  { name: 'Qloud Point Solutions', icon: Cloud, url: 'https://qloudpointsolutions.com' },
  { name: 'CareerElevate.ai', icon: BrainCircuit, url: 'https://careerelevate.ai' },
  { name: 'Pamba Africa', icon: Briefcase, url: 'https://pamba.africa' },
  { name: 'Nsimbi Advocacy', icon: Store, url: 'https://nsimbiadvocacy.com' }
];

export default function Partners() {
  return (
    <section className="relative pt-20 pb-16 bg-white border-b border-primary-dark/5">
      {/* Section Label */}
      <div className="container-custom" style={{ marginBottom: '3rem' }}>
        <p className="text-center text-primary-dark/40 text-sm font-medium tracking-wider uppercase">
          Our Partners
        </p>
      </div>

      {/* Static Partner Row */}
      <div className="container-custom">
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-soft-gray border border-primary-dark/5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 transition-all group"
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
    </section>
  );
}
