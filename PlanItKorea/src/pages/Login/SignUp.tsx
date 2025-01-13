import React, { ChangeEvent, useState } from "react";
import {
  AllDiv,
  SignInDiv as SignUpDiv,
  InputContainer,
  ErrorMessage,
  InputIdField,
  InputPasswordField,
  InputNameField,
  InputBirthDateField,
  InputPhoneField,
  ModalText,
  GroupLine,
  Button,
} from "./SignSt";
import { Logo, LogoDIv, LogoName } from "../../styles/logo";
import styled from "styled-components";
import theme from "../../styles/theme";
import { NavLink, useNavigate } from "react-router-dom";
import Modal, { ModalButton, Overlay } from "../../component/Modal";
import useAuthStore from "../../stores/use.auth.store";
import axios from "axios";
import { NewUser, User } from "../../types/type";



// 회원가입 정규식
// 아이디 8~14자의 영문, 숫자 포함 입력
const idRegex = /^[a-zA-Z0-9]{8,14}$/;
const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const nameRegex = /^[가-힣A-Za-z]+$/;
const birthDateRegex = /^\d{8}$/;
const phoneNumberRegex = /^\d{9,11}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SignUp() {
  const [signUpData, setSignUpData] = useState<NewUser>({
    userId: '',
    password: '',
    confirmPw: '',
    username: '',
    birthDate: '',
    phoneNumber: '',
    email: ''
  });

  const [idError, setIdError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [birthDateError, setBirthDateError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //# 전역 상태 예시 //
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  //& 회원가입 데이터 할당
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;

    setSignUpData({
      ...signUpData,
      [element.name]: element.value,
    });
  };
  
  const handleSubmit = async(event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let valid = true;

    if (!signUpData.userId) {
      setIdError("아이디를 입력해주세요.");
      valid = false;
    } else if (!idRegex.test(signUpData.userId)) {
      setIdError("아이디 8~14자의 영문, 숫자 포함 입력해주세요");
      valid = false;
    } else {
      valid = true;
    }
    
    if (!signUpData.password) {
      setPasswordError("비밀번호는 8자 이상, 특수문자가 포함되어야 합니다.");
      valid = false;
    } else if (!passwordRegex.test(signUpData.password)) {
      setPasswordError("비밀번호는 8자 이상, 특수문자가 포함되어야 합니다.");
      valid = false;
    } else {
      valid = true;
    }
    
    if (!signUpData.confirmPw) {
      setPasswordConfirmError("비밀번호 확인을 입력해주세요.");
      valid = false;
    } else if (signUpData.password !== signUpData.confirmPw) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      valid = false;
    } else {
      valid = true;
    }
    
    if (!signUpData.username) {
      setNameError("이름을 입력해주세요.");
      valid = false;
    } else if (!nameRegex.test(signUpData.username)) {
      setNameError("한글, 영문 대/소문자 사용(특수기호, 공백 사용 불가)");
      valid = false;
    } else {
      valid = true;
    }
    
    if (!signUpData.birthDate) {
      setBirthDateError("생년월일을 입력해주세요.");
      valid = false;
    } else if (!birthDateRegex.test(signUpData.birthDate)) {
      setBirthDateError("숫자 8자리 입력해주세요");
      valid = false;
    } else {
      valid = true;
    }
    
    if (!signUpData.phoneNumber) {
      setPhoneNumberError("핸드폰 번호를 입력해주세요.");
      valid = false;
    } else if (!phoneNumberRegex.test(signUpData.phoneNumber)) {
      setPhoneNumberError("핸드폰 번호는 9~11자리의 숫자로 입력해주세요.");
      valid = false;
    } else {
      valid = true;
    }
    
    if (!signUpData.email) {
      setEmailError("이메일을을 입력해주세요.");
      valid = false;
    } else if (!emailRegex.test(signUpData.email)) {
      setEmailError("이메일 형식에 맞지 않습니다.");
      valid = false;
    } else {
      valid = true;
    }
    
    if (valid) {
      console.log(signUpData);
      try {
        await axios.post("http://localhost:3001/users", signUpData)
        setIsModalOpen(true);
      }catch(error) {
        console.error('회원정보 저장 실패',error);
      }
    } else {
      return;
    }
  };

  if (!user) {
    navigate('/signIn');
    return null;
  }
  return (
    <>
      <GroupLine />
      <AllDiv style={{ padding: "8% 10%" }}>
        <LogoDIv style={{ marginBottom: "20px", alignItems: "center" }}>
          <Logo src={"/images/logo.png"} alt="logo" />
          <LogoName>Plan It Korea</LogoName>
        </LogoDIv>
        <SignUpDiv>
          <InputContainer>
            <InputIdField
              type="text"
              name="userId"
              placeholder="아이디"
              value={signUpData.userId}
              onChange={handleInputChange}
              hasIdError={!!idError}
              required
            />
            {idError ? <ErrorMessage>{idError}</ErrorMessage> : <></>}
          </InputContainer>
          <InputContainer>
            <InputPasswordField
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={handleInputChange}
              value={signUpData.password}
              hasPasswordError={!!passwordError}
              required
            />
            {passwordError ? (
              <ErrorMessage>{passwordError}</ErrorMessage>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <InputPasswordField
              type="password"
              name="confirmPw"
              placeholder="비밀번호 확인"
              onChange={handleInputChange}
              value={signUpData.confirmPw}
              hasPasswordError={!!passwordConfirmError}
              required
            />
            {passwordConfirmError && (
              <ErrorMessage>{passwordConfirmError}</ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <InputNameField
              type="text"
              name="username"
              placeholder="이름"
              value={signUpData.username}
              onChange={handleInputChange}
              hasNameError={!!nameError}
              required
            />
            {nameError ? <ErrorMessage>{nameError}</ErrorMessage> : <></>}
          </InputContainer>
          <InputContainer>
            <InputBirthDateField
              type="text"
              name="birthDate"
              placeholder="생년월일 8자리"
              value={signUpData.birthDate}
              onChange={handleInputChange}
              hasBirthDateError={!!birthDateError}
              required
            />
            {birthDateError ? (
              <ErrorMessage>{birthDateError}</ErrorMessage>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <InputPhoneField
              type="text"
              name="phoneNumber"
              placeholder="핸드폰 번호"
              value={signUpData.phoneNumber}
              onChange={handleInputChange}
              hasPhoneError={!!phoneNumberError}
              required
            />
            {phoneNumberError ? (
              <ErrorMessage>{phoneNumberError}</ErrorMessage>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <InputPhoneField
              type="email"
              name="email"
              placeholder="이메일"
              value={signUpData.email}
              onChange={handleInputChange}
              hasPhoneError={!!emailError}
              required
            />
            {emailError ? (
              <ErrorMessage>{emailError}</ErrorMessage>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <Button onClick={handleSubmit}>회원가입 완료</Button>
          </InputContainer>
        </SignUpDiv>
      </AllDiv>

      {isModalOpen && (
        <>
          <Overlay />
          <Modal isOpen={isModalOpen}>
            <ModalText>가입이 완료되었습니다!</ModalText>
            <NavLink to="/signIn">
              <ModalButton onClick={() => setIsModalOpen(false)}>
                확인
              </ModalButton>
            </NavLink>
          </Modal>
        </>
      )}
    </>
  );
}
