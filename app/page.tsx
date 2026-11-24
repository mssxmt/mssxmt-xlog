import Link from 'next/link';
import { bt } from '../styles/fonts';
import { getArticles } from '../lib/articles';
import { releases } from '../lib/releases';
import TrackRow from '../components/track-row';
import Reveal from '../components/fx/Reveal';

const TITLE = 'MASASHI XIMOTO';

export default async function Page() {
  const articles = await getArticles().catch(() => []);
  const latest = releases[0];

  return (
    <div>
      {/* HERO — the 3D logo floats in the background canvas */}
      <section className='relative flex min-h-[100svh] flex-col justify-end px-5 pb-10 md:px-10'>
        <div className='pointer-events-none absolute right-5 top-24 text-right font-mono text-[10px] leading-relaxed tracking-[0.2em] text-[#8a877e] md:right-10'>
          <p>SIGNAL / NOISE</p>
          <p>EST. TOKYO</p>
        </div>
        <Reveal itemSelector='[data-hero-char]'>
          <h1
            className={`${bt.className} text-[15.5vw] leading-[0.9] tracking-tight md:text-[11vw]`}
            aria-label={TITLE}
          >
            {TITLE.split('').map((c, i) => (
              <span key={i} data-hero-char className='inline-block' aria-hidden>
                {c === ' ' ? '\u00A0' : c}
              </span>
            ))}
          </h1>
        </Reveal>
        <div className='mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-[#26262b] pt-4'>
          <p className='font-mono text-[11px] tracking-[0.22em] text-[#8a877e]'>
            IDM / TECHNO / HARDSTYLE — ELECTRONIC MUSIC &amp; LOG
          </p>
          <p className='font-mono text-[11px] tracking-[0.22em] text-[#57d7c8]'>SCROLL ↓</p>
        </div>
      </section>

      {/* LATEST RELEASE */}
      <section className='relative px-5 py-24 md:px-10 md:py-36'>
        <p className='text-outline pointer-events-none absolute -top-4 left-0 select-none whitespace-nowrap text-[22vw] font-bold leading-none opacity-60'>
          RELEASE
        </p>
        <Reveal>
          <div className='relative grid items-end gap-10 md:grid-cols-12'>
            <div className='md:col-span-5' data-reveal>
              <a href={latest.url} target='_blank' rel='noopener noreferrer' className='tilt block'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/${latest.image}`} alt={latest.title} className='w-full shadow-[0_30px_80px_rgba(0,0,0,0.6)]' />
              </a>
            </div>
            <div className='md:col-span-7' data-reveal>
              <p className='font-mono text-[11px] tracking-[0.22em] text-[#57d7c8]'>
                LATEST — CAT.NO {latest.id}
              </p>
              <h2 className={`${bt.className} mt-3 text-5xl md:text-7xl`}>{latest.title}</h2>
              <p className='mt-4 font-mono text-[12px] leading-relaxed tracking-[0.14em] text-[#8a877e]'>
                {latest.comment} / LABEL: {latest.label.toUpperCase()}
              </p>
              <div className='mt-8 flex gap-8 font-mono text-[12px] tracking-[0.18em]'>
                <a href={latest.url} target='_blank' rel='noopener noreferrer' className='underline underline-offset-8 hover:text-[#57d7c8]'>
                  LISTEN →
                </a>
                <Link href='/releases' className='underline underline-offset-8 hover:text-[#57d7c8]'>
                  ALL RELEASES →
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* INDEX preview */}
      <section className='px-5 py-24 md:px-10 md:py-32'>
        <Reveal>
          <div className='mb-6 flex items-end justify-between' data-reveal>
            <h2 className={`${bt.className} text-4xl md:text-6xl`}>INDEX</h2>
            <p className='font-mono text-[11px] tracking-[0.22em] text-[#8a877e]'>
              LOG — {articles.length} ENTRIES
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className='border-t border-[#26262b]'>
            {articles.slice(0, 5).map((a, i) => (
              <TrackRow key={a.id} index={i} id={a.id} title={a.title} createdAt={a.createdAt} />
            ))}
          </div>
        </Reveal>
        <div className='mt-8 text-right'>
          <Link href='/blog' className='font-mono text-[12px] tracking-[0.18em] underline underline-offset-8 hover:text-[#57d7c8]'>
            FULL INDEX →
          </Link>
        </div>
      </section>

      {/* ABOUT teaser */}
      <section className='px-5 pb-28 md:px-10'>
        <Reveal>
          <Link href='/about' className='group block border border-[#26262b] bg-[#101012]/80 p-8 backdrop-blur-sm md:p-12' data-reveal>
            <p className='font-mono text-[11px] tracking-[0.22em] text-[#57d7c8]'>LINER NOTES</p>
            <p className={`${bt.className} mt-4 text-3xl leading-snug md:text-5xl`}>
              ABOUT MASASHI XIMOTO <span className='inline-block transition-transform duration-300 group-hover:translate-x-2'>→</span>
            </p>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
