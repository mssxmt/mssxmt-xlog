import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

// Returns the Auth0 access token for the logged-in user.
// Replaces withApiAuthRequired (its handler-context type is incompatible
// with Next.js 15 route handler types): getAccessToken throws when
// there is no session, which we turn into a 401.
export async function GET(req: NextRequest) {
  const res = new NextResponse();
  try {
    const { accessToken } = await getAccessToken(req, res);
    if (!accessToken) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ token: accessToken }, res);
  } catch {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
}
