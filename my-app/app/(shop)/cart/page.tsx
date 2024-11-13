// 장바구니 목록 페이지
'use client'

import Section from "@/components/section"
import Wrapper from "@/components/wrapper"
import { fetchWithToken } from "@/utils/api";
import { useEffect, useState } from "react";

// Entity type
interface Cart {
  id: bigint | null;
}

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([]);

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
            <li key={cart.id}>cart id : {cart.id}</li>
          ))}
        </ul>
      </Section>
    </Wrapper>
  )
}