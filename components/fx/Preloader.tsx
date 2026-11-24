'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { bt } from '../../styles/fonts';
import { motion } from '../../lib/motion-store';

/**
 * Loading as choreography, not a spinner: counter → curtain lift →
 * (the point cloud forms in the scene as introDone flips).
 */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      motion.introDone = true;
      setShow(false);
      return;
    }
    const counter = { v: 0 };
    const anim = animate(counter, {
      v: 100,
      duration: 1250,
      ease: 'inOutQuad',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
      },
    });
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      motion.introDone = true;
      if (rootRef.current) {
        animate(rootRef.current, {
          translateY: '-100%',
          duration: 850,
          ease: 'inOutExpo',
          onComplete: () => setShow(false),
        });
      } else {
        setShow(false);
      }
    };
    Promise.race([
      Promise.all([anim.then(() => {}), document.fonts.ready]),
      new Promise((r) => setTimeout(r, 2600)),
    ]).then(finish);
    return () => {
      done = true;
    };
  }, []);

  if (!show) return null;
  return (
    <div
      ref={rootRef}
      className='fixed inset-0 z-[90] flex flex-col justify-between bg-[#0b0b0c] px-5 py-6 md:px-10'
      aria-hidden
    >
      <div className='flex justify-between font-mono text-[10px] tracking-[0.24em] text-[#8a877e]'>
        <span>MSSXMT-XLOG</span>
        <span className='text-[#57d7c8]'>LOADING SIGNAL</span>
      </div>
      <div className='flex items-end justify-between'>
        <p className={`${bt.className} text-4xl md:text-6xl`}>MSSXMT</p>
        <span ref={numRef} className='font-mono text-6xl leading-none text-[#e8e6df] md:text-8xl'>
          000
        </span>
      </div>
    </div>
  );
}
