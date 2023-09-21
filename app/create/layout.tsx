import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create',
  description: 'WELCOME2MSSXMTBLOG',
};

export default async function Create({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}
