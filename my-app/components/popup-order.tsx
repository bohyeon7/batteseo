import { useRouter } from "next/navigation";
import React from "react";

export default function PopupOrder() {
  const router = useRouter();

  return(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="max-w-screen-sm w-full bg-white p-6 rounded-md shadow-lg text-center">
        <p className="font-semibold text-xl">주문이 완료됐습니다 👏👏👏</p>
        <p className="mt-4 text-lg">
          카카오톡으로 계좌정보 및<br />
          주문정보를 보내드렸습니다<br />
          주문해주셔서 감사합니다 😊
        </p>
        <div className="mt-4">
          <button
            className="bg-gray-700 text-white font-semibold w-40 py-2 m-2 rounded-md"
            onClick={() => router.push('/')} // 메인 페이지로 이동
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}