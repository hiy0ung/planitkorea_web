import React, { ChangeEvent, useState } from "react";
import logo from "../../assets/images/logo.png";
import {
  AllDiv,
  InputContainer,
  ErrorMessage,
  InputPhoneField,
  InputIdField,
  Button,
  Overlay,
  ModalButton,
  GroupLine,
  SearchDiv,
  InputPasswordField,
  ModalText,
} from "./SignSt";
import { Logo, LogoDIv, LogoName } from "../../styles/logo";
import Modal from "../../component/Modal";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { User } from "../../types/type";

export default function PasswordSearch() {
  const [id, setId] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");

  const [idError, setIdError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [newPasswordConfirmError, setNewPasswordConfirmError] =
    useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const idValue = event.target.value;
    setId(idValue);
    if (!idValue) {
      setIdError("아이디를 입력해주세요.");
    } else {
      setIdError("");
    }
  };

  const handlePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = event.target.value;
    setPhoneNumber(phoneValue);
    const phoneNumberRegex = /^\d{9,11}$/;

    if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
      setPhoneNumberError("전화번호 8자리 입력해주세요");
    } else {
      setPhoneNumberError("");
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    setNewPassword(passwordValue);
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (newPassword && !passwordRegex.test(newPassword)) {
      setNewPasswordError("비밀번호는 8자 이상, 특수문자가 포함되어야 합니다.");
    } else {
      setNewPasswordError("");
    }
  };

  const handlePasswordConfirmChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const passwordConfirmValue = event.target.value;
    setNewPasswordConfirm(passwordConfirmValue);

    if (passwordConfirmValue && newPassword !== passwordConfirmValue) {
      setNewPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setNewPasswordConfirmError("");
    }
  };

  const handleSubmit = async () => {
    let valid = true;

    if (!id) {
      setIdError("아이디를 입력해주세요.");
      valid = false;
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
    if (!newPassword) {
      setNewPasswordError("비밀번호는 8자 이상, 특수문자가 포함되어야 합니다.");
      valid = false;
    } else {
      const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        setNewPasswordError(
          "비밀번호는 8자 이상, 특수문자가 포함되어야 합니다."
        );
        valid = false;
      }
    }
    if (!newPasswordConfirm) {
      setNewPasswordConfirmError("비밀번호 확인을 입력해주세요.");
      valid = false;
    } else if (newPassword !== newPasswordConfirm) {
      setNewPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      valid = false;
    }
    if (valid) {
      try {
        //! 비밀번호찾기  데이터
        const searchPassword = {
          id,
          phoneNumber,
        };

        const response = await axios.get(`http://localhost:3001/users`, {
          params: searchPassword,
        });

        const matchedData = response.data.find(
          (user: User) => user.id === id && user.phoneNumber === phoneNumber
        );

        if (matchedData) {
          const updateUserData = {
            ...matchedData,
            password: newPassword,
          };

          await axios.put(
            `http://localhost:3001/users/${matchedData.id}`,
            updateUserData
          );
        }

        setIsModalOpen(true);
      } catch (error) {
        console.error("사용자호출 실패", error);
      }
    }
  };

  return (
    <>
      <GroupLine />
      <AllDiv>
        <LogoDIv style={{ marginBottom: "20px", alignItems: "center" }}>
          <Logo src={"/images/logo.png"} alt="logo" />
          <LogoName>Plan It Korea</LogoName>
        </LogoDIv>
        <SearchDiv>
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
            <InputPhoneField
              type="text"
              name="phone"
              placeholder="핸드폰 번호"
              value={phoneNumber}
              onChange={handlePhoneNumber}
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
            <InputPasswordField
              type="password"
              name="password"
              placeholder="새 비밀번호"
              onChange={handlePasswordChange}
              value={newPassword}
              hasPasswordError={!!newPasswordError}
              required
            />
            {newPasswordError ? (
              <ErrorMessage>{newPasswordError}</ErrorMessage>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <InputPasswordField
              type="password"
              name="password"
              placeholder="새 비밀번호 확인"
              onChange={handlePasswordConfirmChange}
              value={newPasswordConfirm}
              hasPasswordError={!!newPasswordConfirmError}
              required
            />
            {newPasswordConfirmError && (
              <ErrorMessage>{newPasswordConfirmError}</ErrorMessage>
            )}
          </InputContainer>

          <InputContainer>
            <Button onClick={handleSubmit}>비밀번호 변경</Button>
          </InputContainer>
        </SearchDiv>
      </AllDiv>
      {isModalOpen && (
        <>
          <Overlay />
          <Modal isOpen={isModalOpen}>
            <ModalText> 비밀번호 변경이 완료되었습니다!</ModalText>
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
