'use client';
import Link from 'next/link';
import { bt } from '../styles/fonts';

export const DrawerInner = ({ htmlFror }: { htmlFror: string }) => {
  const list = [
    {
      name: 'home',
      href: '/',
    },
    {
      name: 'logs',
      href: '/blog',
    },
    {
      name: 'discography',
      href: '/discography',
    },
    {
      name: 'about',
      href: '/about',
    },
  ];
  const close = () => {
    const drawerElement = document.getElementById(htmlFror);
    if (drawerElement) {
      drawerElement.click();
    }
  };
  return (
    <ul
      className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'
      style={{ letterSpacing: '1em' }}
    >
      {list.map((i) => (
        <li key={i.name} className={`${bt.className}`}>
          <Link
            href={i.href}
            onClick={() => {
              close();
            }}
          >
            {i.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
