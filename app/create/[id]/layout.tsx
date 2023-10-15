import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Blog',
  description: 'WELCOME2MSSXMTBLOG',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return <>{props.children}</>;
}
