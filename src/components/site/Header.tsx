'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Phone, X } from 'lucide-react';
import { CONTACT, whatsappUrl } from '@/lib/contact';
import BookingLink from './BookingLink';

const NAV = [
  { label: 'Services', href: '/#services' },
  { label: 'AI', href: '/#ai' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

/** Sticky header (spec 7.4): transparent over the hero, solid after 16px of scroll. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Mobile sheet: lock scroll, trap focus, close on Escape or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    sheet?.querySelector<HTMLElement>('a, button')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !sheet) return;
      const focusable = sheet.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = () => desktop.matches && setOpen(false);

    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ${
        solid
          ? 'border-cb-border bg-cb-bg shadow-[0_6px_24px_rgb(0_0_0/0.25)]'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div
        className={`cb-container flex items-center justify-between transition-[height] duration-200 ${
          scrolled ? 'h-14 lg:h-16' : 'h-14 lg:h-25'
        }`}
      >
        <Link href="/" aria-label="CosmoBits Technologies home" className="flex shrink-0 rounded-sm">
          <Image
            src="/cosmobits-technologies-logo-web.png"
            alt="CosmoBits Technologies"
            width={900}
            height={284}
            sizes="115px"
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 text-[15px] lg:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-white/80 transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
          <BookingLink className="cb-btn" />
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-3 flex h-12 w-12 items-center justify-center rounded-md text-white lg:hidden"
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-x-0 bottom-0 top-14 flex flex-col overflow-y-auto border-t border-cb-border bg-cb-bg lg:hidden"
        >
          <nav aria-label="Main" className="cb-container flex flex-col py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center border-b border-cb-border text-xl font-semibold"
              >
                {item.label}
              </a>
            ))}
            <BookingLink className="cb-btn cb-btn--lg mt-8" onClick={() => setOpen(false)} />
          </nav>

          <div className="cb-container mt-auto flex flex-col gap-1 pb-8 pt-6 text-cb-muted">
            <a href={`tel:${CONTACT.phoneE164}`} className="flex min-h-12 items-center gap-3">
              <Phone size={18} aria-hidden="true" />
              {CONTACT.phoneDisplay}
            </a>
            {CONTACT.whatsappE164 && (
              <a href={whatsappUrl(CONTACT.whatsappE164)} className="flex min-h-12 items-center gap-3">
                WhatsApp
              </a>
            )}
            <a href={`mailto:${CONTACT.email}`} className="flex min-h-12 items-center">
              {CONTACT.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
