import React, { lazy } from "react";
import { Route, Router, Routes } from "react-router-dom";
import PrivateRouter from "./components/PrivateRouter";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const BookStore = lazy(() => import("./pages/BookStore"));
const BookDetail = lazy(() => import("./pages/BookDetail"));
const SignInPage = lazy(() => import("./pages/SignIn"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const Settings = lazy(() => import("./pages/Settings"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Cart = lazy(() => import("./pages/Cart"));
const Payment = lazy(() => import("./pages/Payment"));
const Purchases = lazy(() => import("./pages/Purchases"));

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
      <Route element={<PrivateRouter />}>
        <Route path={"/settings"} element={<Settings />} />
        <Route path={"/user-profile"} element={<UserProfile />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/payment"} element={<Payment />} />
        <Route path={"/purchases"} element={<Purchases />} />
      </Route>
    </Routes>
  );
};

export default App;
