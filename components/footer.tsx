import Container from './container';
import { EXAMPLE_PATH } from '../lib/constants';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='bg-base-100 '>
      <div className='flex flex-col justify-center items-end pr-[10px] h-[32px]'>
        <span className='my-1 text-secondary text-[12px]'>© {year} mssxmt</span>
      </div>
    </footer>
  );
};

export default Footer;
