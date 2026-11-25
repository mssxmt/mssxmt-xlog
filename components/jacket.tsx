'use client';

import { motion } from '../lib/motion-store';

type Props = {
  id: string;
  src: string; // absolute path (/images/...) or remote URL (https://...)
  alt: string;
  className?: string;
};

/**
 * A release jacket. For local images, the DOM <img> holds layout/SEO;
 * once the WebGL scene syncs that jacket, the img fades out and a
 * shader plane in the fixed canvas takes its exact place (hover warp /
 * scroll bend).
 *
 * Remote images (Bandcamp CDN) are NEVER GL-synced: the CDN sends no
 * CORS headers, so a WebGL texture load can half-succeed from cache on
 * mobile browsers — marking the jacket synced and hiding the <img>
 * while the texture upload is rejected, leaving a blank square. They
 * stay plain DOM images instead.
 */
export default function Jacket({ id, src, alt, className }: Props) {
  const remote = src.startsWith('http');
  return (
    <div
      {...(remote ? {} : { 'data-gl-jacket': id, 'data-src': src })}
      className={className}
      onMouseEnter={() => {
        motion.hoverJacket = id;
      }}
      onMouseLeave={() => {
        if (motion.hoverJacket === id) motion.hoverJacket = null;
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className='h-full w-full object-cover' />
    </div>
  );
}
