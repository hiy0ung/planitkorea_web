import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AllDiv, BottomL, BottomR, ImgDiv, InfoBottom, InfoDiv, InfoInner, InnerDiv, MyPageBtn, ProductImg, ProductTitle, ReservationNumber, ReservationNumberInner, ReservationsTitle, Title, TitleDiv } from './PaymentSuccessSt';
import { NewReservation, ProductDetail } from '../../types/type';
import { format } from 'date-fns';

export default function PaymentSuccess() {
  const [cookies] = useCookies(["token"]);
  const [searchParams] = useSearchParams();
  const pgToken = searchParams.get("pg_token");
  const tid = localStorage.getItem("tid");
  const orderId = localStorage.getItem("orderId");
  const userId = localStorage.getItem("userId");
  const Pid = localStorage.getItem("productId");
  const [productId, setProductId] = useState<number>();
  const [productData, setProductData] = useState<ProductDetail>();
  const [reservationData, setReservationData] = useState<NewReservation>();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (pgToken && tid) {
  
      axios.post(`http://localhost:4040/api/v1/kakaoPay/success`, {
        cid: "TC0ONETIME",
        tid: tid,
        partner_order_id: orderId,
        partner_user_id: userId,
        product_id: Pid,
        pg_token: pgToken
      }, {
        headers: { 
          Authorization: `Bearer ${cookies.token}`,
        }
      })
      .then(response => {
        setProductId(Number(response.data.data.item_code));
        localStorage.removeItem("tid");
        localStorage.removeItem("userId");
      })
      .catch(error => {
        console.error("결제 승인 실패:", error);
      });
    }
  }, []);


  useEffect(() => {
    try {
      axios.get(`http://localhost:4040/api/v1/reservations/${orderId}`, {
        headers: {
          Authorization : `Bearer ${cookies.token}`
        }
      }).then((response) => {
        setReservationData(response.data.data);
        console.log(response.data.data);
      })
    } catch(error) {
      console.error("예약 정보 불러오기 실패:", error);
    }
  }, [])

  useEffect(() => {
    try {
      axios.get(`http://localhost:4040/api/v1/products/${productId}`)
      .then((response) => {
        console.log("숙소: " + response.data.data);
        setProductData(response.data.data);
      })
    } catch(error) {
      console.error(error);
    }
  }, [productId])

  return (
    <>
      <AllDiv>
        <TitleDiv>
          <Title>
            결제 성공
          </Title>
        </TitleDiv>
        <InnerDiv>
          <ImgDiv>
            <ProductImg src={`http://localhost:4040/file/${productData?.productImages[0]}`}/>
          </ImgDiv>

          <InfoDiv>

            <InfoInner>
              <ReservationNumber>
                <ProductTitle>
                  예약 번호: 
                </ProductTitle>
                <ReservationNumberInner>
                  {reservationData?.orderId}
                </ReservationNumberInner>
              </ReservationNumber>
            </InfoInner>

            <InfoInner>
              <ProductTitle>{productData?.productName}</ProductTitle>
            </InfoInner>

            <InfoBottom>
              <BottomR>
                <div>
                <ReservationsTitle>
                  체크인
                </ReservationsTitle>
                <ReservationNumberInner>
                  {reservationData?.startDate ? format(new Date(reservationData.startDate), 'yyyy-MM-dd') : ''}
                </ReservationNumberInner>
                </div>

                <div>
                <ReservationsTitle>
                  체크아웃
                </ReservationsTitle>
                <ReservationNumberInner>
                  {reservationData?.endDate ? format(new Date(reservationData.endDate), 'yyyy-MM-dd') : ''}
                </ReservationNumberInner>
                </div>
              </BottomR>

              <BottomL>
              <div>
                <ReservationsTitle>
                  총 가격
                </ReservationsTitle>
                <ReservationNumberInner>
                  {reservationData?.totalPrice}
                </ReservationNumberInner>
                </div>
              <div>
                <ReservationsTitle>
                  인원 수
                </ReservationsTitle>
                <ReservationNumberInner>
                  {reservationData?.person}
                </ReservationNumberInner>
                </div>
              </BottomL>
            </InfoBottom>
          </InfoDiv>
        </InnerDiv>

        <MyPageBtn onClick={() => navigate("/reservationCheck")}>
          내 예약 확인
        </MyPageBtn>

      </AllDiv>
    </>
  )
}
