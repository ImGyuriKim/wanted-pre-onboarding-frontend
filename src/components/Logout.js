import React from "react";

function Logout() {
  const access_token = localStorage.getItem("access_token");

  const handleLogout = () => {
    if (access_token) {
      localStorage.clear();
      alert("로그아웃되었습니다.");
      window.location.href = "/signin";
    }
  };
  return <button onClick={handleLogout}>로그아웃</button>;
}

export default Logout;
