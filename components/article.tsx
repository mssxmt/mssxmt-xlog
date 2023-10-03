import { OutputData } from '@editorjs/editorjs';
import { ArticleByPkQuery } from '../lib/gql';
import { EditorHtml } from './editorJsHtml';
import '../styles/article.css';
type Props = {
  article: ArticleByPkQuery;
  data: OutputData;
};
export const Article = ({ article, data }: Props) => {
  const date = new Date(article.Article_by_pk?.createdAt).toLocaleDateString();
  return (
    <>
      <div
        className='article'
        style={{ width: 'fit-content', margin: '0 auto' }}
      >
        <h2
          className='mb-[0.2rem] bg-no-repeat	bg-bottom'
          style={{
            fontSize: '36px',
            backgroundImage:
              'linear-gradient(90deg, #ff69c1 0 50px, transparent 50px 60px, #c1c1c1 0 60px)',
            backgroundSize: '100% 3px',
            padding: '0.8rem 0',
          }}
        >
          {article.Article_by_pk?.title}
        </h2>
        <p
          className='text-right text-sm	'
          style={{
            color: '#999',
          }}
        >
          {date}
        </p>
        <EditorHtml editorData={data} />
      </div>
    </>
  );
};
