import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { token } = await req.json();

  // 쿠키 설정
  cookies().set('authToken', token, {
    httpOnly: true, // 클라이언트에서 쿠키 접근불가
    path: '/', // 사이트 전역 유효
    maxAge: 60 * 60 * 24 * 7, // 1주일
  });

  return NextResponse.json({ success: true });
}
