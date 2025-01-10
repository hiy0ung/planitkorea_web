import styled from "styled-components";
import theme from "../../styles/theme";

export const AllDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
`;

export const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 200px;
  padding: 100px 0 100px 50px;
  margin-right: 60px;
`;

export const AllProductDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  width: 70%;
  padding: 100px 0;
  position: relative;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ProductDiv = styled.div`
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  z-index: 1;
`;

export const ProductImg = styled.img`
  width: 250px;
  height: 180px;
  border-radius: 10px;
  &:hover{
    opacity: 0.7;
  }
`;
export const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

export const Category = styled.span`
  color: #555;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
`;

export const ProductName = styled.h3`
    font-size: 16px;
    font-weight: 700;
`;

export const PriceDiv = styled.div`
  padding-top: 10px;
  font-weight: bold;
`;

export const PageDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute; 
  bottom: 20px;
  width: 100%;
`;

export const FilterHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #D9D9D9;
  margin-bottom: 30px;
`;

export const GroupTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  height: 10px;
`;

export const ResetButton = styled.button`
    border: none;
  background-color: ${theme.palette.primary.main};
  border-radius: 10px;
  height: 35px;
  max-width: 1500px;
  width: 80px;
  margin-bottom: 0px;
  color: white;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
`;