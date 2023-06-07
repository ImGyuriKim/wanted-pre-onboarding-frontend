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
  // 유효성 검사용 상태관리
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const allValid = isEmailValid && isPwValid;

  // 입력된 이메일, 비밀번호 상태관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


function Signin() {

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
        <button disabled={!allValid} data-testid="signin-button">
          로그인하기
        </button>
      </Container>
    </div>
  );
}

export default Signin;
