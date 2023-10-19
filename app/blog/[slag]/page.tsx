import { OutputData } from '@editorjs/editorjs';
import { initializeApolloClient } from '../../../lib/apollo/apolloClient';
import {
  ArticleByPkDocument,
  ArticleByPkQuery,
  ArticleByPkQueryVariables,
} from '../../../lib/gql';
import { Article } from '../../../components/article';
import { Metadata, ResolvingMetadata } from 'next';

type Props = { params: { slag: string } };

const getArticle = async (id: string) => {
  const apiClient = initializeApolloClient(); //apolloClient初期化

  const fetchData = async () => {
    const { data: getArticle, error } = await apiClient.query<
      ArticleByPkQuery,
      ArticleByPkQueryVariables
    >({
      fetchPolicy: 'cache-first',
      context: {
        fetchOptions: {
          next: { revalidate: 3600 },
        },
      },
      query: ArticleByPkDocument,
      variables: { id: id },
    });

    return getArticle;
  };
  const data = await fetchData();

  const selectedData = { ...data };
  return {
    props: selectedData,
  };
};

//メタデータジェネレート
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = await getArticle(params.slag);
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
  const article = await getArticle(params.slag);
  const data: OutputData =
    article.props.Article_by_pk &&
    JSON.parse(article.props.Article_by_pk?.content);
  return (
    <div
      style={{
        paddingTop: 'calc(64px + 20px)',
        paddingBottom: '40px',
        margin: '0 5%',
      }}
    >
      <section
        className='bg-base-100 max-w-full p-[32px] flex-col justify-center backdrop-blur-[200px] whitespace-pre-wrap break-all relative rounded-[10px] mb-[100px]'
        style={{
          overflowWrap: 'anywhere',
        }}
      >
        <Article article={article.props} data={data} />
      </section>
    </div>
  );
}
