'use client'

// 메인 페이지
import Button from "@/components/button";
import DisplayText from "@/components/display-text";
import Section from "@/components/section";
import Wrapper from "@/components/wrapper";
import { fetchWithToken } from "@/utils/api";
import { getAuthToken } from "@/utils/cookies";
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

  const handleCart = async () => {
    const token = await getAuthToken();

    if (!token) {
      // 로그인페이지로 리다이렉트
      alert('로그인이 필요합니다');
      router.push('/login');

    } else {
      // 장바구니 데이터 있는 경우에만 리다이렉트
      const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/count`);
      const count = response.data.count;

      if (count < 1) {
        alert('장바구니에 담은 상품이 없습니다');
        return;
      } else {
        router.push('/cart');
      }
    }
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

  return (<>
    <div className="fixed top-0 left-0 right-0 flex justify-end p-4">
      {/* <span className="text-white bg-gray-700 py-1 px-2 rounded-md shadow-lg">장바구니 보기 👉</span> */}
      <Button type="button" onClick={handleCart}
        className="text-white bg-gray-700 py-1 px-2 rounded-md shadow-lg"
      >장바구니 보기 👉</Button>
    </div>
    <div className="bg-gray-900 bg-no-repeat  py-24 sm:py-32 text-center">
      <Section className="!mt-0">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">봉화밭에서 🌾</h2>
        <p className="mt-6 whitespace-pre-line text-gray-300 text-lg">
          경상북도 봉화군에서 들깨농사를 짓습니다<br />
          봉화 들깨로 올해도 건강하세요
        </p>
      </Section>
    </div>
    <Wrapper>
      <Section className="mt-8">
        <p className="text-center leading-8 text-gray-600 text-lg break-keep">
          안녕하세요!<br />
          올해부터 들깨 판매를 웹사이트로 하게되었습니다<br />
          간단한 주문기능을 만들어놓았습니다<br />
          아직 미흡하지만 많은 사용 부탁드립니다<br /><br />
          온라인 구매에 어려움이 있으시면 페이지 맨 아래 연락처로 문의주세요<br />
          감사합니다 💛
        </p>
      </Section>
      <Section>
        <ul role="list">
          {products.map((product) => (
            <li key={product.id} className="mb-20">
              <div className="overflow-hidden">
                <img
                  src={product.thumbnail}
                  className="object-cover h-60 w-full rounded-xl m-auto"
                />
              </div>

              <div className="py-10 flex flex-1 flex-col text-center">
                <div>
                  <div className="text-gray-900">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="mt-4 text-lg font-medium">한 말 (5kg) {product.price.toLocaleString('ko-KR')} 원</p>
                  </div>
                  <div className="mt-8 text-gray-500 text-lg">
                    <DisplayText text={product.detail} />
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="button"
                    className="text-white font-semibold m-auto text-xl rounded-md bg-gray-700 hover:bg-gray-500 w-full py-1.5 text-white shadow-inner shadow-black/10"
                    onClick={handleDetailBtn(product.id)}
                  >자세히보기 👉</Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <div className="bg-[url('/main.jpg')] w-full h-32 bg-cover rounded-md"></div>

      <Section className="text-center leading-8 text-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">봉화밭에서 들깨농사 소개 🌱</h1>
        </div>

        <div className="mb-8 break-keep">
          봉화는 대한민국 3대 오지 중 한 곳으로서
          오염이 없는 청량한 곳입니다.<br />
          주로 송이버섯과 사과 주산지로 유명한 곳이기도합니다<br /><br />
          우리동네는 고도 400미터 정도로, 일교차가 커서
          농산품들의 맛과 품질이 최상급에 속합니다<br />
        </div>

        <div className="mb-8 flex items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/bongwha-1.jpg" alt="bongwha" priority width={400} height={200} />
        </div>

        <div className="mb-8 break-keep">
          봄이 지날때 마당에서 들깨 모종을 키웁니다<br />
          점점 더워질때 모종이 키가 커지고 심을 수 있을때가 됩니다
        </div>

        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/mojong-1.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">까몽이가 자고있어요</p>
        </div>
        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/mojong-2.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">비가오면 오히려좋아</p>
        </div>
        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/nori-1.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">밭에서 먹으면 뀰맛이여요</p>
        </div>
        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/nori-2.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">유격 들깨</p>
        </div>

        <div className="mb-8 break-keep">
          여름이되면 하루가다르게 들깨 키가 커집니다<br />
          그럼 제일 더울때 순치기를 합니다<br />
          가지가 너무 많아져서 잘라줍니다<br />
        </div>

        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/summer-1.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">이랬던 들깨가</p>
        </div>
        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/summer-2.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">갑자기 이렇게</p>
        </div>

        <div className="mb-8 break-keep">
          가을이 오면 드디어 들깨를 벱니다<br />
          예초기로 들깨를 눕혀버리면 곧 바짝말라서 갈색이 됩니다
        </div>

        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/fall-3.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">내밑으로 다 누워라</p>
        </div>
        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/fall-4.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">눕!!!</p>
        </div>

        <div className="mb-8 break-keep">
          들깨가 마르면 다 모아서 탈곡기로 텁니다<br />
          탈곡기로 털면 끝인줄 알았지만 두번정도 풍구작업을 더 해야 쭉정이같은것도 깔끔하게 걸러집니다<br />
        </div>

        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/fall-2.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">탈탈 털어버리는 탈곡기를 샀어요</p>
        </div>
        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/fall-5.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">풍구는 선풍기같아요 (풍구도 샀는데 사진이 없네요,, 농사도 템빨이예요)</p>
        </div>

        <div className="mb-8 break-keep">
          다 걸러진 깨는 단골 방앗간에 맡겨서 들기름이나 들깨가루로 받게됩니다
        </div>

        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/comp-1.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">풍구작업이 끝난 생들깨!</p>
        </div>
        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/comp-2.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">방앗간에서 깨끗히 씻은 뒤</p>
        </div>
        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/comp-3.jpg" alt="bongwha" priority width={400} height={200} />
          <p className="text-sm text-gray-500">고소한 들기름으로!</p>
        </div>

        <div className="mb-8 break-keep">
          이렇게 모든 준비가 끝나고 겨울이 왔습니다<br />
          올해는 참 더위가 길었는데 언제그랬냐는듯 너무 춥습니다<br />
          모두 감기 조심하시고,<br /><br />
          봉화밭에서 정성으로 수확한 들깨 많은 주문 부탁드립니다<br />
          감사합니다 💛
        </div>

        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/winter-1.jpg" alt="bongwha" priority width={400} height={200} />
        </div>
        <div className="mb-8 flex-1 items-center justify-center">
          <Image className="w-full h-auto rounded-md" src="/winter-2.jpg" alt="bongwha" priority width={400} height={200} />
        </div>

      </Section>
    </Wrapper>
    </>
  )
}

