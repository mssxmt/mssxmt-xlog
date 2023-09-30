import { parse } from 'node-html-parser';
export const domParser = (data: string): string | undefined | null => {
  const doc = parse(data);
  // 最初のpタグ
  const firstParagraph = doc.querySelector('p');

  // <p>タグの文字列を取得
  const text = firstParagraph?.textContent;
  return text;
};
