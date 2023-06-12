import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vw;
  height: auto;
  margin: 0 auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
  background: white;
  border-radius: 10px;

  button {
    background-color: lightgreen;
    border: none;
    margin: 5px;
    width: auto;
    height: 30px;
    font-size: large;
  }
`;

const BtnContainer = styled.div`
  display: flex;
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  background: beige;
  border-radius: 5px;
  justify-content: right;
  margin-left: -40px;
  list-style-type: none;
  padding: 15px;
  margin-bottom: 1rem;
  width: 40vw;
  font-size: large;

  label {
    margin-right: 10px;
  }

  input {
    margin-left: 20px;
  }
`;

const NewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 40vw;
  border-radius: 5px;
  margin-bottom: 30px;
  background-color: lightblue;

  input {
    width: 15rem;
    height: 30px;
    margin-top: 5px;
    margin-right: 10px;
    font-size: large;
  }
`;

const EditContainer = styled.div`
  display: flex;
  background: beige;
  border-radius: 5px;
  justify-content: right;
  list-style-type: none;
  margin-bottom: 1rem;
  font-size: large;

  input {
    width: 15rem;
    height: 30px;
    margin-right: 10px;
    font-size: large;
  }
`;

function Todo() {
  const access_token = localStorage.getItem("access_token");
  const baseURL = "https://www.pre-onboarding-selection-task.shop/";

  // 로그인 여부에 따른 리다이렉트 처리
  if (!access_token) {
    alert("로그인 후 이용해주세요.");
    window.location.href = "/signin";
  }

  // 기존 TODO 조회 - GET 요청
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

  // ? useState 상태 모음
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [todoId, setTodoId] = useState(0);
  const [checkedTodoId, setCheckedTodoId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  // ? 핸들러 함수 모음

  // 새로운 TODO 생성 - POST 요청
  const handleAddButton = () => {
    fetch(`${baseURL}todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        todo: todoText,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        alert("추가되었습니다.");
        window.location.reload();
      });
  };

  // 수정 요청 핸들러 함수 - PUT 요청
  const handlePutRequset = async (id) => {
    const todo = todos.find((t) => t.id === Number(id));
    await fetch(`${baseURL}todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        isCompleted: todo.isCompleted,
        todo: todo.todo,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("수정되었습니다.");
        window.location.href = "/todo";
        console.log(res);
      })
      .catch((error) => console.log(error));
    setIsEditing(false);
  };

  // 수정 취소 핸들러 함수
  const handleEditCancel = (e) => {
    setIsEditing(false);
  };

  // 삭제 핸들러 함수 - DELETE 요청
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

  // 가장 최근 수정 작업이 일어난 todo의 id로 네트워크에 변경 작업 요청
  useEffect(() => {
    // 초기값 === 0, 0이 아닐 때만 실행되도록
    if (checkedTodoId !== 0) {
      handlePutRequset(checkedTodoId);
    }
  }, [checkedTodoId]);

  return (
    <Container>
      <h1>Todo List</h1>
      <NewContainer>
        <input
          data-testid="new-todo-input"
          type="text"
          onChange={(e) => {
            setTodoText(e.target.value);
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
              <ListContainer key={todo.id}>
                <EditContainer>
                  <li className="todoList">
                    <input
                      data-testid="modify-input"
                      type="text"
                      value={todo.todo}
                      onChange={(e) =>
                        setTodos(
                          todos.map((t) => {
                            if (t.id === todo.id) {
                              return { ...t, todo: e.target.value };
                            } else return t;
                          })
                        )
                      }
                    ></input>
                    <button
                      checked={todo.isCompleted}
                      value={todo.id}
                      data-testid="submit-button"
                      onClick={(e) => handlePutRequset(e.target.value)}
                    >
                      제출
                    </button>
                    <button
                      // defaultValue={todo.todo}
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
                      checked={todo.isCompleted}
                      value={todo.id}
                      onChange={(e) => {
                        setTodos(
                          todos.map((t) => {
                            if (t.id === todo.id) {
                              return { ...t, isCompleted: !t.isCompleted };
                            } else return t;
                          })
                        );
                        setCheckedTodoId(e.target.value);
                      }}
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
