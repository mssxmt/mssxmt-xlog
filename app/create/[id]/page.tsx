import Edit from '../../../components/edit';

export default async function Page({ params }: { params: { id: string } }) {
  return <Edit articleId={params.id} />;
}
