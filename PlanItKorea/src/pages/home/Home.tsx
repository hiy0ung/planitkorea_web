import React, { useEffect, useState } from "react";
// import HomeImg from "./HomeImg";
// import jeju from "../../assets/images/1/jeju.jpg";
// import gapyeng from "../../assets/images/1/gapyeong.jpg";
// import busan from "../../assets/images/1/busan.jpg";
// import gyengju from "../../assets/images/1/gyengju.jpg";
// import seoul from "../../assets/images/1/seoul.jpg";
import { City, CityImg, CityName, CityWarp, GroupLabel, GroupLine, HomeBox, MostUsed, MostUsedBox, PopularCityBox, PriceDiv, ProductCity, ProductDetail, ProductImg, ProductName } from "./HomeSt";
import { BerthProduct } from "../../types/type";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSearchStore, { SearchData } from "../../stores/use.search.store";
import HomeImg from "./HomeImg";



export default function Home() {
  const [products, setProducts] = useState<BerthProduct[]>([]);
  const { searchData, pushData } = useSearchStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/BerthProduct');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const mainBerthProduct = products.slice(0, 8);

  const handleProductClick = (id: number) => {
    navigate(`/detailProduct/${id}`);
    window.scrollTo(0, 0);
  };

  const handleCityClick = (cityName: string) => {
    pushData({
      ...searchData,
      city: cityName as SearchData['city']
    })
    navigate(`/allProductPage?city=${encodeURIComponent(cityName)}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <HomeImg />
      {/* //! 홈 화면 */}
      <HomeBox>
        <GroupLine>
          <GroupLabel>국내 인기 여행지</GroupLabel>
        </GroupLine>
        <PopularCityBox>
          <City onClick={() => handleCityClick("제주도") }>
            <CityImg src={"/images/logo.png"} />
            <CityName>제주도</CityName>
          </City>
          <City onClick={() => handleCityClick('서울') }>
            <CityImg src={"/images/logo.png"} />
            <CityName>서울</CityName>
          </City>
          <City onClick={() => handleCityClick('부산') }>
            <CityImg src={"/images/logo.png"} />
            <CityName>부산</CityName>
          </City>
          <City onClick={() => handleCityClick('가평') }>
            <CityImg src={"/images/logo.png"} />
            <CityName>가평</CityName>
          </City>
          <City onClick={() => handleCityClick('경주') }>
            <CityImg src={"/images/logo.png"} />
            <CityName>경주</CityName>
          </City>
        </PopularCityBox>

        <GroupLine>
          <GroupLabel>인기 숙소</GroupLabel>
        </GroupLine>
        <MostUsedBox>
        {mainBerthProduct.map(product => (
          <MostUsed key={product.id} onClick={() => handleProductClick(product.id)}>
            <ProductImg src={product.img[0]}/>
            <ProductDetail>
              <CityWarp>
            <ProductCity>{product.city} - </ProductCity>
            <ProductCity>{product.accommodationCategory}</ProductCity>
              </CityWarp>
            <ProductName>{product.name}</ProductName>
            <PriceDiv>{product.price} 원</PriceDiv>
            </ProductDetail>
          </MostUsed>
        ))}
        </MostUsedBox>

        {/* <GroupLine>
          <GroupLabel>인기 레저 & 티켓</GroupLabel>
        </GroupLine>
        <MostTicketBox>
        {mainTicketProduct.map(tickets => (
          <MostTicket key={tickets.id}>
            <ProductImg src={tickets.img}/>
            <ProductDetail>
              <CityWarp>
              <ProductCity>{tickets.city} - </ProductCity>
              <ProductCity>{tickets.TicketCategory}</ProductCity>
              </CityWarp>
              <ProductName>{tickets.name}</ProductName>
              <PriceDiv>{tickets.price}</PriceDiv>
            </ProductDetail>
          </MostTicket>
        ))}

        </MostTicketBox> */}
      </HomeBox>
    </>
  );
}
