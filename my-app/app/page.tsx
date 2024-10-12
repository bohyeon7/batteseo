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
      {/* Header Sections */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="mx-auto max-w-screen-lg px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">봉화들들</h2>
            <p className="mt-6 whitespace-pre-line text-xl leading-8 text-gray-300">
              안녕하세요!<br />
              올해부터 들깨 판매를 웹사이트로 하게되었습니다<br />
              간단한 주문, 결제 기능을 만들어두었습니다<br />
              아직 미흡한 쇼핑몰이지만 많은 사용 부탁드립니다<br /><br />
              온라인 구매에 어려움이 있으시면 페이지 맨 아래 연락처로 편하게 문의주세요<br />
              감사합니다 💛
            </p>
          </div>
        </div>
      </div>

      {/* 판매상품 */}
      <div className="mt-20 mx-auto max-w-screen-lg flex h-full flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <h1 className="text-3xl font-medium text-gray-900">판매상품</h1>

          <div className="mt-8">
            <div>
              <ul role="list">
                {products.map((product) => (
                  <li key={product.id} className="flex py-20">
                    <div className="w-1/2 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 py-10 flex flex-1 flex-col">

                      <div>
                        <div className="text-3xl flex justify-between text-base font-medium text-gray-900">
                          <h3>{product.name}</h3>
                          <p className="ml-4">{product.price}</p>
                        </div>

                        <p className="mt-8 text-xl text-gray-500">{product.color}</p>
                      </div>

                      <div className="flex flex-1 text-xl">
                        <div className="flex">
                          <button type="button" className="font-medium text-lime-600 hover:text-lime-500">
                            자세히보기
                          </button>
                        </div>
                      </div>

                    </div>

                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

