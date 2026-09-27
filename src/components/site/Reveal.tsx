'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Element to render, so list items and headers keep their semantics */
  as?: 'div' | 'li' | 'header';
  className?: string;
  /** Delay in ms, for staggering items in a grid */
  delay?: number;
  /** Where it moves in from: up (default), or from the left/right like the old contact columns */
  from?: 'up' | 'left' | 'right';
  id?: string;
};

const OFFSET: Record<NonNullable<Props['from']>, string> = {
  up: 'translate-y-[30px]',
  left: '-translate-x-[50px]',
  right: 'translate-x-[50px]',
};

/**
 * Scroll-in animation, as on the previous site (owner preference, overriding
 * spec 7.5): fades and slides in once, when it comes 100px into view. Content
 * is in the server HTML; people who prefer reduced motion see it with no
 * animation, and the site layout's <noscript> style shows it without JS.
 */
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, from = 'up', id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion needs nothing here: the motion-reduce: classes show the content as-is.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -100px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag
      ref={ref as never}
      id={id}
      style={style}
      className={`cb-reveal transition-[opacity,translate] duration-[600ms] ease-out motion-reduce:translate-none motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? 'translate-none opacity-100' : `opacity-0 ${OFFSET[from]}`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
