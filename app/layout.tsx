import { Metadata } from 'next';
import '../styles/globals.css';
import BackgroundCanvas from '../components/three/BackgroundCanvas';
import SmoothScroll from '../components/fx/SmoothScroll';
import Preloader from '../components/fx/Preloader';
import SiteNav from '../components/site-nav';
import SiteFooter from '../components/site-footer';
import { notojp } from '../styles/fonts';

const siteName = 'MSSXMTXLOG';
const description = 'MaSaShi XiMoTo x Log';
const url = 'https://mssxmt-xlog.vercel.app/';

export const metadata: Metadata = {
  // 指定が必要 https://docs.netlify.com/configure-builds/environment-variables/
  metadataBase: new URL(process.env.MY_URL ?? 'http://localhost:3000'),
  description,
  title: {
    default: siteName,
    /** `next-seo`の`titleTemplate`に相当する機能 */
    template: `%s - ${siteName}`,
  },
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    site: '@marip13',
    creator: '@marpi13',
  },
  verification: {
    google: 'サーチコンソール',
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <body className={notojp.className}>
        <SmoothScroll />
        <BackgroundCanvas />
        <Preloader />
        <SiteNav />
        <main className='relative z-10' style={{ minHeight: '100vh' }}>
          {props.children}
          {props.modal}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
