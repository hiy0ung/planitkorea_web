import React, { useEffect, useState } from "react";
import {
  AllDiv,
  DateColumn,
  DateDiv,
  DateDivWrap,
  GroupLine,
  DetailLabel,
  NavInnerDiv,
  NavTitle,
  ProductImage,
  ProductName,
  ReserVationDetail,
  ReservationMainInner,
  ReservationNumber,
  ReserVationProductDiv,
  ReserVationProductImgDiv,
  PersonDiv,
  Person,
  PriceDiv,
  PriceBox,
  PriceBack,
  CancelBtn,
  DetailLabelRe,
  MainLi,
  Card,
  Error,
  NavInnerBox,
  NaviBox,
  MapUl,
} from "../mypage/MyPageSt";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NewReservation } from "../../types/type";
import { useCookies } from "react-cookie";
import { format } from "date-fns";

export default function ReservationCheck() {
  const [cookies] = useCookies(["token"]);
  const [reservation, setReservation] = useState<NewReservation[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4040/api/v1/reservations", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          setReservation(response.data.data);
        });
    } catch (error) {
      console.error(error);
    }
    console.log(reservation);
  }, []);

useEffect(() => {
  console.log(reservation);
}, [reservation])

  const reservationClick = (reservationId: number) => {
    navigate(`/detailProduct/${reservationId}`);
  };

  const handleCancelReservation = async (reservationId: number) => {
  if (!window.confirm("정말 예약을 취소하시겠습니까?")) return;
  console.log("reservationId" + reservationId)

  try {
    await axios.delete(
      `http://localhost:4040/api/v1/reservations/${reservationId}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );

    // 취소 후 예약 목록 새로 불러오기
    const updated = await axios.get("http://localhost:4040/api/v1/reservations", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    setReservation(updated.data.data);
    alert("예약이 취소되었습니다.");
  } catch (error) {
    console.error("예약 취소 실패:", error);
    alert("예약 취소에 실패했습니다.");
  }
};


  return (
    <>
      <GroupLine />
      <AllDiv>
        <NaviBox>
          <NavInnerBox>
            <NavLink to="/myPageMain">
              <NavInnerDiv>
                <NavTitle>계정 관리</NavTitle>
              </NavInnerDiv>
            </NavLink>
            <NavLink to="/reservationCheck">
              <NavInnerDiv style={{ backgroundColor: "#D8E8F9" }}>
                <NavTitle>예약 확인</NavTitle>
              </NavInnerDiv>
            </NavLink>
            <NavLink to="/wishList">
              <NavInnerDiv>
                <NavTitle>찜 목록</NavTitle>
              </NavInnerDiv>
            </NavLink>
          </NavInnerBox>
        </NaviBox>

          {!reservation || reservation.length === 0 ? (
            <Card>
              <Error>예약 목록이 없습니다.</Error>
            </Card>
          ) : (
            <>
                <MapUl>
              {reservation.map((item) => (
                <MainLi key={item.reservationId}>
                  <ReservationMainInner>
                    <ReserVationProductDiv
                      onClick={() => reservationClick(item.productId)}
                    >
                      <ReserVationProductImgDiv>
                        {item.productImage ? (
                          <ProductImage src={item.productImage}/>
                        ): (
                          <ProductImage src={"/images/logo.png"}/>
                        )}
                        
                      </ReserVationProductImgDiv>
                    </ReserVationProductDiv>

                    <ReserVationDetail>
                      <ReservationNumber>NO: {item.orderId}</ReservationNumber>
                      <ProductName>{item.productName}</ProductName>
                      <DateDivWrap>
                        <DateColumn>
                          <DetailLabel>체크인</DetailLabel>
                          <DateDiv>
                            {format(new Date(item.startDate), "yyyy-MM-dd")}
                          </DateDiv>
                        </DateColumn>
                        <DateColumn>
                          <DetailLabel>체크아웃</DetailLabel>
                          <DateDiv>
                            {format(new Date(item.endDate), "yyyy-MM-dd")}
                          </DateDiv>
                        </DateColumn>
                      </DateDivWrap>
                      <PersonDiv>
                        <DetailLabel>인원수</DetailLabel>
                        <Person>{item.person}</Person>
                      </PersonDiv>
                      <PersonDiv>
                        <DetailLabel>예약 상태</DetailLabel>
                        <Person>
                          {item.reservationStatus === 0 ? (
                            <p>결제 취소</p>
                          ) : item.reservationStatus === 1 ? (
                            <p>결제 완료</p>
                          ) : (
                            <p>이용 완료</p>
                          )}
                        </Person>
                      </PersonDiv>
                    </ReserVationDetail>

                    <PriceDiv>
                      <CancelBtn onClick={() => handleCancelReservation(item.reservationId)}>예약 취소</CancelBtn>
                      <PriceBox>
                        <DetailLabelRe>가격</DetailLabelRe>
                        <PriceBack>
                          {item.totalPrice}{" "}
                          <FontAwesomeIcon
                            style={{ marginLeft: "5px" }}
                            icon={faWonSign}
                          />
                        </PriceBack>
                      </PriceBox>
                    </PriceDiv>
                  </ReservationMainInner>
                </MainLi>
              ))}
              </MapUl>
            </>
          )}
      </AllDiv>
    </>
  );
}
