"use client";

import Image from "next/image"
import Button from "../../components/button"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        const response = await fetch('http://localhost:8086/auth/kakao/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
        const data = await response.json();
        return data.accessToken;
      } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
      }
    };

    const saveTokenToCookie = async (accessToken: string) => {
      try {
        const response = await fetch('/api/set-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken }),
        });
        return response;
      } catch (error) {
        console.error('Error saving token:', error);
        throw error;
      }
    };

    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      (async () => {
        try {
          const accessToken = await fetchWithToken(code);
          await saveTokenToCookie(accessToken);
          router.push('/');
        } catch (error) {
          console.error('Error during login process:', error);
        }
      })();
    }

  }, [router]);

  return (
    <div className="mt-32">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=lime&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          로그인 및 회원가입
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mt-10">
          <Button onClick={handleLogin}>
            <Image src="/kakao_login_large_wide.png" alt="kakao" priority width={400} height={200} />
          </Button>
        </div>
      </div>
    </div>
  )
}
