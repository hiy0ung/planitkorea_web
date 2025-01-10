import styled from "styled-components";
import theme from "../../styles/theme";

export const BtnCategory = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

export const InquiryBtn = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
  margin-bottom: 40px;
  &:hover {
    background-color: #ddd;
  }
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
`;

export const SelectCategoryDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
`;
export const BodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
`;
export const ImageFile = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
`;

export const InquiryTitle = styled.div`
  padding: 5px 0;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  border-right: 1px solid #ccc;

`;

export const InputBox = styled.div`
  padding: 5px 20px;
  width: 80%;
  display: flex;
  align-items: center;
`;

export const InquiryTitleName = styled.p`
  font-weight: bold;
`;

export const Select = styled.select`
  padding: 5px 20px;
  border: 1px solid #ddd;
`;

export const InputTitle = styled.input<{hasError : boolean}>`
  padding: 5px 20px;
  background-color: #eee;
  width: 100%;
  border: ${(props) =>
    props.hasError ? `2px solid ${theme.palette.error.main}` : "none"};
  outline: none;
  box-sizing: border-box;

  &:focus {
    border: ${(props) =>
    props.hasError ? `2px solid ${theme.palette.error.main}` : "none"};
  }
`;


export const InputBody = styled.textarea<{hasError : boolean}>`
  padding: 5px 20px;
  background-color: #eee;
  width: 100%;
  height: 300px;
  resize: none;
  border: ${(props) =>
    props.hasError ? `2px solid ${theme.palette.error.main}` : "none"};
  outline: none;
  box-sizing: border-box;

  &:focus {
    border: ${(props) =>
    props.hasError ? `2px solid ${theme.palette.error.main}` : "none"};
  }
`;

export const InputFile = styled.input`
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Button = styled.button`
  border: none;
  background-color: ${theme.palette.primary.main};
  border-radius: 15px;
  height: 40px;
  width: 150px;
  margin-bottom: 0px;
  color: white;
  margin-top: 15px;
  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
`;

export const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
`;

export const ErrorBox = styled.div`
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  overflow: hidden;
`;


export const AccordionDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px; 
`;

export const ImgDiv = styled.div`
  display: flex; 
  overflow-x: auto; 
  gap: 10px; 
  padding: 10px 0; 
  max-height: 150px; 
  width: 100%;
  box-sizing: border-box; 
`;

export const Img = styled.img`
  height: 100%;
  max-width: 150px;
  object-fit: cover;
`;

export const AcContentDiv = styled.div`
  margin-top: 10px;
  word-wrap: break-word; 
  white-space: pre-wrap; 
  background-color: #eee;
  border-radius: 10px;
  padding: 10px;
`;

export const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserIdDiv = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-weight: bold;
`;

export const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`;

export const UDButton = styled.button`
  padding: 10px;
  font-size: 14px;
  border-radius: 15px;
  &:hover {
    text-decoration: underline;
    background-color: #eee;
  }
`;