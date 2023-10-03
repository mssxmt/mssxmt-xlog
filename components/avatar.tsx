import { bt } from '../styles/fonts';
import SocialLinks from './socialLinks';

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  const classname = `text-xl text-center pl-2 pr-2 animate-tracking-in-expand hover:animate-tracking-out-contract`;
  return (
    <section className='grid grid-cols-1 gap-4 '>
      <img
        src={picture}
        className='w-[246px] h-[256px] rounded-full bg-neutral-content ml-auto mr-auto'
        alt={name}
      />
      <div>
        <p className='text-center'>Auther</p>
        <p className={`text-xl text-center tracking-[.25rem] ${bt.className}`}>
          {name}
        </p>
      </div>
      <div>
        <p className='text-center pl-[5px] pr-[5px]'>{`Frontend (engineer who is not mature enough to be called an) engineer`}</p>
        <p className={classname}>{'Javascript / React.js / Next.js'}</p>
      </div>
      <div>
        <p className='text-center'>{`Main music equipment`}</p>
        <p className={classname}>{'DAW:Reason Studios'}</p>
        <p className={classname}>{'Audio I/F:RME Babyface'}</p>
        <p className={classname}>{'Moniter🔈:TANNOY Reveal 501A *2'}</p>
      </div>
      <div>
        <p className='text-center'>{`Hobby`}</p>
        <p className={classname}>{'Cooking'}</p>
      </div>
      <div className='active:animate-text-pop-up-top'>
        <p className='text-center text-3xl mt-2 '>{`- 人物 -`}</p>
        <p
          className={`whitespace-pre-wrap text-sx text-center pl-2 pr-2 animate-tracking-in-expand `}
        >{`現在はWeb開発のフロントエンドでお仕事をさせていただいております。\n電子音楽作家。\nメタル/ラウドロック/エクストリームミュージック好き屋さん。\n色々な仕事を経験の後、Reactに出会ったきっかけでフロントエンドの技術にのめり込む。\n見様見真似でとりあえずやってみる。\n「楽しみながら攻め続ける」が信条。
        `}</p>
      </div>
      <SocialLinks />
    </section>
  );
};

export default Avatar;
