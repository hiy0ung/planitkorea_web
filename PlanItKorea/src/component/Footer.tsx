import { NavLink } from "react-router-dom";
import GitHubImg from "../assets/images/github.png"
import { BottomDiv, Caption, CaptionDIv, CustomerServiceButton, CustomerServiceButtonDiv, FooterDiv, GitHubBox, GitHubLogo, Logo, LogoBox, LogoLink, LogoName } from "./FooterSt";



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
            <Logo src={"/images/logo.png"} alt="Logo" />
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
