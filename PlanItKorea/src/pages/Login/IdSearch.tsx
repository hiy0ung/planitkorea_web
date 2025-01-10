import React, { ChangeEvent, useState } from "react";
import {
  AllDiv,
  InputContainer,
  ErrorMessage,
  InputNameField,
  InputPhoneField,
  Button,
  Overlay,
  ModalButton,
  GroupLine,
  SearchDiv,
  ModalText,
} from "./SignSt";
import { Logo, LogoDIv, LogoName } from "../../styles/logo";
import Modal from "../../component/Modal";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { User } from "../../types/type";

export default function IdSearch() {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");

  const [userData, setUserData] = useState<User>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const phoneNumberValue = event.target.value;
    setPhoneNumber(phoneNumberValue);
    const phoneNumberRegex = /^\d{9,11}$/;

    if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
      setPhoneNumberError("숫자 9~11 자리 입력해주세요");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleSubmit = async(event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let valid = true;

    if (!name) {
      setNameError("한글, 영문 대/소문자 사용(특수기호, 공백 사용 불가)");
      valid = false;
    } else {
      const nameRegex = /^[가-힣A-Za-z]+$/;
      if (!nameRegex.test(name)) {
        setNameError("한글, 영문 대/소문자 사용(특수기호, 공백 사용 불가)");
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
      //! 아이디찾기 정보!!!
      const idSearchData = {
        name,
        phoneNumber,
      };
      try {
        const response = await axios.get(`http://localhost:3001/users`, {params: idSearchData})

        const matchedData = response.data.find((user:User) =>
        user.name === name && user.phoneNumber === phoneNumber)

        if(matchedData) {
          setUserData(matchedData)
          console.log(userData);
          setIsModalOpen(true);
        }
      }catch(error) {
        console.error('데이터 호출 실패',error);
      }
    }
  };
  return (
    <>
      <GroupLine />
      <AllDiv>
        <LogoDIv style={{ marginBottom: "100px", alignItems: "center" }}>

          <Logo src={"/images/logo.png"} alt="logo" />
          <LogoName>Plan It Korea</LogoName>
        </LogoDIv>
        <SearchDiv>
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
            <Button onClick={handleSubmit}>아이디 찾기</Button>
          </InputContainer>
        </SearchDiv>
      </AllDiv>
      {isModalOpen && (
        <>
          <Overlay />
          <Modal isOpen={isModalOpen}>
            <ModalText>아이디 확인: {userData?.id}</ModalText>
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
