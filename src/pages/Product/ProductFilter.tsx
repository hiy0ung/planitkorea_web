import React from "react";
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
import { Facilities, facilities } from "../../types/type";

interface ProductFilterProps {
  accommodationType: string | null;
  setAccommodationType: React.Dispatch<React.SetStateAction<string | null>>;
  selectedFacilities: Facilities[];
  setSelectedFacilities: React.Dispatch<React.SetStateAction<Facilities[]>>;
}

export default function ProductFilter({ accommodationType, setAccommodationType, selectedFacilities, setSelectedFacilities }: ProductFilterProps) {

  // //! 카테고리 리셋
  const handleReset = () => {
    setAccommodationType(null);
    setSelectedFacilities([]);
  };

  // //! 숙소타입 핸들러
  const handleChangeAccommodation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccommodationType(e.target.value);
  };
  
  // //! 편의시설 핸들러
  const handleChangeFacilities = (facility: Facilities, checked: boolean) => {
    if (checked) {
      setSelectedFacilities((prev) => [...prev, facility]);
    } else {
      setSelectedFacilities((prev) =>
        prev.filter((f) => f.facilityId !== facility.facilityId)
      );
    }
  };
  
  return (
    <div>
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
            value={accommodationType || ""}
            name="radio-buttons-group"
            onChange={handleChangeAccommodation}
          >
            <FormControlLabel value="" control={<Radio />} label="전체" />
            <FormControlLabel value="호텔&리조트" control={<Radio />} label="호텔 & 리조트" />
            <FormControlLabel value="펜션&풀빌라" control={<Radio />} label="펜션 & 풀빌라" />
            <FormControlLabel value="캠핑&글램핑" control={<Radio />} label="캠핑 & 글램핑" />
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
            {facilities.map((facility) => (
              <FormControlLabel
                key={facility.facilityId}
                control={
                  <Checkbox
                    checked={selectedFacilities.some(
                      f => f.facilityId === facility.facilityId
                    )}
                    onChange={(e) =>
                      handleChangeFacilities(facility, e.target.checked)
                    }
                  />
                }
                label={facility.facilityName}
            />
            ))}
          </FormGroup>
        </FormControl>
      </FilterDiv>
    </div>
  );
}
