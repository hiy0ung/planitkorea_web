import React, { useEffect, useRef, useState } from "react";
import "../assets/fonts/font.css";
import logo from "../assets/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CustomerServiceButton,
  GroupLine,
  Logo,
  LogoBox,
  LogoName,
  MenuBar,
  MenuBox,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuSingInButton,
  OptionBox,
  SingInButton,
} from "./HeaderSt";
import useAuthStore from "../stores/use.auth.store";
import useSelectStore from "../stores/use.select.store";

export default function Header() {
  const [showMenuModal, setShowMenuModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const setCityDropdownOpen = useSelectStore(
    (state) => state.setCityDropdownOpen
  );

  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowMenuModal(false);
    }
  };

  const ModalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowMenuModal(!showMenuModal);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  const logoClick = () => {
    navigate("/");
  };

  const handleFocus = (e: React.MouseEvent<HTMLUListElement>) => {
    setCityDropdownOpen(true);
  };


  return (
    <>
      <Box>
        <LogoBox onClick={logoClick}>
          <Logo src={"/images/logo.png"} alt="Logo" />
          <LogoName>Plan It Korea</LogoName>
        </LogoBox>
        <OptionBox>
          <CustomerServiceButton onClick={() => navigate("/notification")}>
            <span> 고객센터 </span>
          </CustomerServiceButton>
          {!isLoggedIn ? (
            <SingInButton onClick={() => navigate("/signIn")}>
              <span>로그인 & 회원가입</span>
            </SingInButton>
          ) : (
            <SingInButton onClick={handleLogOut} style={{ minWidth: "164px" }}>
              <span>로그아웃</span>
            </SingInButton>
          )}

          <MenuBox>
            <MenuButton ref={buttonRef} onClick={ModalClick}>
              <MenuIcon />
            </MenuButton>
            {showMenuModal && (
              <MenuBar ref={modalRef}>
                {!isLoggedIn && (
                  <MenuSingInButton onClick={() => navigate("/signIn")}>
                    <span>로그인 & 회원가입</span>
                  </MenuSingInButton>
                )}

                <GroupLine />
                <MenuGroup onClick={handleFocus}>국내 숙소</MenuGroup>
                <GroupLine />
                {isLoggedIn && (
                  <>
                    <MenuList onClick={() => navigate("/myPageMain")}>
                      <span> 마이페이지 </span>
                    </MenuList>
                    <MenuList onClick={() => navigate("/reservationCheck")}>
                      <span> 예약 확인 </span>
                    </MenuList>
                  </>
                )}
                <MenuList onClick={() => navigate("/notification")}>
                  <span> 고객센터 </span>
                </MenuList>
                <GroupLine />
                {isLoggedIn && (
                  <MenuSingInButton
                    onClick={logout}
                    style={{ minWidth: "164px" }}
                  >
                    <span>로그아웃</span>
                  </MenuSingInButton>
                )}
              </MenuBar>
            )}
          </MenuBox>
        </OptionBox>
      </Box>
    </>
  );
}
