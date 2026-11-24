import Link from 'next/link';

type Props = {
  index: number;
  id: string;
  title: string;
  createdAt: string;
};

export default function TrackRow({ index, id, title, createdAt }: Props) {
  const d = new Date(createdAt);
  const date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate()
  ).padStart(2, '0')}`;
  return (
    <Link
      href={`/blog/${id}`}
      className='track-row group flex items-baseline gap-4 border-b border-[#26262b] px-2 py-4 md:gap-8 md:px-4'
      data-reveal
    >
      <span className='track-mute font-mono text-[11px] tracking-[0.2em] text-[#57d7c8]'>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className='min-w-0 flex-1 truncate text-[15px] font-medium md:text-lg'>{title}</span>
      <span className='track-mute font-mono text-[11px] tracking-[0.14em] text-[#8a877e]'>{date}</span>
      <span aria-hidden className='font-mono text-sm transition-transform duration-300 group-hover:translate-x-1'>
        →
      </span>
    </Link>
  );
}
