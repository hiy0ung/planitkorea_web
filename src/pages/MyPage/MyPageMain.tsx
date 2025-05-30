import React, { useEffect, useState } from "react";
import { NewUser, User } from "../../types/type";
import { set } from "date-fns";
import axios from "axios";
import { Button } from "../CustomerService/InquirySt";
import {
  AllDiv,
  Box,
  Card,
  Error,
  GroupLine,
  Header,
  IdInput,
  Label,
  Loading,
  MainBody,
  MainDiv,
  MainInner,
  NaviBox,
  NavInnerBox,
  NavInnerDiv,
  NavTitle,
  PageTitle,
  WithDrawalButton,
  WithdrawalDiv,
  WithdrawalInput,
} from "./MyPageSt";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use.auth.store";
import { useCookies } from "react-cookie";

type UpdateData = {
  userName: string;
  userPhone: string;
  userEmail: string;
}

export default function MyPageMain() {
  const [userData, setUserData] = useState<NewUser>();
  const [updateData, setUpdateData] = useState<UpdateData>({
    userName: "",
    userPhone: "",
    userEmail: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [cookies, ,removeCookies] = useCookies(["token"]);

  const { logout } = useAuthStore();

  useEffect(() => {
    try {
      axios.get(`http://localhost:4040/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }).then((response) => {
        setUserData(response.data.data);
      })
    } catch (error) {
      console.error(error);
      setError("유저 호출 실패")
    }
  }, [])

  useEffect(() => {
    if (userData) {
      setUpdateData({
        userName: userData.userName,
        userPhone: userData.userPhone,
        userEmail: userData.userEmail,
      });
    }
  }, [userData])

  const handleEdit = () => {
    setIsEditing(true);
    console.log(updateData);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4040/api/v1/users`, updateData ,{
        headers: {
          Authorization: `Bearer ${cookies.token}`
        },
      })
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setError("유저 업데이트 실패패")
    }
  };

  const withdrawalBtn = async () => {
    setLoading(true);

    try {
      await axios.delete('http://localhost:4040/api/v1/users', {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        data: { 
          password: password,
        },
      }).then((response) => {
        if (!!response.data.data) {
          logout();
          removeCookies("token", { path: "/" });
          navigate('/');
        }
      });

    } catch (error) {
      setError("회원탈퇴 실패")
    } finally {
      setLoading(false);
    }
};
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <GroupLine />
      <AllDiv>
        <NaviBox>
          <NavInnerBox>
            <NavLink to="/myPageMain">
              <NavInnerDiv style={{ backgroundColor: "#D8E8F9" }}>
                <NavTitle>계정 관리</NavTitle>
              </NavInnerDiv>
            </NavLink>
            <NavLink to="/reservationCheck">
              <NavInnerDiv>
                <NavTitle>예약 확인</NavTitle>
              </NavInnerDiv>
            </NavLink>
            <NavLink to="/wishList">
              <NavInnerDiv>
                <NavTitle>찜 목록</NavTitle>
              </NavInnerDiv>
            </NavLink>
          </NavInnerBox>
        </NaviBox>

        <MainDiv>
          {loading && (
            <Card>
              <Loading>로딩중...</Loading>
            </Card>
          )}
          {error && (
            <Card>
              <Error>{error}</Error>
            </Card>
          )}
          {!loading && !error && userData && (
            <>
              {/* 정보 확인 필드 */}
              <MainInner>
                <Header>
                  <PageTitle>내 정보 관리</PageTitle>
                  <Button
                    style={{ margin: 0, width: "80px" }}
                    onClick={isEditing ? handleUpdate : handleEdit}
                  >
                    {isEditing ? "저장" : "수정"}
                  </Button>
                </Header>
                <MainBody>
                  <ul>
                    <li>
                      <Box>
                        <Label htmlFor="name">이름</Label>
                        <IdInput
                          id="userName"
                          name="userName"
                          value={updateData.userName}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          contentEditable={isEditing}
                        />

                        <Label htmlFor="phoneNumber">전화번호</Label>
                        <IdInput
                          type="number"
                          id="userPhone"
                          name="userPhone"
                          value={updateData.userPhone}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          contentEditable={isEditing}
                        />

                        <Label htmlFor="email">이메일</Label>
                        <IdInput
                          type="email"
                          id="userEmail"
                          name="userEmail"
                          value={updateData.userEmail}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          contentEditable={isEditing}
                        />
                      </Box>
                    </li>
                  </ul>
                </MainBody>
              </MainInner>

              {/* 회원탈퇴 필드 */}
              <MainInner>
                <Header>
                  <PageTitle style={{ color: "#f44336" }}>회원탈퇴</PageTitle>
                </Header>
                <MainBody>
                  <WithdrawalDiv>
                    <Label htmlFor="withdrawal" style={{ color: "#444" }}>
                      비밀번호 확인
                    </Label>
                    <WithdrawalInput
                      id="withdrawal"
                      name="withdrawal"
                      type="password"
                      placeholder="비밀번호"
                      onChange={handlePwChange}
                    />
                    <WithDrawalButton onClick={withdrawalBtn}>
                      탈퇴
                    </WithDrawalButton>
                  </WithdrawalDiv>
                </MainBody>
              </MainInner>
            </>
          )}
        </MainDiv>
      </AllDiv>
    </>
  );
}
