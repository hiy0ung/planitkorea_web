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
  MapUl,
  MainLi,
  Card,
  Error,
  NavInnerBox,
  NaviBox,
} from "./MyPageSt";
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

  const reservationClick = (id: number) => {
    navigate(`/detailProduct/${id}`);
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

        <MapUl>
          {reservation.length === 0 && (
            <Card>
              <Error>예약 목록이 없습니다.</Error>
            </Card>
          )}
          {reservation.map((item) => (
            <MainLi key={item.id}>
              <ReservationMainInner>

                <ReserVationProductDiv
                  onClick={() => reservationClick(item.productId)}
                >
                  <ReserVationProductImgDiv>
                    <ProductImage
                      src={
                        item.productImg
                          ? `http://localhost:4040/image/${item.productImg}`
                          : "/images/logo.png"
                      }
                    />
                  </ReserVationProductImgDiv>
                </ReserVationProductDiv>

                <ReserVationDetail>
                  <ReservationNumber>NO: {item.id}</ReservationNumber>
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
                  <CancelBtn>예약 취소</CancelBtn>
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
      </AllDiv>
    </>
  );
}
