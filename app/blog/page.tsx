import { bt } from '../../styles/fonts';
import { getArticles } from '../../lib/articles';
import TrackRow from '../../components/track-row';
import Reveal from '../../components/fx/Reveal';

export const metadata = { title: 'INDEX' };

export default async function Page() {
  const articles = await getArticles().catch(() => []);
  return (
    <div className='px-5 pb-28 pt-32 md:px-10 md:pt-40'>
      <Reveal>
        <div className='mb-10 flex flex-wrap items-end justify-between gap-4' data-reveal>
          <h1 className={`${bt.className} text-6xl md:text-8xl`}>INDEX</h1>
          <p className='font-mono text-[11px] tracking-[0.22em] text-[#8a877e]'>
            ALL LOG ENTRIES — {articles.length}
          </p>
        </div>
      </Reveal>
      <Reveal>
        <div className='border-t border-[#26262b]'>
          {articles.map((a, i) => (
            <TrackRow key={a.id} index={i} id={a.id} title={a.title} createdAt={a.createdAt} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
