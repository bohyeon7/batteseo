"use client"

import Image from "next/image"
import Input from "../../components/input"
import React, { useEffect, useState } from "react"
import Button from "../../components/button"
import { emailRegex, nicknameRegex, passwordRegex } from "@/utils/regexPatterns"

export default function CreateAccount() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [nicknameError, setNicknameError] = useState(false)
  const EMAIL_ERROR_MSG = "정확하지 않은 이메일입니다"
  const PASSWORD_ERROR_MSG = "비밀번호는 영문, 숫자, 특수문자 중 2개 이상을 조합하여 최소 8자리 이상이어야 합니다"
  const NICKNAME_ERROR_MSG = "닉네임은 한글이나 한글, 숫자 조합으로 최소 2자 이상이어야 합니다"

  const validateInput = (
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    regex: RegExp,
    value: string,
  ) => {
    setError(!regex.test(value));
  };
  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    regex: RegExp,
  ) => {
    const { name, value } = e.target;
    setter(value);
    validateInput(setError, regex, value);
  }

  useEffect(() => {
    if (email === "") setEmailError(false);
    if (password === "") setPasswordError(false);
    if (nickname === "") setNicknameError(false);

    return () => { }
  }, [email, password, nickname]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=lime&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            회원가입
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <Input
              id="nickname"
              name="nickname"
              type="text"
              required
              value={nickname}
              onChange={e => onChangeInput(e, setNickname, setNicknameError, nicknameRegex)}
              label="닉네임"
              error={nicknameError}
              errorMessage={NICKNAME_ERROR_MSG}
            />

            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplate="email"
              value={email}
              onChange={e => onChangeInput(e, setEmail, setEmailError, emailRegex)}
              label="이메일"
              error={emailError}
              errorMessage={EMAIL_ERROR_MSG}
            />

            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplate="password"
              value={password}
              onChange={e => onChangeInput(e, setPassword, setPasswordError, passwordRegex)}
              label="비밀번호"
              error={passwordError}
              errorMessage={PASSWORD_ERROR_MSG}
            />

            <Button type="submit" className="w-full rounded-md bg-lime-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
              <>
                회원가입
              </>
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            이미 계정이 있으신가요?{' '}
            <a href="#" className="font-semibold leading-6 text-lime-600 hover:text-lime-500">
              로그인 하러하기
              <span className="px-1.5 text-lg">👉</span>
            </a>
          </p>

          <div className="mt-10">
            <Button className="flex justify-center gap-5 w-full rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
              <>
                <Image
                  src="/google.svg"
                  width={20}
                  height={20}
                  alt="google"
                />
                구글 간편가입
              </>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
