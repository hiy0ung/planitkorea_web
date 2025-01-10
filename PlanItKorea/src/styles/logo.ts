import styled from "styled-components";
import theme from "../styles/theme";


  export const LogoDIv = styled.div`
    display: flex;
    justify-content: center;
  `;

  export const Logo = styled.img`
    width: 35px;
    height: 35px;
    margin: 0;
    padding: 0;
  `;

  export const LogoName = styled.h1`
    font-family: "TTTogether";
    font-size: 16px;
    color: ${theme.palette.text.secondary};
  `;
