import Link from 'next/link';
import { bt } from '../../styles/fonts';

export const metadata = { title: 'INDEX — CLOSED' };

// INDEX is temporarily closed (owner decision, 2026-11-25): the article
// modal was clipped and unreadable. Reopen by restoring this page and
// app/blog/[slag]/page.tsx from git history.
export default function Page() {
  return (
    <div className='px-5 pb-28 pt-32 md:px-10 md:pt-40'>
      <p className='font-mono text-[11px] tracking-[0.22em] text-[#57d7c8]'>LOG</p>
      <h1 className={`${bt.className} mt-4 text-6xl md:text-8xl`}>INDEX</h1>
      <p className='mt-8 font-mono text-[12px] leading-loose tracking-[0.14em] text-[#8a877e]'>
        一時閉鎖中 — CLOSED FOR NOW.
        <br />
        記事は <span className='text-[#e8e6df]'>PROJECTS (LAB)</span> 側に移行予定。
      </p>
      <div className='mt-12 flex gap-8 font-mono text-[12px] tracking-[0.18em]'>
        <a href='https://lab.mssxmt.com/' target='_blank' rel='noopener noreferrer' className='underline underline-offset-8 hover:text-[#57d7c8]'>
          PROJECTS →
        </a>
        <Link href='/' className='underline underline-offset-8 hover:text-[#57d7c8]'>
          TOP →
        </Link>
      </div>
    </div>
  );
}
