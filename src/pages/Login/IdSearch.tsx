import React, { useState } from "react";
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

type FindUserId = {
  userName: string;
  userPhone: string;
}

const nameRegex = /^[가-힣A-Za-z]+$/;
const phoneNumberRegex = /^\d{9,11}$/;

export default function IdSearch() {
  // const [name, setName] = useState<string>("");
  // const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [findData, setFindData] = useState<FindUserId>({
    userName: "",
    userPhone: ""
  });

  const [nameError, setNameError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("")
  const [errorModal, setErrorModal] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "userName") {
      setFindData({
        ...findData,
        userName: value,
      });

      if (!value) {
        setNameError("");
      } else if (value && !nameRegex.test(value)) {
        setNameError("한글, 영문 대/소문자 사용(특수기호, 공백 사용 불가)");
      } else {
        setNameError("");
      }
    }

    if (name === "userPhone") {
      setFindData({
        ...findData,
        userPhone: value,
      });

      if (!value) {
        setPhoneNumberError("");
      } else if (value && !phoneNumberRegex.test(value)) {
        setPhoneNumberError("숫자 9~11 자리 입력해주세요");
      } else {
        setPhoneNumberError("");
      }
    }
  }

  const handleSubmit = async(event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let valid = true;

    if (!findData.userName) {
      setNameError("한글, 영문 대/소문자 사용(특수기호, 공백 사용 불가)");
      valid = false;
    } else {
      if (!nameRegex.test(findData.userName)) {
        setNameError("한글, 영문 대/소문자 사용(특수기호, 공백 사용 불가)");
        valid = false;
      }
    }
    if (!findData.userPhone) {
      setPhoneNumberError("핸드폰 번호를 입력해주세요.");
      valid = false;
    } else {
      const phoneNumberRegex = /^\d{9,11}$/;
      if (!phoneNumberRegex.test(findData.userPhone)) {
        setPhoneNumberError("핸드폰 번호는 9~11자리의 숫자로 입력해주세요.");
        valid = false;
      }
    }
    if (valid) {
      try {
        await axios.get(`http://localhost:4040/api/v1/users/find-id`, {
          params: findData
        }).then((response) => {
          const data = response.data.data;
          setUserId(maskUserId(data));
          setIsModalOpen(true);
        }).catch((error) => {
          if(error.response.data.result === false) {
            setError("사용자 정보가 존재하지 않습니다.")
            setErrorModal(true);
          }
        }) 
      }catch(error) {
        console.error('데이터 호출 실패',error);
      }
    }
  };

  const maskUserId = (id: string) => {
    return id.slice(0, -4) + "****";
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
              name="userName"
              placeholder="이름"
              value={findData.userName}
              onChange={handleInputChange}
              hasNameError={!!nameError}
              required
            />
            {nameError ? <ErrorMessage>{nameError}</ErrorMessage> : <></>}
          </InputContainer>
          <InputContainer>
            <InputPhoneField
              type="text"
              name="userPhone"
              placeholder="핸드폰 번호"
              value={findData.userPhone}
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
            <Button onClick={handleSubmit}>아이디 찾기</Button>
          </InputContainer>
        </SearchDiv>
      </AllDiv>
      {isModalOpen && (
        <>
          <Overlay />
          <Modal isOpen={isModalOpen}>
            <ModalText>아이디 확인: {userId}</ModalText>
            <NavLink to="/signin">
              <ModalButton onClick={() => setIsModalOpen(false)}>
                확인
              </ModalButton>
            </NavLink>
          </Modal>
        </>
      )}
      {errorModal && (
        <>
          <Overlay />
          <Modal isOpen={errorModal}>
            <ModalText>{error}</ModalText>
              <ModalButton onClick={() => setErrorModal(false)}>
                확인
              </ModalButton>
          </Modal>
        </>
      )}
    </>
  );
}
