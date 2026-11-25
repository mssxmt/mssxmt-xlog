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
 *
 * Each item is observed individually. Observing the container with a
 * percentage threshold never fires when the container is much taller
 * than the viewport (e.g. the releases grid on a phone: 12% of a
 * 6000px-tall grid can never fit in a 700px viewport), which left
 * every item stuck at opacity 0 until a resize changed the geometry.
 */
export default function Reveal({ children, className, itemSelector = '[data-reveal]' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = Array.from(root.querySelectorAll(itemSelector)) as HTMLElement[];
    if (!items.length) return;
    items.forEach((el) => {
      el.style.opacity = '0';
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const i = items.indexOf(entry.target as HTMLElement);
          animate(entry.target as HTMLElement, {
            opacity: [0, 1],
            translateY: [26, 0],
            duration: 880,
            delay: (i % 4) * 64 + (i % 3) * 29 + Math.random() * 22,
            ease: 'outExpo',
          });
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [itemSelector]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
