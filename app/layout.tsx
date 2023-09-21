import { Metadata } from 'next';
import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
  title: 'Home',
  description: 'WELCOME2MSSXMTBLOG',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja' data-theme='retro'>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
