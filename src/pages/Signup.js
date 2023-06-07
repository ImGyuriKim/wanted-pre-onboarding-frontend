import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { json, redirect } from "react-router-dom";

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

function Signup() {
  // 유효성 검사용 상태관리
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const allValid = isEmailValid && isPwValid;
  // 입력된 이메일, 비밀번호 상태관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseURL = "https://www.pre-onboarding-selection-task.shop/";
  // 회원가입 버튼 핸들러
  const handleSignUp = () => {
    fetch(`${baseURL}auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }

        if (res.status === 201) {
          alert("회원가입이 완료되었습니다.");
          window.location.href = "/signin";
        }
      })
      .catch((error) => {
        error.text().then((msg) => {
          const errMsg = JSON.parse(msg).message;
          alert(errMsg);

          if (errMsg === "동일한 이메일이 이미 존재합니다.") {
            window.location.href = "/signin";
          }
        });
      });
  };

  return (
    <div className="signup">
      <Container>
        <h1 className="title">회원가입</h1>
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
          placeholder="비밀번호를 입력해주세요 (8자 이상)"
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
          data-testid="signup-button"
          onClick={handleSignUp}
        >
          가입하기
        </button>
      </Container>
    </div>
  );
}

export default Signup;
