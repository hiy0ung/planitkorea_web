import React, { useEffect, useState } from "react";
import { ContentDiv } from "./customerSt";
import {
  AcContentDiv,
  AccordionDiv,
  BtnCategory,
  ButtonsDiv,
  FooterDiv,
  Img,
  ImgDiv,
  InquiryBtn,
  UDButton,
  UserIdDiv,
} from "./InquirySt";
import { NavLink } from "react-router-dom";
import { Inquiry } from "../../types/type";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import useAuthStore from "../../stores/use.auth.store";

export default function InquiryHistory() {
  const user = useAuthStore((state) => state.user);

  const [expanded, setExpanded] = useState<string | false>(false);

  

  const handleExpansion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const fetchInquiry = async () => {
    if (user.id) {
      try {
        const response = await axios.get(`http://localhost:3001/Inquiries`, {
          params: { userId: user.id },
        });
        setInquiries(response.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    } else {
      console.error("User ID is not defined");
    }
  };

  const deleteInquiry = async (inquiryId: string) => {
    console.log(inquiryId);
    try {
      const id: string = String(inquiryId);
      await axios.delete(`http://localhost:3001/Inquiries/${id}`);
      await fetchInquiry();

    } catch (error) {
      console.error("사용자 정보 호출 실패", (error as Error).message);
    }
  };

  useEffect(() => {
    fetchInquiry();
  }, [user.id]);

  

  return (
    <>
      <ContentDiv>
        <BtnCategory>
          <NavLink to={"/inquiryCRUD"}>
            <InquiryBtn>문의하기</InquiryBtn>
          </NavLink>
          <NavLink to={"/inquiryHistory"}>
            <InquiryBtn style={{ backgroundColor: "#ddd" }}>
              문의내역
            </InquiryBtn>
          </NavLink>
        </BtnCategory>
        {inquiries.map((item) => (
          <Accordion
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleExpansion(item.id)}
            sx={{
              margin: 1,
              "& .MuiAccordion-region": {
                height: expanded === item.id ? "auto" : 0,
              },
              "& .MuiAccordionDetails-root": {
                display: expanded === item.id ? "block" : "none",
              },
              overflow: "auto",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                {item.category} - {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              <AccordionDiv>
                <ImgDiv>
                  {item.image &&
                    item.image.map((imgSrc, index) => (
                      <Img
                        key={index}
                        src={imgSrc}
                        alt={`inquiry-${item.id}-${index}`}
                      />
                    ))}
                </ImgDiv>
                <AcContentDiv>{item.content}</AcContentDiv>
              </AccordionDiv>
              <FooterDiv>
              <UserIdDiv>작성자 - {item.userId}</UserIdDiv>
              <ButtonsDiv>
              <NavLink to={`/inquiryCRUD/edit/${item.id}`}>
                    <UDButton>수정</UDButton>
                  </NavLink>
                <UDButton onClick={() => deleteInquiry((item.id))}>삭제</UDButton>
              </ButtonsDiv>
              </FooterDiv>
            </AccordionDetails>
          </Accordion>
        ))}
      </ContentDiv>
    </>
  );
}
