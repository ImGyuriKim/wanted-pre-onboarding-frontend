import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  background-color: white;
  border-radius: 10px;
  width: 80vw;
  height: 40vh;
  font-size: 50px;
`;

function Home() {
  return <Container>Welcome to Gyuri's Todo List!</Container>;
}

export default Home;
