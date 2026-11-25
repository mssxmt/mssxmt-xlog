import Link from 'next/link';
import { bt } from '../styles/fonts';
import { jacketSrc, releases } from '../lib/releases';
import Jacket from '../components/jacket';
import Reveal from '../components/fx/Reveal';

const TITLE = 'MASASHI XIMOTO';

// tag-cloud placement: responsive width class + extra top offset per jacket
const CLOUD = [
  { cls: 'w-[56%] md:w-[30%]', mt: '0' },
  { cls: 'w-[37%] md:w-[18%]', mt: '2.5rem' },
  { cls: 'w-[41%] md:w-[22%]', mt: '0.75rem' },
  { cls: 'w-[50%] md:w-[25%]', mt: '3rem' },
  { cls: 'w-[35%] md:w-[16%]', mt: '0.5rem' },
  { cls: 'w-[45%] md:w-[20%]', mt: '2rem' },
  { cls: 'w-[39%] md:w-[23%]', mt: '1rem' },
];

export default function Page() {
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
            className={`${bt.className} whitespace-nowrap text-[10vw] leading-[0.9] tracking-tight md:text-[11vw]`}
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
          <p className='font-mono text-[11px] tracking-[0.22em] text-[#8a877e]'>MUSIC &amp; LOG</p>
          <p className='font-mono text-[11px] tracking-[0.22em] text-[#57d7c8]'>SCROLL ↓</p>
        </div>
      </section>

      {/* RELEASES — jacket tag cloud */}
      <section className='relative px-5 py-24 md:px-10 md:py-36'>
        <p className='text-outline pointer-events-none absolute -top-4 left-0 select-none whitespace-nowrap text-[22vw] font-bold leading-none opacity-60'>
          RELEASE
        </p>
        <Reveal>
          <div className='relative mb-10 flex flex-wrap items-end justify-between gap-4' data-reveal>
            <h2 className={`${bt.className} text-4xl md:text-6xl`}>RELEASES</h2>
            <p className='font-mono text-[11px] tracking-[0.22em] text-[#8a877e]'>
              {releases.length} TITLES — LATEST: {latest.title.toUpperCase()}
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className='relative flex flex-wrap items-start gap-x-5 gap-y-10 md:gap-x-8' data-reveal>
            {releases.map((r, i) => {
              const c = CLOUD[i % CLOUD.length];
              return (
                <a
                  key={r.id}
                  href={r.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`group block shrink-0 ${c.cls}`}
                  style={{ marginTop: c.mt }}
                >
                  <Jacket id={`home-${r.id}`} src={jacketSrc(r.image)} alt={r.title} className='aspect-square w-full' />
                  <p className='mt-2 font-mono text-[10px] tracking-[0.16em] text-[#8a877e] group-hover:text-[#e8e6df]'>
                    <span className='text-[#57d7c8]'>{r.id}</span> {r.title.toUpperCase()}
                    
                  </p>
                </a>
              );
            })}
          </div>
        </Reveal>
        <div className='mt-14 text-right'>
          <Link href='/releases' className='font-mono text-[12px] tracking-[0.18em] underline underline-offset-8 hover:text-[#57d7c8]'>
            ALL RELEASES →
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
