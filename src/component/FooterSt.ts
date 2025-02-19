import styled from "styled-components";
import theme from "../styles/theme";

export const FooterDiv = styled.div`
  margin: 0;
  padding: 0 5%;
  background-color: ${theme.palette.primary.light};
  
  
`;


export const CustomerServiceButtonDiv = styled.div`
  margin: 0;
  padding: 20px;
`;

export const CustomerServiceButton = styled.button`
  border: 1px solid ${theme.palette.text.secondary};
  border-radius: 5px;
  color: ${theme.palette.text.secondary};
  background-color: white;
  padding: 6px 15px;
  margin: 5px 0 10px 0;
  cursor: pointer;
  transition: background-color 0.1 ease;
  &:hover {
    background-color: #eee;
  }
`;

export const CaptionDIv = styled.div`
  padding: 5px 20px;
  display: flex;
`;

export const Caption = styled.span`
  color: white;
  font-size: 12px;
  padding: 0 10px;
  cursor: pointer;
  &:hover{
    color:  ${theme.palette.text.secondary};
    text-decoration: underline;
  }
`;

export const BottomDiv = styled.div`
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
`;

export const LogoBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const GitHubBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin: 0;
`;
export const GitHubLogo = styled.img`
  width: 60px;
  height: 50px;
  margin: 0;
  padding: 0;
`;

export const LogoName = styled.h1`
  font-family: "TTTogether";
  font-size: 16px;
  color: ${theme.palette.text.secondary};
  padding-right: 30px;
`;

export const LogoLink = styled.a`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
`;