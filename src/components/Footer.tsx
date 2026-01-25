'use client';

import { motion } from 'framer-motion';
import { 
  Bot,
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Instagram,
  Facebook,
  ArrowUpRight,
  Heart
} from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  services: [
    { name: 'AI Consultation', href: '#ai' },
    { name: 'Custom AI Solutions', href: '#ai' },
    { name: 'Software Development', href: '#services' },
    { name: 'Cloud Infrastructure', href: '#services' },
    { name: 'IT Equipment Supply', href: '#services' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Team', href: '#about' },
    { name: 'Careers', href: '#' },
    { name: 'News & Blog', href: '#' },
    { name: 'Contact', href: '#contact' },
  ],
  resources: [
    { name: 'Case Studies', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Support Center', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#150F33] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C496C4]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A855F7]/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom pt-16 pb-12 border-b border-white/10">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C496C4] to-[#A855F7] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span 
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  CosmoBits
                </span>
              </Link>
              
              <p className="text-white/60 mb-6 max-w-md leading-relaxed">
                Empowering businesses across Africa with innovative AI solutions and 
                cutting-edge technology. Your trusted partner for digital transformation.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a 
                  href="mailto:hello@cosmobits.tech" 
                  className="flex items-center gap-3 text-white/60 hover:text-[#C496C4] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>hello@cosmobits.tech</span>
                </a>
                <a 
                  href="tel:+254700000000" 
                  className="flex items-center gap-3 text-white/60 hover:text-[#C496C4] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+254 700 000 000</span>
                </a>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#C496C4] hover:border-[#C496C4]/30 transition-all"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-white/60 hover:text-[#C496C4] transition-colors flex items-center gap-1 group"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-white/60 hover:text-[#C496C4] transition-colors flex items-center gap-1 group"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-white/60 hover:text-[#C496C4] transition-colors flex items-center gap-1 group"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="container-custom py-12 border-b border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold text-lg mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Stay Updated with AI Trends
              </h4>
              <p className="text-white/60">
                Get the latest insights on AI and technology delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#C496C4]/50 w-full md:w-72"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C496C4] to-[#A855F7] text-white font-semibold hover:shadow-lg hover:shadow-[#C496C4]/20 transition-shadow whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
            <div className="flex items-center gap-1">
              <span>© {currentYear} CosmoBits Technologies. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="w-4 h-4 text-[#C496C4] fill-[#C496C4]" />
              <span>in Nairobi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
