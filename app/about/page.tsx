import About from '../../components/about';

export default async function Page() {
  return (
    <div className='hero-overlay bg-opacity-30'>
      <About name='Masashi Ximoto' picture='/images/logo2.png' />
    </div>
  );
}
