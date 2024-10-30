// utils/api.ts
import { getAuthToken, setAuthToken } from "./cookies";

/**
 * 헤더에 token 필요한 api 요청
 * @param url 
 * @param options 
 * @returns response
 */
export async function fetchWithToken(url: string, options?: RequestInit) {
  // 쿠키에서 토큰꺼내기
  const token = await getAuthToken();

  const response = await fetch(url, {
    ...options,
    headers: { ...options?.headers, Authorization: `Bearer ${token}` },
  })
  const responseJson = await response.json();
  
  // 만료된 토큰일 경우 재발급이나 로그아웃 처리
  if (responseJson.code === 1101) {
    // 재발급
    const recreateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/re-create`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    
    if (recreateResponse.ok) {
      // 재발급 성공인 경우
      const newTokenData = await recreateResponse.json();
      const newToken = newTokenData.data;
      // 쿠키에 재발급토큰 저장
      await setAuthToken(newToken);
      // 실패했던 요청 재시도
      const retryResponse = await fetch(url, {
        ...options,
        headers: {...options?.headers, Authorization: `Bearer ${newToken}`},
      })
      return retryResponse;

    } else {
      // Refresh Token 만료로 재발급 실패한 경우 로그아웃 처리
      console.log("[nbh] RefreshToken Expired or unexpected error occred");
    }
  }

  return response;
}
