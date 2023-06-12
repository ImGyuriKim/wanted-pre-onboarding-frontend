import React from "react";

function Logout() {
  const access_token = localStorage.getItem("access_token");
  const baseURL = "https://www.pre-onboarding-selection-task.shop/";
  const handleLogout = () => {
    if (!access_token) {
      alert("로그인되지 않았습니다. 먼저 로그인해주세요.");
      window.location.href = "/signin";
    }

    if (access_token) {
      localStorage.clear();
      alert("로그아웃되었습니다.");
      window.location.href = "/signin";
    }
  };
  return <button onClick={handleLogout}>로그아웃</button>;
}

export default Logout;
