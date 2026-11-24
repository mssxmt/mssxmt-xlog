'use client';

import { motion } from '../lib/motion-store';

type Props = {
  id: string;
  src: string; // absolute path, e.g. /images/releases/x.jpg
  alt: string;
  className?: string;
};

/**
 * A release jacket. The DOM <img> holds layout/SEO; once the WebGL
 * scene syncs (html.gl-active), the img fades out and a shader plane
 * in the fixed canvas takes its exact place (hover warp / scroll bend).
 */
export default function Jacket({ id, src, alt, className }: Props) {
  return (
    <div
      data-gl-jacket={id}
      data-src={src}
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
