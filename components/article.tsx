import { OutputData } from '@editorjs/editorjs';
import { ArticleByPkQuery } from '../lib/gql';
import { EditorHtml } from './editorJsHtml';
import '../styles/article.css';
type Props = {
  article: ArticleByPkQuery;
  data: OutputData;
};
export const Article = ({ article, data }: Props) => {
  return (
    <>
      <section
        className='bg-opacity-25'
        style={{
          width: '100%',
          padding: '32px 16px 16px',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
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
        <EditorHtml editorData={data} />
      </section>
    </>
  );
};
