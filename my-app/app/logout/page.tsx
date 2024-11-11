"use client";

import { fetchWithToken } from "@/utils/api";
import { removeAuthToken } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // 로그아웃 api
        const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`);
        console.log(response);

      } catch (error) {
        console.error('[nbh] Failed to log out.', error);

      } finally {
        // 쿠키의 토큰삭제
        removeAuthToken();
        router.push('/login');
      }
    }

    logout();

  }, [router])
  return (
    <div>Logging out...</div>
  )
}
