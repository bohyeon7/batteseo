"use client"

import Image from "next/image"
import Input from "../../components/input"
import { useState } from "react"
import Button from "../../components/button"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            로그인
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplate="email"
              value={email}
              onChange={onChangeEmail}
              label="이메일"
            />

            <div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplate="password"
                value={password}
                onChange={onChangePassword}
                label="비밀번호"
              />
              <div className="text-sm mt-1">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <>
                로그인
              </>
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            계정이 없으신가요?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              회원가입 하러하기
              <span className="px-1.5 text-lg">👉</span>
            </a>
          </p>

          <div className="mt-10">
            <Button className="flex justify-center gap-5 w-full rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <>
                <Image
                  src="/google.svg"
                  width={20}
                  height={20}
                  alt="google"
                />
                구글로그인
              </>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
