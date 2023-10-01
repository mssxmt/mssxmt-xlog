'use client';

import { useCallback, useEffect } from 'react';
import EditorJSHtml from 'editorjs-html';
import { OutputData } from '@editorjs/editorjs';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'; // Language
import 'prismjs/themes/prism-tomorrow.min.css'; // Theme
import '../styles/article.css';

// export const addString = (i: string, r: RegExp, str: string) => {
//   const result = i.replace(r, str);
//   return result;
// };

// const pre = /pre/g;
// const preStyle = `pre style="white-space: pre-wrap !important; overflow-wrap: anywhere !important; word-break: break-all !important; background: #666;
// padding: 10px;"`;
// const href = /href/g;
// const hrefStyle = `target='_blank' rel="noopener noreferrer" href`;

type Props = {
  editorData: OutputData;
};

export const EditorHtml = ({ editorData }: Props) => {
  const edjsParser = EditorJSHtml();

  //editorJs-htmlリンクにtarget='_blankなどを付与する関数
  const addString = useCallback((i: string, r: RegExp, str: string) => {
    const result = i.replace(r, str);
    return result;
  }, []);

  const pre = /pre/g;
  const preStyle = `pre style="white-space: pre-wrap !important; overflow-wrap: anywhere !important; word-break: break-all !important; background: #666;
  padding: 10px;"`;
  const href = /href/g;
  const hrefStyle = `target='_blank' rel="noopener noreferrer" href`;

  //文頭文末の空白を削除
  const copyEditorData = JSON.parse(JSON.stringify(editorData)); //一旦ディープコピー
  const blocksDataForSend = copyEditorData?.blocks?.map((res: any) => {
    if (res.data['text']) {
      //オブジェクト内に'text'のkeyがあれば
      const text = res.data.text;
      const trimedText = text.replace(/&nbsp;/g, ' ');
      res.data.text = trimedText.trim();
    }
    return res;
  });

  const newEdtorJsData = {
    time: editorData?.time,
    blocks: blocksDataForSend,
    version: editorData?.version,
  };

  const parsedHTML = edjsParser.parseStrict(newEdtorJsData);
  const reMapParsedHTML = [...parsedHTML].map((item) => {
    //まず<br/>をジャッジして区切り線に置き換え
    const judgedItem =
      item === '<br/>' ? '<div class="delimiter-for-preview"></div>' : item;
    //リンクタグがあれば新規タブtaegetを与える関数実行
    const str = item.includes('<a href')
      ? addString(item, href, hrefStyle)
      : judgedItem;
    const str2 = str.includes('<pre') ? addString(str, pre, preStyle) : str;
    return str2;
  });

  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <>
      {reMapParsedHTML.map((html, index) => (
        <article
          className='language-javascript'
          dangerouslySetInnerHTML={{ __html: html }}
          key={index}
        ></article>
      ))}
    </>
  );
};
