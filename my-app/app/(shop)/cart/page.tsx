// 장바구니 목록 페이지
'use client'

import Button from "@/components/button";
import DaumPost from "@/components/daum-post";
import Input from "@/components/input";
import Section from "@/components/section"
import Wrapper from "@/components/wrapper"
import { fetchWithToken } from "@/utils/api";
import { blankRegex, nameRegex, phoneRegex } from "@/utils/regexPatterns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const NAME_ERROR_MSG = "이름은 한글 2자 이상이어야 합니다";
  const PHONE_ERROR_MSG = "휴대폰번호는 숫자로만 입력해주세요";

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
        <b>주문상품</b>
        <ul role="list">
          {carts.map((cart) => (
            <li key={cart.id}>{cart.productName} {cart.price}원, {cart.count}개</li>
          ))}
        </ul>
        <p>배송비 {deliveryFee}원</p>
        <b>총 {totalPrice}원</b>
      </Section>

      <Section>
        <b>주문하기</b>
        <form onSubmit={handleSubmit}>
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
          />
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
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleAddress}
            >주소검색</Button>
            <Input
              name="address"
              type="text"
              required
              value={address}
              label="기본주소"
              readonly
            />
            <Input
              name="addressDet"
              type="text"
              required={false}
              value={addressDet}
              onChange={e => onChangeAddressDet(e)}
              label="상세주소"
            />
          </div>
          <Button
            type="submit"
            className="mt-4"
          >주문하기 ✅</Button>
        </form>
      </Section>

      {popup && <DaumPost onSelect={handleAddressSelect} onClose={() => setPopup(false)} />}
    </Wrapper>
  )
}