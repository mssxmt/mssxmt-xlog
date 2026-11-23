import { Metadata } from 'next';
import '../styles/globals.css';
import Navbar from '../components/navbar';
import { NextThemeProvider } from '../providers/NextThemeProvider';
import Footer from '../components/footer';

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
      <body>
        <NextThemeProvider>
                <Navbar />
                <main
                  // className='min-h-screen'
                  style={{
                    minHeight: ' calc(100vh - 32px)',
                    background:
                      'conic-gradient(from 20deg, rgba(223, 168, 168, 0.8) 18deg, rgba(193, 199, 197, 0.8) 68deg, rgba(108, 199, 221, 0.8) 151deg, rgba(177, 151, 223, 0.8) 263deg, rgba(122, 197, 216, 0.8) 295deg, rgba(223, 168, 168, 0.8) 360deg), url(/images/bg2.png) ',
                    width: '100%',
                    backgroundRepeat: 'repeat',
                  }}
                >
                  {props.children}
                  {props.modal}
                </main>
                <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
}
