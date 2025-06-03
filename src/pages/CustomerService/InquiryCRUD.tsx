import React, { ChangeEvent, useEffect, useState } from "react";
import { ContentDiv } from "../customerService/customerSt";
<<<<<<< HEAD
import { ModalText } from "../user/SignSt";
=======
import { ModalText } from "../Login/SignSt";
>>>>>>> cc4521b (refactor: 변수명 수정)
import { InquiryRequest } from "../../types/type";
import Modal, { ModalButton, Overlay } from "../../component/Modal";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  BodyDiv,
  BtnCategory,
  Button,
  ButtonBox,
  ErrorBox,
  ErrorDiv,
  FormDiv,
  ImageFile,
  InputBody,
  InputBox,
  InputFile,
  InputTitle,
  InquiryBtn,
  InquiryTitle,
  InquiryTitleName,
  Select,
  SelectCategoryDiv,
  TitleDiv,
} from "../customerService/InquirySt";
import axios from "axios";
import { Error } from "../mypage/MyPageSt";
import { useCookies } from "react-cookie";

export default function InquiryCRUD() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);

  const [inquiry, setInquiry] = useState<InquiryRequest>({
    inquiryTitle: "",
    inquiryCategory: "결제",
    inquiryContent: "",
    inquiryImage: null,
  });

  const [modalMessage, setModalMessage] = useState<string>("");

  const [cookies] = useCookies(['token']);

  const token = cookies.token;

  const location = useLocation();
  const { inquiryId } = useParams();
  const isEditMode = location.pathname.includes("edit");

  // 문의 내역 수정 시 정보 가져오기
  useEffect(() => {
    const inquiryState = location.state?.inquiryId;

    if (inquiryState) {
      const fetchInquiry = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4040/api/v1/inquiries/${inquiryState}`,
            { headers: { Authorization: `Bearer ${token}` }}
          );
          setInquiry(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchInquiry();
    }
  }, [location.state, token]);

  // 카테고리, 제목, 이름 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInquiry((prev) => ({ ...prev, [name]: value }));
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
      setInquiry((prev) => ({ ...prev, inquiryImage: file }));
    }
  }

  // 이미지 제거 핸들러
  const handleImageRemove = (index: number) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setInquiry((prev) => ({
      ...prev,
      inquiryImage: null,
    }));
  };
 // 새로운 문의 저장 핸들러 (생성)
const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  let valid = true;

  if (!inquiry.inquiryTitle) {
    setHasTitleError(true);
    valid = false;
  }
  if (!inquiry.inquiryContent) {
    setHasBodyError(true);
    valid = false;
  }

  if (valid) {
    try {
      const formData = new FormData();
      formData.append("inquiryTitle", inquiry.inquiryTitle);
      formData.append("inquiryCategory", inquiry.inquiryCategory);
      formData.append("inquiryContent", inquiry.inquiryContent);
      if (inquiry.inquiryImage) {
        formData.append("inquiryImage", inquiry.inquiryImage);
      }

      const response = await axios.post(
        `http://localhost:4040/api/v1/inquiries`, 
        formData, 
        { 
          headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          }
        }
      );
      const inquiryResponse = response.data.data;
      console.log(inquiryResponse);

      setInquiry({
        inquiryTitle: inquiryResponse.inquiryTitle,
        inquiryCategory: inquiryResponse.inquriyCategory,
        inquiryContent: inquiryResponse.inquiryContent,
        inquiryImage: inquiryResponse.inquiryImage,
      })

      setModalMessage("질문이 등록되었습니다!")
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Validation failed", inquiry);
  }
}

// 문의 수정 핸들러
const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  let valid = true;

  if (!inquiry.inquiryTitle) {
    setHasTitleError(true);
    valid = false;
  }

  if (!inquiry.inquiryContent) {
    setHasBodyError(true);
    valid = false;
  }

  if (!token) {
    console.error("로그인 상태가 아닙니다.");
    valid = false;
  }

  if (valid) {
    try {
      const formData = new FormData();
      formData.append("inquiryTitle", inquiry.inquiryTitle);
      formData.append("inquiryCategory", inquiry.inquiryCategory);
      formData.append("inquiryContent", inquiry.inquiryContent);
      if (inquiry.inquiryImage && inquiry.inquiryImage instanceof File) {
        formData.append("inquiryImage", inquiry.inquiryImage);
      }


      const response = await axios.put(
        `http://localhost:4040/api/v1/inquiries/${inquiryId}`, 
        formData,
        {
          headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          }
        }
      );
      
      const inquiryResponse = response.data.data;
      console.log(inquiryResponse);

      setInquiry({
        inquiryTitle: inquiryResponse.inquiryTitle,
        inquiryCategory: inquiryResponse.inquriyCategory,
        inquiryContent: inquiryResponse.inquiryContent,
        inquiryImage: inquiryResponse.inquiryImage,
      })

      setModalMessage("수정이 완료되었습니다!")
      setIsModalOpen(true);
    } catch(error) {
      console.error(error);
    }
  }
}

