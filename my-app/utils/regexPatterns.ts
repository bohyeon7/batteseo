// 빈칸
export const blankRegex = /\S+/;
// 이메일
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 비밀번호 - 영문, 숫자, 특수문자 중 2개 조합이며 최소 8자리
export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d|[!@#$%^&*()_+={};':"<>?,./~`-])[a-zA-Z\d!@#$%^&*()_+={};':"<>?,./~`-]{8,}$/;
// 닉네임 - 한글이나 한글, 숫자 조합으로 최소 2자
export const nicknameRegex = /^(?=.*[가-힣])[가-힣0-9]{2,}$/;
// 이름 - 한글만 허용, 최소 2자 이상
export const nameRegex = /^[가-힣]{2,}$/;
// 휴대폰 번호 - 하이픈 없이 숫자만 허용 (01012345678 형식)
export const phoneRegex = /^(01[016789])[0-9]{7,8}$/;