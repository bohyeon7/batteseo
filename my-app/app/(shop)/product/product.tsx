// 상품 목록 페이지
'use client'

import Button from "@/components/button";
import PopupCart from "@/components/popup-cart";
import Section from "@/components/section";
import Wrapper from "@/components/wrapper";
import { fetchWithToken } from "@/utils/api";
import { getAuthToken } from "@/utils/cookies";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Entity type
interface Product {
  id: bigint | null;
  name: string;
  price: number;
  detail: string;
  info: string;
  thumbnail: string;
}

export default function Product() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [product, setProduct] = useState<Product>(
    { id: null, name: '', price: 0, detail: '', info: '', thumbnail: '' }
  );
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // 팝업 표시 여부

  const handleCountBtn = (change: number) => {
    setCount(prevCount => {
      if (prevCount + change < 1) return 1;
      return prevCount + change;
    });
  }

  const addCart = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        // 로그인페이지로 리다이렉트
        alert('로그인이 필요합니다');
        router.push('/');
      }

      // 요청 데이터 정의
      const requestBody = {
        productId: id,
        count: count,
      };

      await fetchWithToken(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify(requestBody),
      });

      // 성공 팝업 표시
      setIsPopupVisible(true);
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product?id=${id}`);
        const jsonData = await response.json();
        if (jsonData.status === process.env.NEXT_PUBLIC_API_RESPONSE_OK) {
          setProduct(jsonData.data);
        } else {
          console.error(jsonData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    setTotalPrice(product.price * count);
  }, [product, count]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Section>
        {/* 썸네일 */}
        <div>
          <img
            src={product.thumbnail}
            className="h-full w-full rounded-xl m-auto"
          />
        </div>

        {/* 구매정보 */}
        <div className="py-10">
          <h3 className="text-3xl font-semibold">{product.name}</h3>

          <h3 className="mt-4 text-xl font-semibold border border-gray-700 px-2 py-1 w-fit rounded-md">✅ 구매시 꼭 확인해주세요</h3>
          <p className="mt-2 text-gray-500 text-xl">{product.info}</p>

          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-semibold">수량</p>

            <div className="flex items-center w-1/2">
              <button onClick={() => handleCountBtn(-1)} type="button" className="bg-gray-700 hover:bg-gray-500 rounded-s-lg p-3 h-11">
                  <svg className="w-3 h-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                  </svg>
              </button>
              <input type="text" className="bg-gray-700 text-center text-white text-md block w-full py-2.5" value={count} readOnly required />
              <button onClick={() => handleCountBtn(1)} type="button" className="bg-gray-700 hover:bg-gray-500 rounded-e-lg p-3 h-11">
                  <svg className="w-3 h-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                  </svg>
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center text-xl font-semibold">
            <p className="">총 금액</p>
            <p className="items-right">{totalPrice} 원</p>
          </div>

          <Button
            type="button"
            className="mt-20 text-white font-semibold text-2xl rounded-md bg-gray-700 hover:bg-gray-500 w-full py-1.5"
            onClick={addCart}
          >장바구니 넣기</Button>
        </div>
      </Section>

      <Section>test</Section>

      {/* 팝업 */}
      {isPopupVisible && <PopupCart />}
    </Wrapper>
  )
}