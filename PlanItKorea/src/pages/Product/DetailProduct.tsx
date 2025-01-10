import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BerthProduct, Reservation, Review } from "../../types/type";
import {
  Address,
  AllDiv,
  CloseBtn,
  DescriptionDiv,
  DescriptionItem,
  Detail,
  FacilityDiv,
  FacilityItem,
  GroupName,
  HeaderDiv,
  Image,
  ImgButton,
  LeftImgDiv,
  MainDiv,
  MapDiv,
  MapReviewDiv,
  MapReviewInnerDiv,
  ModalDiv,
  ModalHeader,
  ModalOverlay,
  PageDiv,
  PersonBar,
  PersonDiv,
  PersonInput,
  PriceBar,
  ProductImgDiv,
  ProductName,
  ProductNameDiv,
  ReservationBar,
  ReservationBarDiv,
  ReviewButton,
  ReviewContent,
  ReviewContentDiv,
  ReviewContentInput,
  ReviewDate,
  ReviewDiv,
  ReviewInfo,
  RightImgDiv,
  RightInnerImgDiv,
  UserIdInfo,
} from "./DetailSt";
import MapIcon from "@mui/icons-material/Map";
import DatePicker from "react-datepicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faWonSign } from "@fortawesome/free-solid-svg-icons";
import { GroupLine } from "../CustomerService/customerSt";
import { Button } from "../Login/SignSt";
import ImageSlider from "./sliderImg/ImageSlider";
import NaverMap from "../../component/NaverMap";
import useSearchStore from "../../stores/use.search.store";

import ReactPaginate from "react-paginate";
import useAuthStore from "../../stores/use.auth.store";
import { format } from "date-fns";
import useIdStore from "../../stores/use.nexId.store";

