import React, { useEffect, useState } from "react";
import { GroupLine } from "../Login/SignSt";
import {
  AllDiv,
  AllProductDiv,
  Category,
  FilterDiv,
  FilterHeader,
  GroupTitle,
  PriceDiv,
  ProductDetail,
  ProductDiv,
  ProductImg,
  ProductName,
  ResetButton,
  PageDiv
} from "../Product/AllProductSt";
import ReactPaginate from "react-paginate";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Accommodation, BerthProduct, Facilities, User } from "../../types/type";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSearchStore from "../../stores/use.search.store";
import axios from "axios";
import useAuthStore from "../../stores/use.auth.store"


const ITEMS_PER_PAGE = 9;

export default function AllProductPage() {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cityFilter = queryParams.get('city');
  
  // URL 디코딩
  const decodedCityFilter = cityFilter ? decodeURIComponent(cityFilter) : '';

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [accommodationType, setAccommodationType] = useState<Accommodation | null>(null);
  const [facilities, setFacilities] = useState<Facilities[]>([]);
  const [userWishList, setUserWishList] = useState<number[]>([]);
  const [products, setProducts] = useState<BerthProduct[]>([]);

  const navigate = useNavigate();

  const { searchData } = useSearchStore();
  const { user, isLoggedIn } = useAuthStore();

  useEffect(() => {
    const fetchWish = async () => {
      if (user?.id && isLoggedIn) {
        try {
          const response = await axios.get<User>(`http://localhost:3001/users/${user.id}`);
          setUserWishList(response.data.wishList);
          console.log(userWishList);
        } catch (error) {
          console.error('위시리스트 호출 실패:', error);
        }
      }
    };

    fetchWish();
  }, [user?.id, isLoggedIn]); 


  
  //! 찜
  const toggleWishlist = async(id: number) => {
    if(!isLoggedIn) {
      alert('로그인이 필요한 시스템입니다.')
      return
    }
    try {
      const response = await axios.get<User>(`http://localhost:3001/users/${user.id}`);
      const userWishData = response.data;

      const updatedWishList = userWishData.wishList.includes(id)
        ? userWishData.wishList.filter(item => item !== id) 
        : [...userWishData.wishList, id]; 

        setUserWishList(updatedWishList)
      await axios.put(`http://localhost:3001/users/${user.id}`, {
        ...userWishData,
        wishList: updatedWishList,
      });

      console.log('위시리스트가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('위시리스트 업데이트 중 오류 발생:', error);
    }

  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  //! 카테고리 리셋
  const handleReset = () => {
    setAccommodationType(null); 
    setFacilities([]);
  };

  //! 숙소타입 핸들러
  const handleChangeAccommodation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccommodationType(e.target.value as Accommodation);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/BerthProduct');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  //! 편의시설 핸들러
  const handleChangeFacilities = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setFacilities((prevFacilities) => {
      if (checked) {
        return [...prevFacilities, value as Facilities];
      } else {
        return prevFacilities.filter((facility) => facility !== value);
      }
    });
  };

   //! 카테고리 필터링
  const filterProducts = products.filter((product) => {
    const matchSearchCity = !searchData.city || product.city === searchData.city;
  
    const matchQueryCity = !decodedCityFilter || product.city === decodedCityFilter;
  
    const matchCity = matchSearchCity && matchQueryCity;
  
    const matchAccommodationType =
      !accommodationType || product.accommodationCategory.includes(accommodationType as Accommodation);
  
    const matchFacilities =
      facilities.length === 0 || facilities.every((facility) =>
        product.facility.includes(facility)
      );
  
    const matchCategory = !category || product.accommodationCategory.some((cat) => cat === category);
  
    return matchAccommodationType && matchFacilities && matchCategory && matchCity ;
  });
  //! 페이지네이션
  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filterProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleProductClick = (id: number) => {
    navigate(`/detailProduct/${id}`);
  };


  return (
    <>
      <GroupLine />

      <AllDiv>
        <FilterDiv>
          <FilterHeader>
            <GroupTitle>숙소 필터</GroupTitle>
            <ResetButton onClick={handleReset}>초기화</ResetButton>
          </FilterHeader>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontWeight: "bold", fontSize: "18px", color: "#000" }}
            >
              숙소별
            </FormLabel>
            <RadioGroup
              sx={{ paddingBottom: "40px", borderBottom: "1px solid #D9D9D9" }}
              value={accommodationType || ''}
              name="radio-buttons-group"
              onChange={handleChangeAccommodation}
            >
              <FormControlLabel
                value=""
                control={<Radio />}
                label="전체"
              />
              <FormControlLabel
                value="호텔&리조트"
                control={<Radio />}
                label="호텔 & 리조트"
              />
              <FormControlLabel
                value="펜션&풀빌라"
                control={<Radio />}
                label="펜션 & 풀빌라"
              />
              <FormControlLabel
                value="캠핑&글램핑"
                control={<Radio />}
                label="캠핑 & 글램핑"
              />
            </RadioGroup>
            <FormLabel
              id="facilities-filter"
              sx={{ fontWeight: "bold", fontSize: "18px", color: "#000", paddingTop: "40px" }}
            >
              편의 시설
            </FormLabel>
            <FormGroup sx={{zIndex:10}}>
              <FormControlLabel
                value="사우나"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('사우나')} />}
                label="사우나"
              />
              <FormControlLabel
                value="수영장"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('수영장')} />}
                label="수영장"
              />
              <FormControlLabel
                value="바베큐"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('바베큐')} />}
                label="바베큐"
              />
              <FormControlLabel
                value="세탁 가능"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('세탁 가능')} />}
                label="세탁 가능"
              />
              <FormControlLabel
                value="스파/월풀"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('스파/월풀')} />}
                label="스파/월풀"
              />
              <FormControlLabel
                value="와이파이"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('와이파이')} />}
                label="와이파이"
              />
              <FormControlLabel
                value="에어컨"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('에어컨')} />}
                label="에어컨"
              />
              <FormControlLabel
                value="욕실용품"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('욕실용품')} />}
                label="욕실용품"
              />
              <FormControlLabel
                value="샤워실"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('샤워실')} />}
                label="샤워실"
              />
              <FormControlLabel
                value="조식포함"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('조식포함')} />}
                label="조식포함"
              />
              <FormControlLabel
                value="무료주차"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('무료주차')} />}
                label="무료주차"
              />
              <FormControlLabel
                value="반려견 동반"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('반려견 동반')} />}
                label="반려견 동반"
              />
              <FormControlLabel
                value="객실 내 취사"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('객실 내 취사')} />}
                label="객실 내 취사"
              />
              <FormControlLabel
                value="OTT"
                control={<Checkbox onChange={handleChangeFacilities} checked={facilities.includes('OTT')} />}
                label="OTT"
              />
            </FormGroup>
          </FormControl>
        </FilterDiv>

        <AllProductDiv>
          {currentItems.map((product) => (
            <ProductDiv key={product.id} onClick={() => handleProductClick(product.id)}>
                <ProductImg src={product.img[0]} />
              <ProductDetail>
                <Category>
                  {product.city} - {product.accommodationCategory}
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder sx={{ color: '#DD1162',  }} />}
                    checkedIcon={<Favorite sx={{ color: '#DD1162' , }} />}
                    checked={userWishList.includes(product.id)}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(product.id);
                    }}
                    sx={{ position: 'relative'}}
                  />
                </Category>
                <ProductName>{product.name}</ProductName>
                <PriceDiv>₩ {product.price.toLocaleString()}</PriceDiv>
              </ProductDetail>
            </ProductDiv>
          ))}
        <PageDiv>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil(filterProducts.length / ITEMS_PER_PAGE)}
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
        </AllProductDiv>

      </AllDiv>
    </>
  );
}
