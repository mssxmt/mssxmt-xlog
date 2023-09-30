'use client';
import EditorJSHtml from 'editorjs-html';
import { domParser } from '../lib/domParser';
import { Article } from '../lib/gql';

export const ArticleListDescription = ({
  content,
}: {
  content: Article['content'];
}) => {
  const edjsParser = EditorJSHtml();
  const parsedHTML = edjsParser.parseStrict(content);
  const description = domParser(parsedHTML);
  return <>{description}</>;
};
