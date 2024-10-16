import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // 쿠키에서 인증 토큰 확인

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 인증된 경우 요청을 그대로 진행
  return NextResponse.next();
}


// middleware 실행 필터링 (인증이 필요한 경로)
export const config = {
  matcher: [
    '/'
  ],
}