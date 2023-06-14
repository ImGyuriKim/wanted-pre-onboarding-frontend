import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Todo from "./pages/Todo";
import Nav from "./components/Nav";
import React from "react";

export const access_token = localStorage.getItem("access_token");
export const baseURL = "https://www.pre-onboarding-selection-task.shop/";

// 리다이렉트 처리
function App() {
  const isLoggedIn = (access_token, currentPage) => {
    console.log(access_token);
    console.log(currentPage);
    if (access_token && currentPage === ("/signin" || "/signup")) {
      alert("이미 로그인되어있습니다. Todo 페이지로 이동합니다.");
      window.location.href = "/todo";
    }
    if (!access_token && currentPage === "/todo") {
      alert("로그인 후 이용해주세요.");
      window.location.href = "/signin";
    }
  };
  return (
    <React.Fragment>
      <GlobalStyle />
      <BrowserRouter>
        <Nav></Nav>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/signup"
            element={<Signup isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route
            path="/signin"
            element={<Signin isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route
            path="/todo"
            element={<Todo isLoggedIn={isLoggedIn} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
