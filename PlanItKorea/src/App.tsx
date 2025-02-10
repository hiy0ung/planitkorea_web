import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./component/Header";
import SearchBar from "./component/SearchBar";
import Footer from "./component/Footer";
import CustomerBar from "./component/CustomerBar";

import IndexHome from "./pages/home/Home";
import Login from "./pages/Login/login/Login";
import SignUp from "./pages/Login/signup/SignUp";
import IdSearch from "./pages/Login/IdSearch";
import PasswordSearch from "./pages/Login/findPassword/PasswordSearch";
import MyPageMain from "./pages/MyPage/MyPageMain";
import FrequentlyQuestion from "./pages/CustomerService/FrequentlyQuestion";
import InquiryCRUD from "./pages/CustomerService/InquiryCRUD";
import Notification from "./pages/CustomerService/Notification";
import InquiryHistory from "./pages/CustomerService/InquiryHistory";
import ReservationCheck from "./pages/MyPage/ReservationCheck";
import WishList from "./pages/MyPage/WishList";
import AllProductPage from "./pages/Product/AllProductPage";
import DetailProduct from "./pages/Product/DetailProduct"
import PaymentPage from "./pages/Product/PaymentPage";
import AppContainer from "./layouts/AppContainer";
import MainContainer from "./layouts/MainContainer";
import { useCookies } from "react-cookie";
import useAuthStore from "./stores/use.auth.store";
import ResetPasswordPage from "./pages/Login/findPassword/ResetPasswordPage";
import SnsSuccess from "./pages/Login/login/SnsSuccess";
import AuthRedirectHandler from "./pages/Login/signup/AuthRedirectHandler";



function App() {
  const location = useLocation();
  const [cookies] = useCookies(["token"]);
  const { login, logout } = useAuthStore();

  useEffect(() => {
    if (cookies.token) {
      login(cookies.token);
    } else {
      logout();
    }
  }, [cookies.token, login, logout]);

  const noFooterRoutes = ["/signUp", "/idSearch", "/passwordSearch"];
  const showFooter = !noFooterRoutes.includes(location.pathname);

  const noSearchBar = [
    "/notification",
    "/inquiryCRUD",
    "/frequentlyQuestion",
    "/inquiryHistory",
    "/paymentPage"
  ];
  const showSearch = !noSearchBar.includes(location.pathname);

  const CustomerLine = [
    "/notification",
    "/inquiryCRUD",
    "/frequentlyQuestion",
    "/inquiryHistory",
  ];

  const showCustomer = CustomerLine.includes(location.pathname);

  return (
    <>
      <AppContainer>
        <Header />
        {showSearch && <SearchBar />}
        {showCustomer && <CustomerBar />}
        <MainContainer>
          <Routes>
            <Route path="/" element={<IndexHome />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/sns-success" element={<SnsSuccess />} />
            <Route path="/idSearch" element={<IdSearch />} />
            <Route path="/passwordSearch" element={<PasswordSearch />} />
            <Route path="/auth" element={<AuthRedirectHandler />} />
            <Route path="/findPassword/verify" element={<ResetPasswordPage />} />


            <Route
              path="/frequentlyQuestion"
              element={<FrequentlyQuestion />}
            />
            <Route path="/inquiryCRUD/edit/:inquiryId" element={<InquiryCRUD />} />
            <Route path="/inquiryCRUD" element={<InquiryCRUD />} />
            <Route path="/inquiryHistory" element={<InquiryHistory />} />
            <Route path="/notification" element={<Notification />} />

            <Route path="/myPageMain" element={<MyPageMain />} />
            <Route path="/reservationCheck" element={<ReservationCheck />} />
            <Route path="/wishList" element={<WishList />} />

            <Route path="/allProductPage" element={<AllProductPage />} />
            <Route path="/paymentPage" element={<PaymentPage />} />
            <Route path="/detailProduct/:productId" element={<DetailProduct />} />
            <Route path="/allProductPage/:category?" element={<AllProductPage />} />
          </Routes>
        </MainContainer>

        {showFooter && <Footer />}
      </AppContainer>
    </>
  );
}

export default App;
