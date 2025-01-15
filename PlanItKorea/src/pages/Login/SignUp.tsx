import React, { ChangeEvent, useState } from "react";
import {
  AllDiv,
  LoginDiv as SignUpDiv,
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
  DuplicationContainer,
  InputEmailField,
  InputContainer2,
  SuccessMessage,
} from "./SignSt";
import { Logo, LogoDIv, LogoName } from "../../styles/logo";
import styled from "styled-components";
import theme from "../../styles/theme";
import { NavLink, useNavigate } from "react-router-dom";
import Modal, { ModalButton, Overlay } from "../../component/Modal";
import axios from "axios";
import { DuplicationError, DuplicationSuccess, NewUser, User } from "../../types/type";

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
    userId: "",
    userPassword: "",
    checkPassword: "",
    userName: "",
    userBirthDate: "",
    userPhone: "",
    userEmail: "",
  });

  const [idError, setIdError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [checkPasswordError, setCheckPasswordError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [birthDateError, setBirthDateError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //! 중복확인 성공, 실패 메세지 상태관리
  const [duplicationError, setDuplicationError] = useState<DuplicationError>({
    userId: "",
    userEmail: "",
  });
  const [duplicationSuccess, setDuplicationSuccess] =
    useState<DuplicationSuccess>({
      userId: "",
      userEmail: "",
    });

  //! 중복확인 체크 여부 상태 관리
  const [isIdChecked, setIsIdChecked] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);

  //! submit 버튼 상태 관리
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  //& 중복확인
  const userIdDuplicationCheck = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4040/api/v1/auth/signUp/search/userId`,
        { userId: signUpData.userId }
      );
  
      if (response.data.data.duplicatedStatus) {
        setDuplicationError((prev) => ({ ...prev, userId: "" }));
        setDuplicationSuccess((prev) => ({
          ...prev,
          userId: "사용 가능한 아이디입니다.",
        }));
        setIdError("");
        setIsIdChecked(true);
      } else {
        setDuplicationError((prev) => ({
          ...prev,
          userId: "이미 사용중인 아이디입니다.",
        }));
        setDuplicationSuccess((prev) => ({ ...prev, userId: "" }));
        setIsIdChecked(false);
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패", error);
      setDuplicationError((prev) => ({
        ...prev,
        userId: "중복 확인 중 오류가 발생했습니다.",
      }));
      setDuplicationSuccess((prev) => ({ ...prev, userId: "" }));
      setIsIdChecked(false);
    }
  };

  const userEmailDuplicationCheck = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4040/api/v1/auth/signUp/search/userEmail`,
        { userEmail: signUpData.userEmail }
      );
      if (response.data.data.duplicatedStatus) {
        setDuplicationError((prev) => ({ ...prev, userEmail: "" }));
        setDuplicationSuccess((prev) => ({ 
          ...prev, 
          userEmail: "사용 가능한 이메일입니다." 
        }));
        setEmailError("");
        setIsEmailChecked(true);
      } else {
        setDuplicationError((prev) => ({
          ...prev,
          userEmail: "이미 사용중인 이메일입니다.",
        }));
        setDuplicationSuccess((prev) => ({ ...prev, userEmail: "" }));
        setIsEmailChecked(false);
      }
    } catch (error) {
      console.error("이메일 중복 확인 실패", error);
      setDuplicationError((prev) => ({
        ...prev,
        userEmail: "이메일 중복 확인 중 오류가 발생했습니다.",
      }));
      setDuplicationSuccess((prev) => ({ ...prev, userEmail: "" }));
      setIsEmailChecked(false);
    }
  };

  //& 회원가입 데이터 할당
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "userId") {
      setSignUpData({
        ...signUpData,
        userId: value,
      });

      setDuplicationError((prev) => ({ ...prev, userId: "" }));
      setDuplicationSuccess((prev) => ({ ...prev, userId: "" }));

      if (value && !idRegex.test(value)) {
        setIdError("아이디는 8~14자의 영문, 숫자 포함 입력해주세요.");
      } else {
        setIdError("");
      }
    } else if (name === "userPassword") {
      setSignUpData({
        ...signUpData,
        userPassword: value,
      });

      if (!value) {
        setPasswordError("");
      } else if (value && !passwordRegex.test(value)) {
        setPasswordError("비밀번호는 8자 이상, 특수문자가 포함되어야 합니다.");
      } else {
        setPasswordError("");
      }
    } else if (name === "checkPassword") {
      setSignUpData({
        ...signUpData,
        checkPassword: value,
      });
      if (!value) {
        setCheckPasswordError("");
      } else if (value && signUpData.userPassword !== value) {
        setCheckPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setCheckPasswordError("");
      }
    } else if (name === "userName") {
      setSignUpData({
        ...signUpData,
        userName: value,
      });
      if (!value) {
        setNameError("");
      } else if (value && !nameRegex.test(value)) {
        setNameError("이름은 한글, 영문 대/소문자로 입력해주세요. (특수기호, 공백 사용 불가)");
      } else {
        setNameError("");
      }
    } else if (name === "userBirthDate") {
      setSignUpData({
        ...signUpData,
        userBirthDate: value,
      });
      if (!value) {
        setBirthDateError("");
      } else if (value && !birthDateRegex.test(value)) {
        setBirthDateError("8자리 숫자로 입력해주세요.");
      } else {
        setBirthDateError("");
      }
    } else if (name === "userPhone") {
      setSignUpData({
        ...signUpData,
        userPhone: value,
      });
      if (!value) {
        setPhoneNumberError("");
      } else if (value && !phoneNumberRegex.test(value)) {
        setPhoneNumberError("핸드폰 번호는 9~11자리의 숫자로 입력해주세요.");
      } else {
        setPhoneNumberError("");
      }
    } else if (name === "userEmail") {
      setSignUpData({
        ...signUpData,
        userEmail: value,
      });

      setDuplicationError((prev) => ({ ...prev, userEmail: "" }));
      setDuplicationSuccess((prev) => ({ ...prev, userEmail: "" }));
      
      if (value && !emailRegex.test(value)) {
        setEmailError("이메일 형식에 맞지 않습니다.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSubmit(true);

    let valid = true;

    if (!signUpData.userId) {
      setIdError("아이디를 입력해주세요.");
      valid = false;
    }

    if (!duplicationSuccess.userId && !duplicationError.userId) {
      setDuplicationError((prev) => ({ ...prev, userId: "아이디 중복 확인을 해주세요." }));
      valid = false;
    }

    if (!signUpData.userPassword) {
      setPasswordError("비밀번호를 입력해주세요.");
      valid = false;
    } 

    if (!signUpData.checkPassword) {
      setCheckPasswordError("비밀번호를 한 번 더 입력해주세요.");
      valid = false;
    } 

    if (!signUpData.userName) {
      setNameError("이름을 입력해주세요.");
      valid = false;
    } 

    if (!signUpData.userBirthDate) {
      setBirthDateError("생년월일을 입력해주세요.");
      valid = false;
    } 

    if (!signUpData.userPhone) {
      setPhoneNumberError("핸드폰 번호를 입력해주세요.");
      valid = false;
    } 

    if (!signUpData.userEmail) {
      setEmailError("이메일을 입력해주세요.");
      return;
    } 

    if (!duplicationSuccess.userEmail && !duplicationError.userEmail) {
      setDuplicationError((prev) => ({ ...prev, userEmail: "이메일 중복 확인을 해주세요." }));
      valid = false;
    }

    if (!isIdChecked || !isEmailChecked) {
      valid = false;
    }

    if (valid) {
      console.log(signUpData);
      try {
        const response = await axios.post(
          `http://localhost:4040/api/v1/auth/signUp`,
          signUpData
        );
        if (response.data.data) {
          console.log(response.data.data);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("회원정보 저장 실패", error);
      }
    } 
  };

  return (
    <>
      <GroupLine />
      <AllDiv style={{ padding: "8% 10%" }}>
        <LogoDIv style={{ marginBottom: "20px", alignItems: "center" }}>
          <Logo src={"/images/logo.png"} alt="logo" />
          <LogoName>Plan It Korea</LogoName>
        </LogoDIv>
        <SignUpDiv>
          <DuplicationContainer>
            <InputContainer2>
              <InputIdField
                type="text"
                name="userId"
                placeholder="아이디"
                value={signUpData.userId}
                onChange={handleInputChange}
                hasIdError={!!idError}
                required
              />
                <>
                  {idError && <ErrorMessage>{idError}</ErrorMessage>}
                  {duplicationError.userId && <ErrorMessage>{duplicationError.userId}</ErrorMessage>}
                  {duplicationSuccess.userId && <SuccessMessage>{duplicationSuccess.userId}</SuccessMessage>}
                </>
            </InputContainer2>
            <Button
              onClick={userIdDuplicationCheck}
              style={{
                width: "25%",
                marginTop: "0px",
                marginBottom: "15px",
              }}
            >
              중복확인
            </Button>
          </DuplicationContainer>
          <InputContainer>
            <InputPasswordField
              type="password"
              name="userPassword"
              placeholder="비밀번호"
              onChange={handleInputChange}
              value={signUpData.userPassword}
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
              name="checkPassword"
              placeholder="비밀번호 확인"
              onChange={handleInputChange}
              value={signUpData.checkPassword}
              hasPasswordError={!!checkPasswordError}
              required
            />
            {checkPasswordError && (
              <ErrorMessage>{checkPasswordError}</ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <InputNameField
              type="text"
              name="userName"
              placeholder="이름"
              value={signUpData.userName}
              onChange={handleInputChange}
              hasNameError={!!nameError}
              required
            />
            {nameError ? <ErrorMessage>{nameError}</ErrorMessage> : <></>}
          </InputContainer>
          <InputContainer>
            <InputBirthDateField
              type="text"
              name="userBirthDate"
              placeholder="생년월일 8자리"
              value={signUpData.userBirthDate}
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
              name="userPhone"
              placeholder="핸드폰 번호"
              value={signUpData.userPhone}
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
          <DuplicationContainer>
            <InputContainer2>
              <InputEmailField
                type="email"
                name="userEmail"
                placeholder="이메일"
                value={signUpData.userEmail}
                onChange={handleInputChange}
                hasEmailError={!!emailError}
                required
              />
              <>
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                {duplicationError.userEmail && <ErrorMessage>{duplicationError.userEmail}</ErrorMessage>}
                {duplicationSuccess.userEmail && <SuccessMessage>{duplicationSuccess.userEmail}</SuccessMessage>}
              </>
            </InputContainer2>
            <Button
              onClick={userEmailDuplicationCheck}
              style={{
                width: "25%",
                marginTop: "0px",
                marginBottom: "15px",
              }}
            >
              중복확인
            </Button>
          </DuplicationContainer>
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
