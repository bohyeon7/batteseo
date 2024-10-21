import Section from "@/components/section";
import Wrapper from "@/components/wrapper";

// Entity type
interface Product {
  id: bigint;
  name: string;
  price: number;
  detail: string;
}

export default async function Home() {
  let data = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/product/all', { cache: 'no-store' });
  let products = await data.json();
  let dataArray: Product[] = [];

  // status OK 인 경우에만 data 출력
  if (products.status === process.env.NEXT_PUBLIC_API_RESPONSE_OK) {
    dataArray = products.data;
  } else {
    console.log(products);
  }


  return (
    <Wrapper>
      <div className="bg-gray-900 py-24 sm:py-32">
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
          {dataArray.map((product) => (
            <li key={product.id} className="flex pb-20">
              <div className="w-1/2 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                <img
                  alt=''
                  src='https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 py-10 flex flex-1 flex-col">
                <div>
                  <div className="text-2xl flex justify-between font-medium text-gray-900">
                    <h3>{product.name}</h3>
                    <p className="ml-4">{product.price}</p>
                  </div>
                  <p className="mt-8 text-gray-500">{product.detail}</p>
                </div>

                <div className="flex flex-1">
                  <button type="button" className="font-medium text-lime-600 hover:text-lime-500">
                    자세히보기
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </Wrapper>
  )
}

