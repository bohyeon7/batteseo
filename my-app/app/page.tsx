'use client'

// 메인 페이지
import Button from "@/components/button";
import Section from "@/components/section";
import Wrapper from "@/components/wrapper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Entity type
interface Product {
  id: bigint;
  name: string;
  price: number;
  detail: string;
  info: string;
  thumbnail: string;
}

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const handleDetailBtn = (id: bigint) => () => {
    router.push(`/product?id=${id}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/all`, { cache: 'no-store' });
      const products = await response.json();

      if (products.status === process.env.NEXT_PUBLIC_API_RESPONSE_OK) {
        setProducts(products.data);
      } else {
        console.log(products);
      }
    };

    fetchData();
  }, [])

  return (
    <Wrapper>
      <div className="bg-gray-900 py-24 sm:py-32 text-center">
        <Section className="mt-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">봉화밭에서</h2>
          <p className="mt-6 whitespace-pre-line text-gray-300">
            경상북도 봉화군에서 들깨농사를 짓습니다<br />
            어쩌구저쩌구한 머머를 머머해보세요
          </p>
        </Section>
      </div>
      <Section>
        <p className="text-center leading-8 text-gray-600">
          안녕하세요!<br />
          올해부터 들깨 판매를 웹사이트로 하게되었습니다<br />
          간단한 주문, 결제 기능을 만들어두었습니다<br />
          아직 미흡한 쇼핑몰이지만 많은 사용 부탁드립니다<br /><br />
          온라인 구매에 어려움이 있으시면 페이지 맨 아래 연락처로 편하게 문의주세요<br />
          감사합니다 💛
        </p>
      </Section>
      <Section>
        <ul role="list">
          {products.map((product) => (
            <li key={product.id} className="mb-40">
              <div className="overflow-hidden">
                <img
                  src={product.thumbnail}
                  className="object-cover h-60 w-full max-w-screen-sm rounded-xl m-auto"
                />
              </div>

              <div className="py-10 flex flex-1 flex-col text-center">
                <div>
                  <div className="text-gray-900">
                    <h3 className="text-2xl font-semibold">{product.name}</h3>
                    <p className="text-xl font-medium">한 말 기준 {product.price}원</p>
                  </div>
                  <p className="mt-8 text-gray-500 text-xl">{product.detail}</p>
                </div>

                <div className="mt-8">
                  <Button
                    type="button"
                    className="text-white font-semibold m-auto text-2xl rounded-md bg-gray-700 hover:bg-gray-500 w-full max-w-screen-sm py-1.5 text-white shadow-inner shadow-black/10"
                    onClick={handleDetailBtn(product.id)}
                  >자세히보기 👉</Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </Wrapper>
  )
}

