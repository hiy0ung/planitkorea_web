import React, { useEffect, useState } from "react";
import {
  AllDiv,
  DateColumn,
  DateDiv,
  DateDivWrap,
  GroupLine,
  DetailLabel,
  NavDiv,
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
} from "./MyPageSt";
import { NavLink, useNavigate } from "react-router-dom";
import { Reservation, User } from "../../types/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../stores/use.auth.store";
import axios from "axios";

export default function ReservationCheck() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [reservation, setReservation] = useState<Reservation[]>([]);
  const [userError, setUserError] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchUser = async () => {
    if (!isLoggedIn) {
      setUserError(true);
    }else {
      setUserError(false);
    }

    try {
      const response = await axios.get<User>(`http://localhost:3001/users/${user.id}`)
      setReservation(response.data.reservation)
      console.log(reservation);
    }catch(error) {
      console.error('사용자 정보 호출 실패',error);
    }

  };

  useEffect(() => {
    fetchUser();
  },[])

  const reservationClick = (id: number) => {
    navigate(`/detailProduct/${id}`)
  }

  return (
    <>
      <GroupLine />
      <AllDiv>
        <NavDiv>
          <NavLink to="/myPageMain">
            <NavInnerDiv>
              <NavTitle>계정 관리</NavTitle>
            </NavInnerDiv>
          </NavLink>
          <NavLink to="/reservationCheck">
            <NavInnerDiv style={{ backgroundColor: "#eee" }}>
              <NavTitle>예약 확인</NavTitle>
            </NavInnerDiv>
          </NavLink>
          <NavLink to="/wishList">
            <NavInnerDiv>
              <NavTitle>찜 목록</NavTitle>
            </NavInnerDiv>
          </NavLink>
        </NavDiv>

        <MapUl>
          {reservation.length === 0 && (
            <Card>
              <Error>예약 목록이 없습니다.</Error>
            </Card>
          )}
          {userError ? (
            <Card>
              <Error>로그인 정보가 없습니다.</Error>
            </Card>
          ) : (
            reservation.map((item) => (
              <MainLi key={item.reservationNumber}>
                <ReservationMainInner>
                  <ReserVationProductDiv
                  onClick={() => reservationClick(item.productId)}>
                    <ReserVationProductImgDiv>
                      <ProductImage
                        src={
                          Array.isArray(item.img) ? item.img[0] : item.img || ""
                        }
                      />
                    </ReserVationProductImgDiv>
                  </ReserVationProductDiv>
                  <ReserVationDetail onClick={() => reservationClick(item.productId)}>
                    <ReservationNumber>
                      NO: {item.reservationNumber}
                    </ReservationNumber>
                    <ProductName>{item.productName}</ProductName>
                    <DateDivWrap>
                      <DateColumn>
                        <DetailLabel>체크인</DetailLabel>
                        <DateDiv>{item.startDate}</DateDiv>
                      </DateColumn>
                      <DateColumn>
                        <DetailLabel>체크아웃</DetailLabel>
                        <DateDiv>{item.endDate}</DateDiv>
                      </DateColumn>
                    </DateDivWrap>
                    <PersonDiv>
                      <DetailLabel>인원수</DetailLabel>
                      <Person>{item.person}</Person>
                    </PersonDiv>
                  </ReserVationDetail>
                  <PriceDiv>
                    <CancelBtn>예약 취소</CancelBtn>
                    <PriceBox>
                      <DetailLabelRe>가격</DetailLabelRe>
                      <PriceBack>
                        {item.price}{" "}
                        <FontAwesomeIcon
                          style={{ marginLeft: "5px" }}
                          icon={faWonSign}
                        />
                      </PriceBack>
                    </PriceBox>
                  </PriceDiv>
                </ReservationMainInner>
              </MainLi>
            ))
          )}
        </MapUl>
      </AllDiv>
    </>
  );
}
