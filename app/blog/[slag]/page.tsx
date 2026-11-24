import { OutputData } from '@editorjs/editorjs';
import { getArticle as fetchArticle } from '../../../lib/articles';
import { Article } from '../../../components/article';
import { Metadata, ResolvingMetadata } from 'next';

type Props = { params: Promise<{ slag: string }> };

const getArticle = async (id: string) => {
  const data = await fetchArticle(id);
  return { props: data };
};

//メタデータジェネレート
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slag } = await params;
  const article = await getArticle(slag);
  //親のogp
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `MSSXMTXLOG - ${article.props.Article_by_pk?.title}`,
    description: `MSSXMTXLOG - ${article.props.Article_by_pk?.title}`,
    openGraph: {
      description: `MSSXMTXLOG - ${article.props.Article_by_pk?.title}`,
      images: [...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slag } = await params;
  const article = await getArticle(slag);
  const data: OutputData =
    article.props.Article_by_pk &&
    JSON.parse(article.props.Article_by_pk?.content);
  const created = article.props.Article_by_pk?.createdAt
    ? new Date(article.props.Article_by_pk.createdAt)
    : null;
  const dateStr = created
    ? `${created.getFullYear()}.${String(created.getMonth() + 1).padStart(2, '0')}.${String(
        created.getDate()
      ).padStart(2, '0')}`
    : '';
  return (
    <div className='px-5 pb-28 pt-32 md:px-10 md:pt-40'>
      <div className='mx-auto max-w-3xl border border-[#26262b] bg-[#0e0e10]/92 p-6 backdrop-blur-md md:p-12'>
        <p className='mb-6 font-mono text-[11px] tracking-[0.22em] text-[#57d7c8]'>
          LOG — {dateStr}
        </p>
        <Article article={article.props} data={data} />
      </div>
    </div>
  );
}
