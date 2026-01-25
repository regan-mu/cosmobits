'use client';

import { 
  Building2, 
  Landmark, 
  Factory, 
  Store, 
  Briefcase,
  Globe,
  Shield,
  Cpu
} from 'lucide-react';

const partners = [
  { name: 'TechCorp Africa', icon: Cpu, url: 'https://techcorp.africa' },
  { name: 'Global Finance Ltd', icon: Landmark, url: 'https://globalfinance.com' },
  { name: 'BuildRight Industries', icon: Factory, url: 'https://buildright.co.ke' },
  { name: 'RetailMax', icon: Store, url: 'https://retailmax.com' },
  { name: 'Enterprise Solutions', icon: Briefcase, url: 'https://enterprise-solutions.com' },
  { name: 'WorldWide Logistics', icon: Globe, url: 'https://wwlogistics.com' },
  { name: 'SecureBank', icon: Shield, url: 'https://securebank.co.ke' },
  { name: 'Metro Holdings', icon: Building2, url: 'https://metroholdings.com' },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners];

export default function Partners() {
  return (
    <section className="relative py-16 bg-white overflow-hidden border-b border-[#150F33]/5">
      {/* Section Label */}
      <div className="container-custom" style={{ marginBottom: '4rem' }}>
        <p className="text-center text-[#150F33]/40 text-sm font-medium tracking-wider uppercase">
          Trusted by Leading Organizations
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative group/marquee">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-8 animate-marquee group-hover/marquee:[animation-play-state:paused]">
          {allPartners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#F8F6FC] border border-[#150F33]/5 flex-shrink-0 hover:border-[#C496C4]/30 hover:shadow-lg hover:shadow-[#C496C4]/10 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#150F33]/10 to-[#C496C4]/10 flex items-center justify-center group-hover:from-[#150F33] group-hover:to-[#2A1F5C] transition-all">
                <partner.icon className="w-5 h-5 text-[#150F33]/60 group-hover:text-[#C496C4] transition-colors" />
              </div>
              <span className="text-[#150F33]/70 font-medium whitespace-nowrap group-hover:text-[#150F33] transition-colors">
                {partner.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
