import {
  Box,
  Button,
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { styled, useTheme } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/date.css";
import { format } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import useSearchStore, { SearchData } from "../stores/use.search.store";
import { Location } from "../types/type";
import { useNavigate } from "react-router-dom";
import useSelectStore from "../stores/use.select.store";

const SearchBarDiv = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "16px",
  flexWrap: "nowrap",
  overflow: "none",
  alignItems: "center",
  padding: "10px 70px",
  margin: 0,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SearchCity = styled("div")(({ theme }) => ({
  flex: "1 1 20%",
  minWidth: "150px",
  position: "relative",
}));

const SearchDay = styled("div")(({ theme }) => ({
  flex: "1 1 40%",
  minWidth: "350px",
  position: "relative",
}));

export const SearchPerson = styled("div")(({ theme }) => ({
  flex: "1 1 20%",
  minWidth: "150px",
  position: "relative",
}));

const SubmitDiv = styled("div")(({ theme }) => ({
  minWidth: "70",
  padding: "24px 0 0 10px",
}));

export const PersonModal = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "90%",
  maxHeight: "330px",
  padding: "12px 24px",
  border: "0.4px solid #ced4da",
  boxShadow: "0 2px 4px 0 rgba(0,0,0,.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 10,
  flexWrap: "wrap",
  backgroundColor: "white",
}));

const SubmitButton = styled("button")(({ theme }) => ({
  padding: " 5px 10px",
  border: "none",
  borderRadius: "7px",
  backgroundColor: "#82AEF5",
  cursor: "pointer",
  transition: "backgroundColor 0.1s ease",
  minWidth: "42px",
  "&:hover": {
    backgroundColor: "#5F7DFF",
  },
}));

const SubmitHiddenButton = styled("button")(({ theme }) => ({
  padding: " 5px 50px",
  border: "none",
  borderRadius: "7px",
  backgroundColor: "#82AEF5",
  margin: "10px 50px",
  cursor: "pointer",
  transition: "backgroundColor 0.1s ease",
  minWidth: "42px",
  "&:hover": {
    backgroundColor: "#5F7DFF",
  },
}));

const HiddenBox = styled("form")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  boxSizing: "border-box",
}));

const HiddenForm = styled("form")(({ theme }) => ({}));

