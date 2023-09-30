import { Noto_Sans_JP } from 'next/font/google';
import localFont from 'next/font/local';
// import from "../public/fonts/brutal-tooth.tt"
const notojp = Noto_Sans_JP({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-notojp',
  display: 'swap',
});

// カスタムローカルフォントを定義する
const bt = localFont({
  src: '../public/fonts/brutal-tooth.ttf',
});

export { notojp, bt };
