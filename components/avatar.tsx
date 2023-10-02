import { bt } from '../styles/fonts';

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <section className='grid grid-cols-1 gap-4 place-content-center	'>
      <img
        src={picture}
        className='w-[246px] h-[256px] rounded-full  bg-neutral-content'
        alt={name}
      />
      <div>
        <p className='text-center'>Auther</p>
        <p className={`text-xl text-center tracking-[.25rem] ${bt.className}`}>
          {name}
        </p>
      </div>
    </section>
  );
};

export default Avatar;
