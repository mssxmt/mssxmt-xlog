import Link from 'next/link';
import Discography from '../../components/discography';

export default async function Page() {
  return (
    <div style={{ paddingTop: '64px' }}>
      <Discography />
    </div>
  );
}
