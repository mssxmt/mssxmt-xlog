'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { animate } from 'animejs';

type Props = {
  children: ReactNode;
  className?: string;
  /** stagger children matching this selector */
  itemSelector?: string;
};

/**
 * Entrance animation with deliberately uneven timing (not the uniform
 * fade-up used by generated UIs): per-item delay jitter + slight rotation.
 */
export default function Reveal({ children, className, itemSelector = '[data-reveal]' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = root.querySelectorAll(itemSelector);
    if (!items.length) return;
    items.forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          Array.from(items).forEach((el, i) => {
            animate(el, {
              opacity: [0, 1],
              translateY: [26, 0],
              duration: 880,
              delay: i * 64 + (i % 3) * 29 + Math.random() * 22,
              ease: 'outExpo',
            });
          });
        });
      },
      { threshold: 0.12 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [itemSelector]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
