import React, { ChangeEvent, useEffect, useState } from "react";
import { ContentDiv } from "./customerSt";
import { ModalText } from "../Login/SignSt";
import { Inquiry, InquiryType } from "../../types/type";
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
} from "./InquirySt";
import axios from "axios";
import useAuthStore from "../../stores/use.auth.store";
import { Error } from "../MyPage/MyPageSt";
import useIdStore from "../../stores/use.nexId.store";

export default function InquiryCRUD() {
  const { id } = useParams<{ id: string }>();
  const [previews, setPreviews] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //! 유저 전역상태정보
  const user = useAuthStore((state) => state.user);
  const isLoggedin = useAuthStore((state) => state.isLoggedIn);

  // 문의내역 id 전역
  const { nextId, incrementId } = useIdStore((state) => ({
    nextId: state.nextId,
    incrementId: state.incrementId,
  }));

  // 상태 초기화
  const [inquiry, setInquiry] = useState<Inquiry>({
    id: nextId.toString(),
    userId: user.id,
    category: "결제",
    title: "",
    content: "",
    image: [],
  });

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);

  // 카테고리 변경 핸들러
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setInquiry((prevInquiry) => ({
      ...prevInquiry,
      category: e.target.value as InquiryType,
    }));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitleValue = e.target.value;
    setInquiry((prevInquiry) => ({
      ...prevInquiry,
      title: newTitleValue,
    }));

    setHasTitleError(newTitleValue.trim() === '');
  };

  // 내용 변경 핸들러
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newBodyValue = e.target.value
    setInquiry((prevInquiry) => ({
      ...prevInquiry,
      content: newBodyValue,
    }));

    setHasBodyError(newBodyValue.trim() === '')
  };

  // 이미지 변경 핸들러
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      const readerPromises = fileArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises)
        .then((base64Strings) => {
          setPreviews((prevPreviews) => prevPreviews.concat(base64Strings));
          setInquiry((prevInquiry) => ({
            ...prevInquiry,
            image: (prevInquiry.image || []).concat(base64Strings),
          }));
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    }
  };

  // 이미지 제거 핸들러
  const handleImageRemove = (index: number) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  // 초기화 핸들러
  const handleReset = () => {
    setInquiry({
      id: nextId.toString(),
      userId: user.id,
      category: "결제",
      title: "",
      content: "",
      image: [],
    });
    setPreviews([]);
  };


  // 문의내역 로드
  useEffect(() => {
    if (id) {
      const fetchInquiry = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/Inquiries/${id}`);
          setInquiry(response.data);
          setPreviews(response.data.image || []);
        } catch (error) {
          console.error("Error fetching inquiry:", error);
        }
      };

      fetchInquiry();
    }
  }, [id]);

  // 수정 핸들러
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let valid = true;

    if (!inquiry.title) {
      setHasTitleError(true);
      valid = false;
    }
    if (!inquiry.content) {
      setHasBodyError(true);
      valid = false;
    }
  
    if (!isLoggedin) {
      console.error("로그인 상태가 아닙니다.");
      valid = false;
    }

    if(valid) {
      try {
        await axios.put<Inquiry>(`http://localhost:3001/Inquiries/${id}`, inquiry);
        setIsModalOpen(true);
      } catch (error) {
        console.error("업데이트 도중 에러가 발생했습니다:");
      }
    }
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let valid = true;

    if (!inquiry.title) {
      setHasTitleError(true);
      valid = false;
    }
    if (!inquiry.content) {
      setHasBodyError(true);
      valid = false;
    }

    if (valid) {
      try {
        await axios.post("http://localhost:3001/Inquiries", inquiry);
        setIsModalOpen(true);
        incrementId();
        setInquiry({
          id: (nextId + 1).toString(),
          userId: user.id,
          category: "결제",
          title: "",
          content: "",
          image: [],
        });
        setPreviews([]);
      } catch (error) {
        console.error("Error submitting inquiry:", error);
      }
    } else {
      console.log("Validation failed", inquiry); 
    }
  };

  const location = useLocation();
  const isEditMode = location.pathname.includes("edit");

  return (
    <>
      {isLoggedin ? (
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
                  <Select name="Category" value={inquiry.category} onChange={handleCategory}>
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
                    placeholder="제목"
                    value={inquiry.title}
                    required
                    onChange={handleTitleChange}
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
                    placeholder="내용"
                    value={inquiry.content}
                    onChange={handleBodyChange}
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
            <ModalText>질문이 등록되었습니다!</ModalText>
            <NavLink to="/inquiryHistory">
              <ModalButton onClick={() => setIsModalOpen(false)}>확인</ModalButton>
            </NavLink>
          </Modal>
        </>
      )}
    </>
  );
}
