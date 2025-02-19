import styled from "styled-components";
import theme from "../styles/theme";

export const Box = styled.div`
  padding: 0px 20px;
  margin: 10px 70px 0 70px;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
`;

export const LogoBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin: 0;
  padding: 0;
`;

export const LogoName = styled.h1`
  font-family: "TTTogether";
  font-size: 16px;
  color: ${theme.palette.text.secondary};
`;

export const LogoLink = styled.a`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
`;

export const OptionBox = styled.div`
  display: flex;
  gap: 10px;
`;

export const CustomerServiceButton = styled.button`
  border: 1px solid #2b6678;
  border-radius: 5px;
  color: #2b6678;
  background-color: white;
  padding: 6px 15px;
  margin: 5px 0;
  cursor: pointer;
  transition: background-color 0.1 ease;
  &:hover {
    background-color: #eee;
  }
  //! 화면 크기가 768 이하일때 숨김
  @media (max-width: 900px) {
    display: none;
  }
`;
export const MenuCustomerServiceButton = styled.button`
  border: 1px solid #2b6678;
  border-radius: 5px;
  color: #2b6678;
  background-color: white;
  padding: 6px 15px;
  margin: 5px 0;
  cursor: pointer;
  transition: background-color 0.1 ease;
  &:hover {
    background-color: #eee;
  }
`;
export const SingInButton = styled.button`
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #82aef5;
  padding: 6px 15px;
  margin: 5px 0;
  cursor: pointer;
  transition: background-color 0.1 ease;
  &:hover {
    background-color: #5f7dff;
  }
  //! 화면 크기가 768 이하일때 숨김
  @media (max-width: 900px) {
    display: none;
  }
`;
export const MenuSingInButton = styled.button`
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #82aef5;
  padding: 6px 15px;
  margin: 5px 0;
  cursor: pointer;
  transition: background-color 0.1 ease;
  &:hover {
    background-color: #5f7dff;
  }
`;

export const MenuButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  margin: 0;
  cursor: pointer;
  transition: background-color 0.1 ease;
  background-color: white;
  &:hover {
    background-color: #eee;
  }
`;

export const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuBar = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  padding: 6px 15px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 1000;
`;

export const GroupLine = styled.span`
  border: 1px solid #d9d9d9;
  margin: 5px;
`;

export const MenuGroup = styled.ul`
  font-size: 18px;
  font-weight: bold;
  padding: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  color: ${theme.palette.text.secondary};
  &:hover {
    background-color: #eee;
  }
`;

export const MenuList = styled.li`
  font-size: 15px;
  font-weight: 600;
  list-style: none;
  color:  ${theme.palette.text.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;