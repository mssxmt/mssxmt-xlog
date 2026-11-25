import { initializeApolloClient } from './apollo/apolloClient';
import {
  ArticlesDocument,
  ArticlesQuery,
  ArticlesQueryVariables,
  ArticleByPkDocument,
  ArticleByPkQuery,
  ArticleByPkQueryVariables,
} from './gql';

export async function getArticles() {
  const apiClient = initializeApolloClient();
  const { data } = await apiClient.query<ArticlesQuery, ArticlesQueryVariables>({
    query: ArticlesDocument,
    context: { fetchOptions: { next: { revalidate: 3600 } } },
    fetchPolicy: 'no-cache',
    variables: { createdAt: 'desc' },
  });
  return data.Article;
}

export async function getArticle(id: string) {
  const apiClient = initializeApolloClient();
  const { data } = await apiClient.query<
    ArticleByPkQuery,
    ArticleByPkQueryVariables
  >({
    fetchPolicy: 'cache-first',
    context: { fetchOptions: { next: { revalidate: 3600 } } },
    query: ArticleByPkDocument,
    variables: { id },
  });
  return data;
}
