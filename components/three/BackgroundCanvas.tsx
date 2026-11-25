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
    // click / tap: shockwave in the point cloud; long-press (mouse): attract
    let downTimer: ReturnType<typeof setTimeout> | null = null;
    const onDown = (e: PointerEvent) => {
      motion.burstNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      motion.burstNDC.y = -((e.clientY / window.innerHeight) * 2 - 1);
      motion.burstSeq++;
      if (e.pointerType === 'mouse') {
        downTimer = setTimeout(() => {
          motion.attract = true;
        }, 280);
      }
    };
    const onUp = () => {
      if (downTimer) clearTimeout(downTimer);
      downTimer = null;
      motion.attract = false;
    };
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  // burst on navigation: the cloud blows out and re-forms at the new layout
  useEffect(() => {
    motion.scrollVel = Math.max(motion.scrollVel, 30);
    motion.burstNDC.x = 0;
    motion.burstNDC.y = 0.25;
    motion.burstSeq++;
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
