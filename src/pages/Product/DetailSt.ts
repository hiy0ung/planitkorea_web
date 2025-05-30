import styled from "styled-components";
import theme from "../../styles/theme";

export const AllDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5% 10%;
`;

export const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

export const ProductNameDiv = styled.div``;

export const ProductName = styled.h2`
  font-weight: bold;
  font-size: 24px;
  display: flex;
  align-items: center;
`;

export const ProductImgDiv = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LeftImgDiv = styled.div`
  width: 50%;
  height: 100%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  overflow: hidden;
  padding-right: 5px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const RightImgDiv = styled.div`
  width: 50%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: hidden;
`;

export const RightInnerImgDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  @media (max-width: 1160px) {
    flex-direction: column;
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 70%;
  margin-right: 30px;
  min-width: 700px;
`;

export const SubProductContainer = styled.div<{ isSelectable: boolean }>`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: ${({ isSelectable }) => (isSelectable ? "#fff" : "#f0f0f0")};
  cursor: ${({ isSelectable }) => (isSelectable ? "pointer" : "not-allowed")};
  opacity: ${({ isSelectable }) => (isSelectable ? 1 : 0.5)};
  pointer-events: ${({ isSelectable }) => (isSelectable ? "auto" : "none")};
`;

export const SubProductImage = styled.img`
  width: 40%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
`;

export const SubProductInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

export const SubProductName = styled.h2`
  font-weight: bold;
  font-size: 24px;
  display: flex;
  align-items: center;
`;


export const SubProductDetail = styled.p`
  font-size: 18px;
  color: #666;
`;


export const FacilityDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #d9d9d9;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
`;

export const FacilityItem = styled.div`
  background-color: ${theme.palette.primary.light};
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  min-width: 91px;
  white-space: nowrap;
  &:hover {
    background-color: ${theme.palette.primary.main};
  }
`;

export const DescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const DescriptionItem = styled.div``;

export const GroupName = styled.h3`
  font-weight: bold;
  font-size: 18px;
  margin: 30px 0;
`;

export const ReservationBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 30%;
  height: auto;
  @media (max-width: 1160px) {
    width: 100%;
    height: 100%;
    align-items: center;
  }
`;

export const ReservationBar = styled.div`
  position: sticky;
  top: 100px;
  width: 300px;
  height: 400px;
  border: 1px solid ${theme.palette.primary.main};
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1160px) {
    width: 100%;
  }
`;

export const PersonDiv = styled.div`
  padding: 0 16px 16px 16px;
  width: 100%;
`;

export const PersonInput = styled.input`
  padding: 8px;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: border-color 0.2s;
  &:focus {
    border: 1px solid #82aef5;
    outline: none;
  }
`;

export const PriceBar = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const PersonBar = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const SelectInfo = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const ImgButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const ModalDiv = styled.div`
  width: 75%;
  height: 90%;
  background-color: white;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CloseBtn = styled.button`
  background-color: ${theme.palette.error.main};
  padding: 10px 17px;
  margin: 10px 15px;
  border-radius: 10px;
  color: white;
  &:hover {
    background-color: ${theme.palette.error.dark};
  }
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const ModalMain = styled.div`
  width: 80%;
  height: 100%;
`;

export const ImgPickDiv = styled.div`
  width: 80%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const MapDiv = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 5%;
`;

export const Address = styled.p`
  color: #707070;
  font-weight: 600;
`;

export const ReviewDiv = styled.div`
  width: 100%;
  min-height: 500px;
  height: auto;
  padding: 20px 0;
  position: relative;
`;

export const MapReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

export const MapReviewInnerDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
  border-top: 1px solid #e5e7eb;
`;

export const ReviewInfo = styled.div`
  width: 20%;
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;
export const ReviewDate = styled.p`
  text-align: end;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  padding-right: 10px;
`;

export const UserIdInfo = styled.div`
  background-color: #eee;
  border-radius: 10px;
  padding: 10px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const ReviewContentDiv = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  padding-left: 10px;
  border-left: 1px solid #e5e7eb;
`;

export const ReviewContent = styled.div`
  padding: 10px;
  background-color: #eee;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const ReviewButton = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${theme.palette.primary.main};
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
`;

export const ReviewContentInput = styled.textarea<{ isReadonly: boolean }>`
  padding: 10px;
  background-color: #eee;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  resize: none;
  cursor: ${(props) => (props.isReadonly ? "not-allowed" : "text")};
  &:focus {
    outline: none;
    border-color: ${(props) => (props.isReadonly ? "#ccc" : "#007bff")};
  }
`;

export const PageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
