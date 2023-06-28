import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logout from "./Logout";
import { access_token } from "../App";

const Conatiner = styled.div`
  display: flex;
  position: relative;
  left: 60vh;
  border-radius: 10px;
  margin-top: 5vh;
  background-color: lightblue;
  width: max-content;

  a {
    padding: 2vw;
    font-size: 20px;
    color: black;
  }
`;
function Nav() {
  return (
    <Conatiner>
      {access_token ? <Logout /> : <></>}
      <Link to="/">Home</Link>
      <Link to="/signin">로그인</Link>
      <Link to="/signup">회원가입</Link>
      <Link to="/todo">Todo</Link>
    </Conatiner>
  );
}

export default Nav;
