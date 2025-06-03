import React, { ChangeEvent, useState } from "react";
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
} from "../SignSt";
import { Logo, LogoDIv, LogoName } from "../../../styles/logo";
import Modal from "../../../component/Modal";
import { NavLink } from "react-router-dom";
import axios from "axios";

type MailDto = {
  userId: string;
  userName: string;
}

export default function PasswordSearch() {
  const [mailData, setMailData] = useState<MailDto>({
    userId: "",
    userName: ""
  });

  const [idError, setIdError] = useState<string>("");
  const [sendMailErrorMs, setSendMailErrorMs] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [hasSendMail, setHasSendMail] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sendMailError, setSendMailError] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setMailData({
      ...mailData,
      [element.name]: element.value,
    });
  };

  const handleSendMail = async () => {
    let valid = true;

    if(!mailData.userId) {
      setIdError("아이디를 입력해주세요.")
      valid = false;
    }
    if(!mailData.userName) {
      setNameError("이름을 입력해주세요.")
      valid = false;
    }

    if (valid && !isButtonDisabled) {
      try {
        setIsButtonDisabled(true);
        const response = await axios.post(`http://localhost:4040/api/v1/users/mails/password`, mailData)
        if(!!response.data.result) {
          setHasSendMail(true);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error(error);
        setSendMailError(true)
        setSendMailErrorMs("메일 전송 실패 입력 정보를 확인해주세요")
      } finally {
        setIsButtonDisabled(false);
      }
    }
  }

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
              name="userId"
              placeholder="아이디"
              value={mailData.userId}
              onChange={handleInputChange}
              hasIdError={!!idError}
              required
            />
            {idError ? <ErrorMessage>{idError}</ErrorMessage> : <></>}
          </InputContainer>
          <InputContainer>
            <InputPhoneField
              type="text"
              name="userName"
              placeholder="성명"
              value={mailData.userName}
              onChange={handleInputChange}
              hasPhoneError={!!nameError}
              required
            />
            {nameError ? (
              <ErrorMessage>{nameError}</ErrorMessage>
            ) : (
              <></>
            )}
            {sendMailError && <ErrorMessage>{sendMailErrorMs}</ErrorMessage>}
          </InputContainer>

          <InputContainer>
            <Button onClick={handleSendMail} disabled={isButtonDisabled}>
            {isButtonDisabled ? "메일 전송 중..." : "메일 인증"}</Button>
          </InputContainer>
        </SearchDiv>
      </AllDiv>
      {hasSendMail && (
        <>
          <Overlay />
          <Modal isOpen={isModalOpen}>
            <ModalText> 이메일 전송이 완료되었습니다. </ModalText>
            <NavLink to="/signin">
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
