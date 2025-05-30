import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import {
  PageDiv,
  PriceDiv,
  ProductDetail,
  ProductDiv,
  ProductImg,
  ProductName,
} from "../product/AllProductSt";
import { Card, Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ReactPaginate from "react-paginate";
import { Wishlist } from "../../types/type";
import axios from "axios";
import { useCookies } from "react-cookie";
import { AllDiv, AllProductDiv, Error, GroupLine, NaviBox, NavInnerBox, NavInnerDiv, NavTitle } from "../mypage/MyPageSt";

const ITEMS_PER_PAGE = 9;

export default function WishList() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [wishList, setWishList] = useState<Wishlist[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  
  useEffect(() => {
    fetchWishlist();
  }, [token]);

  // 페이지
  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = wishList.slice(indexOfFirstItem, indexOfLastItem);

  const handleProductClick = (productId: number) => {
    navigate(`/detailProduct/${productId}`);
  };

  const fetchWishlist = async () => {
    if (!token) {
      alert("로그인이 필요한 시스템입니다.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:4040/api/v1/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userWishList = response.data.data;
      setWishList(userWishList);
    } catch (error) {
      console.error("위시리스트 업데이트 중 오류 발생:", error);
    }
  };


  const deleteWishList = async (wishListId: number) => {
    try {
      await axios.delete(
        `http://localhost:4040/api/v1/wishlist/${wishListId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishList((prev) =>
        prev.filter((item) => item.wishListId !== wishListId)
      );
    } catch (error) {
      console.error("위시리스트 삭제 오류", error);
    }
  };

  const toggleWishlist = (productId: number) => {
    const existingItem = wishList.find((item) => item.productId === productId);
    if (existingItem) {
      deleteWishList(existingItem.wishListId);
    }
  };

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
        ) : (
          <AllProductDiv>
            {currentItems.map((product) => (
              <ProductDiv
                key={product.productId}
                
              >
                <ProductImg src={product.productImage} onClick={() => handleProductClick(product.productId)} />
                <ProductDetail>
                  <Checkbox
                    // {...label}
                    icon={<FavoriteBorder sx={{ color: "#DD1162" }} />}
                    checkedIcon={<Favorite sx={{ color: "#DD1162" }} />}
                    checked={wishList.some((item) => item.productId === product.productId)} 
                    onChange={(e) => {e.stopPropagation(); toggleWishlist(product.productId);}}
                    sx={{ position: "relative" }}
                  />
                  <ProductName>{product.productName}</ProductName>
                  <PriceDiv>₩ {product.productPrice.toLocaleString()}</PriceDiv>
                </ProductDetail>
              </ProductDiv>
            ))}

            {wishList.length > 0 && (
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
