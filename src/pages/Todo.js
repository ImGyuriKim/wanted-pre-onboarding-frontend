import React from "react";

function Todo() {
  const access_token = localStorage.getItem("access_token");

  // 리다이렉트 처리
  if (!access_token) {
    alert("로그인 후 이용해주세요.");
    window.location.href = "/signin";
  }
  return <div>todo 페이지 입니다.</div>;
}

export default Todo;
