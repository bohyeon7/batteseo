'use server'

import { cookies } from 'next/headers';

interface SetAuthTokenOptions {
  expiresInDays?: number;
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
}

/**
 * 쿠키에 토큰 저장
 * @param tokenValue 
 * @param options 
 */
export const setAuthToken = (tokenValue: string, options: SetAuthTokenOptions = {}): void => {
  const cookieStore = cookies();
  const expiresInDays = options.expiresInDays || 7;

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expiresInDays);

  cookieStore.set('authToken', tokenValue, {
    path: options.path || '/',
    httpOnly: options.httpOnly !== undefined ? options.httpOnly : true,
    secure: options.secure !== undefined ? options.secure : process.env.NODE_ENV === 'production',
    expires: expirationDate,
  });
};

/**
 * 쿠키에서 토큰 가져오기
 * @returns 
 */
export const getAuthToken = () => {
  const cookieStore = cookies();
  return cookieStore.get('authToken')?.value || null;
};
