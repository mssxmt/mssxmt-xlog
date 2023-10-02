import About from '../../components/about';

export default async function Page() {
  return (
    <div
      className='hero-overlay bg-opacity-30'
      style={{ minHeight: ' calc(100vh - 32px)' }}
    >
      <About name='Masashi Ximoto' picture='/images/logo2.png' />
    </div>
  );
}
