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
} from "./SignSt";
import { Logo, LogoDIv, LogoName } from "../../styles/logo";
import styled from "styled-components";
import theme from "../../styles/theme";
import { NavLink, useNavigate } from "react-router-dom";
import Modal, { ModalButton, Overlay } from "../../component/Modal";
import useAuthStore from "../../stores/use.auth.store";
import axios from "axios";
import { User } from "../../types/type";

export const Button = styled.button`
  border: none;
  background-color: ${theme.palette.primary.main};
  border-radius: 15px;
  height: 47px;
  max-width: 1500px;
  width: 100%;
  margin-bottom: 0px;
  color: white;
  margin-top: 15px;
  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
`;



export default function SignUp() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [idError, setIdError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [birthDateError, setBirthDateError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //# 전역 상태 예시 //
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

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
      setPasswordError("비밀번호는 8자 이상, 특수문자가 포함되어야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordConfirmChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const passwordConfirmValue = event.target.value;
    setPasswordConfirm(passwordConfirmValue);

    if (passwordConfirmValue && password !== passwordConfirmValue) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmError("");
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nameValue = event.target.value;
    setName(nameValue);
    const nameRegex = /^[가-힣A-Za-z]+$/;

    if (name && !nameRegex.test(name)) {
      setNameError("한글, 영문 대/소문자 사용(특수기호, 공백 사용 불가)");
    } else {
      setNameError("");
    }
  };

  const handleBirthDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const birthDateValue = event.target.value;
    setBirthDate(birthDateValue);
    const birthDateRegex = /^[0-9]{7}$/;

    if (birthDate && !birthDateRegex.test(birthDate)) {
      setBirthDateError("숫자 8자리 입력해주세요");
    } else {
      setBirthDateError("");
    }
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const phoneNumberValue = event.target.value;
    setPhoneNumber(phoneNumberValue);
    const phoneNumberRegex = /^\d{9,11}$/;

    if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
      setPhoneNumberError("전화번호 8자리 입력해주세요");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleSubmit = async(event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let valid = true;

    if (!id) {
      setIdError("아이디를 입력해주세요.");
      valid = false;
    }
    if (!password) {
      setPasswordError("비밀번호는 8자 이상, 특수문자가 포함되어야 합니다.");
      valid = false;
    } else {
      const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        setPasswordError("비밀번호는 8자 이상, 특수문자가 포함되어야 합니다.");
        valid = false;
      }
    }

    if (!passwordConfirm) {
      setPasswordConfirmError("비밀번호 확인을 입력해주세요.");
      valid = false;
    } else if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      valid = false;
    }

    if (!name) {
      setNameError("이름을 입력해주세요.");
      valid = false;
    } else {
      const nameRegex = /^[가-힣A-Za-z]+$/;
      if (!nameRegex.test(name)) {
        setNameError("한글, 영문 대/소문자 사용(특수기호, 공백 사용 불가)");
        valid = false;
      }
    }

    if (!birthDate) {
      setBirthDateError("생년월일을 입력해주세요.");
      valid = false;
    } else {
      const birthDateRegex = /^[0-9]{8}$/;
      if (!birthDateRegex.test(birthDate)) {
        setBirthDateError("숫자 8자리 입력해주세요");
        valid = false;
      }
    }

    if (!phoneNumber) {
      setPhoneNumberError("핸드폰 번호를 입력해주세요.");
      valid = false;
    } else {
      const phoneNumberRegex = /^\d{9,11}$/;
      if (!phoneNumberRegex.test(phoneNumber)) {
        setPhoneNumberError("핸드폰 번호는 9~11자리의 숫자로 입력해주세요.");
        valid = false;
      }
    }

    if (valid) {
      const signUpData = {
        id,
        password,
        name,
        birthDate,
        phoneNumber,
        wishList:[],
        reservation:[]
      };

      try {
        await axios.post<User>("http://localhost:3001/users", signUpData)
        setIsModalOpen(true);
      }catch(error) {
        console.error('회원정보 저장 실패',error);
      }
      //! 회원가입 정보!!!
      

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
              name="id"
              placeholder="아이디"
              value={id}
              onChange={handleIdChange}
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
              onChange={handlePasswordChange}
              value={password}
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
              name="password"
              placeholder="비밀번호 확인"
              onChange={handlePasswordConfirmChange}
              value={passwordConfirm}
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
              name="name"
              placeholder="이름"
              value={name}
              onChange={handleNameChange}
              hasNameError={!!nameError}
              required
            />
            {nameError ? <ErrorMessage>{nameError}</ErrorMessage> : <></>}
          </InputContainer>
          <InputContainer>
            <InputBirthDateField
              type="text"
              name="name"
              placeholder="생년월일 8자리"
              value={birthDate}
              onChange={handleBirthDateChange}
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
              name="phone"
              placeholder="핸드폰 번호"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
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
