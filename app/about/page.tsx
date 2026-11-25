import { bt } from '../../styles/fonts';
import { releases } from '../../lib/releases';
import { SocialLinks } from '../../components/socialLinks';
import Reveal from '../../components/fx/Reveal';

export const metadata = { title: 'ABOUT' };

export default function Page() {
  const labels = Array.from(new Set(releases.map((r) => r.label)));
  return (
    <div className='px-5 pb-28 pt-32 md:px-10 md:pt-40'>
      <Reveal>
        <p className='font-mono text-[11px] tracking-[0.22em] text-[#57d7c8]' data-reveal>
          LINER NOTES
        </p>
        <h1 className={`${bt.className} mt-4 text-[13vw] leading-[0.92] md:text-8xl`} data-reveal>
          MASASHI
          <br />
          XIMOTO
        </h1>
      </Reveal>

      <div className='mt-16 grid gap-12 md:grid-cols-12'>
        <Reveal className='md:col-span-5'>
          {/* the logo artwork is black on transparent: present it like a printed sleeve */}
          <div className='bg-[#e8e6df] p-8' data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src='/images/mssxmt-lab.png' alt='MSSXMT × LAB logo' className='w-full' />
          </div>
        </Reveal>
        <Reveal className='md:col-span-7'>
          <dl className='font-mono text-[12px] leading-loose tracking-[0.14em]' data-reveal>
            <div className='flex gap-6 border-b border-[#26262b] py-3'>
              <dt className='w-28 shrink-0 text-[#57d7c8]'>NAME</dt>
              <dd>MASASHI XIMOTO</dd>
            </div>
            <div className='flex gap-6 border-b border-[#26262b] py-3'>
              <dt className='w-28 shrink-0 text-[#57d7c8]'>FIELD</dt>
              <dd>ELECTRONIC MUSIC — IDM / TECHNO / HARDSTYLE</dd>
            </div>
            <div className='flex gap-6 border-b border-[#26262b] py-3'>
              <dt className='w-28 shrink-0 text-[#57d7c8]'>RELEASES ON</dt>
              <dd>{labels.join(' / ').toUpperCase()}</dd>
            </div>
            <div className='flex gap-6 border-b border-[#26262b] py-3'>
              <dt className='w-28 shrink-0 text-[#57d7c8]'>THIS SITE</dt>
              <dd>MSSXMT-XLOG — 制作と記録のログ</dd>
            </div>
          </dl>
          <div className='mt-10 [&_svg]:fill-[#e8e6df]' data-reveal>
            <SocialLinks />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
