'use client';

import { ReactNode, useRef } from 'react';

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/** The wrapped element is pulled toward the cursor while hovered. */
export default function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      style={{ transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)' }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
      }}
    >
      {children}
    </span>
  );
}
