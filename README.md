# PlanItKorea 🏨
**[산대특] IoT 기반 웹솔루션 개발자 과정 - 코리아아이티아카데미 부산**

---

## 💡 프로젝트 개요
**국내 숙소 예약 웹 서비스**

사용자의 다양한 요구를 반영한 숙소 검색, 예약 관리, 리뷰, 위시리스트 기능을 제공해
편하고 직관적인 예약 경험을 목표로 합니다.

> **숙소 검색 및 필터링**
- 지역별, 예약날짜 및 인원별, 숙소 유형(호텔&리조트, 펜션&풀빌라, 캠핑&글램핑)별 검색 기능 제공
- 숙소별 편의시설(수영장, 주차장, 조식 제공 등) 필터링 기능 제공

> **예약 기능**
- 원하는 조건의 숙소 실시간 예약 가능 여부 확인 및 예약 기능 제공
- 예약 내역 조회 및 취소 기능 제공

> **리뷰 및 위시리스트**
- 숙소 이용 후 리뷰 작성 및 평점 부여 기능 제공
- 방문자가 작성한 리뷰와 별점 및 내용 조회 기능 제공

> **고객 지원 및 1:1 문의**
- 공지사항, 자주 묻는 질문 조회 기능 제공
- 예약, 환불, 취소 관련 1:1 문의 작성, 조회, 수정, 삭제 기능 제공

---

## 🔗 데모
<<<<<<< HEAD
=======
- [화면 구현](./public/yumyum_화면구현.png)
>>>>>>> 427a7a9 (docs: README 추가)
- [배포 링크]()

---

## 🛠️ 기술 스택
- React.js
- TypeScript
- React Router
- React Cookie
- Zustand
- Axios
- React Paginate
- React Datepicker
- MUI (Material UI)
- Emotion (CSS-in-JS)
- styled-components
- Tailwind CSS

---

## 📌 주요 기능
- 지역, 예약 날짜, 인원수 등 다양한 조건에 맞춘 숙소 검색 및 필터링
- 실시간 예약 가능 여부 확인 및 예약 내역 관리
- 숙소 리뷰 작성 및 조회, 예약 내역 조회 및 취소 기능
- 관심 숙소 추가/삭제 및 조회하는 위시리스트 기능
- 고객 지원을 위한 1:1 문의 및 공지사항, 자주 묻는 질문 조회 기능

---

## 📌 담당 기능
- 회원가입 비밀번호 강도 검사 및 입력값 유효성 검증 (중복 체크, 형식 오류 시 에러 메시지 처리)
- 인기 여행지별 숙소 조회 API 연동
- 위시리스트 추가, 조회, 삭제 API 연동 및 상태 반영 처리
- 1:1 문의 추가, 조회, 수정, 삭제 API 연동 및 관련 화면 구성
- 조건에 맞는 숙소 조회 데이터 기반으로 숙소 유형(호텔&리조트, 펜션&풀빌라, 캠핑&글램핑)에 따른 필터링 로직 구현
- 조건에 맞는 숙소 조회 데이터 기반으로 편의 시설 포함 여부(조식, 주차, Wi-Fi 등)에 따른 필터링 로직 구현

---

## 💻 프로젝트 실행 방법
### 클론 및 폴더 이동
```bash
git clone https://github.com/hiy0ung/planitkorea_web.git
cd planitkorea_was
```

### 개발 서버 실행
```bash
npm run start
```

### 빌드 방법
```bash
npm run build
```

---

## 📁 폴더 구조
```md
yumyum_web
├── 📂 public
├── 📂 src
│   ├── 📂 apis
│   ├── 📂 assets
│   ├── 📂 constants
│   ├── 📂 layouts
│   ├── 📂 stores
│   ├── 📂 styles
│   ├── 📂 types
│   ├── 📃 App.css
│   ├── 🧪 App.test.tsx
│   ├── ⚙️ App.tsx
│   ├── 📃 index.css
│   └── 📃 index.tsx
├── 📦 package-lock.json
├── 📦 package.json
└── 🧭 tsconfig.json
```

