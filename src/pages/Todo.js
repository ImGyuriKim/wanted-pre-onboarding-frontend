import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  margin: 5vh;
`;

const BtnContainer = styled.div`
  display: flex;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  padding: 10px;
  border: 1px solid grey;
  margin-bottom: 1rem;
`;

const NewContainer = styled.div`
  display: flex;
  height: 3vh;
`;

const EditContainer = styled.div`
  display: flex;
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
    }).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

  // 체크박스 핸들러 함수
  const handleCheckBox = (e) => {
    const id = e.target.value;
    const todo = e.target.name;
    fetch(`${baseURL}todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        todo: todo,
        isCompleted: e.target.checked,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          alert("수정되었습니다.");
          window.location.href = "/todo";
        } else {
          throw res;
        }
      })
      .catch((error) => console.log(error));
  };

  // 삭제 핸들러 함수
  const handleDelete = (e) => {
    const id = e.target.value;
    fetch(`${baseURL}todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => {
      if (res.status === 204) {
        alert("삭제되었습니다.");
        window.location.reload();
      }
    });
  };

  // 수정 버튼 핸들러 함수
  const [isEditing, setIsEditing] = useState(false);
  const [todoId, setTodoId] = useState(0);

  const handleEdit = (e) => {
    setTodo(e.target.value);
  };

  const handleEditSubmit = (e) => {
    const id = e.target.value;
    // newTodo -> Fetch 요청 작성
    fetch(`${baseURL}todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        todo: todo,
        isCompleted: e.target.checked,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("수정되었습니다");
        window.location.href = "/todo";
        console.log(res);
      })
      .catch((error) => console.log(error));
    setIsEditing(false);
  };

  const handleEditCancel = (e) => {
    setTodo(e.target.defaultValue);
    setIsEditing(false);
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
        {todos &&
          todos.map((todo) => {
            return isEditing && todoId === todo.id ? (
              <ListContainer>
                <EditContainer>
                  <li className="todoList">
                    <input
                      data-testid="modify-input"
                      type="text"
                      defaultValue={todo.todo}
                      onChange={(e) => handleEdit(e)}
                    ></input>

                    <button
                      checked={todo.isCompleted}
                      value={todo.id}
                      data-testid="submit-button"
                      onClick={(e) => handleEditSubmit(e)}
                    >
                      제출
                    </button>
                    <button
                      defaultValue={todo.todo}
                      data-testid="cancel-button"
                      onClick={(e) => handleEditCancel(e)}
                    >
                      취소
                    </button>
                  </li>
                </EditContainer>
              </ListContainer>
            ) : (
              <ListContainer key={todo.id}>
                <li className="todoList">
                  <label>
                    {todo.todo}
                    <input
                      type="checkbox"
                      value={todo.id}
                      name={todo.todo}
                      onChange={(e) => handleCheckBox(e)}
                    ></input>
                  </label>
                </li>
                <BtnContainer>
                  <button
                    key={todo.id}
                    data-testid="modify-button"
                    onClick={(e) => {
                      setTodoId(todo.id);
                      setIsEditing(true);
                    }}
                  >
                    수정
                  </button>
                  <button
                    data-testid="delete-button"
                    value={todo.id}
                    onClick={(e) => handleDelete(e)}
                  >
                    삭제
                  </button>
                </BtnContainer>
              </ListContainer>
            );
          })}
      </ul>
    </Container>
  );
}

export default Todo;
