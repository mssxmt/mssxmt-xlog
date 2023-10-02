'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  useArticleByPkQuery,
  useInsertArticleMutation,
  useUpdateArticleByPkMutation,
} from '../lib/gql';
import { useEffect, useState } from 'react';
import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../components/editor'), { ssr: false });
import { toast } from 'react-toastify';

type FormData = {
  title: string;
  content: string;
  id: string;
};

type Props = {
  articleId?: string;
};
export default function Edit({ articleId }: Props) {
  const { user } = useUser();
  const [editorData, setEditorData] = useState<OutputData | undefined>();
  const success = () => toast('成功');
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { data: article } = useArticleByPkQuery({
    onError(error) {
      console.log(error);
    },
    variables: { id: articleId },
  });

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

  const [updateArticleByPk, {}] = useUpdateArticleByPkMutation({
    onError(error, clientOptions) {
      console.log(error, clientOptions);
    },
    onCompleted: () => {
      success();
    },
  });

  const updateArticle = ({ content, title, id }: FormData) => {
    updateArticleByPk({
      variables: { id: id, content: content, title: title },
    });
  };

  useEffect(() => {
    if (articleId && article) {
      setValue('title', article.Article_by_pk?.title ?? '');
      const data: OutputData = JSON.parse(article.Article_by_pk?.content!);
      setEditorData(data);
    }
  }, [articleId, article]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    user?.sub &&
      !articleId &&
      createArticles({
        ...data,
        id: user?.sub!,
        content: JSON.stringify(editorData),
      });
    articleId &&
      updateArticle({
        id: articleId,
        title: data.title,
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
        {articleId && editorData && (
          <Editor setEditorData={setEditorData} editorData={editorData} />
        )}
        {!articleId && !editorData && <Editor setEditorData={setEditorData} />}
        <input className='btn mt-10' type='submit' />
      </form>
    </>
  );
}
