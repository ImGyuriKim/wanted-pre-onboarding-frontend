import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  margin: 5vh;
  .todoList {
    list-style-type: none;
    padding: 10px;
    border: 1px solid grey;
    margin-bottom: 1rem;
  }
`;

const NewContainer = styled.div`
  display: flex;
  height: 5vh;
`;
function Todo() {
  const access_token = localStorage.getItem("access_token");
  const baseURL = "https://www.pre-onboarding-selection-task.shop/";

  // 리다이렉트 처리
  if (!access_token) {
    alert("로그인 후 이용해주세요.");
    window.location.href = "/signin";
  }
  // 기존 TODO 조회 - GET 요청
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const getTodos = async () => {
      await fetch(`${baseURL}todos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw res;
          }
        })
        .then((res) => {
          setTodos(res);
        })
        .catch((error) => console.log(error));
    };

    getTodos();
  }, [access_token]);

  // 새로운 TODO 생성 - POST 요청
  const [todo, setTodo] = useState("");

  const handleAddButton = () => {
    fetch(`${baseURL}todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        todo,
      }),
    }).then((res) => console.log(res));
  };

  return (
    <Container>
      <h1>Todo List</h1>
      <NewContainer>
        <input
          data-testid="new-todo-input"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button data-testid="new-todo-add-button" onClick={handleAddButton}>
          추가
        </button>
      </NewContainer>

      <ul className="todoLists">
        <li className="todoList">
          <label>
            <input type="checkbox" />
            <span>TODO 1</span>
          </label>
        </li>
        <li className="todoList">
          <label>
            <input type="checkbox" />
            <span>TODO 2</span>
          </label>
        </li>
      </ul>
    </Container>
  );
}

export default Todo;
