import styled from "styled-components";
import theme from "../../styles/theme";

export const AllDiv = styled.div`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 5% 15%;
  display: flex;
  flex-direction: row;
  align-items: stretch; 
  margin-top: 20px;
  border-top: 1px solid ${theme.palette.primary.main};
  @media (max-width: 768px) {
    flex-direction: column;
  flex-wrap: wrap-reverse;
  }
`;

export const RightDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const LeftDiv = styled.div`
  width: 30%;
  height: auto; 
  display: flex; 
  flex-direction: column;
  align-items: flex-end;
`;

export const GroupDiv = styled.div`
  width: 100%;
  border-bottom: 1px solid #eee;
`;

export const PageTitleDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 20px;
`;

export const  Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  padding: 10px;
`;

export const SubTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  padding: 50px 0;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #9e9e9e;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const InputField = styled.input`
  min-width: 300px;
  width: 50%;
  height: 40px;
  background-color: #eee;
  border-radius: 15px;
  padding: 0 20px;
  color: #555555;
  &:focus {
    outline: none;
  }
`;

export const KaKaoImg = styled.img`
  border-radius: 25px;
  margin-bottom: 40px;
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

export const Button = styled.button`
  border: none;
  background-color: ${theme.palette.primary.main};
  border-radius: 15px;
  height: 40px;
  width: 50%;
  color: white;
  margin: 40px 0;
  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
`;

export const ProductImg = styled.img`
  width: 80%;
  margin: 20px;
  height: 200px;
  border-radius: 10px;
`;