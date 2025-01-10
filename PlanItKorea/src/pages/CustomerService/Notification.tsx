import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContentDiv, ContentInnerDiv, PageDiv } from "./customerSt";
import { Announcement } from "../../types/type";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../../styles/pagination.css";

const ITEMS_PER_PAGE = 5;

const Notification: React.FC = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const [notification, setNotification] = React.useState<Announcement[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const handleExpansion =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const fetchNotification = async () => {
    try {
      const response = await axios.get<Announcement[]>(
        "http://localhost:3001/announcement"
      );
      setNotification(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = notification.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <ContentDiv>
      <ContentInnerDiv>
        {currentItems.map((item) => (
          <Accordion
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleExpansion(item.id)}
            style={{
              margin: "8px 0",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
            >
              <Typography style={{ fontWeight: "bold" }}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
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
          pageCount={Math.ceil(notification.length / ITEMS_PER_PAGE)}
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
};

export default Notification;
