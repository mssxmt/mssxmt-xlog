'use client';

import { Component, ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { motion } from '../../lib/motion-store';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  componentDidCatch() {
    document.documentElement.dataset.glFailed = '1';
  }
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
    const onPointer = (e: PointerEvent) => {
      motion.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      motion.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => window.removeEventListener('pointermove', onPointer);
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
