import React, { lazy } from "react";
import { Route, Router, Routes } from "react-router-dom";
import BookStore from "./pages/BookStore";
import BookDetail from "./pages/BookDetail";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Payment from "./pages/Payment";
import Purchases from "./pages/Purchases";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Dashboard />} />
      <Route path={"/home"} element={<Home />} />
      <Route path={"/about"} element={<About />} />
      <Route path={"/store"} element={<BookStore />} />
      <Route path={"/store/:bookId"} element={<BookDetail />} />
      <Route path={"/signin"} element={<SignInPage />} />
      <Route path={"/signup"} element={<SignUpPage />} />
      <Route path={"/settings"} element={<Settings />} />
      <Route path={"/user-profile"} element={<UserProfile />} />
      <Route path={"/cart"} element={<Cart />} />
      <Route path={"/payment"} element={<Payment />} />
      <Route path={"/purchases"} element={<Purchases />} />
    </Routes>
  );
};

export default App;
