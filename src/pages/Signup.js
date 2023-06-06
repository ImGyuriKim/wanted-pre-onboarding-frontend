import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: auto;
  margin: 0 auto;

  input {
    height: 5vh;
    margin-bottom: 5vh;
  }

  button {
    margin: 0 auto;

    height: 5vh;
    width: 20vw;
  }
`;

function Signup() {
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
        ></input>
        <label for="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          data-testid="password-input"
        ></input>
        <button data-testid="signup-button">가입하기</button>
      </Container>
    </div>
  );
}

export default Signup;
