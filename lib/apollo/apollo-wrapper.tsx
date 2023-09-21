'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { setContext } from '@apollo/client/link/context';

function makeClient() {
  const withTokenLink = setContext(async () => {
    const response = await fetch('/api/auth/token');

    if (response.ok) {
      const data = await response.json();
      return { auth0Token: data.token };
    } else {
      console.error('Fetch request failed');
    }
  });

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL!,
  });
  const authLink = setContext((_, { headers, auth0Token }) => ({
    headers: {
      ...headers,
      'Authorization': `Bearer ${auth0Token}`,
      'content-type': 'application/json',
    },
  }));

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      //   typeof window === 'undefined'
      // ?
      ApolloLink.from([
        new SSRMultipartLink({
          stripDefer: true,
        }),
        withTokenLink,
        authLink,
        httpLink,
      ]),
    // : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
