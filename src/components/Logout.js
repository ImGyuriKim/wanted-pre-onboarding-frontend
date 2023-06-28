import { styled } from "styled-components";
import { access_token } from "../App";

const Container = styled.div`
  display: flex;
  align-items: center;
  button {
    background-color: lightgreen;
    border: none;
    margin: 5px;
    width: auto;
    height: 50px;
    font-size: large;
  }
`;

function Logout() {
  const handleLogout = () => {
    if (access_token) {
      localStorage.clear();
      alert("로그아웃되었습니다.");
      window.location.href = "/signin";
    }
  };

  return (
    <Container>
      <button onClick={handleLogout}>로그아웃</button>
    </Container>
  );
}

export default Logout;
