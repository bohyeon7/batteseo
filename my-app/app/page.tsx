const products = [
  {
    id: 1,
    name: '들기름',
    href: '#',
    color: '상세설명 어쩌구저쩌구 쩌구쩌구 저쩌구',
    price: '20000원',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: '고소한 들기름 사진을 여기에',
  },
  {
    id: 2,
    name: '들깨',
    href: '#',
    color: '상세설명 블라블라블랄라 랄라랄라블랄라',
    price: '16000원',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      '동글동글 들깨 사진을 여기에',
  },
  {
    id: 3,
    name: '들깨가루',
    href: '#',
    color: '상세설명 어쩌구저쩌구 쩌구쩌구 저쩌구',
    price: '20000원',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: '고소한 들깨가루 사진을 여기에',
  },
]

export default function Home() {
  return (
    <div>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          alt=""
          src="/main.webp"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="mx-auto max-w-screen-lg px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">봉화밭에서</h2>
          <p className="mt-6 whitespace-pre-line leading-8 text-gray-300">
            경상북도 봉화군에서 들깨농사를 짓습니다<br />
            어쩌구저쩌구한 머머를 머머해보세요
          </p>
        </div>
      </div>

      <div className="mt-32 mx-auto max-w-screen-lg flex h-full flex-col">
        <div className="flex-1 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-screen-lg px-6 lg:px-8">
            <p className="text-center leading-8 text-gray-600">
              안녕하세요!<br />
              올해부터 들깨 판매를 웹사이트로 하게되었습니다<br />
              간단한 주문, 결제 기능을 만들어두었습니다<br />
              아직 미흡한 쇼핑몰이지만 많은 사용 부탁드립니다<br /><br />
              온라인 구매에 어려움이 있으시면 페이지 맨 아래 연락처로 편하게 문의주세요<br />
              감사합니다 💛
            </p>
          </div>

          <div className="mt-32">
            <ul role="list">
              {products.map((product) => (
                <li key={product.id} className="flex pb-20">
                  <div className="w-1/2 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 py-10 flex flex-1 flex-col">
                    <div>
                      <div className="text-2xl flex justify-between font-medium text-gray-900">
                        <h3>{product.name}</h3>
                        <p className="ml-4">{product.price}</p>
                      </div>
                      <p className="mt-8 text-gray-500">{product.color}</p>
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
          </div>

        </div>
      </div>

    </div>
  )
}

