// 'use client';

import Link from 'next/link';
import Drawer from './drawer';
import ThemeSwitcher from './ThemeSwitcher';
import { bt } from '../styles/fonts';
import dynamic from 'next/dynamic';

const EditArticleButton = dynamic(() => import('./editArticleButton'), {
  ssr: false,
});
const Navbar = () => {
  return (
    <div
      className='navbar bg-base-100 fixed top-0 bg-opacity-25 z-10'
      style={{
        WebkitBackdropFilter: 'blur(3px)',
        backdropFilter: 'blur(3px)',
      }}
    >
      <Drawer />
      <div
        className={`flex-none mr-0 ml-auto ${bt.className}`}
        style={{ letterSpacing: '0.5em' }}
      >
        <Link className='btn btn-ghost normal-case text-xl' href='/'>
          MsSxmTXLOG
        </Link>
      </div>
      <EditArticleButton />
      <div className='flex-0 mr-3 ml-3 w-100'>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
