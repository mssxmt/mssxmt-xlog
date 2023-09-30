import { Article } from '../../../../components/article';
import Modal from '../../../../components/modal';
import { initializeApolloClient } from '../../../../lib/apollo/apolloClient';
import {
  ArticleByPkDocument,
  ArticleByPkQuery,
  ArticleByPkQueryVariables,
} from '../../../../lib/gql';

const getArticle = async (id: string) => {
  console.log(id);
  const apiClient = initializeApolloClient(); //apolloClient初期化

  const fetchData = async () => {
    const { data: getArticle, error } = await apiClient.query<
      ArticleByPkQuery,
      ArticleByPkQueryVariables
    >({
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
export default async function Page({ params }: { params: { slag: string } }) {
  const article = await getArticle(params.slag);

  const data =
    article.props.Article_by_pk &&
    JSON.parse(article.props.Article_by_pk?.content);
  return (
    <Modal link={article.props.Article_by_pk?.id}>
      <Article article={article.props} data={data} />
    </Modal>
  );
}
