type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = <img src={src} alt={`Cover Image for ${title}`} />;
  return (
    <section
      className='flex justify-center items-center animate-text-focus-in'
      style={{ minHeight: 'calc(100vh - 32px)' }}
    >
      {image}
    </section>
  );
};

export default CoverImage;
