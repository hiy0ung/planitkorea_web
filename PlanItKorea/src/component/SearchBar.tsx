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
import { useLocation, useNavigate } from "react-router-dom";
import { HiddenBox, HiddenForm, PersonModal, SearchBarDiv, SearchCity, SearchDay, SearchPerson, SubmitButton, SubmitDiv, SubmitHiddenButton } from "./SearchBarSt";


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

  const [cityName, setCityName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [person, setPerson] = useState<number>(0);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showPerson, setShowPerson] = useState<boolean>(false);
  const [isCityDropdownOpen, setIsCitiDropdownOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(useLocation().search);
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("md"));


  const handleChangeCity = (e: SelectChangeEvent<string>) => {
    setCityName(e.target.value);
  };

  const handleClearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };


  const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().split("T")[0];;
  };

  const parseDate = (dateString: string | null) => {
    if (!dateString) return undefined;
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month -1, day);
  }

  useEffect(() => {
    const city = searchParams.get("cityName") || "";
    const start = parseDate(searchParams.get("startDate"));
    const end = parseDate(searchParams.get("endDate"));
    const people = searchParams.get("person") ? parseInt(searchParams.get("person")!) : 0;

    setCityName(city);
    setStartDate(start);
    setEndDate(end);
    setPerson(people);
  }, [searchParams.toString()]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cityName && startDate && endDate && person > 0) {
      const queryParams = new URLSearchParams();
      queryParams.append("cityName", cityName);
      queryParams.append("startDate", formatDate(startDate));
      queryParams.append("endDate", formatDate(endDate));
      queryParams.append("person", person.toString());

      navigate(`/allProductPage?${queryParams.toString()}`, { replace: true });
    } else {
      alert("모두 선택해주세요!");
    }
  };

  const personCountUp = () => {
    setPerson((prev) => prev + 1);
  };

  const personCountDown = () => {
    if (person > 1) {
      setPerson((prev) => prev - 1);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  const handleSelectClick = () => {
    toggleCityDropdown();
  };

  const toggleCityDropdown = () => {
    setIsCitiDropdownOpen((prev) => !prev);
  }

  useEffect(() => {}, [cityName]);


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
          <SearchCity style={{ width: "80%" }}>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel id="demo-customized-select-label" sx={{ m: 1 }}>
                여행 지역
              </InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={cityName}
                onChange={handleChangeCity}
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
          <Divider />
          <SearchDay style={{ width: "80%" }}>
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
                      onChange={(date: Date | null) => setStartDate(date ?? undefined)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      className="w-full p-2 border border-cyan-400 rounded-l-lg"
                      placeholderText="Start Date"
                      isClearable={false}
                      minDate={new Date()}
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
                      minDate={startDate || new Date()}
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
          <SearchPerson style={{ width: "80%" }}>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="demo-customized-textbox" sx={{ m: 1 }}>
                인원 수
              </InputLabel>
              <BootstrapInput
                id="demo-customized-textbox"
                sx={{ fontWeight: "bold" }}
                value={person}
                onClick={() => setShowPerson(!showPerson)}
              />
            </FormControl>

            {showPerson && (
              <PersonModal ref={personModalRef} style={{ width: "90%" }}>
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
                    {person}
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
          <SubmitHiddenButton onClick={handleSearchSubmit}>
            <p style={{ margin: 0, color: "#fff" }}>검색</p>
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
                  value={cityName || ""}
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
                        minDate={new Date()}
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
                        minDate={startDate || new Date()}
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
                  value={person}
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
                      {person}
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
              <SubmitButton onClick={handleSearchSubmit}>
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
