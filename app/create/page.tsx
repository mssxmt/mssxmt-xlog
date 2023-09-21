'use client';

import { ApolloWrapper } from '../../lib/apollo/apollo-wrapper';
import Edit from '../../components/edit';

export default function Page() {
  return (
    <ApolloWrapper>
      <Edit />
    </ApolloWrapper>
  );
}
