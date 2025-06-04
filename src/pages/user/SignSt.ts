import styled from "styled-components";
import theme from "../../styles/theme";

export const AllDiv = styled.div`
  padding: 8% 10%;
  display: block;
  height: 80vh;
  overflow: auto;
`;

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  width: 50%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InputContainer2 = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
  display: flex;
  align-self: flex-start;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
  margin-left: 15px;
`;

export const SuccessMessage = styled.div`
  color:#77b1fd;
  font-size: 12px;
  margin-bottom: 10px;
  margin-left: 15px;
  font-weight: bold;
`;

export const DuplicationContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`

export const InputIdField = styled.input<{ hasIdError: boolean }>`
  background-color: #f4f4f4;
  border-radius: 15px;
  border: ${(props) =>
    props.hasIdError ? `2px solid ${theme.palette.secondary.main}` : "none"};
  height: 47px;
  max-width: 1500px;
  width: 100%;
  padding-left: 6%;
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

export const InputIdField2 = styled.input<{ hasIdError: boolean }>`
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

export const InputEmailField = styled.input<{ hasEmailError: boolean }>`
  background-color: #f4f4f4;
  border-radius: 15px;
  border: ${(props) =>
    props.hasEmailError ? `2px solid ${theme.palette.secondary.main}` : "none"};
  height: 47px;
  max-width: 100%;
  width: 95%;
  padding-left: 6%;
  margin-bottom: 15px;
  &:hover {
    background-color: #e0e0e0;
  }
  &:focus {
    border: ${(props) =>
      props.hasEmailError ? `2px solid ${theme.palette.secondary.main}` : "none"};
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

export const SnsNaverBtn = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #01C73C;
    border: 1px solid #01C73C;
  }
`;

export const SnsKakaoBtn = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #FEE500;
    border: 1px solid #FEE500;
  }
`;

export const SnsNaverLogoBox = styled.div`
  width: 20%;
  border-right: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border-right: 1px solid #01C73C;
  }
`;
export const SnsKakaoLogoBox = styled.div`
  width: 20%;
  border-right: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border-right: 1px solid #FEE500;
  }
`;

export const SnsLogoKakao = styled.img`
  width: 50px;
  height: 50px;
`;

export const SnsLogoNaver = styled.img`
  width: 60px;
  height: 50px;
`;

export const SnsKakaoTextBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${theme.palette.text.secondary};
  &:hover {
    color: #000;
  }
`;

export const SnsNaverTextBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${theme.palette.text.secondary};

  &:hover {
    color: #fff;
  }
`;


export const SignupNaverBtn = styled.div`
  width: 50%;
  height: 60px;
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #01C73C;
    border: 1px solid #01C73C;
  }
`;

export const SignupKakaoBtn = styled.div`
  width: 50%;
  height: 60px;
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #FEE500;
    border: 1px solid #FEE500;
  }
`;

export const SignupPlkBtn = styled.div`
  width: 50%;
  height: 60px;
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.palette.primary.main};
    border: 1px solid ${theme.palette.primary.main};
  }
`;

export const SnsPlkLogoBox = styled.div`
  width: 20%;
  border-right: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border-right: 1px solid ${theme.palette.primary.main};
  }
`;

export const SnsLogoPlk = styled.img`
  width: 55px;
  height: 55px;
`;

export const SnsPlkTextBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${theme.palette.text.secondary};

  &:hover {
    color: #fff;
  }
`;

export const SnsBtnBox = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;