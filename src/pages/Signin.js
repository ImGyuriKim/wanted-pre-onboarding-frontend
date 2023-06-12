import React from "react";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: auto;
  margin: 0 auto;

  input {
    height: 5vh;
  }

  button {
    margin: 0 auto;
    height: 5vh;
    width: 20vw;
  }

  .validCheck {
    margin-bottom: 5vh;
    color: red;
  }
`;

function Signin() {
  const access_token = localStorage.getItem("access_token");
  // 리다이렉트 처리
  if (access_token) {
    alert("이미 로그인되어있습니다. Todo 페이지로 이동합니다.");
    window.location.href = "/todo";
  }
  const baseURL = "https://www.pre-onboarding-selection-task.shop/";
  // 유효성 검사용 상태관리
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const allValid = isEmailValid && isPwValid;

  // 입력된 이메일, 비밀번호 상태관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 버튼 핸들러
  const handleSignIn = () => {
    fetch(`${baseURL}auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }

        if (res.status === 401) {
          throw res;
        }
      })
      .then((res) => {
        localStorage.setItem("access_token", res.access_token);
        alert("로그인이 완료되었습니다.");
        window.location.href = "/todo";
      })
      .catch((error) => {
        error.text().then((msg) => {
          const errMsg = JSON.parse(msg).message;
          if (errMsg === "Unauthorized") {
            alert("이메일과 비밀번호를 다시 한번 확인해주세요.");
            window.location.href = "/signin";
          }
        });
      });
  };

  return (
    <div className="signin">
      <Container>
        <h1 className="title">로그인</h1>
        <label for="email">이메일</label>
        <input
          id="email"
          type="text"
          placeholder="이메일을 입력해주세요"
          data-testid="email-input"
          onChange={(e) => {
            if (e.target.value.indexOf("@") !== -1) {
              setIsEmailValid(true);
              setEmail(e.target.value);
            } else {
              setIsEmailValid(false);
            }
          }}
        ></input>
        {!isEmailValid && (
          <div className="validCheck">이메일을 확인해주세요.</div>
        )}
        <label for="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          data-testid="password-input"
          onChange={(e) => {
            if (e.target.value.length >= 8) {
              setIsPwValid(true);
              setPassword(e.target.value);
            } else {
              setIsPwValid(false);
            }
          }}
        ></input>
        {!isPwValid && (
          <div className="validCheck">비밀번호를 확인해주세요.</div>
        )}
        <button
          disabled={!allValid}
          data-testid="signin-button"
          onClick={handleSignIn}
        >
          로그인하기
        </button>
      </Container>
    </div>
  );
}

export default Signin;
