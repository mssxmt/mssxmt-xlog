import Edit from '../../../components/edit';

// export default async function Page({ params }: { params: { id: string } }) {
//   return <Edit articleId={params.id} />;
// }
// app/protected-page/[slug]/page.js
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
  async function Page({ params }) {
    const id = params?.id as string;
    return <Edit articleId={id} />;
  },
  {
    returnTo: ({ params }) => {
      return `/create/${params?.id}`;
    },
  }
);
