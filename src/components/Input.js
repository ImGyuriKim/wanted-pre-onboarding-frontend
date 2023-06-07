import styled from "styled-components";

const NewContainer = styled.div`
  display: flex;
  height: 3vh;
`;
function Input(setTodo, handleAddButton) {
  return (
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
  );
}

export default Input;
