'use client';

import { Component, ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { motion } from '../../lib/motion-store';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <StaticFallback />;
    return this.props.children;
  }
}

function StaticFallback() {
  return (
    <div
      className='h-full w-full opacity-[0.14]'
      style={{
        backgroundImage: 'url(/images/bg2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(1) contrast(1.1)',
      }}
    />
  );
}

export default function BackgroundCanvas() {
  const pathname = usePathname();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    let lastY = window.scrollY;
    let raf = 0;
    const onPointer = (e: PointerEvent) => {
      motion.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      motion.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const y = window.scrollY;
      motion.scrollVel = Math.min(Math.abs(y - lastY), 60);
      motion.scrollY = y;
      lastY = y;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // glitch burst on navigation
  useEffect(() => {
    motion.scrollVel = Math.max(motion.scrollVel, 30);
  }, [pathname]);

  return (
    <div className='pointer-events-none fixed inset-0 z-0' aria-hidden>
      {reduced ? <StaticFallback /> : (
        <CanvasBoundary>
          <Scene />
        </CanvasBoundary>
      )}
    </div>
  );
}
