'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useInsertArticleMutation } from '../lib/gql';
import { useState } from 'react';
import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../components/editor'), { ssr: false });
import { toast } from 'react-toastify';

type FormData = {
  title: string;
  content: string;
  id: string;
};

export default function Edit() {
  const { user } = useUser();
  const [editorData, setEditorData] = useState<OutputData>();
  const success = () => toast('成功');

  const [insertArticleMutation, { data, loading, error }] =
    useInsertArticleMutation({
      onError(error, clientOptions) {
        console.log(error, clientOptions);
      },
      onCompleted: () => {
        success();
      },
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
  const onSubmit: SubmitHandler<FormData> = (data) => {
    user?.sub &&
      createArticles({
        ...data,
        id: user?.sub!,
        content: JSON.stringify(editorData),
      });
  };

  return (
    <>
      <form
        className='form-control'
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: '104px 16px',
          width: '70%',
          margin: '0 auto',
        }}
      >
        <label className='label'>
          <span className='label-text'>What is your タイトル?</span>
        </label>
        <input
          style={{ background: 'none', backdropFilter: 'blur(100px)' }}
          type='text'
          placeholder='タイトル here'
          className='input input-bordered w-full'
          {...register('title')}
        />
        <label className='label'>
          <span className='label-text'>Your 記事</span>
        </label>
        <Editor setEditorData={setEditorData} />
        <input className='btn mt-10' type='submit' />
      </form>
    </>
  );
}
