import { NextRequest, NextResponse } from 'next/server';
import JwtVerify from './utils/JwtVerify';

export async function middleware(req: NextRequest) {
  const excludePaths = [
    '/api/client/customer/get',
    '/api/client/customer/create',
  ];
  if (excludePaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const jwttoken = req.headers.get('authorization')
    ? req.headers.get('authorization')?.split(' ')[1] || ''
    : '';
  const isTokenValid = await JwtVerify(jwttoken);

  if (isTokenValid) {
    return NextResponse.next();
  }
  return NextResponse.json('You are not authenticated', { status: 400 });
}

export const config = {
  matcher: '/api/:path*',
};
