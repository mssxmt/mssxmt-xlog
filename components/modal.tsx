'use client';
import {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const Xbutton = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => router.back(), 1000);
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
    <div>
      {isModalOpen && (
        <button
          ref={Xbutton}
          onClick={onClick}
          className='btn btn-outline btn-secondary btn-sm '
          style={{ position: 'fixed', zIndex: 99, top: '104px', right: '8%' }}
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
      )}

      <div
        style={{ overflowY: 'auto' }}
        ref={overlay}
        className={`${
          !isModalOpen
            ? 'animate-slide-out-blurred-top'
            : 'animate-slide-in-blurred-top'
        } max-h-[90vh] absolute fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/20`}
        onClick={onClick}
      >
        <div
          style={{ top: '64px' }}
          ref={wrapper}
          className='max-h-[90vh] absolute left-1/2 -translate-x-1/2 w-full sm:w-100 md:w-100 lg:w-100 p-6'
        >
          <section
            className='bg-base-100 max-w-full p-[32px] flex-col justify-center whitespace-pre-wrap break-all relative rounded-[10px] mb-[100px]'
            style={{
              overflowWrap: 'anywhere',
            }}
          >
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}
