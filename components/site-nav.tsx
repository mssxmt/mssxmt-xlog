'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { bt } from '../styles/fonts';

const LINKS = [
  { no: '01', href: '/', label: 'TOP' },
  { no: '02', href: '/blog', label: 'INDEX' },
  { no: '03', href: '/releases', label: 'RELEASES' },
  { no: '04', href: '/about', label: 'ABOUT' },
];

export default function SiteNav() {
  const pathname = usePathname();
  return (
    <header className='fixed inset-x-0 top-0 z-40 mix-blend-difference'>
      <div className='flex items-start justify-between px-5 pt-4 md:px-10 md:pt-6'>
        <Link href='/' className={`${bt.className} text-[22px] leading-none tracking-wide text-[#e8e6df]`}>
          MSSXMT
        </Link>
        <nav className='flex gap-5 md:gap-9'>
          {LINKS.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className='group font-mono text-[11px] leading-tight tracking-[0.18em] text-[#e8e6df]'
              >
                <span className='block text-[9px] text-[#57d7c8]'>{l.no}</span>
                <span className={active ? 'underline underline-offset-4' : 'group-hover:underline group-hover:underline-offset-4'}>
                  {l.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
