import { redirect } from 'next/navigation';

// INDEX is temporarily closed — all article URLs land on the closed
// notice. Original implementation is in git history (pre-2026-11-25).
export default function Page() {
  redirect('/blog');
}
