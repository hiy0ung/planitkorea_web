import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Logo, LogoDIv, LogoName } from "../../styles/logo";
import theme from "../../styles/theme";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use.auth.store";
import {
  AllDiv,
  SignInDiv,
  InputLabel,
  InputContainer,
  ErrorMessage,
  Button,
  GroupLine,
  InputIdField,
  InputPasswordField,
  Form,
} from "./SignSt";
import axios from "axios";
import { User } from "../../types/type";

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

export default function SignIn() {
  const [idError, setIdError] = useState<boolean | string>();
  const [passwordError, setPasswordError] = useState<boolean | string>();

  const [signInError, setSignInError] = useState<boolean>(false);

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const idValue = event.target.value;
    setId(idValue);
    if (!idValue) {
      setIdError("아이디를 입력해주세요.");
    } else {
      setIdError("");
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (password && !passwordRegex.test(password)) {
      setPasswordError(
        "비밀번호는 8자 이상이어야 하며, 특수문자가 포함되어야 합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSignIn = async(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      setIdError("아이디를 입력해주세요.");
    }
    if (!password) {
      setPasswordError(
        "비밀번호는 8자 이상이어야 하며, 특수문자가 포함되어야 합니다."
      );
    }
    if (id && password && !passwordError) {
      try{
        //! 로그인 정보 !!!!
        const signInData = {
          id,
          password,
        };

        const response = await axios.get("http://localhost:3001/users",{ params : signInData})

        const matchedData = response.data.find((user: User) =>
        user.id === id && user.password === password)

        if(matchedData) {
          login(signInData);
          navigate("/");
        }else{
          setSignInError(true)
        }

      }catch(error) {
        console.error('사용자 호출 실패',error);
      }
      

    }
  };

  return (
    <>
      <GroupLine />
      <AllDiv>
        <LogoDIv style={{ marginBottom: "40px", alignItems: "center" }}>
          <Logo src={"/images/logo.png"} alt="logo" />
          <LogoName>Plan It Korea</LogoName>
        </LogoDIv>
        <SignInDiv>
          <Form onKeyDown={(e) => {
            if(e.key === "Enter") {
              handleSignIn(e)
            }
          }}>
          <InputContainer>
            <InputLabel htmlFor="idField">아이디</InputLabel>
            <InputIdField
              type="text"
              id="idField"
              name="id"
              placeholder="아이디를 입력해주세요."
              onChange={handleIdChange}
              value={id}
              hasIdError={!!idError}
              required
            />
            {idError ? (
              <ErrorMessage>아이디를 입력해주세요.</ErrorMessage>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="passwordField">비밀번호</InputLabel>
            <InputPasswordField
              type="password"
              id="passwordField"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={handlePasswordChange}
              value={password}
              hasPasswordError={!!passwordError}
              required
            />
            {passwordError ? (
              <ErrorMessage>
                특수기호, 비밀번호 8자리를 입력해주세요
              </ErrorMessage>
            ) : (
              <></>
            )}
          </InputContainer>
          </Form>
          {signInError ? (
            <ErrorMessage>
            아이디 또는 비밀번호가 일치하지 않습니다.
          </ErrorMessage>
          ): (
            <></>
          )}
          <InputContainer>
            <Button onClick={handleSignIn}>로그인</Button>
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
        </SignInDiv>
      </AllDiv>
    </>
  );
}
