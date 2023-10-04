import Link from 'next/link';
import { initializeApolloClient } from '../../lib/apollo/apolloClient';
import { ArticlesDocument, ArticlesQuery } from '../../lib/gql';
import DeleteArticleButton from '../../components/deleteArticleButton';
import { ArticleListDescription } from '../../components/articleListDescription';
import { ArticlesQueryVariables } from '../../lib/gql';
import EditArticleButton from '../../components/editArticleButton';

const getArticles = async () => {
  const apiClient = initializeApolloClient(); //apolloClient初期化

  const fetchData = async () => {
    const { data: getArticles, error } = await apiClient.query<
      ArticlesQuery,
      ArticlesQueryVariables
    >({
      query: ArticlesDocument,
      context: {
        fetchOptions: {
          next: { revalidate: 3600 },
        },
      },
      fetchPolicy: 'no-cache', //no-cacheにするとssr
      variables: { createdAt: 'desc' },
    });

    return getArticles;
  };
  const data = await fetchData();

  const selectedData = { ...data };
  return {
    props: selectedData,
  };
};
//before:hiddenはbefore:display:none
export default async function Page() {
  const Article = await getArticles();

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* <a href='/api/auth/login'>Login</a>;
      <a href='/api/auth/logout'>ログアウト</a> */}
      {Article.props.Article.map((i, index) => {
        const date = new Date(i.createdAt).toLocaleDateString();
        return (
          <article
            key={i.id}
            style={{
              position: 'relative',
              paddingTop: index === 0 ? '20px' : '0',
            }}
          >
            <div className='mockup-code bg-opacity-0 pt-0 pb-0 before:hidden'>
              <pre
                data-prefix={`${index * 4 + 1}`}
                style={{
                  textOverflow: 'ellipsis',
                  maxWidth: '80%',
                  overflow: 'hidden',
                }}
              >
                <code>
                  title:
                  <span className='text-success'>{i.title}</span>
                </code>
              </pre>
              <pre
                data-prefix={`${index * 4 + 2}`}
                style={{
                  textOverflow: 'ellipsis',
                  maxWidth: '80%',
                  overflow: 'hidden',
                }}
              >
                <code>
                  <ArticleListDescription content={JSON.parse(i.content)} />
                </code>
              </pre>

              <pre data-prefix={`${index * 4 + 3}`}>
                <code>{date}</code>
              </pre>
              <pre
                data-prefix={`${index * 4 + 4}`}
                className='bg-warning text-warning-content'
              >
                <Link href={`/blog/${i.id}`} className={'link link-hover'}>
                  {'>read more'}
                </Link>
              </pre>
              <div style={{ position: 'absolute', top: '25%', right: '5%' }}>
                <DeleteArticleButton id={i.id} />
                <span className='ml-2'>
                  <EditArticleButton id={i.id} />
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
