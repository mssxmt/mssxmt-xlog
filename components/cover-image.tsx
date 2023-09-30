import cn from 'classnames';
// import Link from 'next/link';

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = <img src={src} alt={`Cover Image for ${title}`} />;
  return (
    <section
      className='flex justify-center items-center'
      style={{ minHeight: 'calc(100vh - 0px)' }}
    >
      {image}
    </section>
  );
};

export default CoverImage;
