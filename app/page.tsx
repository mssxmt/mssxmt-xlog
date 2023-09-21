'use client';
import { initializeApolloClient } from '../lib/apollo/apolloClient';
import { ArticlesDocument } from '../lib/gql/graphql';

const getArticles = async () => {
  const apiClient = initializeApolloClient(); //apolloClient初期化

  const fetchData = async () => {
    const { data: getJobpostData, error } = await apiClient.query({
      query: ArticlesDocument,
    });

    return getJobpostData;
  };
  const data = await fetchData();

  const selectedData = { ...data };
  return {
    props: selectedData,
  };
};

export default async function Page() {
  const Article = await getArticles();
  return (
    <>
      {Article.props.Article.map((i) => (
        <div key={i.id}>
          <div>{i.title}</div>
          <div>{i.content}</div>
          <div>{i.createdAt}</div>
        </div>
      ))}
    </>
  );
}
