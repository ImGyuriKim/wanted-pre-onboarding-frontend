import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/signin">Sign In 로그인</Link>
      <Link to="/signup">Sign Up 회원가입</Link>
      <Link to="/todo">Todo</Link>
    </div>
  );
}

export default Nav;
