import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logout from "./Logout";

const Conatiner = styled.div`
  display: flex;
  justify-content: right;
`;
function Nav() {
  const access_token = localStorage.getItem("access_token");
  return (
    <Conatiner>
      {access_token ? <Logout /> : <></>}
      <Link to="/">Home</Link>
      <Link to="/signin">Sign In 로그인</Link>
      <Link to="/signup">Sign Up 회원가입</Link>
      <Link to="/todo">Todo</Link>
    </Conatiner>
  );
}

export default Nav;
