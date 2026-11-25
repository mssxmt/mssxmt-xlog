'use client';

import { Slide, ToastContainer } from 'react-toastify';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ReactToalsyProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer transition={Slide} />
    </>
  );
}
