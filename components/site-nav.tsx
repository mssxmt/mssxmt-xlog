'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { bt } from '../styles/fonts';
import Scramble from './fx/Scramble';
import Magnetic from './fx/Magnetic';

const LINKS = [
  { no: '01', href: '/', label: 'TOP', external: false },
  { no: '02', href: 'https://lab.mssxmt.com/', label: 'PROJECTS', external: true },
  { no: '03', href: '/releases', label: 'RELEASES', external: false },
  { no: '04', href: '/about', label: 'ABOUT', external: false },
];

export default function SiteNav() {
  const pathname = usePathname();
  return (
    <header className='fixed inset-x-0 top-0 z-40 mix-blend-difference'>
      <div className='flex items-start justify-between px-5 pt-4 md:px-10 md:pt-6'>
        <Link href='/' className={`${bt.className} text-[22px] leading-none tracking-wide text-[#e8e6df]`}>
          <Magnetic strength={0.2}>
            <Scramble text='MSSXMT' />
          </Magnetic>
        </Link>
        <nav className='flex gap-5 md:gap-9'>
          {LINKS.map((l) => {
            const active = !l.external && (l.href === '/' ? pathname === '/' : pathname?.startsWith(l.href));
            const inner = (
              <>
                <span className='block text-[9px] text-[#57d7c8]'>{l.no}</span>
                <span className={active ? 'underline underline-offset-4' : 'group-hover:underline group-hover:underline-offset-4'}>
                  <Scramble text={l.label} />
                </span>
              </>
            );
            const cls = 'group block font-mono text-[11px] leading-tight tracking-[0.18em] text-[#e8e6df]';
            return (
              <Magnetic key={l.href} strength={0.3}>
                {l.external ? (
                  <a href={l.href} target='_blank' rel='noopener noreferrer' className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link href={l.href} className={cls}>
                    {inner}
                  </Link>
                )}
              </Magnetic>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
