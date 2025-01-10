//! 유저 타입(회원 가입 시)
export interface User {
  id: string;
  password: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
  wishList: number[];
  reservation: Reservation[];
}

//! 예약할때 타입
export interface Reservation {
  id: string;
  productId: number; // 숙소 고유id
  productName: string; // 숙소 이름
  price: string; // 가격
  reservationNumber: number; // 예약 번호
  startDate: string; //날짜
  endDate: string; //날짜
  person: number; // 인원
  img: string[]; // 숙소이미지
}

// 예약 확인
// 예약번호, 체크인,체크아웃, 인원, 숙소 이미지, 제목, 가격

//! 숙소 검색 바
export interface SearchBarFilter {
  city: Location;
  startDate: string;
  endDate: string;
  person: number;
}

//! 공지사항
export type Announcement = {
  id: number;
  title: string;
  content: string;
  author: string;
};

//! 문의 사항
export type Inquiry = {
  id: string;
  userId: string;
  category: InquiryType;
  title: string;
  content: string;
  image: string[] | undefined;
};

//! 문의사항 유형 선택
export type InquiryType = "결제" | "취소" | "환불";

//! 여행지 타입
export type Location =
  | "서울"
  | "부산"
  | "경주"
  | "제주도"
  | "가평"
  | "강릉"
  | "여수"
  | "전주"
  | "해남"
  | "대구"
  | null;

//! 숙소 타입
export type Accommodation = "호텔&리조트" | "펜션&풀빌라" | "캠핑&글램핑";

export type Facilities =
  | "사우나"
  | "수영장"
  | "바베큐"
  | "세탁 가능"
  | "스파/월풀"
  | "와이파이"
  | "에어컨"
  | "욕실용품"
  | "샤워실"
  | "조식포함"
  | "무료주차"
  | "반려견 동반"
  | "객실 내 취사"
  | "OTT";

//! 레저 & 티켓 타입
export type Ticket = "관광" | "테마파크" | "레저스포츠" | "전시&공연";

//! 리뷰 타입
export interface Review {
  id: string;
  productId: string;
  userId: string;
  comment: string;
  date: string;
}

//! 숙소 상품 타입
export interface BerthProduct {
  id: number;
  img: string[];
  name: string;
  price: string;
  address: string;
  point: Point;
  //? 지역 카테고리
  city: Location;
  //? 숙소 카테고리
  accommodationCategory: Accommodation[];
  //? 편의시설 카테고리
  facility: Facilities[];
  description: string;
}

export interface Point {
  lat: number;
  lng: number;
}

