import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL!,
  {
    headers: {
      // 'Authorization': '',
      'content-type': 'application/json',
      // 'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET!, // あなたの管理者シークレットをここに設定
    },
    fetch,
  }
);
