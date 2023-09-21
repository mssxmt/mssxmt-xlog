// サーバーコンポーネント用
import { setContext } from '@apollo/client/link/context';

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined; //ApolloClientかundefinedが入るためletで定義

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {},
});

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      // 'Authorization': res ? `Bearer ${res}` : '',
      // ここのヘッダーは読み取り専用のanonymous権限のものしかフェッチしないのでこれで良い
      'content-type': 'application/json',
      'x-hasura-role': 'anonymous',
    },
  };
});
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL!,
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([authLink, httpLink]),
    cache,
  });
};

// クライアントを初期化する
// 参考 https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js https://qiita.com/kazzzzzz/items/eeba893646eb494b4f57#%E3%83%97%E3%83%AD%E3%83%80%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89%E7%B7%A8
export const initializeApolloClient = (initialState = null) => {
  // _apolloClient変数は、既に初期化されたApolloClientインスタンスがあれば、それを再利用し、そうでなければ新しいインスタンスを作成
  const _apolloClient = apolloClient ?? createApolloClient();
  // サーバーサイドでは、常に新しいApollo Clientを作成、条件分岐で早期にリターン
  if (typeof window === 'undefined') return _apolloClient;
  // クライアントサイドでは、初回の呼び出し時にApollo Clientが作成され、その後は再利用
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};
