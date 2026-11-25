'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { motion } from '../../lib/motion-store';

/**
 * Lenis smooth scrolling. Its velocity and progress feed the shared
 * motion store, so scroll, camera and shaders all run on one clock.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // native-scroll fallback feeding the same store fields
      let lastY = window.scrollY;
      const onScroll = () => {
        const limit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        motion.scrollVel = Math.min(Math.abs(window.scrollY - lastY), 60);
        motion.scrollY = window.scrollY;
        motion.pageProgress = Math.min(1, Math.max(0, window.scrollY / limit));
        motion.heroProgress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
        lastY = window.scrollY;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onScroll = () => {
      const limit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      motion.scrollY = lenis.scroll;
      motion.scrollVel = Math.abs(lenis.velocity);
      motion.pageProgress = Math.min(1, Math.max(0, lenis.scroll / limit));
      motion.heroProgress = Math.min(1, Math.max(0, lenis.scroll / window.innerHeight));
    };
    lenis.on('scroll', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
