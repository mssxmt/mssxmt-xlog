'use client';
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Modal({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const Xbutton = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (
        e.target === overlay.current ||
        e.target === wrapper.current ||
        e.target === Xbutton.current
      ) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <button
        ref={Xbutton}
        onClick={onClick}
        className='btn btn-outline btn-secondary btn-sm'
        style={{ position: 'fixed', zIndex: 99, top: '104px', right: '10%' }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='ai ai-Cross'
        >
          <path d='M20 20L4 4m16 0L4 20' />
        </svg>
        close
      </button>
      <button
        className='btn btn-outline btn-secondary btn-sm'
        style={{
          position: 'fixed',
          zIndex: 99,
          top: '104px',
          right: '5%',
        }}
      >
        <Link
          href={`/blog/${link}`}
          target='_blank'
          className={'link link-hover'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='ai ai-LinkOut'
          >
            <path d='M13.5 10.5L21 3' />
            <path d='M16 3h5v5' />
            <path d='M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5' />
          </svg>
        </Link>
      </button>
      <div
        style={{ overflowY: 'auto' }}
        ref={overlay}
        className='animate-slide-in-blurred-top max-h-screen absolute fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/20'
        onClick={onClick}
      >
        <div
          style={{ top: '64px' }}
          ref={wrapper}
          className='max-h-screen absolute  left-1/2 -translate-x-1/2  w-full sm:w-100 md:w-100 lg:w-100 p-6'
        >
          {children}
        </div>
      </div>
    </>
  );
}
