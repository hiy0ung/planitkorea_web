import React, { useEffect, useState } from "react";
import {
  AllDiv,
  AllProductDiv,
  Card,
  Error,
  GroupLine,
  NaviBox,
  NavInnerBox,
  NavInnerDiv,
  NavTitle,
  WishInner,
} from "./MyPageSt";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Category,
  PageDiv,
  PriceDiv,
  ProductDetail,
  ProductDiv,
  ProductImg,
  ProductName,
} from "../Product/AllProductSt";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ReactPaginate from "react-paginate";
import { BerthProduct, User } from "../../types/type";
import useAuthStore from "../../stores/use.auth.store";
import axios from "axios";

const ITEMS_PER_PAGE = 9;

export default function WishList() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuthStore();

  const [wishList, setWishList] = useState<BerthProduct[]>([]);
  const [wishNumber, setWishNumber] = useState<number[]>([]);
  const [userWishList, setUserWishList] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  // 페이지
  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = wishList.slice(indexOfFirstItem, indexOfLastItem);

  const handleProductClick = (id: number) => {
    navigate(`/detailProduct/${id}`);
  };

  // const toggleWishlist = async (id: number) => {
  //   if (!isLoggedIn) {
  //     alert("로그인이 필요한 시스템입니다.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.get<User>(
  //       `http://localhost:3001/users/${user.id}`
  //     );
  //     const userWishData = response.data;
  //     const updatedWishList = userWishData.wishList.includes(id)
  //       ? userWishData.wishList.filter((item) => item !== id)
  //       : [...userWishData.wishList, id];
  //     setUserWishList(updatedWishList);
  //     await axios.put(`http://localhost:3001/users/${user.id}`, {
  //       ...userWishData,
  //       wishList: updatedWishList,
  //     });
  //     setWishNumber(updatedWishList);

  //     console.log("위시리스트가 성공적으로 업데이트되었습니다.");
  //   } catch (error) {
  //     console.error("위시리스트 업데이트 중 오류 발생:", error);
  //   }
  // };

  // const fetchUserWishList = async () => {
  //   try {
  //     const response = await axios.get<User>(
  //       `http://localhost:3001/users/${user.id}`
  //     );
  //     const userWishData = response.data.wishList;
  //     setWishNumber(userWishData);
  //     setUserWishList(userWishData);

  //     const products = await Promise.all(
  //       userWishData.map((id) =>
  //         axios.get<BerthProduct>(`http://localhost:3001/BerthProduct/${id}`)
  //       )
  //     );

  //     setWishList(products.map((res) => res.data));
  //   } catch (error) {
  //     console.error("위시리스트 로드 중 오류 발생:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserWishList();
  // }, [isLoggedIn, userWishList]);

  console.log(wishNumber);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  //! 배열을 돌려서 상품 데이터 추출

  return (
    <>
      <GroupLine />
      <AllDiv>
        <NaviBox>
                  <NavInnerBox>
                    <NavLink to="/myPageMain">
                      <NavInnerDiv>
                        <NavTitle>계정 관리</NavTitle>
                      </NavInnerDiv>
                    </NavLink>
                    <NavLink to="/reservationCheck">
                      <NavInnerDiv>
                        <NavTitle>예약 확인</NavTitle>
                      </NavInnerDiv>
                    </NavLink>
                    <NavLink to="/wishList">
                      <NavInnerDiv style={{ backgroundColor: "#D8E8F9" }}>
                        <NavTitle>찜 목록</NavTitle>
                      </NavInnerDiv>
                    </NavLink>
                  </NavInnerBox>
                </NaviBox>

          {currentItems.length === 0 ? (

            <Card>
              <Error>찜 상품이 없습니다.</Error>
          </Card>
          ): (

            <AllProductDiv>
          {currentItems.map((product) => (
            <ProductDiv
              key={product.id}
              onClick={() => handleProductClick(product.id)}
            >
              <ProductImg src={product.img[0]} />
              <ProductDetail>
                <Category>
                  {product.city} - {product.accommodationCategory}
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder sx={{ color: "#DD1162" }} />}
                    checkedIcon={<Favorite sx={{ color: "#DD1162" }} />}
                    checked={userWishList.includes(product.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      // toggleWishlist(product.id);
                    }}
                    sx={{ position: "relative" }}
                  />
                </Category>
                <ProductName>{product.name}</ProductName>
                <PriceDiv>₩ {product.price.toLocaleString()}</PriceDiv>
              </ProductDetail>
            </ProductDiv>
          ))}
          
          {userWishList.length > 0 && (

            <PageDiv>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={Math.ceil(wishList.length / ITEMS_PER_PAGE)}
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
            )}
        </AllProductDiv>
    )}
      </AllDiv>
    </>
  );
}
