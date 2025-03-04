import { InputBase } from "@mui/material";
import styled from "styled-components";

export const SearchBarDiv = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "16px",
  flexWrap: "nowrap",
  overflow: "none",
  alignItems: "center",
  padding: "10px 70px",
  margin: 0,
  // [theme.breakpoints.down("md")]: {
  //   display: "none",
  // },
}));

export const SearchCity = styled("div")(({ theme }) => ({
  flex: "1 1 20%",
  minWidth: "150px",
  position: "relative",
}));

export const SearchDay = styled("div")(({ theme }) => ({
  flex: "1 1 40%",
  minWidth: "350px",
  position: "relative",
}));

export const SearchPerson = styled("div")(({ theme }) => ({
  flex: "1 1 20%",
  minWidth: "150px",
  position: "relative",
}));

export const SubmitDiv = styled("div")(({ theme }) => ({
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

export const SubmitButton = styled("button")(({ theme }) => ({
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

export const SubmitHiddenButton = styled("button")(({ theme }) => ({
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

export const HiddenBox = styled("form")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  boxSizing: "border-box",
}));

export const HiddenForm = styled("form")(({ theme }) => ({}));


