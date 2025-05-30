import styled from "styled-components";
import theme from "../../styles/theme";

export const AllDiv = styled.div`
  width: 100%;
  margin: 0;
  padding: 100px 80px;
  border-top: 1px solid ${theme.palette.primary.main};
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  flex-wrap: wrap-reverse;
  }
`;

export const TitleDiv = styled.div`
  width: 1000px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: ${theme.palette.text.secondary};
  font-weight: bold;
`;

export const InnerDiv = styled.div`
  width: 1000px;
  height: 300px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  border: 1px solid ${theme.palette.primary.main};
  border-radius: 10px;
`;

export const ImgDiv = styled.div`
  width: 40%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

export const InfoDiv = styled.div`
  box-sizing: border-box;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InfoInner = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
`;

export const ProductTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

export const ReservationNumber = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;


export const ReservationNumberInner = styled.div`
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  background-color: #eee;
`;

export const ProductImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const ReservationsTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;


export const InfoBottom = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomR = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
`;

export const BottomL = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-end;
  justify-content: flex-end;
  width: 300px;
`;

export const MyPageBtn = styled.button`
  margin-top: 50px;
  padding: 20px 50px;
  border: 1px solid ${theme.palette.primary.main};
  background-color: ${theme.palette.primary.main};
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;

  &:hover {
    border: 1px solid ${theme.palette.primary.dark};
    background-color: ${theme.palette.primary.dark};
    color: #fff;
  }
`;