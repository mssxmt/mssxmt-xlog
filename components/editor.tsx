'use client';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import EditorJS, { LogLevels, OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header'; //h1〜h4
import NestedList from '@editorjs/nested-list';
import Delimiter from '@editorjs/delimiter'; //区切り線
import CodeTool from '@editorjs/code';
import Strikethrough from '@sotaproject/strikethrough';

type Props = {
  setEditorData: Dispatch<SetStateAction<OutputData | undefined>>;
  editorData?: OutputData | undefined;
};
const Editor = ({ editorData, setEditorData }: Props) => {
  //IDを設定、htmlに設定されたidの要素にレンダーされる
  const EDITTOR_HOLDER_ID = 'editorjs';
  const ejInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
      }
      ejInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      data: editorData,

      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        if (ejInstance && ejInstance.current) {
          const content = await ejInstance.current.save();
          console.log(content);
          setEditorData(content);
        }
      },
      autofocus: false,
      inlineToolbar: ['bold', 'italic', 'link', 'strikethrough'],
      tools: {
        strikethrough: Strikethrough,

        code: { class: CodeTool },
        header: {
          class: Header,
          inlineToolbar: true,
          toolbox: [
            {
              icon: '<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M2.14 1.494V4.98h4.62V1.494c0-.498.098-.871.293-1.12A.927.927 0 0 1 7.82 0c.322 0 .583.123.782.37.2.246.3.62.3 1.124v9.588c0 .503-.101.88-.303 1.128a.957.957 0 0 1-.779.374.921.921 0 0 1-.77-.378c-.193-.251-.29-.626-.29-1.124V6.989H2.14v4.093c0 .503-.1.88-.302 1.128a.957.957 0 0 1-.778.374.921.921 0 0 1-.772-.378C.096 11.955 0 11.58 0 11.082V1.494C0 .996.095.623.285.374A.922.922 0 0 1 1.06 0c.321 0 .582.123.782.37.199.246.299.62.299 1.124zm11.653 9.985V5.27c-1.279.887-2.14 1.33-2.583 1.33a.802.802 0 0 1-.563-.228.703.703 0 0 1-.245-.529c0-.232.08-.402.241-.511.161-.11.446-.25.854-.424.61-.259 1.096-.532 1.462-.818a5.84 5.84 0 0 0 .97-.962c.282-.355.466-.573.552-.655.085-.082.246-.123.483-.123.267 0 .481.093.642.28.161.186.242.443.242.77v7.813c0 .914-.345 1.371-1.035 1.371-.307 0-.554-.093-.74-.28-.187-.186-.28-.461-.28-.825z"></path></svg>', // icon for H1,
              title: 'ヘッダー 1',
              data: {
                level: 1,
              },
            },
            {
              // icon: '<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M2.14 1.494V4.98h4.62V1.494c0-.498.098-.871.293-1.12A.927.927 0 0 1 7.82 0c.322 0 .583.123.782.37.2.246.3.62.3 1.124v9.588c0 .503-.101.88-.303 1.128a.957.957 0 0 1-.779.374.921.921 0 0 1-.77-.378c-.193-.251-.29-.626-.29-1.124V6.989H2.14v4.093c0 .503-.1.88-.302 1.128a.957.957 0 0 1-.778.374.921.921 0 0 1-.772-.378C.096 11.955 0 11.58 0 11.082V1.494C0 .996.095.623.285.374A.922.922 0 0 1 1.06 0c.321 0 .582.123.782.37.199.246.299.62.299 1.124zm11.653 9.985V5.27c-1.279.887-2.14 1.33-2.583 1.33a.802.802 0 0 1-.563-.228.703.703 0 0 1-.245-.529c0-.232.08-.402.241-.511.161-.11.446-.25.854-.424.61-.259 1.096-.532 1.462-.818a5.84 5.84 0 0 0 .97-.962c.282-.355.466-.573.552-.655.085-.082.246-.123.483-.123.267 0 .481.093.642.28.161.186.242.443.242.77v7.813c0 .914-.345 1.371-1.035 1.371-.307 0-.554-.093-.74-.28-.187-.186-.28-.461-.28-.825z"></path></svg>', // icon for H1,
              title: 'ヘッダー 2',
              data: {
                level: 2,
              },
            },
            {
              // icon: '<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M2.14 1.494V4.98h4.62V1.494c0-.498.098-.871.293-1.12A.927.927 0 0 1 7.82 0c.322 0 .583.123.782.37.2.246.3.62.3 1.124v9.588c0 .503-.101.88-.303 1.128a.957.957 0 0 1-.779.374.921.921 0 0 1-.77-.378c-.193-.251-.29-.626-.29-1.124V6.989H2.14v4.093c0 .503-.1.88-.302 1.128a.957.957 0 0 1-.778.374.921.921 0 0 1-.772-.378C.096 11.955 0 11.58 0 11.082V1.494C0 .996.095.623.285.374A.922.922 0 0 1 1.06 0c.321 0 .582.123.782.37.199.246.299.62.299 1.124zm11.653 9.985V5.27c-1.279.887-2.14 1.33-2.583 1.33a.802.802 0 0 1-.563-.228.703.703 0 0 1-.245-.529c0-.232.08-.402.241-.511.161-.11.446-.25.854-.424.61-.259 1.096-.532 1.462-.818a5.84 5.84 0 0 0 .97-.962c.282-.355.466-.573.552-.655.085-.082.246-.123.483-.123.267 0 .481.093.642.28.161.186.242.443.242.77v7.813c0 .914-.345 1.371-1.035 1.371-.307 0-.554-.093-.74-.28-.187-.186-.28-.461-.28-.825z"></path></svg>', // icon for H1,
              title: 'ヘッダー 3',
              data: {
                level: 3,
              },
            },
          ],
          config: {
            levels: [1, 2, 3], //ヘッダーのレベル設定
            defaultLevel: 3, //defaultのレベル設定
          },
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          toolbox: [
            {
              icon: '<svg width="17" height="13" viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg"> <path d="M5.625 4.85h9.25a1.125 1.125 0 0 1 0 2.25h-9.25a1.125 1.125 0 0 1 0-2.25zm0-4.85h9.25a1.125 1.125 0 0 1 0 2.25h-9.25a1.125 1.125 0 0 1 0-2.25zm0 9.85h9.25a1.125 1.125 0 0 1 0 2.25h-9.25a1.125 1.125 0 0 1 0-2.25zm-4.5-5a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25zm0-4.85a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25zm0 9.85a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25z"></path></svg>', // icon for H1,
              title: 'リスト',
              data: {
                style: 'unordered',
              },
            },
            {
              icon: '<svg width="17" height="13" viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg"><path d="M5.819 4.607h9.362a1.069 1.069 0 0 1 0 2.138H5.82a1.069 1.069 0 1 1 0-2.138zm0-4.607h9.362a1.069 1.069 0 0 1 0 2.138H5.82a1.069 1.069 0 1 1 0-2.138zm0 9.357h9.362a1.069 1.069 0 0 1 0 2.138H5.82a1.069 1.069 0 0 1 0-2.137zM1.468 4.155V1.33c-.554.404-.926.606-1.118.606a.338.338 0 0 1-.244-.104A.327.327 0 0 1 0 1.59c0-.107.035-.184.105-.234.07-.05.192-.114.369-.192.264-.118.475-.243.633-.373.158-.13.298-.276.42-.438a3.94 3.94 0 0 1 .238-.298C1.802.019 1.872 0 1.975 0c.115 0 .208.042.277.127.07.085.105.202.105.351v3.556c0 .416-.15.624-.448.624a.421.421 0 0 1-.32-.127c-.08-.085-.121-.21-.121-.376zm-.283 6.664h1.572c.156 0 .275.03.358.091a.294.294 0 0 1 .123.25.323.323 0 0 1-.098.238c-.065.065-.164.097-.296.097H.629a.494.494 0 0 1-.353-.119.372.372 0 0 1-.126-.28c0-.068.027-.16.081-.273a.977.977 0 0 1 .178-.268c.267-.264.507-.49.722-.678.215-.188.368-.312.46-.371.165-.11.302-.222.412-.334.109-.112.192-.226.25-.344a.786.786 0 0 0 .085-.345.6.6 0 0 0-.341-.553.75.75 0 0 0-.345-.08c-.263 0-.47.11-.62.329-.02.029-.054.107-.101.235a.966.966 0 0 1-.16.295c-.059.069-.145.103-.26.103a.348.348 0 0 1-.25-.094.34.34 0 0 1-.099-.258c0-.132.031-.27.093-.413.063-.143.155-.273.279-.39.123-.116.28-.21.47-.282.189-.072.411-.107.666-.107.307 0 .569.045.786.137a1.182 1.182 0 0 1 .618.623 1.18 1.18 0 0 1-.096 1.083 2.03 2.03 0 0 1-.378.457c-.128.11-.344.282-.646.517-.302.235-.509.417-.621.547a1.637 1.637 0 0 0-.148.187z"></path></svg>', // icon for H1,
              title: '番号付リスト',
              data: {
                style: 'ordered',
              },
            },
          ],
        },
        delimiter: { class: Delimiter },
        // image: {
        //   class: ImageTool,
        //   config: {
        //     types: '.jpg, .jpeg, .png',
        //     captionPlaceholder: '画像のaltを入力',
        //     //ここにupLoader
        //     uploader: {
        //       async uploadByFile(file) {
        //         const url = await imageResizer(file);
        //         return { success: 1, file: { url: url } };
        //       },
        //     },
        //   },
        // },
      },
      //////tooltip翻訳messages内に書く！
      i18n: {
        messages: {
          ui: {
            //ドットボタン
            blockTunes: {
              toggler: {
                'Click to tune': 'クリックしてメニューを開く',
              },
            },
            //プラスボタン
            toolbar: {
              toolbox: {
                Add: 'クリックして下にブロックを追加',
              },
            },
            inlineToolbar: {
              converter: {
                'Convert to': '変換',
              },
            },
          },
          //プラスボタンの中
          toolNames: {
            Text: 'テキスト',
            Heading: 'タイトル',
            Bold: '太字',
            Italic: '斜体',
            Image: '画像',
            Delimiter: '区切り線',
          },
          blockTunes: {
            delete: {
              Delete: '削除',
            },
            moveUp: {
              'Move up': '上へ移動',
            },
            moveDown: {
              'Move down': '下へ移動',
            },
          },
        },
      },
    });
  };

  return (
    <div
      style={{
        backdropFilter: 'blur(100px)',
        borderRadius: '10px',
        border: '1px solid #999999',
      }}
      id={EDITTOR_HOLDER_ID}
    />
  );
};

export default Editor;
