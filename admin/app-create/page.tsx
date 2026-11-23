'use client';
import { ApolloWrapper } from '../../lib/apollo/apollo-wrapper';
import Edit from '../../components/edit';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(
  function Page() {
    return (
      <ApolloWrapper>
        <Edit />
      </ApolloWrapper>
    );
  },
  { returnTo: '/create' }
);
