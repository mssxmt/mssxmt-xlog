import { bt } from '../styles/fonts';
import AboutLogo from './aboutLogo';
import Avatar from './avatar';

type Props = {
  name: string;
  picture: string;
};
const About = ({ name, picture }: Props) => {
  return (
    <section className='lg:pt-[256px] pt-[188px] flex flex-col justify-center items-center align-items-center lg:gap-y-9 text-neutral-content pb-10'>
      <AboutLogo />
      <Avatar name={name} picture={picture} />
    </section>
  );
};
export default About;
