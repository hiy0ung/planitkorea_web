import React, { useState } from "react";
import {
  FilterDiv,
  FilterHeader,
  GroupTitle,
  ResetButton,
} from "./AllProductSt";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Accommodation, Facilities } from "../../types/type";

export default function ProductFilter() {
    // const [accommodationType, setAccommodationType] = useState<Accommodation | null>(null);
    // const [facilities, setFacilities] = useState<Facilities[]>([]);

  // //! 카테고리 리셋
  // const handleReset = () => {
  //   setAccommodationType(null);
  //   setFacilities([]);
  // };

  // //! 숙소타입 핸들러
  // const handleChangeAccommodation = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAccommodationType(e.target.value as Accommodation);
  // };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/BerthProduct');
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  // //! 편의시설 핸들러
  // const handleChangeFacilities = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked } = event.target;
  //   setFacilities((prevFacilities) => {
  //     if (checked) {
  //       return [...prevFacilities, value as Facilities];
  //     } else {
  //       return prevFacilities.filter((facility) => facility !== value);
  //     }
  //   });
  // };

  // //  ! 카테고리 필터링
  // const filterProducts = products.filter((product) => {
  //   const matchSearchCity =
  //     !searchData.city || product.city === searchData.city;

  //   const matchQueryCity =
  //     !decodedCityFilter || product.city === decodedCityFilter;

  //   const matchCity = matchSearchCity && matchQueryCity;

  //   const matchAccommodationType =
  //     !accommodationType ||
  //     product.accommodationCategory.includes(
  //       accommodationType as Accommodation
  //     );

  //   const matchFacilities =
  //     facilities.length === 0 ||
  //     facilities.every((facility) => product.facility.includes(facility));

  //   const matchCategory =
  //     !category ||
  //     product.accommodationCategory.some((cat) => cat === category);

  //   return (
  //     matchAccommodationType && matchFacilities && matchCategory && matchCity
  //   );
  // });

  // const filterProducts = products.filter((product) => {
  //   const matchCity =
  //     (!decodedCityFilter || product.city === decodedCityFilter) &&
  //     (!category || product.accommodationCategory.includes(category));

  //   const matchAccommodationType =
  //     !accommodationType ||
  //     product.accommodationCategory.includes(accommodationType);

  //   const matchFacilities =
  //     facilities.length === 0 ||
  //     facilities.every((facility) => product.facility.includes(facility));

  //   return matchCity && matchAccommodationType && matchFacilities;
  // });

  return (
    <div>
      <FilterDiv>
        <FilterHeader>
          <GroupTitle>숙소 필터</GroupTitle>
          <ResetButton 
            // onClick={handleReset}
          >초기화</ResetButton>
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
            // value={accommodationType || ""}
            name="radio-buttons-group"
            // onChange={handleChangeAccommodation}
          >
            <FormControlLabel value="" control={<Radio />} label="전체" />
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
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "#000",
              paddingTop: "40px",
            }}
          >
            편의 시설
          </FormLabel>
          <FormGroup sx={{ zIndex: 10 }}>
            <FormControlLabel
              value="사우나"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("사우나")}
                />
              }
              label="사우나"
            />
            <FormControlLabel
              value="수영장"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("수영장")}
                />
              }
              label="수영장"
            />
            <FormControlLabel
              value="바베큐"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("바베큐")}
                />
              }
              label="바베큐"
            />
            <FormControlLabel
              value="세탁 가능"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("세탁 가능")}
                />
              }
              label="세탁 가능"
            />
            <FormControlLabel
              value="스파/월풀"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("스파/월풀")}
                />
              }
              label="스파/월풀"
            />
            <FormControlLabel
              value="와이파이"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("와이파이")}
                />
              }
              label="와이파이"
            />
            <FormControlLabel
              value="에어컨"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("에어컨")}
                />
              }
              label="에어컨"
            />
            <FormControlLabel
              value="욕실용품"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("욕실용품")}
                />
              }
              label="욕실용품"
            />
            <FormControlLabel
              value="샤워실"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("샤워실")}
                />
              }
              label="샤워실"
            />
            <FormControlLabel
              value="조식포함"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("조식포함")}
                />
              }
              label="조식포함"
            />
            <FormControlLabel
              value="무료주차"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("무료주차")}
                />
              }
              label="무료주차"
            />
            <FormControlLabel
              value="반려견 동반"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("반려견 동반")}
                />
              }
              label="반려견 동반"
            />
            <FormControlLabel
              value="객실 내 취사"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("객실 내 취사")}
                />
              }
              label="객실 내 취사"
            />
            <FormControlLabel
              value="OTT"
              control={
                <Checkbox
                  // onChange={handleChangeFacilities}
                  // checked={facilities.includes("OTT")}
                />
              }
              label="OTT"
            />
          </FormGroup>
        </FormControl>
      </FilterDiv>
    </div>
  );
}
