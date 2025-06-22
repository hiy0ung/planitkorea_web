import React, { useEffect, useState } from 'react'
import { AllDiv, Button, ErrorMessage, GroupLine, InputContainer, InputIdField, InputPasswordField, ModalText, Overlay, SearchDiv } from '../SignSt'
import { Logo, LogoDIv, LogoName } from '../../../styles/logo'
import Modal, { ModalButton } from '../../../component/Modal'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { API_BASE_URL } from '../../../apis'

type ResetPassword = {
  newPassword: string;
  confirmPassword: string;
}

const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export default function ResetPasswordPage() {

  const [resetData, setResetData] = useState<ResetPassword> ({
    newPassword: "",
    confirmPassword:"",
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [newPasswordConfirmError, setNewPasswordConfirmError] =
  useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [cookies, setCookies, removeCookie] = useCookies(["PasswordResetToken"]);

  useEffect(() => {
    if (token) {
      setCookies("PasswordResetToken", token, { path: "/", maxAge: 1800 });
    }
  }, [token, setCookies]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setResetData({
      ...resetData,
      [element.name]: element.value,
    })
  }

  const handleResetPassword = async(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (e instanceof KeyboardEvent && e.key !== 'Enter') return;
      e.preventDefault();

    if(!resetData.newPassword) {
      setNewPasswordError("비밀번호를 입력해주세요.")
    }

    if(!passwordRegex.test(resetData.newPassword)) {
      setNewPasswordError("비밀번호는 8자 이상, 특수문자가 포함되어야 합니다.")
    }

    if(!resetData.confirmPassword) {
      setNewPasswordConfirmError("비밀번호 확인 입력해주세요.")
    }
    
    if(!passwordRegex.test(resetData.confirmPassword)) {
      setNewPasswordConfirmError("비밀번호는 8자 이상, 특수문자가 포함되어야 합니다.")
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      setIsPasswordMatch(false);
      return;
    }else {
      setIsPasswordMatch(true);
    }

    if(isPasswordMatch) {
      try {
        await axios.put(`${API_BASE_URL}/users/password`, {
            newPassword: resetData.newPassword,
          }, {
            headers: {
              Authorization: `Bearer ${cookies.PasswordResetToken}`,
            },
            withCredentials: true,
          })
          .then((response) => {
            if (!!response.data.result) {
              setIsModalOpen(true);
              removeCookie("PasswordResetToken", { path: "/" });
              localStorage.setItem("PasswordResetTokenDeleted", Date.now().toString());
              
              setTimeout(() => {
                window.close();
              }, 5000);
            }
          });
      } catch (error) {
        console.error(error);
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
            <InputPasswordField
              type="password"
              name="newPassword"
              placeholder="새 비밀번호"
              value={resetData.newPassword}
              onChange={handleInputChange}
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
              name="confirmPassword"
              placeholder="새 비밀번호 확인"
              value={resetData.confirmPassword}
              onChange={handleInputChange}
              hasPasswordError={!!newPasswordConfirmError}
              required
            />
            {newPasswordConfirmError && (
              <ErrorMessage>{newPasswordConfirmError}</ErrorMessage>
            )}
          </InputContainer>

          <InputContainer>
            <Button onClick={handleResetPassword}>비밀번호 변경</Button>
          </InputContainer>
        </SearchDiv>
      </AllDiv>
      {isModalOpen && (
        <>
          <Overlay />
          <Modal isOpen={isModalOpen}>
            <ModalText> 비밀번호 변경이 완료되었습니다!</ModalText>
            <ModalText> 본 페이지로 이동해주세요!</ModalText>
              <ModalButton onClick={() => setIsModalOpen(false)}>
                확인
              </ModalButton>
          </Modal>
        </>
      )}
    </>
  )
}
