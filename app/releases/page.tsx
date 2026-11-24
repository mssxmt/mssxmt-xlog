import { bt } from '../../styles/fonts';
import { releases } from '../../lib/releases';
import Reveal from '../../components/fx/Reveal';

export const metadata = { title: 'RELEASES' };

export default function Page() {
  return (
    <div className='px-5 pb-28 pt-32 md:px-10 md:pt-40'>
      <Reveal>
        <div className='mb-14 flex flex-wrap items-end justify-between gap-4' data-reveal>
          <h1 className={`${bt.className} text-6xl md:text-8xl`}>RELEASES</h1>
          <p className='font-mono text-[11px] leading-relaxed tracking-[0.22em] text-[#8a877e]'>
            SELF-RELEASE以外で
            <br />
            リリースされている楽曲
          </p>
        </div>
      </Reveal>
      <Reveal>
        <div className='grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3'>
          {releases.map((r, i) => (
            <a
              key={r.id}
              href={r.url}
              target='_blank'
              rel='noopener noreferrer'
              className={`group block ${i % 3 === 1 ? 'lg:translate-y-10' : ''} ${i % 3 === 2 ? 'lg:translate-y-4' : ''}`}
              data-reveal
            >
              <div className='tilt'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/${r.image}`}
                  alt={r.title}
                  className='aspect-square w-full object-cover shadow-[0_24px_60px_rgba(0,0,0,0.55)]'
                />
              </div>
              <div className='mt-5 flex items-baseline justify-between gap-3'>
                <h2 className={`${bt.className} text-2xl leading-none md:text-[28px]`}>{r.title}</h2>
                <span className='font-mono text-[11px] tracking-[0.2em] text-[#57d7c8]'>{r.id}</span>
              </div>
              <p className='mt-2 font-mono text-[11px] tracking-[0.16em] text-[#8a877e]'>
                {r.comment.toUpperCase()} — {r.label.toUpperCase()}
              </p>
              <p className='mt-3 font-mono text-[11px] tracking-[0.18em] underline underline-offset-8 group-hover:text-[#57d7c8]'>
                LISTEN →
              </p>
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
