import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useCookies } from "react-cookie";
import { GroupName, MapReviewDiv, MapReviewInnerDiv, ReviewButton, ReviewContent, ReviewContentDiv, ReviewContentInput, ReviewDate, ReviewDiv, ReviewGroupName, ReviewInfo, UserIdInfo } from "./DetailSt";
import { PageDiv } from "./AllProductSt";
import ReactPaginate from "react-paginate";
import { ResponseReviewDto, Review } from "../../types/type";
import useAuthStore from "../../stores/use.auth.store";
import axios from "axios";

interface ReviewProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewProps) {
  const [renderReview, setRenderReview] = useState<ResponseReviewDto[]>([]);
  const [comment, setComment] = useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const { userId } = useAuthStore();
  const ITEMS_PER_PAGE = 5;

  const today = format(new Date(), "yyyy-MM-dd");

  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  useEffect(() => {
    axios.get(`http://localhost:4040/api/v1/reviews/auth/${productId}`)
      .then((response) => {
        setRenderReview(response.data?.data || []); 
      })
      .catch((error) => {
        console.error("리뷰 데이터를 불러오는데 실패했습니다.", error);
        setRenderReview([]); 
      });
  }, [productId]);
  

  const handleReviewPost = async() => {
    try {
      await axios.post(`http://localhost:4040/api/v1/reviews`, {
        productId: productId,
        reviewCommend: comment
      }, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      }).then((response) => {
        if(response.data.result) {
          setComment("")
        }
      })
    } catch(error) {
      console.error(error);
    }
  }

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = renderReview.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (e: { selected: number }) => {
    setCurrentPage(e.selected);
  };

  return (
    <>
    <ReviewDiv>

    <ReviewGroupName>리뷰 작성</ReviewGroupName>
    <MapReviewDiv>
      <MapReviewInnerDiv>
        <ReviewInfo>
          <UserIdInfo>{userId}</UserIdInfo>
          <ReviewDate>작성일 - {today}</ReviewDate>
        </ReviewInfo>
        <ReviewContentDiv>
          <ReviewContentInput
            value={comment}
            readOnly={!token}
            isReadonly={!token}
            onChange={handleCommentChange}
            placeholder={token ? "내용을 입력해주세요." : "로그인이 필요합니다."}
          />
          {token && <ReviewButton onClick={handleReviewPost}>전송</ReviewButton>}
        </ReviewContentDiv>
      </MapReviewInnerDiv>
    </MapReviewDiv>


      <ReviewGroupName>리뷰</ReviewGroupName>

      <MapReviewDiv>
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((item) => (
            <MapReviewInnerDiv key={item.id}>
              <ReviewInfo>
                <UserIdInfo>{item.userStringId}</UserIdInfo>
                <ReviewDate>작성일 - {item.reviewDate ? format(new Date(item.reviewDate), "yyyy-MM-dd") : "날짜 없음"} </ReviewDate>
              </ReviewInfo>
              <ReviewContentDiv>
                <ReviewContent>{item.reviewCommend}</ReviewContent>
              </ReviewContentDiv>
            </MapReviewInnerDiv>
          ))
        ) : (
          <MapReviewInnerDiv>작성된 리뷰가 없습니다.</MapReviewInnerDiv>
        )}

        <PageDiv>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil((renderReview.length || 0) / ITEMS_PER_PAGE)}
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
      </MapReviewDiv>
    </ReviewDiv>

    
  </>
  );
}
