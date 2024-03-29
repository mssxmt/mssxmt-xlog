import { Metadata, ResolvingMetadata } from 'next';
import { Article } from '../../../../components/article';
import Modal from '../../../../components/modal';
import { initializeApolloClient } from '../../../../lib/apollo/apolloClient';
import {
  ArticleByPkDocument,
  ArticleByPkQuery,
  ArticleByPkQueryVariables,
} from '../../../../lib/gql';

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

  const data =
    article.props.Article_by_pk &&
    JSON.parse(article.props.Article_by_pk?.content);
  return (
    <Modal>
      <Article article={article.props} data={data} />
    </Modal>
  );
}
