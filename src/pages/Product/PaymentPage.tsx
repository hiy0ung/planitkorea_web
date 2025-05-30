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
} from "../product/paymentSt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KaKaoPay from "../../assets/images/payment_icon_yellow_medium.png"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PersonBar, PriceBar, ProductName, ReservationBar } from "../product/DetailSt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faWonSign } from "@fortawesome/free-solid-svg-icons";
import { GroupLine } from "../customerService/customerSt";
import { GetUserDto, NewUser, Reservation, User } from "../../types/type";
import axios from "axios";
import { format } from "date-fns";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState<GetUserDto>();
  // 예약정보 가져오기
  const location = useLocation();
  const reservationInfo = (location.state as { reservationInfo: Reservation })?.reservationInfo;

  useEffect(() => {
    try {
      axios.get(`http://localhost:4040/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }).then((response) => {
        setUser(response.data.data)
      })
    } catch(error) {
      console.error(error);
    }
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
  function strToNum(str: string | number | undefined): number {
    if (str === undefined || str === null) return 0;
  
    const stringPrice = typeof str === "number" ? str.toString() : str;
    const numPrice = parseInt(stringPrice.replace(/[^0-9]/g, ""), 10);
  
    return isNaN(numPrice) ? 0 : numPrice;
  }
  
  const numberPrice = strToNum(reservationInfo.price);

  function numPriceToStr(num: number): string {
    return num.toLocaleString("ko-KR");
  }

  const strPrice = numPriceToStr(numberPrice);

  const paymentHandler = async() => {
    const partnerOrderId = uuidv4(); 
    try {
      await axios.post(`http://localhost:4040/api/v1/kakaoPay/request`, {
        cid: "TC0ONETIME",
        partner_order_id: partnerOrderId,
        partner_user_id: user?.userId,
        item_name: "Plan It Korea",
        item_code: reservationInfo.productId.toString(),
        quantity: 1,
        total_amount: reservationInfo.price,
        tax_free_amount: 0,
        approval_url: "http://localhost:3000/kakaoPay/success",
        fail_url: "http://localhost:4040/kakaoPay/fail",
        cancel_url: "http://localhost:4040/kakaoPay/cancel"
        
      }, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }).then((response) => {
        const tid = response.data.data.tid;
        console.log(tid);
        localStorage.setItem("tid", tid);
        localStorage.setItem("orderId", partnerOrderId);
        localStorage.setItem("productId", reservationInfo.productId.toString());
        handleReservationSave(partnerOrderId);
        window.open(response.data.data.next_redirect_pc_url, '_blank');
      })
    } catch(error) {
      console.error(error);
    }
  }

  const handleReservationSave = async (orderId: String) => {
    try {
      const response = await axios.post(`http://localhost:4040/api/v1/reservations`, {
        productId: reservationInfo.productId,
        subProductId: reservationInfo.subProductId,
        person: reservationInfo.person,
        totalPrice: reservationInfo.price,
        startDate: reservationInfo.startDate,
        endDate: reservationInfo.endDate,
        orderId: orderId
      }, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      });
  
      // 서버 응답 확인
      console.log("Response:", response);
      console.log("Response Data:", response.data);
  
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
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
            <InputField value={user?.userName} readOnly/>
            </InputLabel>
            <InputLabel> 휴대폰 번호
            <InputField value={user?.userPhone} readOnly/>
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
          <KaKaoImg src={KaKaoPay} alt="payment"/>
          </GroupDiv>

          <GroupDiv style={{border:"none"}}>
            <Button onClick={paymentHandler}>결제 하기</Button>
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
