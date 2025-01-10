import styled from "styled-components";
import theme from "../../styles/theme";

export const AllDiv = styled.div`
  padding: 8% 10%;
  display: block;
  height: 80vh;
  overflow: auto;
`;

export const SignInDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const InputField = styled.input`
  background-color: #f4f4f4f4;
  border-radius: 15px;
  border: none;
  height: 47px;
  max-width: 1500px;
  width: 100%;
  padding-left: 5%;
  margin-bottom: 20px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
  display: flex;
  align-self: flex-start;
`;

export const InputContainer = styled.div`
  width: 50%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;


export const InputIdField = styled.input<{ hasIdError: boolean }>`
  background-color: #f4f4f4;
  border-radius: 15px;
  border: ${(props) =>
    props.hasIdError ? `2px solid ${theme.palette.secondary.main}` : "none"};
  height: 47px;
  max-width: 1500px;
  width: 100%;
  padding-left: 5%;
  margin-bottom: 15px;
  &:hover {
    background-color: #e0e0e0;
  }
  &:focus {
    border: ${(props) =>
      props.hasIdError ? `2px solid ${theme.palette.secondary.main}` : "none"};
    outline: none;
  }
`;
export const InputPasswordField = styled.input<{ hasPasswordError: boolean }>`
  background-color: #f4f4f4;
  border-radius: 15px;
  border: ${(props) =>
    props.hasPasswordError
      ? `2px solid ${theme.palette.secondary.main}`
      : "none"};
  height: 47px;
  max-width: 1500px;
  width: 100%;
  padding-left: 5%;
  margin-bottom: 15px;
  &:hover {
    background-color: #e0e0e0;
  }
  &:focus {
    border: ${(props) =>
      props.hasPasswordError
        ? `2px solid ${theme.palette.secondary.main}`
        : "none"};
    outline: none;
  }
`;
export const InputNameField = styled.input<{ hasNameError: boolean }>`
  background-color: #f4f4f4;
  border-radius: 15px;
  border: ${(props) =>
    props.hasNameError ? `2px solid ${theme.palette.secondary.main}` : "none"};
  height: 47px;
  max-width: 1500px;
  width: 100%;
  padding-left: 5%;
  margin-bottom: 15px;
  &:hover {
    background-color: #e0e0e0;
  }
  &:focus {
    border: ${(props) =>
      props.hasNameError
        ? `2px solid ${theme.palette.secondary.main}`
        : "none"};
    outline: none;
  }
`;

export const InputBirthDateField = styled.input<{ hasBirthDateError: boolean }>`
  background-color: #f4f4f4;
  border-radius: 15px;
  border: ${(props) =>
    props.hasBirthDateError
      ? `2px solid ${theme.palette.secondary.main}`
      : "none"};
  height: 47px;
  max-width: 1500px;
  width: 100%;
  padding-left: 5%;
  margin-bottom: 15px;
  &:hover {
    background-color: #e0e0e0;
  }
  &:focus {
    border: ${(props) =>
      props.hasBirthDateError
        ? `2px solid ${theme.palette.secondary.main}`
        : "none"};
    outline: none;
  }
`;
export const InputPhoneField = styled.input<{ hasPhoneError: boolean }>`
  background-color: #f4f4f4;
  border-radius: 15px;
  border: ${(props) =>
    props.hasPhoneError ? `2px solid ${theme.palette.secondary.main}` : "none"};
  height: 47px;
  max-width: 1500px;
  width: 100%;
  padding-left: 5%;
  margin-bottom: 15px;
  &:hover {
    background-color: #e0e0e0;
  }
  &:focus {
    border: ${(props) =>
      props.hasPhoneError
        ? `2px solid ${theme.palette.secondary.main}`
        : "none"};
    outline: none;
  }
`;

export const Button = styled.button`
  border: none;
  background-color: ${theme.palette.primary.main};
  border-radius: 15px;
  height: 47px;
  max-width: 1500px;
  width: 100%;
  margin-bottom: 0px;
  color: white;
  margin-top: 15px;
  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
`;
export const Button2 = styled.button`
  border: none;
  background-color: ${theme.palette.primary.main};
  border-radius: 15px;
  height: 47px;
  max-width: 1500px;
  width: 100%;
  padding-left: 5%;
  margin-bottom: 20px;
  color: white;
  margin-top: 20px;
  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  z-index: 999; 
`;

export const ModalButton = styled.button`
  border: none;
  background-color: ${theme.palette.primary.main};
  border-radius: 15px;
  height: 47px;
  max-width: 1500px;
  width: 100%;
  margin-bottom: 20px;
  color: white;
  margin-top: 20px;
  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
`;

export const GroupLine = styled.span`
  border: 1px solid ${theme.palette.primary.light};
  width: 100%;
  display: flex;
`;

export const SearchDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;
`;

export const ModalText = styled.h1`
  text-align: center;
  font-weight: bold;
  color: ${theme.palette.text.secondary};
  font-size: 20px;
  margin: 40px 0;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

