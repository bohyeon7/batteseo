'use client'

import Button from "@/components/button";
import Input from "@/components/input";
import Section from "@/components/section";
import Wrapper from "@/components/wrapper";
import { getAuthToken } from "@/utils/cookies";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Entity type
interface Product {
  id: bigint | null;
  name: string;
  price: number;
  detail: string;
}

export default function Product() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState<Product>({ id: null, name: "", price: 0, detail: "" });
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  const handleCountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setCount(value);
  }

  const addCart = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        // 로그인페이지로 리다이렉트
        router.push('/');
      }

      // 요청 데이터 정의
      const requestBody = {
        productId: id,
        count: count,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store',
        body: JSON.stringify(requestBody),
      });

    } catch (error) {
      console.log(error);
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
  }, [id])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Section>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <Input
          id="count"
          name="count"
          type="number"
          required
          value={count}
          onChange={handleCountInput}
          label="수량"
        />
        <Button
          onClick={addCart}
        >장바구니에 추가</Button>
      </Section>
    </Wrapper>
  )
}