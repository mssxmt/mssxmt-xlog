import { OutputData } from '@editorjs/editorjs';
import { EditorHtml } from '../../../components/editorJsHtml';
import { initializeApolloClient } from '../../../lib/apollo/apolloClient';
import {
  ArticleByPkDocument,
  ArticleByPkQuery,
  ArticleByPkQueryVariables,
} from '../../../lib/gql';
import { Article } from '../../../components/article';
const getArticle = async (id: string) => {
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
  const data: OutputData =
    article.props.Article_by_pk &&
    JSON.parse(article.props.Article_by_pk?.content);
  return (
    <div style={{ paddingTop: 'calc(64px + 20px)', margin: '0 10%' }}>
      <Article article={article.props} data={data} />
    </div>
  );
}
