'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useInsertArticleMutation } from '../lib/gql';

type FormData = {
  title: string;
  content: string;
  id: string;
};

export default function Edit() {
  const { user } = useUser();

  const [insertArticleMutation, { data, loading, error }] =
    useInsertArticleMutation({
      onError(error, clientOptions) {
        console.log(error, clientOptions);
      },
      onCompleted() {},
    });

  const createArticles = ({ content, title, id }: FormData) => {
    console.log(content, title);
    insertArticleMutation({
      variables: {
        content: content,
        thumbnail: null,
        title: title,
        userId: id,
      },
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) =>
    createArticles({ ...data, id: user?.sub! });

  return (
    <>
      <form className='form-control' onSubmit={handleSubmit(onSubmit)}>
        <label className='label'>
          <span className='label-text'>What is your タイトル?</span>
        </label>
        <input
          type='text'
          placeholder='タイトル here'
          className='input input-bordered w-full'
          {...register('title')}
        />
        <label className='label'>
          <span className='label-text'>Your 記事</span>
        </label>
        <textarea
          className='textarea textarea-bordered h-24'
          placeholder='記事'
          {...register('content')}
        ></textarea>
        <input className='btn' type='submit' />
      </form>
    </>
  );
}
