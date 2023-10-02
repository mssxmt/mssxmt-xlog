import { bt } from '../styles/fonts';
import Avatar from './avatar';

type Props = {
  name: string;
  picture: string;
};
const About = ({ name, picture }: Props) => {
  return (
    <section className='lg:pt-[256px] pt-[188px] flex flex-col justify-center items-center align-items-center lg:gap-y-9 text-neutral-content pb-10'>
      <h2
        className={`animate-text-pop-up-top lg:text-[22rem] text-[5rem] leading-[0.5em] ${bt.className} text-center	`}
      >
        About
      </h2>
      <h2
        className={`animate-text-pop-up-top lg:text-[22rem] text-[5rem] leading-[0.5em] ${bt.className} text-center	`}
      >
        Us
      </h2>
      <Avatar name={name} picture={picture} />
    </section>
  );
};
export default About;
