'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDeleteArticleByPkMutation } from '../lib/gql';
import { toast } from 'react-toastify';

const DeleteArticleButton = ({ id }: { id: string }) => {
  const success = () => toast('削除しましー');
  const { user } = useUser();
  const [deleteArticleByPkMutation, { data, loading, error }] =
    useDeleteArticleByPkMutation({
      onError(error, clientOptions) {
        console.log(error, clientOptions);
      },
      onCompleted() {
        success();
      },
    });

  const deleteArticles = ({ id }: { id: string }) => {
    deleteArticleByPkMutation({
      variables: {
        id: id,
      },
    });
  };
  if (!user) {
    return null;
  }
  return (
    <button
      className='btn btn-outline btn-primary btn-sm'
      type='button'
      onClick={() => deleteArticles({ id: id })}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M4 6h16l-1.58 14.22A2 2 0 0 1 16.432 22H7.568a2 2 0 0 1-1.988-1.78L4 6z' />
        <path d='M7.345 3.147A2 2 0 0 1 9.154 2h5.692a2 2 0 0 1 1.81 1.147L18 6H6l1.345-2.853z' />
        <path d='M2 6h20' />
        <path d='M10 11v5' />
        <path d='M14 11v5' />
      </svg>
    </button>
  );
};

export default DeleteArticleButton;
