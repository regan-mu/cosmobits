'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CounterAnimationProps {
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function CounterAnimation({ 
  value, 
  duration = 2000, 
  className = '',
  style
}: CounterAnimationProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Parse the value to extract number and suffix
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(match[1]);
    const suffix = match[2] || '';
    const isDecimal = match[1].includes('.');
    const decimalPlaces = isDecimal ? (match[1].split('.')[1]?.length || 0) : 0;

    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = targetNumber * easeOut;
      
      if (isDecimal) {
        setDisplayValue(currentValue.toFixed(decimalPlaces) + suffix);
      } else {
        setDisplayValue(Math.floor(currentValue) + suffix);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {displayValue}
    </span>
  );
}
