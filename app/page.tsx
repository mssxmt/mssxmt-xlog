import CoverImage from '../components/cover-image';

export default async function Page() {
  return (
    <div className='hero-overlay bg-opacity-30'>
      <div className='text-center text-neutral-content'>
        <CoverImage title='MSSXMT-XLOG' src='/images/logo2.png' />
      </div>
    </div>
  );
}