// 초기화 핸들러
const handleReset = () => {
  setInquiry({
    inquiryTitle: "",
    inquiryCategory: "결제",
    inquiryContent: "",
    inquiryImage: null,
  });
  setPreviews([]);
}

  return (
    <>
      {token ? (
        <ContentDiv>
          <BtnCategory>
            <NavLink to={"/inquiryCRUD"}>
              <InquiryBtn style={{ backgroundColor: "#ddd" }}>문의하기</InquiryBtn>
            </NavLink>
            <NavLink to={"/inquiryHistory"}>
              <InquiryBtn>문의내역</InquiryBtn>
            </NavLink>
          </BtnCategory>
          <FormDiv>
            <form>
              <SelectCategoryDiv>
                <InquiryTitle>
                  <InquiryTitleName>문의 유형</InquiryTitleName>
                </InquiryTitle>
                <InputBox>
                  <Select name="inquiryCategory" value={inquiry.inquiryCategory} onChange={handleChange}>
                    <option value="결제">결제</option>
                    <option value="취소">취소</option>
                    <option value="환불">환불</option>
                  </Select>
                </InputBox>
              </SelectCategoryDiv>
              <TitleDiv>
                <InquiryTitle>
                  <InquiryTitleName>제목</InquiryTitleName>
                </InquiryTitle>
                <InputBox>
                  <InputTitle
                    name="inquiryTitle"
                    placeholder="제목"
                    value={inquiry.inquiryTitle}
                    required
                    onChange={handleChange}
                    hasError={hasTitleError}
                  />
                </InputBox>
              </TitleDiv>
              <BodyDiv>
                <InquiryTitle>
                  <InquiryTitleName>내용</InquiryTitleName>
                </InquiryTitle>
                <InputBox>
                  <InputBody
                    name="inquiryContent"
                    placeholder="내용"
                    value={inquiry.inquiryContent}
                    onChange={handleChange}
                    hasError={hasBodyError}
                    required
                  />
                </InputBox>
              </BodyDiv>
              <ImageFile>
                <InquiryTitle>
                  <InquiryTitleName>사진 첨부</InquiryTitleName>
                </InquiryTitle>
                <InputBox>
                  <InputFile type="file" name="image" multiple onChange={handleImageChange} />
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    {previews.map((preview, index) => (
                      <div key={index}>
                        <img
                          src={preview}
                          alt={`preview-${index}`}
                          style={{ width: "100px", height: "100px" }}
                        />
                        <button
                          type="button"
                          onClick={() => handleImageRemove(index)}
                          style={{ backgroundColor: "#eee", padding: "0 5px", display: "block" }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </InputBox>
              </ImageFile>
              <ButtonBox>
                {isEditMode ? (
                  <Button style={{ marginRight: "15px" }}onClick={handleUpdate}>
                    저장
                  </Button>
                ):(
                  <Button style={{ marginRight: "15px" }} onClick={handleSubmit}>
                  저장
                </Button>
                )}
                
                <Button type="button" onClick={handleReset}>초기화</Button>
              </ButtonBox>
            </form>
          </FormDiv>
        </ContentDiv>
      ) : (
        <ErrorDiv>
          <ErrorBox>
            <Error>로그인이 필요한 시스템입니다.</Error>
          </ErrorBox>
        </ErrorDiv>
      )}

      {isModalOpen && (
        <>
          <Overlay />
          <Modal isOpen={isModalOpen}>
            <ModalText>{modalMessage}</ModalText>
            <NavLink to="/inquiryHistory">
              <ModalButton onClick={() => setIsModalOpen(false)}>확인</ModalButton>
            </NavLink>
          </Modal>
        </>
      )}
    </>
  );
}