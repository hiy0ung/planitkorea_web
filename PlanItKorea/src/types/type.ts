//! 유저 타입(회원 가입 시)
// 구
export interface User {
  id: string;
  password: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
  wishList: number[];
  reservation: Reservation[];
}

// 신
export type NewUser = {
  userId: string;
  userPassword: string;
  checkPassword: string;
  userName: string;
  userBirthDate: string;
  userPhone: string;
  userEmail: string;
  snsId: string | null;
  joinPath: string;
}

// 중복확인 에러 메세지 타입
export type DuplicationError = {
  userId: string,
  userEmail: string
}

// 중복확인 성공 메세지 타입
export type DuplicationSuccess = {
  userId: string,
  userEmail: string
}

// 로그인 요청 타입
export type LoginInfo = {
  userId: string,
  userPassword: string
};

// 로그인 응답 타입
export type LoginSuccessResponse = {
  token: string;
  exprTime: number;
}

// 로그인 에러 메세지 관리 타입
export type ErorrMsg = {
  userId: string,
  userPassword: string
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

//& 신 예약 정보 타입
export type NewReservation = {
  id: number;
  userId: number;
  productId: number;
  subProductId: number;
  person: number;
  totalPrice: string;
  startDate: Date;
  endDate: Date;
  reservationStatus: number;
  productImage: string;
  productName: string;
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
  boardType: BoardType;
  boardTitle: string;
  boardContent: string;
  author: string;
  uploadDate: Date;
};

export type BoardType = "공지사항" | "자주묻는질문";

//! 문의 사항
export type InquiryAllResponse = {
  inquiryId: number;
  inquiryTitle: string;
  inquiryCategory: InquiryType;
};

export type InquiryList = {
  inquiryId: number;
  inquiryTitle: string;
  inquiryCategory: InquiryType;
};

export type InquiryDetail = {
  inquiryId: number;
  inquiryTitle: string;
  inquiryCategory: InquiryType;
  inquiryContent: string;
  inquiryImage: any;
};

export type InquiryRequest = {
  inquiryTitle: string,
  inquiryCategory: InquiryType,
  inquiryContent: string,
  inquiryImage: any,
}

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

// export type Facilities =
//   | "사우나"
//   | "수영장"
//   | "바베큐"
//   | "세탁 가능"
//   | "스파/월풀"
//   | "와이파이"
//   | "에어컨"
//   | "욕실용품"
//   | "샤워실"
//   | "조식포함"
//   | "무료주차"
//   | "반려견 동반"
//   | "객실 내 취사"
//   | "OTT";

export type Facilities = {
  facilityId: number;
  facilityName: string;
};

export const facilities: Facilities[] = [
  { facilityId: 1, facilityName: "사우나" },
  { facilityId: 2, facilityName: "수영장" },
  { facilityId: 3, facilityName: "바베큐" },
  { facilityId: 4, facilityName: "세탁" },
  { facilityId: 5, facilityName: "스파/월풀" },
  { facilityId: 6, facilityName: "와이파이" },
  { facilityId: 7, facilityName: "에어컨" },
  { facilityId: 8, facilityName: "샤워실" },
  { facilityId: 9, facilityName: "욕실용품" },
  { facilityId: 10, facilityName: "조식" },
  { facilityId: 11, facilityName: "주차" },
  { facilityId: 12, facilityName: "반려견" },
  { facilityId: 13, facilityName: "취사" },
  { facilityId: 14, facilityName: "OTT" },
];


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

export type ResponseReviewDto = {
  id: number;
  productId: number;
  userId: number;
  reviewCommend: string;
  reviewDate: Date;
  userStringId: string;
}


export type Product = {
  productId: number;
  productCategory: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productAddress: string;
  productImage: string;
  facilityIds: number[];
};

export type ProductDetail = {
  productId: number;
  productCategory: string;
  productName: string;
  productPrice: string;
  productAddress: string;
  productDescription: string;
  productImages: string[];
  subProducts: SubProduct[];
  facilities: Facility[];
}

export type SubProduct = {
  subProductId: number;
  subName: string;
  subPrice: string;
  subPerson: number;
  subProductImages: string[];
}

export type Facility = {
  facilityId: number;
  facilityName: string;
}

export type Wishlist = {
  wishListId: number;
  userId: number;
  productId: number;
  productName: string;
  productAddress: string;
  productPrice: string;
  productImage: string;
}

export type WishListResponseDto = {
  wishListId: number;
  userId: number;
  productId: number;
  productName: string;
  productAddress: string;
  productPrice: string;
  productImage: string;
}


export type Top5Product = {
  productId: number;
  productName: string;
  productCategory: string;
  productRegion: string;
  productAddress: string;
  productPrice: string;
  productImage: string;
}

export interface Point {
  lat: number;
  lng: number;
}

