'use client';

import { useEffect, useRef } from 'react';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01ﾊﾐﾋｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾎﾍﾌ';

/** Decode animation: glyphs resolve left → right into the real text. */
export function scrambleTo(el: HTMLElement, text: string, duration = 620) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = text;
    return;
  }
  const start = performance.now();
  let frame = 0;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const resolved = Math.floor(p * text.length);
    let out = text.slice(0, resolved);
    for (let i = resolved; i < text.length; i++) {
      const ch = text[i];
      if (ch === ' ' || ch === '　') out += ch;
      else if (frame % 2 === 0 || i > resolved) out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      else out += el.textContent?.[i] ?? ch;
    }
    el.textContent = out;
    frame++;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = text;
  };
  requestAnimationFrame(tick);
}

type Props = {
  text: string;
  className?: string;
  triggerOnMount?: boolean;
};

/** Text that scrambles on hover (and optionally once on mount). */
export default function Scramble({ text, className, triggerOnMount = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (triggerOnMount && ref.current) scrambleTo(ref.current, text, 800);
  }, [text, triggerOnMount]);
  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={() => {
        if (ref.current) scrambleTo(ref.current, text);
      }}
    >
      {text}
    </span>
  );
}
