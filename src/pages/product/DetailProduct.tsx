import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Point, ProductDetail, Review, SubProduct } from "../../types/type";
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
  ModalDiv,
  ModalHeader,
  ModalOverlay,
  ProductImgDiv,
  ProductName,
  ProductNameDiv,
  RightImgDiv,
  RightInnerImgDiv,
  SubProductContainer,
  SubProductDetail,
  SubProductImage,
  SubProductInfo,
  SubProductName,
} from "./DetailSt";
import MapIcon from "@mui/icons-material/Map";
import ImageSlider from "./sliderImg/ImageSlider";
import NaverMap from "../../component/NaverMap";
import Reservation from "./Reservation";
import ReviewSection from "./ReviewSection";

export default function DetailProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectSubProduct, setSelectSubProduct] = useState<SubProduct | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  // const [mapPoint, setMapPoint] = useState<Point | null>(null);
  const [filteredSubProducts, setFilteredSubProducts] = useState<SubProduct[]>(
    []
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const startDate = searchParams.get("startDate")
    ? new Date(searchParams.get("startDate")!)
    : undefined;
  const endDate = searchParams.get("endDate")
    ? new Date(searchParams.get("endDate")!)
    : undefined;

  const [person, setPerson] = useState<number>(0);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/api/v1/products/${productId}`
        );
        setProduct(response.data.data);

        filterSubProducts(response.data.data.subProducts, person);

        // if (response.data.data.productAddress) {
        //   const point = await convertAddressToPoint(response.data.data.productAddress);
        //   setMapPoint(point);
        // }
      } catch (error) {
        setError("서버 오류가 발생했습니다.");
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId, person]);

  const filterSubProducts = (
    subProducts: SubProduct[],
    personCount: number
  ) => {
    const availableSubProducts = subProducts.filter(
      (subProduct) => subProduct.subPerson >= personCount
    );
    setFilteredSubProducts(availableSubProducts);
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson(Number(e.target.value) || 1);
  };

  const handleSubProductClick = (subProduct: SubProduct) => {
    setSelectSubProduct(subProduct);
  };

  const isSelectable = (subProduct: SubProduct) => {
    return subProduct.subPerson == person;
  };

  // const convertAddressToPoint = async (address: string): Promise<Point> => {
  //   const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  //   const clientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

  //   try {
  //     const response = await axios.get("https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode", {
  //       params: { query: address },
  //       headers: {
  //         "X-NCP-APIGW-API-KEY-ID": clientId,
  //         "X-NCP-APIGW-API-KEY": clientSecret,
  //       },
  //     });

  //     if (response.data.addresses.length > 0) {
  //       return {
  //         lat: parseFloat(response.data.addresses[0].y),
  //         lng: parseFloat(response.data.addresses[0].x),
  //       };
  //     } else {
  //       console.warn("주소 변환 실패");
  //       return { lat: 37.5665, lng: 126.9780 };
  //     }
  //   } catch (error) {
  //     console.error("Geocoding API 오류:", error);
  //     return { lat: 37.5665, lng: 126.9780 };
  //   }
  // };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <AllDiv>
        <HeaderDiv>
          <ProductNameDiv>
            <ProductName>{product?.productName}</ProductName>
          </ProductNameDiv>
          <ProductImgDiv onClick={openModal}>
            <LeftImgDiv>
              <Image src={product?.productImages[0]} />
            </LeftImgDiv>
            <RightImgDiv>
              {product?.productImages?.slice(1, 5).map((img, index) => (
                <RightInnerImgDiv key={index}>
                  <Image src={img} />
                  {index === 3 && (
                    <ImgButton onClick={openModal}>사진 모두보기</ImgButton>
                  )}
                </RightInnerImgDiv>
              ))}
            </RightImgDiv>
          </ProductImgDiv>
        </HeaderDiv>
        <MainDiv>
          <Detail>
            <DescriptionDiv>
              <GroupName>숙소 이용 정보</GroupName>
              <DescriptionItem>{product?.productDescription}</DescriptionItem>
            </DescriptionDiv>
            <ProductName>
              <MapIcon sx={{ marginRight: "10px" }} />
            </ProductName>
            <Address>{product?.productAddress}</Address>
            <MapDiv>
              {/* <NaverMap point={mapPoint ?? { lat: 37.5665, lng: 126.9780 }} /> */}
            </MapDiv>
            <div>
              <SubProductName>객실</SubProductName>
              {product?.subProducts.map((subProduct, index) => (
                <SubProductContainer
                  key={index}
                  isSelectable={isSelectable(subProduct)}
                  onClick={() =>
                    isSelectable(subProduct) &&
                    handleSubProductClick(subProduct)
                  }
                >
                  <SubProductImage
                    src={subProduct.subProductImages[0]}
                    alt={subProduct.subName}
                  />
                  <SubProductInfo>
                    <SubProductName>{subProduct.subName}</SubProductName>
                    <SubProductDetail>
                      수용 인원: {subProduct.subPerson}명
                    </SubProductDetail>
                    <SubProductDetail>
                      가격: {subProduct.subPrice.toLocaleString()}원
                    </SubProductDetail>
                  </SubProductInfo>
                </SubProductContainer>
              ))}
            </div>
            <GroupName>숙소 시설</GroupName>
            <FacilityDiv>
              {product?.facilities.map((facility) => (
                <FacilityItem key={facility.facilityId}>
                  {facility.facilityName}
                </FacilityItem>
              ))}
            </FacilityDiv>
          </Detail>

          {/* 예약 */}
          {product && (
            <Reservation
              product={product}
              selectSubProduct={selectSubProduct ?? undefined}
              startDateProp={startDate}
              endDateProp={endDate}
              personProp={person}
              handlePersonChange={handlePersonChange}
            />
          )}
        </MainDiv>

        {/* 리뷰 */}
        <ReviewSection
          productId={productId!}
          reviews={reviews}
          setReviews={setReviews}
        />
      </AllDiv>

      {isModalOpen && (
        <>
          <ModalOverlay>
            <ModalDiv>
              <ModalHeader>
                <CloseBtn onClick={closeModal}>X</CloseBtn>
              </ModalHeader>

              <ImageSlider images={product?.productImages}></ImageSlider>
            </ModalDiv>
          </ModalOverlay>
        </>
      )}
    </>
  );
}
