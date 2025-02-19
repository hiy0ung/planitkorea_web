import styled from "styled-components";

export const GroupLine = styled.div`
  width: 100%;
  margin-top: 5%;
  padding-left: 5%;
`;

export const GroupLabel = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

export const HomeBox = styled.div`
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PopularCityBox = styled.div`
  border: none;
  padding: 20px 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  column-gap: 40px;
  width: 100%;
`;

export const City = styled.div`
  border: none;
  width: 180px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  min-width: 180px;
  box-sizing: border-box;
`;

export const MostUsedBox = styled.div`
  border: none;
  padding: 20px 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  column-gap: 40px;
  width: 100%;
`;

export const MostUsed = styled.a`
  width: 200px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 180px;
  box-sizing: border-box;
  margin: 5px 5px;
  cursor: pointer;
`;


export const CityImg = styled.img`
  width: 100%;
  height: 90%;
  border-radius: 15px;
  box-sizing: border-box;
  &:hover{
    opacity: 0.7;
  }
`;

export const CityName = styled.span`
  padding: 5px 0;
  font-weight: bold;
`;

export const ProductImg = styled.img`
  width: 100%;
  height: 55%;
  border-radius: 10px;
  &:hover{
    opacity: 0.7;
  }
`;

export const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 15px;
  width: 100%;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;

export const CityWarp = styled.div`
  
`;

export const ProductCity = styled.span`
    font-size: 12px;
    font-weight: bold;
    color: #555;
`;

export const PriceDiv = styled.div`
  padding-top: 15px;
  font-weight: bold;
`;

export const ImgDiv = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const MainImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
