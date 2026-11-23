import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import Edit from '../../../components/edit';

// Replaces withPageAuthRequired (its page-props type is incompatible
// with Next.js 15, where params is a Promise): check the session on
// the server and redirect to the Auth0 login route when absent.
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) {
    redirect(`/api/auth/login?returnTo=${encodeURIComponent(`/create/${id}`)}`);
  }
  return <Edit articleId={id} />;
}
