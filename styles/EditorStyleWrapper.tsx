'use client';
import styled from 'styled-components';

export default function EditorStyleWrapper(props: {
  children: React.ReactNode;
}) {
  return <>{props.children}</>;
}
export const EditorStyle = styled.div`
  /* blockTunesメニュー位置変更スタイル */
  /* blockTunesメニューを左に表示するためにマージンを左に取る */
  .codex-editor--narrow .codex-editor__redactor {
    margin-left: 0px;
    margin-right: 0px;
  }

  .ce-toolbar__actions {
    /* プラスボタンとドットの位置反転 */
    flex-direction: row-reverse;
  }
  /* blockTunesメニューを左に移すためにleftからのpositionに メディアクエリごと指定 */
  @media (min-width: 651px) {
    .codex-editor--narrow .ce-toolbar__actions {
      right: 100%;
    }
  }

  /* blockTunes左右位置 */
  .codex-editor--narrow .ce-toolbox {
    left: 200px;
    right: auto;
  }

  /* blockTunesメニュー位置変更スタイルここまで */
  .ce-block__content,
  .ce-toolbar__content {
    max-width: 85%; /* example value, adjust for your own use case */
  }
  .image-tool__tune {
    display: none;
  }
  .image-tool__caption {
    display: none;
  }
  .ce-header {
    padding: 0.6em 0 3px;
  }
  .ce-popover__item-icon svg {
    /*block tunes内svgアイコン枠内サイズ*/
    width: 18px;
    height: 13px;
  }
  .ce-conversion-tool__icon svg {
    /*inlinetool内svgアイコン枠内サイズ*/
    width: 19px;
    height: 14px;
  }
  .ce-inline-toolbar__dropdown-content svg {
    width: 19px;
  }

  /* 区切り線スタイル */
  .ce-delimiter {
    position: relative;
    height: 32px;
    :before {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      margin: auto;
      display: inline-block;
      content: '';
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      width: 180px;
      height: 0px;
    }
  }

  //区切り線スタイルeditorJs-html用
  .delimiter-for-preview {
    position: relative;
    height: 0px;
    padding: 8px 0;
    width: 180px;
    margin: 0 auto;
    :before {
      position: absolute;
      top: 50%;
      display: inline-block;
      content: '';
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      height: 0px;
    }
  }

  /* リストスタイル */
  .cdx-list {
    padding-top: 8px;
    padding-left: 0px;
  }

  //プレースホルダーのスタイル
  .ce-paragraph[data-placeholder]:empty::before {
    color: #c9d7db;
  }

  //リストスタイル
  ol {
    list-style-type: decimal;
    list-style-position: outside;
    line-height: 21px;
    margin-left: 30px;
    margin-top: 8px;
    padding-bottom: 8px;
    li {
      padding: 2px 2px 8px 6px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 200%;
      letter-spacing: 0.08em;
    }
  }

  ul {
    list-style-type: inherit;
    list-style-position: outside;
    line-height: 21px;
    margin-top: 8px;
    padding-bottom: 8px;
    margin-left: 18px;
    li {
      padding: 2px 2px 8px 6px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 200%;
      letter-spacing: 0.08em;
    }
  }
  //paragraph
  .ce-block__content,
  .ce-paragraph,
  .cdx-block {
    font-size: 14px;
    font-weight: 300;
  }

  p {
    padding: 16px 0;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 200%;
    letter-spacing: 0.08em;
  }

  b {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 200%;
    letter-spacing: 0.08em;
  }

  i {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 200%;
    letter-spacing: 0.08em;
  }

  img {
    width: 100%;
    margin: 16px 0;
    border-radius: 16px;
  }

  h1 {
    padding-top: 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 170%;
    letter-spacing: 0.08em;
  }

  a {
    font-weight: 300;
    font-size: 14px;
    line-height: 150%;
    color: #056f80;
    word-break: break-all;
  }
`;
