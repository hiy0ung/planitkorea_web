import {  BerthProduct } from "../types/type";
//? 숙소 이미지
import house1 from '../assets/images/house/house1.jpg'
import house2 from '../assets/images/house/house2.jpg'
import house3 from '../assets/images/house/house3.jpg'
import house4 from '../assets/images/house/house4.jpg'

//? 티켓 이미지
import ski from '../assets/images/ticket/ski.jpg'
import music from '../assets/images/ticket/music.jpg'
import waterPark from '../assets/images/ticket/waterPark.jpg'
import park from '../assets/images/ticket/park.jpg'



// export const accommodations: BerthProduct[] = [
//   {
//     id: '1',
//     img: [house1],
//     name: '@@@ 리조트',
//     price: '100,000',
//     address:"서울 중구 을지로6가 58-5",
//     point: {
//       lat:37.566208, 
//       lng: 127.004333 
//     },
//     city: '서울',
//     accommodationCategory: ['호텔&리조트'],
//     facility: ['스파/월풀', '와이파이', '에어컨', '욕실용품', '샤워실', '조식포함','OTT'],
//     description: "서울에 위치한 @@@ 리조트 입니다",
//   },
//   {
//     id: '2',
//     img: [house2],
//     name: '@@@ 호텔',
//     price: '110,000',
//     address:"부산 기장군 기장읍 시랑리 736",
//     point: {
//       lat:35.307370, 
//       lng: 129.258934 
//     },
//     city: '부산',
//     accommodationCategory: ['호텔&리조트'],
//     facility: ['사우나', '수영장', '세탁 가능', '스파/월풀', '와이파이', '에어컨', '욕실용품', '샤워실', '조식포함','OTT'],
//     description: "서울에 위치한 @@@ 리조트 입니다",
//   },
//   {
//     id: '3',
//     img: [house3],
//     name: '@@@ 펜션',
//     price: '80,000',
//     address:"경기 가평군 북면 적목리 337",
//     point: {
//       lat:37.668687, 
//       lng: 127.503875
//     },
//     city: '가평',
//     accommodationCategory: ['펜션&풀빌라'],
//     facility: ['수영장', '바베큐', '와이파이','에어컨', '욕실용품', '샤워실', '무료주차', '반려견 동반', '객실 내 취사', ],
//     description: "서울에 위치한 @@@ 리조트 입니다",
//   },
//   {
//     id: '4',
//     img: [house4],
//     name: '@@@ 캠핑',
//     price: '190,000',
//     address:"경기 가평군 북면 적목리 337",
//     point: {
//       lat:37.984755, 
//       lng: 127.439840
//     },
//     city: '해남',
//     accommodationCategory: ['캠핑&글램핑'],
//     facility: ['바베큐', '와이파이','에어컨', '욕실용품', '샤워실', '무료주차', '반려견 동반', '객실 내 취사', ],
//     description: "서울에 위치한 @@@ 리조트 입니다",
//   },
//   {
//     id: '5',
//     img: [house2],
//     name: '@@@ 호텔',
//     price: '290,000',
//     address:"경기 가평군 북면 적목리 337",
//     point: {
//       lat:37.566208, 
//       lng: 127.004333 
//     },
//     city: '가평',
//     accommodationCategory: ['호텔&리조트'],
//     facility: ['바베큐', '와이파이','에어컨', '욕실용품', '샤워실', '무료주차', '반려견 동반', '객실 내 취사', ],
//     description: "서울에 위치한 @@@ 리조트 입니다",
//   },
//   {
//     id: '6',
//     img: [house3],
//     name: '@@@ 리조트',
//     address:"경기 가평군 북면 적목리 337",
//     point: {
//       lat:37.984755, 
//       lng: 127.439840
//     },
//     price: '50,000',
//     city: '전주',
//     accommodationCategory: ['캠핑&글램핑'],
//     facility: ['바베큐', '와이파이','에어컨', '욕실용품', '샤워실', '무료주차', '반려견 동반', '객실 내 취사', ],
//     description: "서울에 위치한 @@@ 리조트 입니다",
//   },
//   {
//     id: '7',
//     img: [house1],
//     name: '@@@ 숙소',
//     price: '140,000',
//     address:"경기 가평군 북면 적목리 337",
//     point: {
//       lat:37.984755, 
//       lng: 127.439840
//     },
//     city: '대구',
//     accommodationCategory: ['펜션&풀빌라'],
//     facility: ['바베큐', '와이파이','에어컨', '욕실용품', '샤워실', '무료주차', '반려견 동반', '객실 내 취사', ],
//     description: "서울에 위치한 @@@ 리조트 입니다",
//   },
//   {
//     id: '8',
//     img: [house4],
//     name: '@@@ 리조트',
//     price: '120,000',
//     address:"경기 가평군 북면 적목리 337",
//     point: {
//       lat:37.984755, 
//       lng: 127.439840
//     },
//     city: '여수',
//     accommodationCategory: ['호텔&리조트'],
//     facility: ['바베큐', '와이파이','에어컨', '욕실용품', '샤워실', '무료주차', '반려견 동반', '객실 내 취사', ],
//     description: "서울에 위치한 @@@ 리조트 입니다",
    
//   },
//   {
//     id: '9',
//     img: [house2],
//     name: '@@@ 펜션',
//     price: '50,000',
//     address:"경기 가평군 북면 적목리 337",
//     point: {
//       lat:37.566208, 
//       lng: 127.004333 
//     },
//     city: '서울',
//     accommodationCategory: ['펜션&풀빌라'],
//     facility: ['바베큐', '와이파이','에어컨', '욕실용품', '샤워실', '무료주차', '반려견 동반', '객실 내 취사', ],
//     description: "서울에 위치한 @@@ 리조트 입니다",
    
//   },
//   {
//     id: '10',
//     img: [house3],
//     name: '@@@ 리조트',
//     price: '70,000',
//     address:"경기 가평군 북면 적목리 337",
//     point: {
//       lat:37.984755, 
//       lng: 127.439840
//     },
//     city: '해남',
//     accommodationCategory: ['호텔&리조트'],
//     facility: ['사우나', '수영장','바베큐', '세탁 가능', '스파/월풀', '와이파이', '반려견 동반', '객실 내 취사','에어컨','욕실용품','샤워실','조식포함','무료주차','OTT' ],
//     description: "서울에 위치한 @@@ 리조트 입니다",
  
//   },
// ]

// export const tickets: TicketProduct[] = [
//   {
//     id: 1,
//     img: ski,
//     name: '@@@ 스키장',
//     price: '100,000',
//     city: '강릉',
//     TicketCategory: '레저스포츠'
//   },
//   {
//     id: 2,
//     img: park,
//     name: '@@@ 놀이동산',
//     price: '40,000',
//     city: '경주',
//     TicketCategory: '관광'
//   },
//   {
//     id: 3,
//     img: waterPark,
//     name: '@@@ 수영장',
//     price: '40,000',
//     city: '가평',
//     TicketCategory: '테마파크'
//   },
//   {
//     id: 4,
//     img: music,
//     name: '@@ 페스티벌',
//     price: '90,000',
//     city: '여수',
//     TicketCategory: '전시&공연'
//   }
// ]

