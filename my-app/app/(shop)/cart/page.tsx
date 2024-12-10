// 장바구니 목록 페이지
'use client'

import Button from "@/components/button";
import DaumPost from "@/components/daum-post";
import Input from "@/components/input";
import Section from "@/components/section"
import Wrapper from "@/components/wrapper"
import { fetchWithToken } from "@/utils/api";
import { blankRegex, nameRegex, phoneRegex } from "@/utils/regexPatterns";
import { useEffect, useState } from "react";
import PopupOrder from "@/components/popup-order";
import { useRouter } from "next/navigation";

// Entity type
interface Cart {
  id: bigint | null;
  count: number;
  productId: bigint | null;
  productName: string;
  price: number;
}

interface Member {
  name: string;
  phone: string | null;
}

// interface PaymentInfo {
//   orderId: number;
//   storeId: string;
//   channelKey: string;
// }

export default function Cart() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [member, setMember] = useState<Member>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressDet, setAddressDet] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [popup, setPopup] = useState(false);
  const [completePopup, setCompletePopup] = useState(false); // 팝업 표시 여부
  const NAME_ERROR_MSG = "이름은 한글 2자 이상이어야 합니다";
  const PHONE_ERROR_MSG = "휴대폰번호는 숫자로만 입력해주세요";

  // 장바구니 삭제
  const handleDelete = (id: bigint | null) => async () => {
    if (id === null) {
      console.error("ID cannot be null");
      return;
    }
    
    const requestBody = {
      cartId: id,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/del`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify(requestBody),
      });

      setCarts((prev) => prev.filter((item) => item.id !== id));
  
      alert('해당상품이 장바구니에서 삭제됐습니다');

    } catch (error) {
      console.error(error);
    }
  };

  const validateInput = (
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    regex: RegExp,
    value: string,
  ) => {
    setError(!regex.test(value));
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    regex: RegExp,
  ) => {
    const { value } = e.target;
    setter(value);
    validateInput(setError, regex, value);
  }

  // 주소찾기 모달
  const handleAddress = () => {
    setPopup(true);
  }

  // 주소 선택 시 호출될 함수
  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setPopup(false); // 모달 닫기
  }

  // 상세주소 받기
  const onChangeAddressDet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDet(e.target.value);
  }

  // 주문하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!blankRegex.test(address)) {
      alert('주소검색을 진행해주세요');
      return;
    }

    if (carts.length === 0) {
      alert('주문할 상품이 없습니다');
      return;
    }

    // 요청 데이터 정의
    const requestBody = {
      orderTryItems: carts.map((cart) => ({
        productId: cart.productId,
        count: cart.count,
      })),
      address: addressDet.trim() ? `${address} ${addressDet}` : address,
      toName: name,
      toPhone: phone,
    };
    
    try {
      const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/try`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify(requestBody),
      });

      if (response.code === 200) {
        // 성공 팝업 표시
        setCompletePopup(true);
      }

    } catch (error) {
      console.error(error);
      
    }
  }

  useEffect(() => {
    // 장바구니 조회
    const fetchCart = async () => {
      try {
        const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/all`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (response.code === 200) {
          setCarts(response.data.carts);
          setDeliveryFee(response.data.fixedDeliveryFee);
        }
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();

    // 회원정보 조회
    const fetchMember = async () => {
      try {
        const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/member`, {
          method: 'GET',
          cache: 'no-store',
        });
        console.log(response);
        
        setMember(response.data);
        setName(response.data.name);
        setPhone(response.data.phone || '');

      } catch (error) {
        console.error(error);
        
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [])

  // 총가격 계산
  useEffect(() => {
    const calculatedTotal = carts.reduce((acc, cart) => acc + cart.price * cart.count, 0);
    setTotalPrice(calculatedTotal + deliveryFee);
  }, [carts, deliveryFee])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Section>
        <div>
          <h1 className="text-2xl font-semibold mb-4">🌱 주문하실 상품</h1>
          <ul role="list">
            {carts.map((cart) => (
              <li key={cart.id} className="text-xl mb-4 flex">
                <p className="font-semibold w-28">{cart.productName}</p>
                <p>{cart.count} 말</p>
                <p className="ml-4">{cart.price * cart.count} 원</p>
                <div className="ml-2 flex item-center">
                  <Button type="button" onClick={handleDelete(cart.id)}>
                    <div className="text-gray-700 w-5">
                      <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" />
                      </svg>
                    </div>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex text-xl">
            <p className="font-semibold mb-4 w-28">배송비</p>
            <p>{deliveryFee} 원</p>
          </div>

          <div className="flex text-xl">
            <p className="text-xl font-semibold w-28">총 금액</p>
            <p>{totalPrice} 원</p>
          </div>
        </div>

        <div className="mt-20">
          <h1 className="text-2xl font-semibold mb-4">🌱 주문정보 입력</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                name="name"
                type="text"
                required
                placeholder={member?.name}
                value={name}
                onChange={e => onChangeInput(e, setName, setNameError, nameRegex)}
                label="받는사람 이름"
                error={nameError}
                errorMessage={NAME_ERROR_MSG}
                className=""
              />
            </div>
            <div className="mb-4">
              <Input
                name="phone"
                type="text"
                required
                placeholder={member?.phone || ''}
                value={phone}
                onChange={e => onChangeInput(e, setPhone, setPhoneError, phoneRegex)}
                label="받는사람 휴대폰"
                error={phoneError}
                errorMessage={PHONE_ERROR_MSG}
              />
            </div>

            <div>
              <Button
                type="button"
                className="my-4 text-lg font-semibold bg-gray-700 text-white px-3 py-1 w-fit rounded-md"
                onClick={handleAddress}
              >👉 주소 검색하기</Button>

              <div className="mb-4">
                <Input
                  name="address"
                  type="text"
                  required
                  value={address}
                  label="기본주소"
                  readonly
                />
              </div>
              <div>
                <Input
                  name="addressDet"
                  type="text"
                  required={false}
                  value={addressDet}
                  onChange={e => onChangeAddressDet(e)}
                  label="상세주소"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-20 text-white font-semibold text-2xl rounded-md bg-gray-700 hover:bg-gray-500 w-full py-1.5"
            >주문하기 ✅</Button>
          </form>
        </div>
      </Section>

      {/* 주소검색 팝업 */}
      {popup && <DaumPost onSelect={handleAddressSelect} onClose={() => setPopup(false)} />}

      {/* 주문완료 팝업 */}
      {completePopup && <PopupOrder />}
    </Wrapper>
  )
}