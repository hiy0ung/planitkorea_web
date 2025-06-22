import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Logo, LogoDIv, LogoName } from "../../../styles/logo";
import theme from "../../../styles/theme";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/use.auth.store";
import {
  AllDiv,
  LoginDiv,
  InputLabel,
  InputContainer,
  ErrorMessage,
  Button,
  GroupLine,
  InputPasswordField,
  Form,
  InputIdField2,
  SnsLogoNaver,
  SnsLogoKakao,
  SnsNaverTextBox,
  SnsKakaoTextBox,
  SnsNaverBtn,
  SnsKakaoBtn,
  SnsNaverLogoBox,
  SnsKakaoLogoBox,
} from "../SignSt";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ErorrMsg, LoginInfo, LoginSuccessResponse } from "../../../types/type";
import kakaoLogo from '../../../assets/images/kakaoLogo.png';
import naverLogo from '../../../assets/images/naverLogo.png';
import { API_BASE_URL, SIGN_IN_SNS_API } from "../../../apis";

const OptionDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1500px;
  width: 100%;
`;

const OptionSpan = styled.span`
  color: ${theme.palette.text.disabled};
  font-size: 13px;
  cursor: pointer;
  &:hover {
    color: #000000;
    text-decoration: underline;
  }
`;

export default function Login() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    userId: "",
    userPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState<ErorrMsg>({
    userId: "",
    userPassword: ""
  });
  const [, setCookies] = useCookies(["token"]);
  const { login } = useAuthStore(); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    const { name, value } = e.target;

    setLoginInfo({ ...loginInfo, [name]: value });

    if (errorMsg[name as keyof typeof errorMsg]) {
      setErrorMsg({ ...errorMsg, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const errors = { userId: "", userPassword: ""};
    if (!loginInfo.userId) {
      errors.userId = "아이디를 입력해주세요."
    }
    if (!loginInfo.userPassword) {
      errors.userPassword = "비밀번호를 입력해주세요."
    }

    if (errors.userId || errors.userPassword) {
      setErrorMsg(errors);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginInfo
      );
      console.log("로그인 응답: ", response.data.data);

      if (response.data.data) {
        loginSuccessResponse(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("아이디 또는 비밀번호 오류", error)
      alert("아이디 또는 비밀번호를 확인해주세요."); 
    }
  };

  const setToken = (token: string, exprTime: number) => {
    const expires = new Date(Date.now() + exprTime);
    console.log("토큰: ", token, "만료시간: ", expires);
    setCookies("token", token, { path: "/", expires });
  };

  const loginSuccessResponse = (data: LoginSuccessResponse) => {
    if (data) {
      const { token, exprTime } = data;
      setToken(token, exprTime);

      login ({ token: token });

      navigate("/");
      console.log("토큰확인: ", token);
    } else {
      alert("로그인 실패: 인증 정보를 확인해주세요.");
    }
  }

  const onSnsButtonClickHandler = (sns: "kakao" | "naver") => {
    window.location.href = `${SIGN_IN_SNS_API}${sns}`;
  }

  return (
    <>
      <GroupLine />
      <AllDiv>
        <LogoDIv style={{ marginBottom: "40px", alignItems: "center" }}>
          <Logo src={"/images/logo.png"} alt="logo" />
          <LogoName>Plan It Korea</LogoName>
        </LogoDIv>
        <LoginDiv>
          <Form>
          <InputContainer>
            <InputLabel htmlFor="idField">아이디</InputLabel>
            <InputIdField2
              type="text"
              id="idField"
              name="userId"
              placeholder="아이디를 입력해주세요."
              onChange={handleInputChange}
              value={loginInfo.userId}
              hasIdError={!!errorMsg.userId}
              required
            />
            {errorMsg.userId ? <ErrorMessage>{errorMsg.userId}</ErrorMessage> : null}
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="passwordField">비밀번호</InputLabel>
            <InputPasswordField
              type="password"
              id="passwordField"
              name="userPassword"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleInputChange}
              value={loginInfo.userPassword}
              hasPasswordError={!!errorMsg.userPassword}
              required
            />
            {errorMsg.userPassword ? <ErrorMessage>{errorMsg.userPassword}</ErrorMessage> : null}
          </InputContainer>

          </Form>
          <InputContainer>
            <Button onClick={handleSubmit}>로그인</Button>
          </InputContainer>
          <InputContainer>
            <OptionDiv>
              <NavLink to="/idSearch">
                <OptionSpan>아이디 찾기</OptionSpan>
              </NavLink>
              <NavLink to="/passwordSearch">
                <OptionSpan>비밀번호 찾기</OptionSpan>
              </NavLink>
              <NavLink to="/signUp">
                <OptionSpan>회원 가입</OptionSpan>
              </NavLink>
            </OptionDiv>
          </InputContainer>
            <InputContainer>
          <SnsNaverBtn
            onClick={() => onSnsButtonClickHandler("naver")}
          >
            <SnsNaverLogoBox>
              <SnsLogoNaver src={naverLogo} alt="네이버로고" />
            </SnsNaverLogoBox>
            <SnsNaverTextBox>
              Naver 계정으로 로그인
            </SnsNaverTextBox>
          </SnsNaverBtn>
          <SnsKakaoBtn
            onClick={() => onSnsButtonClickHandler("kakao")}
          >
            <SnsKakaoLogoBox>
              <SnsLogoKakao src={kakaoLogo} alt="카카오로고" />
            </SnsKakaoLogoBox>
            <SnsKakaoTextBox>
              Kakao 계정으로 로그인
            </SnsKakaoTextBox>
          </SnsKakaoBtn>
        </InputContainer>
        </LoginDiv>
      </AllDiv>
    </>
  );
}