export default function DetailProduct() {
  //! 전역 상태 받아오기
  const { searchData } = useSearchStore((state) => ({
    searchData: state.searchData,
  }));
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const { nextId, incrementId } = useIdStore((state) => ({
    nextId: state.nextId,
    incrementId: state.incrementId,
  }));

  const navigate = useNavigate();

  const { productId } = useParams<string>();
  const [product, setProduct] = useState<BerthProduct | null>(null);
  const [renderReview, setRenderReview] = useState<Review[]>([]);

  const [startDate, setStartDate] = useState<Date | undefined>(
    searchData.startDay
  );
  const [endDate, setEndDate] = useState<Date | undefined>(searchData.endDay);

  const [person, setPerson] = useState<number | undefined>(
    searchData.personCount
  );

  const [comment, setComment] = useState<string>("");
  const [reviewDate, setReviewDate] = useState("");

  useEffect(() => {
    const reviewDay = new Date();
    const formattedDate = format(reviewDay, "yyyy-MM-dd");
    setReviewDate(formattedDate);
  }, []);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const fetchReviews = async () => {
    try {
      const reviewResponse = await axios.get("http://localhost:3001/reviews", {
        params: { productId },
      });

      const sortedReviews = reviewResponse.data.sort((a: Review, b: Review) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      console.log("Sorted Reviews:", sortedReviews);
      setRenderReview(sortedReviews);
    } catch (error) {
      console.error("리뷰 호출 에러", error);
    }
  };

  const handleReviewSave = async () => {
    let valid = true;

    if (!comment) {
      alert("내용을 입력해주세요");
      valid = false;
    }
    

    if (valid) {
      const updatedReview = {
        id: nextId.toString(),
        productId: product?.id ? product.id.toString() : "",
        userId: user.id,
        comment: comment,
        date: reviewDate,
      };

      try {
        await axios.post(`http://localhost:3001/reviews`, updatedReview);
        incrementId();
        setComment("");

        fetchReviews();
      } catch (error) {
        console.error("데이터 저장 실패", error);
        alert("리뷰 저장 도중 오류발생.");
      }
    }
  };

  const personValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setPerson(value);
  };
  const today = new Date();

  const calculateDays = (start: Date | undefined, end: Date | undefined) => {
    if (!start || !end) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = calculateDays(startDate, endDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const productResponse = await axios.get(
          `http://localhost:3001/BerthProduct/${productId}`
        );
        setProduct(productResponse.data);
      } catch (error) {
        console.error("상품 호출에러");
      }
    };
    fetchData();
    fetchReviews();
  }, [productId]);

  function strToNum(str: string | undefined): number {
    if (!str) return 0;

    const numPrice = parseInt(str.replace(/[^0-9]/g, ""), 10);
    return numPrice;
  }
  const numberPrice = strToNum(product?.price);
  const totalPrice = numberPrice * days;

  function numPriceToStr(num: number): string {
    return num.toLocaleString("ko-KR");
  }

  const strPrice = numPriceToStr(totalPrice);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const ITEMS_PER_PAGE = 5;
  const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = renderReview.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (e: { selected: number }) => {
    setCurrentPage(e.selected);
  };

  const reservationSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("로그인 후 예약이 가능합니다.");
      return;
    }

    const currentId = nextId;
    incrementId();

    const reservationInfo: Reservation = {
      id: user.id,
      productId:
        typeof product?.id === "number"
          ? product.id
          : parseInt(product?.id || "0", 10),
      productName: product?.name ? product.name : "",
      img: product
        ? Array.isArray(product.img)
          ? product.img
          : [product.img || ""]
        : [""],
      reservationNumber: currentId + 1,
      startDate: startDate ? startDate.toISOString() : "",
      endDate: endDate ? endDate.toISOString() : "",
      person: person ?? 0,
      price: product?.price ?? ""
    };
    navigate('/paymentPage', { state: { reservationInfo } });
    console.log(reservationInfo);
  };

  return (
    <>
      <AllDiv>
        <HeaderDiv>
          <ProductNameDiv>
            <ProductName>{product?.name}</ProductName>
          </ProductNameDiv>
          <ProductImgDiv onClick={openModal}>
            <LeftImgDiv>
              <Image src={product?.img[0]} />
            </LeftImgDiv>
            <RightImgDiv>
              <RightInnerImgDiv>
                <Image src={product?.img[1]} />
              </RightInnerImgDiv>
              <RightInnerImgDiv>
                <Image src={product?.img[2]} />
              </RightInnerImgDiv>
              <RightInnerImgDiv>
                <Image src={product?.img[3]} />
              </RightInnerImgDiv>
              <RightInnerImgDiv>
                <Image src={product?.img[4]} />
                <ImgButton onClick={openModal}>사진 모두보기</ImgButton>
              </RightInnerImgDiv>
            </RightImgDiv>
          </ProductImgDiv>
        </HeaderDiv>
        <MainDiv>
          <Detail>
            <ProductName>
              <MapIcon sx={{ marginRight: "10px" }} />
              {product?.city} - {product?.accommodationCategory}
            </ProductName>
            <Address>{product?.address}</Address>
            <MapDiv>
              {product?.point && <NaverMap point={product?.point}></NaverMap>}
            </MapDiv>
            <GroupName>숙소 시설</GroupName>
            <FacilityDiv>
              {product?.facility.map((item, index) => (
                <FacilityItem key={index}>{item}</FacilityItem>
              ))}
            </FacilityDiv>
            <DescriptionDiv>
              <GroupName>숙소 이용 정보</GroupName>
              <DescriptionItem>{product?.description}</DescriptionItem>
            </DescriptionDiv>
          </Detail>

          <ReservationBarDiv>
            <ReservationBar>
              <ProductName>{product?.name}</ProductName>
              <div
                style={{
                  zIndex: 10,
                  width: "100%",
                }}
              >
                <div
                  className="box-border p-4 border border-cyan-200 rounded-lg flex items-center space-x-2"
                  style={{ border: "none" }}
                >
                  <div className="relative flex-1">
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date | null) =>
                        setStartDate(date ?? undefined)
                      }
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      className="w-full p-2 border border-cyan-400 rounded-l-lg"
                      placeholderText="Start Date"
                      isClearable={false}
                      minDate={today}
                    />
                  </div>
                  <div className="relative flex-1">
                    <DatePicker
                      selected={endDate}
                      onChange={(date: Date | null) =>
                        setEndDate(date ?? undefined)
                      }
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate || today}
                      className="w-full p-2 border border-cyan-400 rounded-r-lg"
                      placeholderText="End Date"
                      isClearable={false}
                    />
                  </div>
                </div>
              </div>

              {/* 인원 수 */}
              <PersonDiv>
                <PersonInput
                  type="number"
                  value={person}
                  placeholder="인원 수"
                  onChange={personValue}
                  min={1}
                ></PersonInput>
              </PersonDiv>
              <PriceBar>
                <FontAwesomeIcon style={{ margin: "0 5px" }} icon={faWonSign} />
                {product?.price}
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
                <div>총 합계</div>
                <div>
                  <FontAwesomeIcon
                    style={{ margin: "0 5px" }}
                    icon={faWonSign}
                  />
                  {strPrice}
                </div>
              </PriceBar>
              <Button style={{ width: "90%" }} onClick={reservationSubmit}>
                예약 하기
              </Button>
            </ReservationBar>
          </ReservationBarDiv>
        </MainDiv>

        <ReviewDiv>
          <GroupName style={{ margin: "0" }}>리뷰</GroupName>

          <MapReviewDiv>
            {currentItems && currentItems.length > 0 ? (
              currentItems.map((item) => (
                <MapReviewInnerDiv key={item.id}>
                  <ReviewInfo>
                    <UserIdInfo>{item.userId}</UserIdInfo>
                    <ReviewDate>작성일 - {item.date}</ReviewDate>
                  </ReviewInfo>
                  <ReviewContentDiv>
                    <ReviewContent>{item.comment}</ReviewContent>
                  </ReviewContentDiv>
                </MapReviewInnerDiv>
              ))
            ) : (
              <MapReviewInnerDiv>작성된 리뷰가 없습니다.</MapReviewInnerDiv>
            )}

            <PageDiv>
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  (renderReview.length || 0) / ITEMS_PER_PAGE
                )}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </PageDiv>
          </MapReviewDiv>
        </ReviewDiv>
        <GroupName style={{ margin: "0" }}>리뷰 작성</GroupName>
        <MapReviewDiv>
          <MapReviewInnerDiv>
            <ReviewInfo>
              <UserIdInfo>{user.id}</UserIdInfo>
              <ReviewDate>작성일 - {reviewDate}</ReviewDate>
            </ReviewInfo>
            <ReviewContentDiv>
              <ReviewContentInput
                value={comment}
                readOnly={!isLoggedIn}
                isReadonly={!isLoggedIn}
                onChange={handleCommentChange}
                placeholder={
                  isLoggedIn ? "내용을 입력해주세요." : "로그인이 필요합니다."
                }
              ></ReviewContentInput>
              {isLoggedIn &&
              <ReviewButton onClick={handleReviewSave}>전송</ReviewButton>
              }
            </ReviewContentDiv>
          </MapReviewInnerDiv>
        </MapReviewDiv>
      </AllDiv>

      {isModalOpen && (
        <>
          <ModalOverlay>
            <ModalDiv>
              <ModalHeader>
                <CloseBtn onClick={closeModal}>X</CloseBtn>
              </ModalHeader>

              <ImageSlider images={product?.img}></ImageSlider>
            </ModalDiv>
          </ModalOverlay>
        </>
      )}
    </>
  );
}
