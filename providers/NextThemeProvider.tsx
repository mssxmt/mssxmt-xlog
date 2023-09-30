'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';

export const NextThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
