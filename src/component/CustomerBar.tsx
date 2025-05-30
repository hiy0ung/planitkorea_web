import React, { useState } from "react";
import {
  Box,
  ContentBox,
  GroupLine,
  GroupLine2,
  MenuBox,
  TitleBox,
  TitleText,
} from "../pages/CustomerService/customerSt";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import path from "path";

const DetailMenu = styled(NavLink)<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
  padding: 8px;
  color: #000;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? "#ddd" : "transparent"};
  &:hover {
    background-color: #ddd;
  }
  &:active {
    background-color: #ddd;
  }
`;

export default function CustomerBar() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>();

  const handleMenuClick = (item: string) => {
    setSelectedMenu(item);
  };

  const menuItem = [
    { name: "공지사항", path: "/notification" },
    { name: "자주묻는 질문", path: "/frequentlyQuestion" },
    { name: "1:1 문의", path: "/inquiryCRUD" },
  ];
  return (
    <>
      <GroupLine />
      <Box>
        <TitleBox>
          <TitleText>고객 센터</TitleText>
        </TitleBox>
        <ContentBox>
          <MenuBox>
            {menuItem.map((item) => (
              <DetailMenu
                key={item.name}
                isSelected={selectedMenu === item.name}
                onClick={() => handleMenuClick(item.name)}
                to={item.path}
              >
                {item.name}
              </DetailMenu>
            ))}
          </MenuBox>
          <GroupLine2 />
        </ContentBox>
      </Box>
    </>
  );
}
