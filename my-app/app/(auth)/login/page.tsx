"use client";

import Image from "next/image"
import Button from "@/components/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/utils/cookies";
import Wrapper from "@/components/wrapper";

export default function Login() {
  const router = useRouter();

  const restApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const kakaoURL = `${process.env.NEXT_PUBLIC_KAKAO_URL_BASE}?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL
  }

  useEffect(() => {
    const fetchWithToken = async (code: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/kakao/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
        const responseJson = await response.json();
        return responseJson.data.accessToken;
      } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
      }
    };

    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      (async () => {
        try {
          const accessToken = await fetchWithToken(code);
          if (accessToken) {
            await setAuthToken(accessToken);
            router.push('/');
          }
        } catch (error) {
          console.error('Error during login process:', error);
        }
      })();
    }

  }, [router]);

  return (
    <Wrapper>
      <div className="mt-32">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-center text-4xl">🌱</p>
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            봉화밭에서 로그인
          </h2>
          <p className="mt-4 text-md text-center text-gray-600">
            카카오 로그인으로 회원정보를 받고있습니다<br />
            아래 버튼으로 자동 회원가입이 됩니다<br />
          </p>
          
        </div>

        <div className="mt-20 mx-auto text-center">
          <Button onClick={handleLogin} className="w-sm mx-auto">
            <Image src="/kakao_login_large_wide.png" alt="kakao" priority width={400} height={200} />
          </Button>
        </div>
      </div>
    </Wrapper>
  )
}
