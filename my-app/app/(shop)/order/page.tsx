// 주문서 페이지
'use client'

import Input from "@/components/input";
import Section from "@/components/section"
import Wrapper from "@/components/wrapper"
import { fetchWithToken } from "@/utils/api";
import { useEffect, useState } from "react";
import { nameRegex, phoneRegex } from "@/utils/regexPatterns";

interface Item {
  id: bigint | null;
  count: number;
}

interface Member {
  name: string;
  phone: string | null;
}

export default function Order() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [member, setMember] = useState<Member>();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
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
    const { name, value } = e.target;
    setter(value);
    validateInput(setError, regex, value);
  }

  useEffect(() => {
    // localStorage 에 저장된 주문목록 가져오기
    const storedData = localStorage.getItem('cartItems');
    setItems(storedData ? JSON.parse(storedData) : []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Section>
          <b>주문 상품 목록</b>
          <ul role="list">
            {items.map((item) => (
              <li key={item.id}>cart id: {item.id}, count: {item.count}</li>
            ))}
          </ul>
      </Section>

      <Section>
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
      </Section>
    </Wrapper>
  )
}