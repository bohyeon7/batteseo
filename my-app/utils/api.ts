import { getAuthToken, setAuthToken } from "./cookies";

/**
 * 헤더에 token 필요한 api 요청
 * @param url 
 * @param options 
 * @returns response
 */
export async function fetchWithToken(url: string, options?: RequestInit) {
  // 쿠키에서 얻은 토큰으로 api 요청
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
    const newTokenData = await recreateResponse.json();

    if (recreateResponse.ok) {
      // 재발급 성공인경우, 쿠키에 재발급토큰 저장 후 실패했던 api 재요청과 결과리턴
      const newToken = newTokenData.data;
      await setAuthToken(newToken);

      const retryResponse = await fetch(url, {
        ...options,
        headers: {...options?.headers, Authorization: `Bearer ${newToken}`},
      })

      return retryResponse.json();

    } else {
      // Refresh Token 만료로 재발급 실패한 경우 로그아웃 처리
      if (typeof window !== "undefined") {
        window.location.href = '/logout';
      }
      return null;
    }
  }

  return responseJson;
}
