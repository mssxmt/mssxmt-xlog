import Link from 'next/link';
import { releases } from '../lib/releases';
import { bt } from '../styles/fonts';

const Discography = () => {
  return (
    <>
      <h2 className={`text-center pt-[32px] text-[32px] ${bt.className}`}>
        Releases other than self-releaseS
      </h2>
      <h3 className='text-center text-[9px]'>
        セルフリリース以外でリリースされている楽曲
      </h3>
      <section className='flex lg:flex-row md:flex-row sm:flex-col flex-wrap justify-center items-center gap-16 pt-[32px] px-[16px] pb-[100px]'>
        {releases.map((i, idx) => (
          <Link href={i.url} target='_blank' rel='noopener norefferer'>
            <div
              key={i.id}
              className='card w-80 glass animate-slide-in-blurred-right hover:bg-primary hover:shadow-md active:bg-primary active:shadow-md transition duration-300 ease-in-out'
              style={{
                animationDelay: `${idx * 0.05}s`,
              }}
            >
              <figure>
                <img src={i.image} alt={i.title} />
              </figure>
              <div className='card-body'>
                <h2 className='card-title'>{i.title}</h2>
                <p>{i.comment}</p>
                <div className='card-actions justify-end'>label:{i.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default Discography;
