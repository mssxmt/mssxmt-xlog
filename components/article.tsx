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
        className='bg-opacity-50 bg-base-100 max-w-full p-[32px] flex-col justify-center backdrop-blur-[200px] whitespace-pre-wrap break-all relative rounded-[10px] mb-[100px]'
        style={{
          WebkitBackdropFilter: 'blur(200px)',
          overflowWrap: 'anywhere',
          // maxWidth: '100%',
          // padding: '32px',
          // display: 'flex',
          // flexFlow: 'column',
          // justifyContent: 'center',
          // backdropFilter: 'blur(200px)',
          // borderRadius: '10px',
          // whiteSpace: 'pre-wrap',
          // wordBreak: 'break-all',
          // position: 'relative',
        }}
      >
        <div style={{ width: 'fit-content', margin: '0 auto' }}>
          <h2
            className='mb-[0.2rem] bg-no-repeat	bg-bottom	'
            style={{
              fontSize: '36px',
              backgroundImage:
                'linear-gradient(90deg, #ff69c1 0 50px, transparent 50px 60px, #c1c1c1 0 60px)',
              backgroundSize: '100% 3px',
              padding: '0.8rem 0',
              // margin-bottom: 0.2rem;
              // background-repeat: no-repeat;
              // background-position: bottom;
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
      </section>
    </>
  );
};
