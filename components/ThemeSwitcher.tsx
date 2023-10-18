'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ];

  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [userTheme, setUserTheme] = useState(0);

  const toggleTheme = (value: string) => {
    const defaultTheme = 'light';
    setTheme(value ? themes[Number(value)] : defaultTheme);
    localStorage.setItem('theme', themes[Number(value)]);
  };

  useEffect(() => {
    setMounted(true);
    const defaultTheme = localStorage.getItem('theme');
    const thisTheme = defaultTheme ? defaultTheme : 'retro';

    const themeNumber = themes.indexOf(thisTheme);
    setUserTheme(themeNumber);
    setTheme(thisTheme);
  }, [mounted]);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <input
        type='range'
        min={0}
        max={themes.length - 1}
        defaultValue={userTheme}
        className='range range-xs'
        step={1}
        onChange={(e) => {
          e.stopPropagation();
          toggleTheme(e.target.value);
        }}
      />
    </>
  );
}

// export default ThemeSwitcher;
