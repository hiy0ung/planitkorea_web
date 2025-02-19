import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContentDiv, ContentInnerDiv, PageDiv } from "./customerSt";
import axios from "axios";
import { Announcement } from "../../types/type";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 5;

export default function Notification() {
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const [frequentlyQuestion, setFrequentlyQuestion] = React.useState<Announcement[]>([])
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  

  
  const fetchQuestion = async () => {
    const boardType = "자주묻는질문"
    try {
      const response = await axios.get(`http://localhost:4040/api/v1/boards/type/${boardType}`);
  
      const frequentlyQuestionResponse: Announcement[] = response.data.data;
  
      setFrequentlyQuestion(
        frequentlyQuestionResponse.map((frequentlyQuestion: Announcement) => ({
          id: frequentlyQuestion.id,
          boardType: frequentlyQuestion.boardType,
          boardTitle: frequentlyQuestion.boardTitle,
          boardContent: frequentlyQuestion.boardContent,
          author: frequentlyQuestion.author,
          uploadDate: new Date(frequentlyQuestion.uploadDate),
        }))
      )
    } catch (error) {
      console.error("Failed to fetch frequently questions: ", error);
    }
  }
  
  React.useEffect(() => {
    fetchQuestion();
  },[])
  
  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleExpansion =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = frequentlyQuestion.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <ContentDiv>
      <ContentInnerDiv>
      {currentItems.map((item) => (
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
            "&MuiPaper-root": {
              borderRadius: "10px"
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              [{item.boardTitle}]
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              backgroundColor: "#e9e9e9",
            }}
          >
            <Typography
              sx={{
                borderBottom: "1px solid #cccccc",
                padding: "20px"
              }}
            >
              {item.boardContent}
            </Typography>
            <Typography variant="caption" sx={{ padding: "10px"}}>- {item.author}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      </ContentInnerDiv>
      <PageDiv>
      <ReactPaginate
    previousLabel={"<"}
    nextLabel={">"}
    breakLabel={"..."}
    pageCount={Math.ceil(frequentlyQuestion.length / ITEMS_PER_PAGE)}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={handlePageChange}
    containerClassName={"pagination"}
    pageClassName={"page-item"}
    pageLinkClassName={"page-link"}
    previousClassName={"page-item"}
    previousLinkClassName={"page-link"}
    nextClassName={"page-item"}
    nextLinkClassName={"page-link"}
    breakClassName={"page-item"}
    breakLinkClassName={"page-link"}
    activeClassName={"active"}
    />
    </PageDiv>
    </ContentDiv>
  );
}
