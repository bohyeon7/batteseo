// 장바구니 목록 페이지
'use client'

import Button from "@/components/button";
import Section from "@/components/section"
import Wrapper from "@/components/wrapper"
import { fetchWithToken } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Entity type
interface Cart {
  id: bigint | null;
  count: number;
}

export default function Cart() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([]);

  const tryOrder = () => {
    // localStorage 에 주문목록 저장후 페이지이동
    localStorage.setItem('cartItems', JSON.stringify(carts));
    router.push('/order');
  }

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/all`, {
          method: 'GET',
        });
        console.log(response);

        if (response.code === 200) {
          setCarts(response.data);
        }
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Section>
        <ul role="list">
          {carts.map((cart) => (
            <li key={cart.id}>cart id: {cart.id}, count: {cart.count}</li>
          ))}
        </ul>
        <Button
          type="button"
          onClick={tryOrder}
        >주문하기</Button>
      </Section>
    </Wrapper>
  )
}