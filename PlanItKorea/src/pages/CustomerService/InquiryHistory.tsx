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
  InquiryTitle,
  UDButton,
  UserIdDiv,
} from "./InquirySt";
import { NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  InquiryAllResponse,
  InquiryDetail,
  InquiryList,
} from "../../types/type";

export default function InquiryHistory() {
  const [expanded, setExpanded] = useState<number | false>(false);
  const [inquiryList, setInquiryList] = useState<InquiryList[]>([]);
  const [inquiryDetail, setInquiryDetail] = useState<InquiryDetail>({
    inquiryId: 0,
    inquiryTitle: "",
    inquiryCategory: "결제",
    inquiryContent: "",
    inquiryImage: null,
  });

  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  const handleExpansion =
    (panel: number) =>
    async (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      if (isExpanded) {
        await fetchInquiryDetail(panel);
      }
    };

  const fetchInquiryList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4040/api/v1/inquiries/get`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.data);
      const inquiryList: InquiryAllResponse[] = response.data.data;
      setInquiryList(
        inquiryList.map((inquiry) => ({
          inquiryId: inquiry.inquiryId,
          inquiryTitle: inquiry.inquiryTitle,
          inquiryCategory: inquiry.inquiryCategory,
        }))
      );
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const fetchInquiryDetail = async (inquiryId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:4040/api/v1/inquiries/get/${inquiryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data.data);

      const inquiryDetail: InquiryDetail = response.data.data;

      setInquiryDetail({
        inquiryId: inquiryDetail.inquiryId,
        inquiryTitle: inquiryDetail.inquiryTitle,
        inquiryCategory: inquiryDetail.inquiryCategory,
        inquiryContent: inquiryDetail.inquiryContent,
        inquiryImage: inquiryDetail.inquiryImage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteInquiry = async (inquiryId: number) => {
    console.log(inquiryId);
    try {
      const response = await axios.delete(
        `http://localhost:4040/api/v1/inquiries/delete/${inquiryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setInquiryList((prev) =>
        prev.filter((item) => item.inquiryId !== inquiryId)
      );

      if (expanded === inquiryId) {
        setExpanded(false);
        setInquiryDetail({
          inquiryId: 0,
          inquiryTitle: "",
          inquiryCategory: "결제",
          inquiryContent: "",
          inquiryImage: null,
        });
      }
    } catch (error) {
      console.error("사용자 정보 호출 실패", (error as Error).message);
    }
  };

  useEffect(() => {
    fetchInquiryList();
  }, []);

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
        {inquiryList.map((item) => (
          <Accordion
            key={item.inquiryId}
            expanded={expanded === item.inquiryId}
            onChange={handleExpansion(item.inquiryId)}
            sx={{
              margin: 1,
              "& .MuiAccordion-region": {
                height: expanded === item.inquiryId ? "auto" : 0,
              },
              "& .MuiAccordionDetails-root": {
                display: expanded === item.inquiryId ? "block" : "none",
              },
              overflow: "auto",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${item.inquiryId}-content`}
              id={`${item.inquiryId}-header`}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                {item.inquiryCategory} - {item.inquiryTitle}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {expanded === item.inquiryId && (
                <>
                  {!inquiryDetail ? (
                    <Typography>Loading...</Typography>
                  ) : (
                    <AccordionDiv>
                      <AcContentDiv>
                        <ImgDiv>
                          {inquiryDetail.inquiryImage && (
                            <Img
                              src={`http://localhost:4040/image/${inquiryDetail.inquiryImage}`}
                              alt="Inquiry Image"
                            />
                          )}
                        </ImgDiv>
                        {inquiryDetail.inquiryContent}
                      </AcContentDiv>
                    </AccordionDiv>
                  )}
                  <FooterDiv>
                    <ButtonsDiv>
                      <NavLink
                        to={`/inquiryCRUD/edit/${item.inquiryId}`}
                        state={{ inquiryId: item.inquiryId }}
                      >
                        <UDButton>수정</UDButton>
                      </NavLink>
                      <UDButton onClick={() => deleteInquiry(item.inquiryId)}>
                        삭제
                      </UDButton>
                    </ButtonsDiv>
                  </FooterDiv>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </ContentDiv>
    </>
  );
}
