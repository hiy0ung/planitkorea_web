import React, { useEffect, useState } from "react";
import {
  AllDiv,
  Button,
  GroupDiv,
  InputField,
  InputLabel,
  KaKaoImg,
  LeftDiv,
  PageTitleDiv,
  ProductImg,
  RightDiv,
  SubTitle,
  Title,
} from "./paymentSt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KaKaoPay from "../../assets/images/payment_icon_yellow_medium.png"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PersonBar, PriceBar, ProductName, ReservationBar } from "./DetailSt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faWonSign } from "@fortawesome/free-solid-svg-icons";
import { GroupLine } from "../CustomerService/customerSt";
import { Reservation, User } from "../../types/type";
import axios from "axios";
import { format } from "date-fns";

export default function PaymentPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();
  // 예약정보 가져오기
  const location = useLocation();
  const reservationInfo = (location.state as { reservationInfo: Reservation })?.reservationInfo;

  // 유저 정보 가져오기
  const fetchUser = async() => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${reservationInfo.id}`)
      setUser(response.data)
    }catch(error) {
      console.error('사용자 정보 호출 실패',error);
    }
  }

  useEffect(() => {
    fetchUser()
  },[])


  // 일수 계산
  const calculateDays = (start: Date | undefined, end: Date | undefined) => {
    if (!start || !end) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const parseDateString = (dateString: string) => {
    return new Date(dateString);
  }

  const startDate = parseDateString(reservationInfo.startDate);
const endDate = parseDateString(reservationInfo.endDate);

  const days = calculateDays(startDate, endDate);

  const checkIn = format(new Date(startDate), 'yyyy-MM-dd');
  const checkOut = format(new Date(endDate), 'yyyy-MM-dd')

  // 총가격 계산
  function strToNum(str: string | undefined): number {
    if (!str) return 0;

    const numPrice = parseInt(str.replace(/[^0-9]/g, ""), 10);
    return numPrice;
  }
  const numberPrice = strToNum(reservationInfo.price);
  const totalPrice = numberPrice * days;

  function numPriceToStr(num: number): string {
    return num.toLocaleString("ko-KR");
  }

  const strPrice = numPriceToStr(totalPrice);

  const reservationSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newReservation = { 
      ...reservationInfo,
      startDate: checkIn,
      endDate: checkOut,
      price: strPrice
    }
      

    try {
      const currentReservations = user?.reservation || [] ;
      const updatedReservations = [...currentReservations, newReservation];
      await axios.put<User>(`http://localhost:3001/users/${user?.id}`, {
        ...user,
        reservation: updatedReservations
      });
    navigate('/reservationCheck')
    } catch (error) {
      console.error('예약 정보 저장 실패:', error);
    }
    
  }
  
  return (
    <>
      <AllDiv>
        <RightDiv>
          <GroupDiv>
            <PageTitleDiv>
              {/* 링크 다시 설정 상품페이지로 */}
              <NavLink to={`/detailProduct/${reservationInfo.productId}`}>
              <ArrowBackIcon sx={{ fontSize: "35px", cursor:"pointer"}} />
              </NavLink>
              <Title>예약확인 및 요청</Title> 
            </PageTitleDiv>
            <SubTitle>예약자 정보</SubTitle>
            <InputLabel> 예약자 이름
            <InputField value={user?.name} readOnly/>
            </InputLabel>
            <InputLabel> 휴대폰 번호
            <InputField value={user?.phoneNumber} readOnly/>
            </InputLabel>
          </GroupDiv>

          <GroupDiv>
          <SubTitle>예약 정보</SubTitle>
          <InputLabel> 체크인 ~ 체크아웃
            <InputField value={`${checkIn} - ${checkOut}`}/>
            </InputLabel>
            <InputLabel> 인원 수
            <InputField value={reservationInfo.person} readOnly/>
            </InputLabel>
          </GroupDiv>

          <GroupDiv>
          <SubTitle>결제 수단</SubTitle>
          <KaKaoImg src={KaKaoPay} alt="payment" />
          </GroupDiv>
          <GroupDiv style={{border:"none"}}>
            <Button onClick={reservationSubmit}>예약하기</Button>
          </GroupDiv>
        </RightDiv>


        <LeftDiv>
        <ReservationBar>
              <ProductName>{reservationInfo.productName}</ProductName>
              <ProductImg src={reservationInfo.img[0]} />
              <PriceBar>
                <FontAwesomeIcon style={{ margin: "0 5px" }} icon={faWonSign} />
                {reservationInfo.price}
              </PriceBar>
              <PersonBar>
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ margin: "0 7px 0 6px" }}
                />
                {days} 박
              </PersonBar>
              <GroupLine style={{ marginBottom: "5px" }} />
              <PriceBar>
                <div style={{fontWeight:"bold"}}>총 합계</div>
                <div>
                  <FontAwesomeIcon
                    style={{ margin: "0 5px" }}
                    icon={faWonSign}
                  />
                  {strPrice}
                </div>
              </PriceBar>
            </ReservationBar>
        </LeftDiv>
      </AllDiv>
    </>
  );
}
