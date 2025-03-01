import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useCookies } from "react-cookie";
import { GroupName, MapReviewDiv, MapReviewInnerDiv, ReviewButton, ReviewContent, ReviewContentDiv, ReviewContentInput, ReviewDate, ReviewDiv, ReviewInfo, UserIdInfo } from "./DetailSt";
import { PageDiv } from "./AllProductSt";
import ReactPaginate from "react-paginate";
import { Review } from "../../types/type";

interface ReviewProps {
  productId: string;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

export default function ReviewSection({ productId, reviews, setReviews }: ReviewProps) {
// const [renderReview, setRenderReview] = useState<Review[]>([]);
//   const [comment, setComment] = useState<string>("");
//   const [currentPage, setCurrentPage] = React.useState<number>(0);
//   const ITEMS_PER_PAGE = 5;

//   const [cookies] = useCookies(["token"]);
//   const token = cookies.token;

//   useEffect(() => {
//     const reviewDay = new Date();
//     const formattedDate = format(reviewDay, "yyyy-MM-dd");
//     setReviewDate(formattedDate);
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       const reviewResponse = await axios.get("http://localhost:3001/reviews", {
//         params: { productId },
//       });

//       const sortedReviews = reviewResponse.data.sort((a: Review, b: Review) => {
//         return new Date(b.date).getTime() - new Date(a.date).getTime();
//       });
//       console.log("Sorted Reviews:", sortedReviews);
//       setRenderReview(sortedReviews);
//     } catch (error) {
//       console.error("리뷰 호출 에러", error);
//     }
//   };

//   const handleReviewSave = async () => {
//     let valid = true;

//     if (!comment) {
//       alert("내용을 입력해주세요");
//       valid = false;
//     }

//     if (valid) {
//       const updatedReview = {
//         id: nextId.toString(),
//         productId: product?.id ? product.id.toString() : "",
//         userId: user.id,
//         comment: comment,
//         date: reviewDate,
//       };

//       try {
//         await axios.post(`http://localhost:3001/reviews`, updatedReview);
//         incrementId();
//         setComment("");

//         fetchReviews();
//       } catch (error) {
//         console.error("데이터 저장 실패", error);
//         alert("리뷰 저장 도중 오류발생.");
//       }
//     }
//   };

//   const handleCommentChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setComment(event.target.value);
//   };

//   const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
//   const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//   const currentItems = renderReview.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageChange = (e: { selected: number }) => {
//     setCurrentPage(e.selected);
//   };

  return (
  //   <>
  //   <ReviewDiv>
  //     <GroupName style={{ margin: "0" }}>리뷰</GroupName>

  //     <MapReviewDiv>
  //       {currentItems && currentItems.length > 0 ? (
  //         currentItems.map((item) => (
  //           <MapReviewInnerDiv key={item.id}>
  //             <ReviewInfo>
  //               <UserIdInfo>{item.userId}</UserIdInfo>
  //               <ReviewDate>작성일 - {item.date}</ReviewDate>
  //             </ReviewInfo>
  //             <ReviewContentDiv>
  //               <ReviewContent>{item.comment}</ReviewContent>
  //             </ReviewContentDiv>
  //           </MapReviewInnerDiv>
  //         ))
  //       ) : (
  //         <MapReviewInnerDiv>작성된 리뷰가 없습니다.</MapReviewInnerDiv>
  //       )}

  //       <PageDiv>
  //         <ReactPaginate
  //           previousLabel={"<"}
  //           nextLabel={">"}
  //           breakLabel={"..."}
  //           pageCount={Math.ceil((renderReview.length || 0) / ITEMS_PER_PAGE)}
  //           marginPagesDisplayed={2}
  //           pageRangeDisplayed={5}
  //           onPageChange={handlePageChange}
  //           containerClassName={"pagination"}
  //           pageClassName={"page-item"}
  //           pageLinkClassName={"page-link"}
  //           previousClassName={"page-item"}
  //           previousLinkClassName={"page-link"}
  //           nextClassName={"page-item"}
  //           nextLinkClassName={"page-link"}
  //           breakClassName={"page-item"}
  //           breakLinkClassName={"page-link"}
  //           activeClassName={"active"}
  //         />
  //       </PageDiv>
  //     </MapReviewDiv>
  //   </ReviewDiv>

  //   <GroupName style={{ margin: "0" }}>리뷰 작성</GroupName>
  //   <MapReviewDiv>
  //     <MapReviewInnerDiv>
  //       <ReviewInfo>
  //         <UserIdInfo>{user.id}</UserIdInfo>
  //         <ReviewDate>작성일 - {reviewDate}</ReviewDate>
  //       </ReviewInfo>
  //       <ReviewContentDiv>
  //         <ReviewContentInput
  //           value={comment}
  //           readOnly={!isLoggedIn}
  //           isReadonly={!isLoggedIn}
  //           onChange={handleCommentChange}
  //           placeholder={isLoggedIn ? "내용을 입력해주세요." : "로그인이 필요합니다."}
  //         />
  //         {isLoggedIn && <ReviewButton onClick={handleReviewSave}>전송</ReviewButton>}
  //       </ReviewContentDiv>
  //     </MapReviewInnerDiv>
  //   </MapReviewDiv>
  // </>
  <div>리뷰ㅠㅠㅠ</div>
  );
}
