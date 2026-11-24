import { SocialLinks } from './socialLinks';
import SoundToggle from './fx/AudioEngine';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className='relative z-10 border-t border-[#26262b] px-5 pb-8 pt-6 md:px-10'>
      <div className='flex flex-wrap items-end justify-between gap-6'>
        <div className='font-mono text-[10px] leading-relaxed tracking-[0.14em] text-[#8a877e]'>
          <p>CAT.NO — MSSXMT-XLOG / WEB</p>
          <p>© {year} MASASHI XIMOTO</p>
        </div>
        <div className='flex items-center gap-8'>
          <SoundToggle />
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
