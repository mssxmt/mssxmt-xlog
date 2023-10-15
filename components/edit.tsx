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
import { uploadImage } from '../lib/uploadImage';

type FormData = {
  title: string;
  content: string;
  id: string;
  postId: string;
};

type Props = {
  articleId?: string;
};
export default function Edit({ articleId }: Props) {
  const { user } = useUser();
  const [editorData, setEditorData] = useState<OutputData | undefined>();
  const [EditorJSX, setEditorJSX] = useState<JSX.Element>();
  const success = () => toast('成功');
  const {
    getValues,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { data: article } = useArticleByPkQuery({
    variables: { id: articleId },
  });

  const [insertArticleMutation] = useInsertArticleMutation({
    onError(error) {
      console.log(error);
    },
    onCompleted: () => {
      success();
    },
  });

  const createArticles = ({ content, title, id, postId }: FormData) => {
    insertArticleMutation({
      variables: {
        content: content,
        thumbnail: null,
        title: title,
        userId: id,
        postId: postId,
      },
    });
  };

  const [updateArticleByPk, {}] = useUpdateArticleByPkMutation({
    onError(error) {
      console.log(error);
    },
    onCompleted: () => {
      success();
    },
  });

  const updateArticle = ({ content, title, id, postId }: FormData) => {
    updateArticleByPk({
      variables: { id: id, content: content, title: title, postId: postId },
    });
  };

  const uploader = async (file: File) => {
    //postIdインプットの値をgetValue
    const postId = getValues('postId');
    //getValuesしてpostIdがあったらー
    const response = postId && uploadImage(file, postId);
    return response;
  };

  useEffect(() => {
    if (articleId) {
      if (article) {
        setValue('title', article.Article_by_pk?.title ?? '');
        setValue('postId', article.Article_by_pk?.postId ?? '');
        const data: OutputData = JSON.parse(article.Article_by_pk?.content!);
        setEditorJSX(
          <Editor
            setEditorData={setEditorData}
            editorData={data}
            uploadImage={uploader}
          />
        );
      }
    } else {
      setEditorJSX(
        <Editor setEditorData={setEditorData} uploadImage={uploader} />
      );
    }
  }, [articleId, article]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    user?.sub &&
      !articleId &&
      createArticles({
        ...data,
        id: user?.sub!,
        content: JSON.stringify(editorData),
        postId: data.postId,
      });
    articleId &&
      updateArticle({
        id: articleId,
        title: data.title,
        content: JSON.stringify(editorData),
        postId: data.postId,
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        />
        <label className='label'>
          <span className='label-text'>ポストID=画像フォルダ名</span>
        </label>
        <input
          style={{ background: 'none', backdropFilter: 'blur(100px)' }}
          type='text'
          placeholder='ポストID=画像フォルダ名'
          className='input input-bordered w-full'
          {...register('postId')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        />
        <label className='label'>
          <span className='label-text'>Your 記事</span>
        </label>
        {EditorJSX}
        <input className='btn mt-10' type='submit' />
      </form>
    </>
  );
}