export default function Search() {
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 15,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "5px 26px 5px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 15,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));

  const navigate = useNavigate();

  //! 전역상태관리
  const pushData = useSearchStore((state) => state.pushData);
  
  const isCityDropdownOpen = useSelectStore((state) => state.isCityDropdownOpen);
  const setCityDropdownOpen = useSelectStore((state) => state.setCityDropdownOpen);
  const toggleCityDropdown = useSelectStore((state) => state.toggleCityDropdown);


  //! 지역
  const [city, setCity] = useState<Location | null>(null);
  //! 날짜
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  

  const today = new Date();

  const handleClearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const [personCount, setPersonCount] = useState<number>(2);

  const [showPerson, setShowPerson] = useState<boolean>(false);

  const handleChangeCity = (e: SelectChangeEvent<Location>) => {
    setCity(e.target.value as Location);
    // setCityDropdownOpen(false);
  };

  const personCountUp = () => {
    setPersonCount((prevCount) => prevCount + 1);
  };

  const personCountDown = () => {
    if (personCount > 1) {
      setPersonCount((prevCount) => prevCount - 1);
    }
  };

  const calendarRef = useRef<HTMLDivElement>(null);
  const personModalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setShowCalendar(false);
    }
    if (
      personModalRef.current &&
      !personModalRef.current.contains(event.target as Node)
    ) {
      setShowPerson(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("md"));

  const [isOpen, setIsOpen] = React.useState(false);

  // const toggleDrawer =
  //   (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
  //     if (
  //       event &&
  //       event.type === "keydown" &&
  //       ((event as React.KeyboardEvent).key === "Tab" ||
  //         (event as React.KeyboardEvent).key === "Shift")
  //     ) {
  //       return;
  //     }

  //     setIsOpen(open);
  //   };

  const handleSelectClick = () => {
    toggleCityDropdown();
  };

    useEffect(() => {

    },[city])



    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      let valid = true;
      if(!city) {
        valid = false;
      }
      if(!startDate && !endDate) {
        valid = false;
        alert('여행 날짜를 입력해주세요')
      }
      if(!personCount) {
        valid = false;
      }

      if(valid) {

        if (startDate && endDate) {
          const startDay = startDate;
          const endDay = endDate;
          
          if (city !== null) {
            const searchData: SearchData = {
              city,
              startDay,
              endDay,
              personCount,
            };
            pushData(searchData);
            console.log(searchData);
            navigate("./allProductPage")
          } else {
            console.error('도시 값이 설정되지 않았습니다.');
          }
        }

      }
    }



  const list = () => (
    <Box sx={{ width: "auto", height: "500px", p: 5 }} role="presentation">
      <HiddenForm>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchCity sx={{ width: "80%" }}>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel id="demo-customized-select-label" sx={{ m: 1 }}>
                여행 지역
              </InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={city}
                onChange={handleChangeCity}
                
                input={
                  <BootstrapInput
                    id="demo-customized-textbox"
                    sx={{ fontWeight: "bold" }}
                  />
                }
              >
                <MenuItem value=''>
                  <em>여행지를 선택해주세요</em>
                </MenuItem>
                <MenuItem value={"서울"} sx={{ fontWeight: "bold" }}>
                  서울
                </MenuItem>
                <MenuItem value={"부산"} sx={{ fontWeight: "bold" }}>
                  부산
                </MenuItem>
                <MenuItem value={"제주도"} sx={{ fontWeight: "bold" }}>
                  제주도
                </MenuItem>
                <MenuItem value={"경주"} sx={{ fontWeight: "bold" }}>
                  경주
                </MenuItem>
                <MenuItem value={"가평"} sx={{ fontWeight: "bold" }}>
                  가평
                </MenuItem>
                <MenuItem value={"강릉"} sx={{ fontWeight: "bold" }}>
                  강릉
                </MenuItem>
                <MenuItem value={"여수"} sx={{ fontWeight: "bold" }}>
                  여수
                </MenuItem>
                <MenuItem value={"전주"} sx={{ fontWeight: "bold" }}>
                  전주
                </MenuItem>
                <MenuItem value={"해남"} sx={{ fontWeight: "bold" }}>
                  해남
                </MenuItem>
                <MenuItem value={"대구"} sx={{ fontWeight: "bold" }}>
                  대구
                </MenuItem>
              </Select>
            </FormControl>
          </SearchCity>
          <Divider />
          <SearchDay sx={{ width: "80%" }}>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="demo-customized-textbox" sx={{ m: 1 }}>
                여행 날짜
              </InputLabel>
              <BootstrapInput
                sx={{ fontWeight: "bold" }}
                onClick={() => setShowCalendar(!showCalendar)}
                value={`${startDate ? format(startDate, "MM.dd ~") : ""} ${
                  endDate ? format(endDate, "MM.dd") : ""
                }`}
              />
            </FormControl>

            {showCalendar && (
              <div
                ref={calendarRef}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  zIndex: 10,
                }}
              >
                <div className="box-border p-4 border border-cyan-200 rounded-lg flex items-center space-x-2 ">
                  <div className="relative flex-1">
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date | null) =>
                        setStartDate(date ?? undefined)
                      }
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      className="w-full p-2 border border-cyan-400 rounded-l-lg"
                      placeholderText="Start Date"
                      isClearable={false}
                      minDate={today}
                      
                    />
                  </div>
                  <div className="relative flex-1">
                    <DatePicker
                      selected={endDate}
                      onChange={(date: Date | null) =>
                        setEndDate(date ?? undefined)
                      }
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate || today}
                      className="w-full p-2 border border-cyan-400 rounded-r-lg"
                      placeholderText="End Date"
                      isClearable={false}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleClearDates}
                    className="flex items-center justify-center px-3 py-2 border border-cyan-400 text-cyan-400 bg-white rounded-lg font-bold hover:bg-cyan-50"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </SearchDay>
          <Divider />
          <SearchPerson sx={{ width: "80%" }}>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="demo-customized-textbox" sx={{ m: 1 }}>
                인원 수
              </InputLabel>
              <BootstrapInput
                id="demo-customized-textbox"
                sx={{ fontWeight: "bold" }}
                value={personCount}
                onClick={() => setShowPerson(!showPerson)}
              />
            </FormControl>

            {showPerson && (
              <PersonModal ref={personModalRef} sx={{ width: "90%" }}>
                <div style={{ margin: "0" }}>
                  <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                    인원 수
                  </p>
                  <p style={{ fontSize: "10px" }}>(유아 및 아동 포함)</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <RemoveCircleOutlineIcon
                    fontSize="large"
                    sx={{ cursor: "pointer" }}
                    onClick={personCountDown}
                  />
                  <p
                    style={{
                      fontSize: "20px",
                      margin: "3px 15px",
                      fontWeight: "bold",
                    }}
                  >
                    {personCount}
                  </p>
                  <AddCircleOutlineIcon
                    fontSize="large"
                    sx={{ cursor: "pointer" }}
                    onClick={personCountUp}
                  />
                </div>
              </PersonModal>
            )}
          </SearchPerson>
          <Divider />
          <SubmitHiddenButton onClick={handleSubmit}>
            <p style={{ margin: 0, color: "#fff" }}
            >검색</p>
          </SubmitHiddenButton>
        </List>
      </HiddenForm>
    </Box>
  );

  return (
    <>
      {!isLgDown ? (
        <form>
          <SearchBarDiv>
            {/* //! 지역 선택 */}
            <SearchCity>
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <InputLabel id="demo-customized-select-label" sx={{ m: 1 }}>
                  여행 지역
                </InputLabel>

                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={city}
                  onChange={handleChangeCity}
                  open={isCityDropdownOpen}
                  onClick={handleSelectClick}
                  input={
                    <BootstrapInput
                      id="demo-customized-textbox"
                      sx={{ fontWeight: "bold" }}
                    />
                  }
                >
                  <MenuItem value="">
                    <em>여행지를 선택해주세요</em>
                  </MenuItem>
                  <MenuItem value={"서울"} sx={{ fontWeight: "bold" }}>
                    서울
                  </MenuItem>
                  <MenuItem value={"부산"} sx={{ fontWeight: "bold" }}>
                    부산
                  </MenuItem>
                  <MenuItem value={"제주도"} sx={{ fontWeight: "bold" }}>
                    제주도
                  </MenuItem>
                  <MenuItem value={"경주"} sx={{ fontWeight: "bold" }}>
                    경주
                  </MenuItem>
                  <MenuItem value={"가평"} sx={{ fontWeight: "bold" }}>
                    가평
                  </MenuItem>
                  <MenuItem value={"강릉"} sx={{ fontWeight: "bold" }}>
                    강릉
                  </MenuItem>
                  <MenuItem value={"여수"} sx={{ fontWeight: "bold" }}>
                    여수
                  </MenuItem>
                  <MenuItem value={"전주"} sx={{ fontWeight: "bold" }}>
                    전주
                  </MenuItem>
                  <MenuItem value={"해남"} sx={{ fontWeight: "bold" }}>
                    해남
                  </MenuItem>
                  <MenuItem value={"대구"} sx={{ fontWeight: "bold" }}>
                    대구
                  </MenuItem>
                </Select>
              </FormControl>
            </SearchCity>

            {/* //! 날짜 선택 */}
            <SearchDay>
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="demo-customized-textbox" sx={{ m: 1 }}>
                  여행 날짜
                </InputLabel>
                <BootstrapInput
                  sx={{ fontWeight: "bold" }}
                  onClick={() => setShowCalendar(!showCalendar)}
                  value={`${startDate ? format(startDate, "MM.dd ~") : ""} ${
                    endDate ? format(endDate, "MM.dd") : ""
                  }`}
                />
              </FormControl>

              {showCalendar && (
                <div
                  ref={calendarRef}
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    zIndex: 10,
                  }}
                >
                  <div className="box-border p-4 border border-cyan-200 rounded-lg flex items-center space-x-2">
                    <div className="relative flex-1 w-full">
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) =>
                          setStartDate(date ?? undefined)
                        }
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className="w-full p-2 border border-cyan-400 rounded-l-lg"
                        placeholderText="Start Date"
                        isClearable={false}
                        minDate={today}
                      />
                    </div>
                    <div className="relative flex-1 w-full">
                      <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) =>
                          setEndDate(date ?? undefined)
                        }
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate || today}
                        className="w-full p-2 border border-cyan-400 rounded-r-lg"
                        placeholderText="End Date"
                        isClearable={false}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleClearDates}
                      className="flex items-center justify-center px-3 py-2 border border-cyan-400 text-cyan-400 bg-white rounded-lg font-bold hover:bg-cyan-50"
                    >
                      X
                    </button>
                  </div>
                </div>
              )}
            </SearchDay>

            {/* //! 인원수 선택 */}
            <SearchPerson>
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="demo-customized-textbox" sx={{ m: 1 }}>
                  인원 수
                </InputLabel>
                <BootstrapInput
                  id="demo-customized-textbox"
                  sx={{ fontWeight: "bold" }}
                  value={personCount}
                  onClick={() => setShowPerson(!showPerson)}
                />
              </FormControl>

              {showPerson && (
                <PersonModal ref={personModalRef}>
                  <div style={{ margin: "0" }}>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                      인원 수
                    </p>
                    <p style={{ fontSize: "10px" }}>(유아 및 아동 포함)</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <RemoveCircleOutlineIcon
                      fontSize="large"
                      sx={{ cursor: "pointer" }}
                      onClick={personCountDown}
                    />
                    <p
                      style={{
                        fontSize: "20px",
                        margin: "3px 15px",
                        fontWeight: "bold",
                      }}
                    >
                      {personCount}
                    </p>
                    <AddCircleOutlineIcon
                      fontSize="large"
                      sx={{ cursor: "pointer" }}
                      onClick={personCountUp}
                    />
                  </div>
                </PersonModal>
              )}
            </SearchPerson>

            <SubmitDiv>
              <SubmitButton onClick={handleSubmit}>
                <p style={{ margin: 0, color: "#fff" }}>검색</p>
              </SubmitButton>
            </SubmitDiv>
          </SearchBarDiv>

          {/* //! 히든 검색바 */}
        </form>
      ) : (
        <HiddenBox>
          <Button
            sx={{
              border: "1px solid #82AEF5",
              borderRadius: "15px",
              width: "80%",
              m: "20px",
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              boxSizing: "border-box",
            }}
            onClick={() => toggleCityDropdown()}
          >
            <SearchIcon />
            여행지를 선택해주세요
          </Button>
          <SwipeableDrawer
            anchor="bottom"
            open={isCityDropdownOpen}
            onClose={() => toggleCityDropdown()}
            onOpen={() => toggleCityDropdown()}
          >
            {list()}
          </SwipeableDrawer>
        </HiddenBox>
      )}
    </>
  );
}
