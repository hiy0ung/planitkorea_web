import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { NavLink } from "react-router-dom";
import { Palette } from "@mui/icons-material";
import LogoImg from "../assets/images/logo.png"
import GitHubImg from "../assets/images/github.png"

const FooterDiv = styled.div`
  margin: 0;
  padding: 0 5%;
  background-color: ${theme.palette.primary.light};
  
  
`;


const CustomerServiceButtonDiv = styled.div`
  margin: 0;
  padding: 20px;
`;

const CustomerServiceButton = styled.button`
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

const CaptionDIv = styled.div`
  padding: 5px 20px;
  display: flex;
`;

const Caption = styled.span`
  color: white;
  font-size: 12px;
  padding: 0 10px;
  cursor: pointer;
  &:hover{
    color:  ${theme.palette.text.secondary};
    text-decoration: underline;
  }
`;

const BottomDiv = styled.div`
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const GitHubBox = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin: 0;
`;
const GitHubLogo = styled.img`
  width: 60px;
  height: 50px;
  margin: 0;
  padding: 0;
`;

const LogoName = styled.h1`
  font-family: "TTTogether";
  font-size: 16px;
  color: ${theme.palette.text.secondary};
  padding-right: 30px;
`;

const LogoLink = styled.a`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
`;

export default function Footer() {
  return (
    <>
      <FooterDiv>
        <CustomerServiceButtonDiv>
          <NavLink to="notification">
            <CustomerServiceButton>고객센터</CustomerServiceButton>
          </NavLink>
        </CustomerServiceButtonDiv>

        {/* <GroupLine /> */}

        <CaptionDIv>
          <NavLink to="/notification">
          <Caption>이용약관</Caption>
          <Caption>개인정보 처리 방침</Caption>
          <Caption>취소 및 환불</Caption>
          </NavLink>
        </CaptionDIv>

        <BottomDiv>
          <LogoBox>
          <p style={{marginBottom: '10px', fontSize:'12px',color:'white', paddingLeft: '10px'}}>© Plan It Korea. All rights reserved.</p>
          <LogoLink href="./">
            <Logo src={LogoImg} alt="Logo" />
            <LogoName>Plan It Korea</LogoName>
          </LogoLink>
          </LogoBox>
          
          <GitHubBox>
            <LogoLink href="https://github.com/youngjun9909" target="_blank">
            <GitHubLogo src={GitHubImg}/>
            </LogoLink>
          </GitHubBox>
        </BottomDiv>
      </FooterDiv>
    </>
  );
}
