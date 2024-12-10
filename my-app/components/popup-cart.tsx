import { useRouter } from "next/navigation";
import React from "react";

export default function PopupCart() {
  const router = useRouter();

  return(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="max-w-screen-sm w-full bg-white p-6 rounded-md shadow-lg text-center">
        <p>장바구니에 담았습니다 👏</p>
        <p>주문하시려면 장바구니로 이동해주세요</p>
        <div className="mt-4 flex justify-center">
          <button
            className="border-2 border-gray-700 w-40 py-2 m-2 rounded-md"
            onClick={() => router.push('/')} // 메인 페이지로 이동
          >
            쇼핑 계속하기
          </button>
          <button
            className="bg-gray-700 text-white w-40 py-2 m-2 rounded-md"
            onClick={() => router.push('/cart')} // 장바구니 페이지로 이동
          >
            장바구니로 이동
          </button>
        </div>
      </div>
    </div>
  )
}