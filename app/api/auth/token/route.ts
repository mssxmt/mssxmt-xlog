import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

// pages/api/token.js
// import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
// export default withApiAuthRequired(async function shows(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { accessToken } = await getAccessToken(req, res);
//   console.log(accessToken);
//   res.status(200).json({ accessToken });
// });
export const GET = withApiAuthRequired(async function GET(req) {
  const res = new NextResponse();
  const { accessToken } = await getAccessToken(req, res);

  return NextResponse.json({ token: accessToken }, res);
});

// export { GET };
// export const GET = withApiAuthRequired(async function token(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { accessToken } = await getAccessToken(req, res);
//   res.status(200).json({ accessToken });
// });
// export const GET = withApiAuthRequired(async function getSession(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Auth0 のアクセストークンを取得
//   const { accessToken } = await getAccessToken(req, res);

//   // アクセストークンをログに出力
//   console.log(accessToken);

//   // アクセストークンを JSON レスポンスで返す
//   res.status(200).json({ accessToken });
// });

// export const GET = withApiAuthRequired(async function shows(req) {
//   try {
//     const res = new NextResponse();
//     // const session = await getSession(res,req);
//     const { accessToken } = await getAccessToken(req, res);
//     // const apiPort = process.env.API_PORT || 3001;
//     const response = await fetch(`http://localhost:3000/api/auth/token`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const shows = await response.json();

//     return NextResponse.json(shows, res);
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: error.status || 500 }
//     );
//   }
// });
// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getSession(req, res);
//   const accessToken = await getAccessToken(req, res);
//   res.status(200).json({ accessToken, session });
// };

// export default withApiAuthRequired(getToken);
