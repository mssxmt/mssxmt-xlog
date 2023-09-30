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
      <section
        className='bg-opacity-25'
        style={{
          maxWidth: '100%',
          padding: '32px',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          // alignItems: 'center',
          WebkitBackdropFilter: 'blur(200px)',
          backdropFilter: 'blur(200px)',
          borderRadius: '10px',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'anywhere',
          wordBreak: 'break-all',
          position: 'relative',
        }}
      >
        <h2>{article.Article_by_pk?.title}</h2>
        <p>{date}</p>
        <EditorHtml editorData={data} />
      </section>
    </>
  );
};
