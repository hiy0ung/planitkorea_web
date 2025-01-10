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

  

  const handleExpansion =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const fetchQuestion = async () => {
      const response = await axios.get('http://localhost:3001/frequentlyQuestion')
      setFrequentlyQuestion(response.data)
    }

    React.useEffect(() => {
      fetchQuestion();
    },[])

    const handlePageChange = (event: { selected: number }) => {
      setCurrentPage(event.selected);
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
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
          >
            <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <Typography>{item.content}</Typography>
            <Typography variant="caption">- {item.author}</Typography>
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
